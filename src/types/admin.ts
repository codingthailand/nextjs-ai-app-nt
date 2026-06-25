export interface AdminStats {
  todaySales: number
  todayOrders: number
  pendingOrders: number
  totalProducts: number
  totalUsers: number
}

export interface RevenuePoint {
  date: string
  revenue: number
  orders: number
}

export interface AdminOrderItem {
  id: number
  date: string
  customerName: string | null
  status: string
  totalAmount: number
}

export type ApiResponse<T> = { success: true; data: T } | { success: false; error: string }

export type AdminProduct = {
  id: number
  name: string
  description: string | null
  price: number
  categoryId: number
  categoryName: string
}

export type CategoryOption = {
  id: number
  name: string
}

export type ProductListData = {
  products: AdminProduct[]
  total: number
  page: number
  totalPages: number
}
