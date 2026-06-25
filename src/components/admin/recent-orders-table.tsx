import type { AdminOrderItem } from "@/types/admin"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const statusLabel: Record<string, string> = {
  delivered: "จัดส่งแล้ว",
  received: "ได้รับแล้ว",
  processing: "กำลังดำเนินการ",
}

const statusVariant: Record<string, "success" | "warning" | "default"> = {
  delivered: "success",
  received: "success",
  processing: "warning",
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(amount)
}

interface RecentOrdersTableProps {
  orders: AdminOrderItem[]
  loading?: boolean
}

function RecentOrdersTable({ orders, loading }: RecentOrdersTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded bg-muted" />
        ))}
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ออเดอร์</TableHead>
          <TableHead>ลูกค้า</TableHead>
          <TableHead>วันที่</TableHead>
          <TableHead>สถานะ</TableHead>
          <TableHead className="text-right">ยอดเงิน</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">#{order.id}</TableCell>
            <TableCell>{order.customerName ?? "—"}</TableCell>
            <TableCell>
              {new Date(order.date).toLocaleDateString("th-TH")}
            </TableCell>
            <TableCell>
              <Badge variant={statusVariant[order.status] ?? "default"}>
                {statusLabel[order.status] ?? order.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right font-medium">
              {formatCurrency(order.totalAmount)}
            </TableCell>
          </TableRow>
        ))}
        {orders.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
              ไม่มีรายการออเดอร์
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export { RecentOrdersTable }
