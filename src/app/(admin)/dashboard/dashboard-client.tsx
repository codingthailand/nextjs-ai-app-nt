"use client"

import { useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import type { AdminStats, RevenuePoint, AdminOrderItem } from "@/types/admin"
import { KpiCard, KpiCardSkeleton } from "@/components/admin/kpi-card"
import { RecentOrdersTable } from "@/components/admin/recent-orders-table"
import { PeriodSelector, type Period } from "@/components/admin/period-selector"
import { Button } from "@/components/ui/button"
import { RiMoneyDollarCircleLine, RiShoppingCartLine, RiTimeLine, RiBox3Line, RiRefreshLine } from "@remixicon/react"

const RevenueChart = dynamic(
  () => import("@/components/admin/revenue-chart").then((m) => ({ default: m.RevenueChart })),
  { ssr: false }
)

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(amount)
}

function formatNumber(amount: number) {
  return new Intl.NumberFormat("th-TH").format(amount)
}

interface SectionErrorProps {
  message: string
  onRetry?: () => void
}

function SectionError({ message, onRetry }: SectionErrorProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-8 text-center">
      <p className="text-sm text-destructive">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RiRefreshLine className="mr-1 size-4" />
          ลองใหม่
        </Button>
      )}
    </div>
  )
}

async function fetchJson(url: string) {
  const res = await fetch(url)
  const json = await res.json()
  if (!json.success) throw new Error(json.error)
  return json.data
}

export function DashboardClient() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState<string | null>(null)

  const [revenue, setRevenue] = useState<RevenuePoint[]>([])
  const [revenueLoading, setRevenueLoading] = useState(true)

  const [period, setPeriod] = useState<Period>("30d")

  const [orders, setOrders] = useState<AdminOrderItem[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  const mountedRef = useRef(true)

  async function loadStats() {
    setStatsLoading(true)
    setStatsError(null)
    try {
      const data = await fetchJson("/api/admin/stats")
      if (mountedRef.current) setStats(data)
    } catch (err) {
      if (mountedRef.current) {
        setStatsError(err instanceof Error ? err.message : "Failed to fetch stats")
      }
    } finally {
      if (mountedRef.current) setStatsLoading(false)
    }
  }

  async function loadOrders() {
    setOrdersLoading(true)
    try {
      const data = await fetchJson("/api/admin/orders?limit=5")
      if (mountedRef.current) setOrders(data.orders)
    } catch {
      // silently fail
    } finally {
      if (mountedRef.current) setOrdersLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      const [s, o] = await Promise.all([
        fetchJson("/api/admin/stats").catch(() => null),
        fetchJson("/api/admin/orders?limit=5").catch(() => null),
      ])
      if (s && mountedRef.current) setStats(s)
      if (o && mountedRef.current) setOrders(o.orders)
      if (!s && mountedRef.current) setStatsError("Failed to fetch stats")
      if (mountedRef.current) { setStatsLoading(false); setOrdersLoading(false) }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const data = await fetchJson(`/api/admin/revenue?period=${period}`)
        if (mountedRef.current) setRevenue(data)
      } catch { /* ignore */ }
      if (mountedRef.current) setRevenueLoading(false)
    })()
  }, [period])

  useEffect(() => {
    const id = setInterval(() => {
      loadStats()
      loadOrders()
    }, 30_000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    return () => { mountedRef.current = false }
  }, [])

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">แดชบอร์ด</h1>
          <p className="text-sm text-muted-foreground">ภาพรวมร้านค้า</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => { loadStats(); loadOrders(); }}>
          <RiRefreshLine className="mr-1 size-4" />
          รีเฟรช
        </Button>
      </div>

      {statsError ? (
        <SectionError message={statsError} onRetry={loadStats} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsLoading ? (
            <>
              <KpiCardSkeleton />
              <KpiCardSkeleton />
              <KpiCardSkeleton />
              <KpiCardSkeleton />
            </>
          ) : (
            <>
              <KpiCard
                title="ยอดขายวันนี้"
                value={formatCurrency(stats!.todaySales)}
                icon={<RiMoneyDollarCircleLine className="size-5" />}
              />
              <KpiCard
                title="ออเดอร์วันนี้"
                value={formatNumber(stats!.todayOrders)}
                icon={<RiShoppingCartLine className="size-5" />}
              />
              <KpiCard
                title="รอดำเนินการ"
                value={formatNumber(stats!.pendingOrders)}
                icon={<RiTimeLine className="size-5" />}
              />
              <KpiCard
                title="สินค้า / ผู้ใช้"
                value={`${formatNumber(stats!.totalProducts)} / ${formatNumber(stats!.totalUsers)}`}
                description={`สินค้า ${formatNumber(stats!.totalProducts)} รายการ, ผู้ใช้ ${formatNumber(stats!.totalUsers)} คน`}
                icon={<RiBox3Line className="size-5" />}
              />
            </>
          )}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">รายได้ตามช่วงเวลา</h2>
          <PeriodSelector value={period} onChange={setPeriod} />
        </div>
        <RevenueChart data={revenue} loading={revenueLoading} />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">ออเดอร์ล่าสุด</h2>
        <div className="rounded-lg border">
          <RecentOrdersTable orders={orders} loading={ordersLoading} />
        </div>
      </div>
    </div>
  )
}
