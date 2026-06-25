import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
interface KpiCardProps {
  title: string
  value: string
  icon: ReactNode
  description?: string
}

function KpiCard({ title, value, icon, description }: KpiCardProps) {
  return (
    <Card className="min-w-[200px]">
      <CardHeader className="flex-row items-center justify-between gap-4">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

function KpiCardSkeleton() {
  return (
    <Card className="min-w-[200px]">
      <CardHeader className="flex-row items-center justify-between gap-4">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="size-5 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent>
        <div className="h-8 w-32 animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  )
}

export { KpiCard, KpiCardSkeleton }
