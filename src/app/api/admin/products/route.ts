import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { productSchema } from "@/lib/validations/product"

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") ?? ""
    const page = Math.max(Number(searchParams.get("page")) || 1, 1)
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 20, 1), 100)
    const skip = (page - 1) * limit

    const where = search
      ? { name: { contains: search } }
      : {}

    const [products, total] = await Promise.all([
      prisma.products.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: "desc" },
        include: {
          categories: { select: { id: true, name: true } },
        },
      }),
      prisma.products.count({ where }),
    ])

    const data = products.map((p) => ({
      id: p.id,
      name: p.name ?? "",
      description: p.description,
      price: Number(p.price ?? 0),
      categoryId: p.category_id ?? 0,
      categoryName: p.categories?.name ?? "",
    }))

    return NextResponse.json({
      success: true,
      data: {
        products: data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Products list error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
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

    const product = await prisma.products.create({
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
    console.error("Product create error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    )
  }
}
