import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { productSchema } from "@/lib/validations/product"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const productId = Number(id)
    if (isNaN(productId)) {
      return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 })
    }

    const body = await request.json()
    const result = productSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const { name, description, price, categoryId } = result.data

    const product = await prisma.products.update({
      where: { id: productId },
      data: {
        name,
        description: description || null,
        price,
        category_id: categoryId,
      },
      include: {
        categories: { select: { id: true, name: true } },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        id: product.id,
        name: product.name ?? "",
        description: product.description,
        price: Number(product.price ?? 0),
        categoryId: product.category_id ?? 0,
        categoryName: product.categories?.name ?? "",
      },
    })
  } catch (error) {
    console.error("Product update error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const productId = Number(id)
    if (isNaN(productId)) {
      return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 })
    }

    const orderCount = await prisma.order_items.count({
      where: { product_id: productId },
    })

    if (orderCount > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `ไม่สามารถลบสินค้าได้ เนื่องจากมีออเดอร์ ${orderCount} รายการที่ใช้สินค้านี้`,
        },
        { status: 409 }
      )
    }

    await prisma.products.delete({ where: { id: productId } })

    return NextResponse.json({ success: true, data: null })
  } catch (error) {
    console.error("Product delete error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    )
  }
}
