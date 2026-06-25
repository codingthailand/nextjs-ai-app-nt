import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

interface RevenueRow {
  day: string
  revenue: number
  orders: number
}

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") ?? "30d"

    const daysMap: Record<string, number> = { "7d": 7, "30d": 30, "90d": 90 }
    const days = daysMap[period] ?? 30

    const rows = await prisma.$queryRawUnsafe<RevenueRow[]>(
      `SELECT DATE(date) as day, COALESCE(SUM(total_amount), 0) as revenue, COUNT(*) as orders
       FROM orders
       WHERE date >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
       GROUP BY DATE(date)
       ORDER BY day ASC`,
      days
    )

    const dataMap = new Map<string, { revenue: number; orders: number }>()
    for (const row of rows) {
      const d = new Date(row.day)
      const key = d.toISOString().slice(0, 10)
      dataMap.set(key, { revenue: Number(row.revenue), orders: Number(row.orders) })
    }

    const result: { date: string; revenue: number; orders: number }[] = []
    const now = new Date()
    const start = new Date(now)
    start.setDate(start.getDate() - days)

    for (let d = new Date(start); d <= now; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().slice(0, 10)
      const dd = String(d.getDate()).padStart(2, "0")
      const mm = String(d.getMonth() + 1).padStart(2, "0")
      const entry = dataMap.get(key)
      result.push({
        date: `${dd}/${mm}`,
        revenue: entry?.revenue ?? 0,
        orders: entry?.orders ?? 0,
      })
    }

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error("Revenue error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch revenue" },
      { status: 500 }
    )
  }
}
