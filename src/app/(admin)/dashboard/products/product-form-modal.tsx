"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema } from "@/lib/validations/product"
import type { ProductFormValues } from "@/lib/validations/product"
import type { AdminProduct, CategoryOption } from "@/types/admin"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"

interface ProductFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: AdminProduct | null
  categories: CategoryOption[]
  onSuccess: () => void
}

const defaultValues: ProductFormValues = {
  name: "",
  description: "",
  price: 0,
  categoryId: 0,
}

export function ProductFormModal({
  open,
  onOpenChange,
  product,
  categories,
  onSuccess,
}: ProductFormModalProps) {
  const [submitting, setSubmitting] = useState(false)
  const isEdit = !!product

  const form = useForm<ProductFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(productSchema) as any,
    defaultValues,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form

  useEffect(() => {
    if (open) {
      reset(
        product
          ? {
              name: product.name,
              description: product.description ?? "",
              price: product.price,
              categoryId: product.categoryId,
            }
          : defaultValues
      )
    }
  }, [open, product, reset])

  async function onSubmit(data: ProductFormValues) {
    setSubmitting(true)
    try {
      const url = isEdit
        ? `/api/admin/products/${product!.id}`
        : "/api/admin/products"
      const method = isEdit ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()

      if (!json.success) throw new Error(json.error)

      toast.success(isEdit ? "อัปเดตสินค้าสำเร็จ" : "เพิ่มสินค้าสำเร็จ")
      onSuccess()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "เกิดข้อผิดพลาด")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{isEdit ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? `กำลังแก้ไข "${product!.name}"`
              : "กรอกข้อมูลสินค้าที่ต้องการเพิ่ม"}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-6 p-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">ชื่อสินค้า</Label>
            <Input id="name" placeholder="ชื่อสินค้า" {...register("name")} />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">รายละเอียด</Label>
            <Textarea
              id="description"
              placeholder="รายละเอียดสินค้า (ไม่บังคับ)"
              rows={4}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">ราคา</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("price")}
            />
            {errors.price && (
              <p className="text-xs text-destructive">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId">หมวดหมู่</Label>
            <select
              id="categoryId"
              className="flex h-[42px] w-full rounded-md border border-input bg-transparent px-4 text-[15px] text-foreground outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/10 disabled:opacity-40"
              {...register("categoryId")}
            >
              <option value="">เลือกหมวดหมู่</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-xs text-destructive">{errors.categoryId.message}</p>
            )}
          </div>

          <div className="mt-auto flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              disabled={submitting}
              onClick={() => onOpenChange(false)}
            >
              ยกเลิก
            </Button>
            <Button type="submit" className="flex-1" disabled={submitting}>
              {submitting && <Spinner className="mr-2" />}
              {isEdit ? "บันทึก" : "เพิ่มสินค้า"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
