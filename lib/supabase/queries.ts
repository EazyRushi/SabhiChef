import { createClient } from './server'
import type { Product, Order, Profile, Address, Coupon, Review, WishlistItem, DashboardStats } from '@/lib/types'

// ============================================
// PRODUCTS
// ============================================

export async function getProducts() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })
  return (data ?? []) as Product[]
}

export async function getFeaturedProducts() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .limit(4)
  return (data ?? []) as Product[]
}

export async function getProductById(id: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  return data as Product | null
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()
  return data as Product | null
}

// ============================================
// AUTH / USER
// ============================================

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getCurrentProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  return data as Profile | null
}

export async function getUserAddresses() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  const { data } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', user.id)
    .order('is_default', { ascending: false })
  return (data ?? []) as Address[]
}

// ============================================
// ORDERS
// ============================================

export async function getUserOrders() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  const { data } = await supabase
    .from('orders')
    .select('*, items:order_items(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
  return (data ?? []) as Order[]
}

export async function getOrderByNumber(orderNumber: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('orders')
    .select('*, items:order_items(*)')
    .eq('order_number', orderNumber)
    .single()
  return data as Order | null
}

export async function getOrderById(id: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('orders')
    .select('*, items:order_items(*)')
    .eq('id', id)
    .single()
  return data as Order | null
}

// ============================================
// WISHLIST
// ============================================

export async function getUserWishlist() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  const { data } = await supabase
    .from('wishlist_items')
    .select('*, product:products(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
  return (data ?? []) as WishlistItem[]
}

export async function getUserWishlistIds() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  const { data } = await supabase
    .from('wishlist_items')
    .select('product_id')
    .eq('user_id', user.id)
  return (data ?? []).map((w: { product_id: string }) => w.product_id)
}

// ============================================
// REVIEWS
// ============================================

export async function getProductReviews(productId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('reviews')
    .select('*, profile:profiles(name, avatar_url)')
    .eq('product_id', productId)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
  return (data ?? []) as Review[]
}

// ============================================
// COUPONS
// ============================================

export async function getCouponByCode(code: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('coupons')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('is_active', true)
    .single()
  return data as Coupon | null
}

// ============================================
// ADMIN QUERIES
// ============================================

export async function adminGetAllOrders() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('orders')
    .select('*, items:order_items(*)')
    .order('created_at', { ascending: false })
  return (data ?? []) as Order[]
}

export async function adminGetAllCustomers() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'customer')
    .order('created_at', { ascending: false })
  return (data ?? []) as Profile[]
}

export async function adminGetAllCoupons() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('coupons')
    .select('*')
    .order('created_at', { ascending: false })
  return (data ?? []) as Coupon[]
}

export async function adminGetDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient()

  const [ordersRes, customersRes] = await Promise.all([
    supabase.from('orders').select('total, order_status, created_at'),
    supabase.from('profiles').select('id').eq('role', 'customer'),
  ])

  const orders = ordersRes.data ?? []
  const total_revenue = orders.reduce((s: number, o: { total: number }) => s + (o.total || 0), 0)
  const total_orders = orders.length
  const pending_orders = orders.filter((o: { order_status: string }) => o.order_status === 'pending').length
  const total_customers = (customersRes.data ?? []).length

  // Simple month-over-month change (current vs prior month)
  const now = new Date()
  const thisMonth = orders.filter((o: { created_at: string }) => new Date(o.created_at).getMonth() === now.getMonth())
  const lastMonth = orders.filter((o: { created_at: string }) => new Date(o.created_at).getMonth() === now.getMonth() - 1)
  const thisRevenue = thisMonth.reduce((s: number, o: { total: number }) => s + (o.total || 0), 0)
  const lastRevenue = lastMonth.reduce((s: number, o: { total: number }) => s + (o.total || 0), 0)
  const revenue_change = lastRevenue > 0 ? Math.round(((thisRevenue - lastRevenue) / lastRevenue) * 100) : 0
  const orders_change = lastMonth.length > 0 ? Math.round(((thisMonth.length - lastMonth.length) / lastMonth.length) * 100) : 0

  return { total_revenue, total_orders, pending_orders, total_customers, revenue_change, orders_change }
}

export async function adminGetRevenueChart() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('orders')
    .select('total, created_at')
    .order('created_at', { ascending: true })

  // Group by month
  const monthMap: Record<string, { revenue: number; orders: number }> = {}
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  for (const order of data ?? []) {
    const d = new Date(order.created_at)
    const key = monthNames[d.getMonth()]
    if (!monthMap[key]) monthMap[key] = { revenue: 0, orders: 0 }
    monthMap[key].revenue += order.total
    monthMap[key].orders += 1
  }

  return Object.entries(monthMap).map(([month, v]) => ({ month, ...v }))
}

export async function adminGetTopProducts() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('order_items')
    .select('product_name, product_price, quantity')

  const productMap: Record<string, { name: string; sales: number; revenue: number }> = {}
  for (const item of data ?? []) {
    if (!productMap[item.product_name]) productMap[item.product_name] = { name: item.product_name, sales: 0, revenue: 0 }
    productMap[item.product_name].sales += item.quantity
    productMap[item.product_name].revenue += item.product_price * item.quantity
  }

  return Object.values(productMap).sort((a, b) => b.sales - a.sales).slice(0, 5)
}

export async function adminGetCategoryBreakdown() {
  const supabase = await createClient()
  const { data } = await supabase.from('products').select('category')
  const catCount: Record<string, number> = {}
  for (const p of data ?? []) {
    catCount[p.category] = (catCount[p.category] || 0) + 1
  }
  const total = Object.values(catCount).reduce((s, c) => s + c, 0)
  const fills: Record<string, string> = { breakfast: '#F47B40', meals: '#16703A', sweet: '#DD2D2B', condiment: '#D89339', beverage: '#3B82F6', snack: '#8B5CF6' }
  return Object.entries(catCount).map(([name, count]) => ({ name, value: Math.round((count / total) * 100), fill: fills[name] || '#888' }))
}
