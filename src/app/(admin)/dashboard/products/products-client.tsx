"use client"

import { useEffect, useState } from "react"
import type { AdminProduct, CategoryOption, ProductListData } from "@/types/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ProductFormModal } from "./product-form-modal"
import { DeleteConfirmDialog } from "./delete-confirm-dialog"
import { RiAddLine, RiSearchLine, RiPencilLine, RiDeleteBinLine, RiRefreshLine } from "@remixicon/react"
import { toast } from "sonner"

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(amount)
}

export function ProductsClient() {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [inputVal, setInputVal] = useState("")
  const [search, setSearch] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<AdminProduct | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<AdminProduct | null>(null)

  const limit = 20

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/admin/categories")
        const json = await res.json()
        if (json.success) setCategories(json.data)
      } catch { /* ignore */ }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({ page: String(page), limit: String(limit) })
        if (search) params.set("search", search)
        const res = await fetch(`/api/admin/products?${params}`)
        const json = await res.json()
        if (!json.success) throw new Error(json.error)
        const data = json.data as ProductListData
        setProducts(data.products)
        setTotal(data.total)
        setTotalPages(data.totalPages)
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to fetch products")
      } finally {
        setLoading(false)
      }
    })()
  }, [page, search])

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(inputVal)
      setPage(1)
    }, 300)
    return () => clearTimeout(t)
  }, [inputVal])

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">สินค้า</h1>
          <p className="text-sm text-muted-foreground">
            จัดการสินค้าทั้งหมด {total} รายการ
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setLoading(true)
              const params = new URLSearchParams({ page: String(page), limit: String(limit) })
              if (search) params.set("search", search)
              fetch(`/api/admin/products?${params}`)
                .then((r) => r.json())
                .then((json) => {
                  if (!json.success) throw new Error(json.error)
                  const data = json.data as ProductListData
                  setProducts(data.products)
                  setTotal(data.total)
                  setTotalPages(data.totalPages)
                })
                .catch((err) => toast.error(err.message))
                .finally(() => setLoading(false))
            }}
          >
            <RiRefreshLine className="mr-1 size-4" />
            รีเฟรช
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setEditProduct(null)
              setFormOpen(true)
            }}
          >
            <RiAddLine className="mr-1 size-4" />
            เพิ่มสินค้า
          </Button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <RiSearchLine className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="ค้นหาสินค้า..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>ชื่อสินค้า</TableHead>
              <TableHead>หมวดหมู่</TableHead>
              <TableHead className="text-right">ราคา</TableHead>
              <TableHead className="w-24 text-right">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <TableCell key={j}>
                      <div className="h-5 animate-pulse rounded bg-muted" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                  {search ? "ไม่พบสินค้าที่ค้นหา" : "ยังไม่มีสินค้า"}
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium text-muted-foreground">
                    #{product.id}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.categoryName}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(product.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => {
                          setEditProduct(product)
                          setFormOpen(true)
                        }}
                      >
                        <RiPencilLine className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteTarget(product)}
                      >
                        <RiDeleteBinLine className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ก่อนหน้า
          </Button>
          <span className="text-sm text-muted-foreground">
            หน้า {page} จาก {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            ถัดไป
          </Button>
        </div>
      )}

      <ProductFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        product={editProduct}
        categories={categories}
        onSuccess={() => {
          setFormOpen(false)
          setEditProduct(null)
          const params = new URLSearchParams({ page: String(page), limit: String(limit) })
          if (search) params.set("search", search)
          setLoading(true)
          fetch(`/api/admin/products?${params}`)
            .then((r) => r.json())
            .then((json) => {
              if (!json.success) throw new Error(json.error)
              const data = json.data as ProductListData
              setProducts(data.products)
              setTotal(data.total)
              setTotalPages(data.totalPages)
            })
            .catch((err) => toast.error(err.message))
            .finally(() => setLoading(false))
        }}
      />

      <DeleteConfirmDialog
        product={deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        onSuccess={() => {
          setDeleteTarget(null)
          const params = new URLSearchParams({ page: String(page), limit: String(limit) })
          if (search) params.set("search", search)
          setLoading(true)
          fetch(`/api/admin/products?${params}`)
            .then((r) => r.json())
            .then((json) => {
              if (!json.success) throw new Error(json.error)
              const data = json.data as ProductListData
              setProducts(data.products)
              setTotal(data.total)
              setTotalPages(data.totalPages)
            })
            .catch((err) => toast.error(err.message))
            .finally(() => setLoading(false))
        }}
      />
    </div>
  )
}
