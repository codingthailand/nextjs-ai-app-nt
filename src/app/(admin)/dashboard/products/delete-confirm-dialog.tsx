"use client"

import { useState } from "react"
import type { AdminProduct } from "@/types/admin"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { AlertDialog } from "radix-ui"
import { toast } from "sonner"

interface DeleteConfirmDialogProps {
  product: AdminProduct | null
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function DeleteConfirmDialog({
  product,
  onOpenChange,
  onSuccess,
}: DeleteConfirmDialogProps) {
  const [deleting, setDeleting] = useState(false)
  const open = !!product

  async function handleDelete() {
    if (!product) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "DELETE",
      })
      const json = await res.json()

      if (!json.success) {
        throw new Error(json.error)
      }

      toast.success("ลบสินค้าสำเร็จ")
      onSuccess()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "เกิดข้อผิดพลาด")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/30 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-popover p-6 shadow-xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
          <AlertDialog.Title className="text-lg font-semibold">
            ยืนยันการลบสินค้า
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm text-muted-foreground">
            คุณแน่ใจหรือไม่ที่จะลบ <strong>{product?.name}</strong>?
            การกระทำนี้ไม่สามารถย้อนกลับได้
          </AlertDialog.Description>

          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <Button variant="outline" disabled={deleting}>
                ยกเลิก
              </Button>
            </AlertDialog.Cancel>
            <Button
              variant="destructive"
              disabled={deleting}
              onClick={handleDelete}
            >
              {deleting && <Spinner className="mr-2" />}
              ลบสินค้า
            </Button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
