import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import type { AdminOrderItem } from "@/types/admin"

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 5, 1), 100)

    const [orders, total] = await Promise.all([
      prisma.orders.findMany({
        take: limit,
        orderBy: { date: "desc" },
        include: {
          customers: { select: { name: true } },
        },
      }),
      prisma.orders.count(),
    ])

    const items: AdminOrderItem[] = orders.map((o) => ({
      id: o.id,
      date: o.date ? o.date.toISOString() : "",
      customerName: o.customers?.name ?? null,
      status: o.status ?? "processing",
      totalAmount: Number(o.total_amount ?? 0),
    }))

    return NextResponse.json({ success: true, data: { orders: items, total } })
  } catch (error) {
    console.error("Orders error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}
