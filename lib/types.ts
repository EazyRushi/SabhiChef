// ============================================
// PRODUCT
// ============================================
export interface ProductVariant {
  weight: string
  servings: string
  price: number
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compare_price?: number | null
  category: 'breakfast' | 'meals' | 'sweet' | 'condiment' | 'beverage' | 'snack'
  image_url: string
  gallery?: string[]
  weight: string
  servings: string
  prep_time: string
  ingredients?: string
  instructions?: string
  tags: string[]
  in_stock: boolean
  is_featured: boolean
  sort_order: number
  variants?: ProductVariant[]
  created_at?: string
  updated_at?: string
}

// ============================================
// COMBO
// ============================================
export interface Combo {
  id: string
  name: string
  slug: string
  description: string
  price: number
  image_url?: string
  is_active: boolean
  products?: ComboItem[]
  created_at?: string
}

export interface ComboItem {
  id: string
  combo_id: string
  product_id: string
  quantity: number
  product?: Product
}

// ============================================
// USER / PROFILE
// ============================================
export interface Profile {
  id: string
  name: string
  phone?: string
  role: 'customer' | 'admin'
  avatar_url?: string
  created_at?: string
  updated_at?: string
}

export interface Address {
  id: string
  user_id: string
  label: string
  full_name: string
  phone: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  pincode: string
  is_default: boolean
  created_at?: string
}

// ============================================
// CART
// ============================================
export interface CartItem {
  product: Product
  quantity: number
}

// ============================================
// COUPON
// ============================================
export interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'flat'
  value: number
  min_order: number
  max_discount?: number | null
  usage_limit?: number | null
  used_count: number
  expires_at?: string | null
  is_active: boolean
  created_at?: string
}

// ============================================
// ORDER
// ============================================
export interface Order {
  id: string
  order_number: string
  user_id: string
  subtotal: number
  discount: number
  shipping: number
  total: number
  coupon_id?: string | null
  coupon_code?: string | null
  order_status: OrderStatus
  payment_status: PaymentStatus
  payment_method?: string
  razorpay_order_id?: string
  razorpay_payment_id?: string
  shipping_name: string
  shipping_phone: string
  shipping_address: string
  shipping_city: string
  shipping_state: string
  shipping_pincode: string
  tracking_number?: string
  tracking_url?: string
  notes?: string
  items?: OrderItem[]
  created_at?: string
  updated_at?: string
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_price: number
  quantity: number
  created_at?: string
}

// ============================================
// REVIEW
// ============================================
export interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment: string
  is_approved: boolean
  profile?: Profile
  created_at?: string
}

// ============================================
// WISHLIST
// ============================================
export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  product?: Product
  created_at?: string
}

// ============================================
// ADMIN DASHBOARD
// ============================================
export interface DashboardStats {
  total_revenue: number
  total_orders: number
  pending_orders: number
  total_customers: number
  revenue_change: number
  orders_change: number
}
