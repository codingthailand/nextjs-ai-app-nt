import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [
      todayOrdersAgg,
      pendingOrdersCount,
      totalProducts,
      totalUsers,
    ] = await Promise.all([
      prisma.orders.aggregate({
        _sum: { total_amount: true },
        where: { date: { gte: today } },
      }),
      prisma.orders.count({ where: { status: "processing" } }),
      prisma.products.count(),
      prisma.user.count(),
    ])

    return NextResponse.json({
      success: true,
      data: {
        todaySales: Number(todayOrdersAgg._sum.total_amount ?? 0),
        todayOrders: 0,
        pendingOrders: pendingOrdersCount,
        totalProducts,
        totalUsers,
      },
    })
  } catch (error) {
    console.error("Stats error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    )
  }
}
