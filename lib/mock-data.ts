import type { Order, Profile, Coupon, Review, Address, DashboardStats } from './types'

// ============================================
// MOCK CUSTOMERS
// ============================================
export const mockCustomers: Profile[] = [
  { id: 'u1', name: 'Priya Sharma', phone: '+91 98765 43210', role: 'customer', created_at: '2025-11-10T10:00:00Z' },
  { id: 'u2', name: 'Rahul Deshmukh', phone: '+91 87654 32109', role: 'customer', created_at: '2025-12-01T14:30:00Z' },
  { id: 'u3', name: 'Anjali Iyer', phone: '+91 76543 21098', role: 'customer', created_at: '2026-01-05T09:15:00Z' },
  { id: 'u4', name: 'Vikram Singh', phone: '+91 65432 10987', role: 'customer', created_at: '2026-01-20T16:45:00Z' },
  { id: 'u5', name: 'Sneha Kulkarni', phone: '+91 54321 09876', role: 'customer', created_at: '2026-02-02T11:00:00Z' },
  { id: 'u6', name: 'Arjun Mehta', phone: '+91 43210 98765', role: 'customer', created_at: '2026-02-15T08:30:00Z' },
  { id: 'u7', name: 'Kavya Nair', phone: '+91 32109 87654', role: 'customer', created_at: '2026-02-28T13:20:00Z' },
  { id: 'u8', name: 'Devendra Patil', phone: '+91 21098 76543', role: 'customer', created_at: '2026-03-10T15:00:00Z' },
  { id: 'admin1', name: 'Surekha (Admin)', phone: '+91 84218 88128', role: 'admin', created_at: '2025-01-01T00:00:00Z' },
]

// ============================================
// MOCK ADDRESSES
// ============================================
export const mockAddresses: Address[] = [
  {
    id: 'a1', user_id: 'u1', label: 'Home', full_name: 'Priya Sharma',
    phone: '+91 98765 43210', address_line1: '23, Rose Garden Apartments',
    address_line2: 'Near Shivaji Park', city: 'Pune', state: 'Maharashtra',
    pincode: '411004', is_default: true,
  },
  {
    id: 'a2', user_id: 'u1', label: 'Office', full_name: 'Priya Sharma',
    phone: '+91 98765 43210', address_line1: '5th Floor, TechPark',
    address_line2: 'Hinjewadi Phase 2', city: 'Pune', state: 'Maharashtra',
    pincode: '411057', is_default: false,
  },
  {
    id: 'a3', user_id: 'u2', label: 'Home', full_name: 'Rahul Deshmukh',
    phone: '+91 87654 32109', address_line1: '12, Shree Residency',
    city: 'Nagpur', state: 'Maharashtra',
    pincode: '440001', is_default: true,
  },
]

// ============================================
// MOCK ORDERS
// ============================================
export const mockOrders: Order[] = [
  {
    id: 'o1', order_number: 'SC-2026-001', user_id: 'u1',
    subtotal: 600, discount: 0, shipping: 0, total: 600,
    order_status: 'delivered', payment_status: 'paid', payment_method: 'UPI',
    shipping_name: 'Priya Sharma', shipping_phone: '+91 98765 43210',
    shipping_address: '23, Rose Garden Apartments, Near Shivaji Park',
    shipping_city: 'Pune', shipping_state: 'Maharashtra', shipping_pincode: '411004',
    tracking_number: 'DTDC123456', tracking_url: '#',
    items: [
      { id: 'oi1', order_id: 'o1', product_id: 'p1', product_name: 'Masala Khichdi', product_price: 150, quantity: 2 },
      { id: 'oi2', order_id: 'o1', product_id: 'p3', product_name: 'Moong Chila', product_price: 150, quantity: 2 },
    ],
    created_at: '2026-03-15T10:30:00Z', updated_at: '2026-03-20T14:00:00Z',
  },
  {
    id: 'o2', order_number: 'SC-2026-002', user_id: 'u2',
    subtotal: 750, discount: 75, shipping: 0, total: 675,
    coupon_code: 'WELCOME10', order_status: 'shipped', payment_status: 'paid', payment_method: 'Razorpay',
    shipping_name: 'Rahul Deshmukh', shipping_phone: '+91 87654 32109',
    shipping_address: '12, Shree Residency',
    shipping_city: 'Nagpur', shipping_state: 'Maharashtra', shipping_pincode: '440001',
    tracking_number: 'DTDC789012',
    items: [
      { id: 'oi3', order_id: 'o2', product_id: 'p4', product_name: 'Shev Bhaji', product_price: 200, quantity: 1 },
      { id: 'oi4', order_id: 'o2', product_id: 'p5', product_name: 'Matki Misal', product_price: 200, quantity: 1 },
      { id: 'oi5', order_id: 'o2', product_id: 'p11', product_name: 'Khandeshi Pithla', product_price: 80, quantity: 1 },
      { id: 'oi6', order_id: 'o2', product_id: 'p1', product_name: 'Masala Khichdi', product_price: 150, quantity: 1 },
    ],
    created_at: '2026-03-22T14:00:00Z', updated_at: '2026-03-24T09:00:00Z',
  },
  {
    id: 'o3', order_number: 'SC-2026-003', user_id: 'u3',
    subtotal: 450, discount: 0, shipping: 150, total: 600,
    order_status: 'packed', payment_status: 'paid', payment_method: 'COD',
    shipping_name: 'Anjali Iyer', shipping_phone: '+91 76543 21098',
    shipping_address: '45, MG Road, Apt 3B',
    shipping_city: 'Bengaluru', shipping_state: 'Karnataka', shipping_pincode: '560001',
    items: [
      { id: 'oi7', order_id: 'o3', product_id: 'p2', product_name: 'Vanilla Cake', product_price: 150, quantity: 1 },
      { id: 'oi8', order_id: 'o3', product_id: 'p13', product_name: 'Chocolate Cake', product_price: 150, quantity: 1 },
      { id: 'oi9', order_id: 'o3', product_id: 'p14', product_name: 'Kashmiri Kahwa', product_price: 250, quantity: 1 },
    ],
    created_at: '2026-03-25T09:15:00Z', updated_at: '2026-03-27T11:00:00Z',
  },
  {
    id: 'o4', order_number: 'SC-2026-004', user_id: 'u4',
    subtotal: 1650, discount: 165, shipping: 0, total: 1485,
    coupon_code: 'SAVE10', order_status: 'preparing', payment_status: 'paid', payment_method: 'Razorpay',
    shipping_name: 'Vikram Singh', shipping_phone: '+91 65432 10987',
    shipping_address: '78, Defence Colony',
    shipping_city: 'Delhi', shipping_state: 'Delhi', shipping_pincode: '110024',
    items: [
      { id: 'oi10', order_id: 'o4', product_id: 'p1', product_name: 'Masala Khichdi', product_price: 150, quantity: 3 },
      { id: 'oi11', order_id: 'o4', product_id: 'p6', product_name: 'Poha', product_price: 80, quantity: 3 },
      { id: 'oi12', order_id: 'o4', product_id: 'p7', product_name: 'Upma', product_price: 120, quantity: 3 },
      { id: 'oi13', order_id: 'o4', product_id: 'p15', product_name: 'Green Chutney', product_price: 100, quantity: 3 },
    ],
    created_at: '2026-03-28T16:45:00Z', updated_at: '2026-03-29T08:00:00Z',
  },
  {
    id: 'o5', order_number: 'SC-2026-005', user_id: 'u5',
    subtotal: 500, discount: 0, shipping: 150, total: 650,
    order_status: 'pending', payment_status: 'pending', payment_method: 'COD',
    shipping_name: 'Sneha Kulkarni', shipping_phone: '+91 54321 09876',
    shipping_address: '9, Koregaon Park Lane',
    shipping_city: 'Pune', shipping_state: 'Maharashtra', shipping_pincode: '411001',
    items: [
      { id: 'oi14', order_id: 'o5', product_id: 'p4', product_name: 'Shev Bhaji', product_price: 200, quantity: 1 },
      { id: 'oi15', order_id: 'o5', product_id: 'p5', product_name: 'Matki Misal', product_price: 200, quantity: 1 },
    ],
    created_at: '2026-04-01T11:00:00Z', updated_at: '2026-04-01T11:00:00Z',
  },
  {
    id: 'o6', order_number: 'SC-2026-006', user_id: 'u6',
    subtotal: 300, discount: 0, shipping: 150, total: 450,
    order_status: 'confirmed', payment_status: 'paid', payment_method: 'UPI',
    shipping_name: 'Arjun Mehta', shipping_phone: '+91 43210 98765',
    shipping_address: '34, Satellite Road',
    shipping_city: 'Ahmedabad', shipping_state: 'Gujarat', shipping_pincode: '380015',
    items: [
      { id: 'oi16', order_id: 'o6', product_id: 'p3', product_name: 'Moong Chila', product_price: 150, quantity: 1 },
      { id: 'oi17', order_id: 'o6', product_id: 'p9', product_name: 'Eggless Pancake', product_price: 150, quantity: 1 },
    ],
    created_at: '2026-04-01T15:30:00Z', updated_at: '2026-04-01T16:00:00Z',
  },
  {
    id: 'o7', order_number: 'SC-2026-007', user_id: 'u7',
    subtotal: 900, discount: 0, shipping: 150, total: 1050,
    order_status: 'cancelled', payment_status: 'refunded', payment_method: 'Razorpay',
    shipping_name: 'Kavya Nair', shipping_phone: '+91 32109 87654',
    shipping_address: '12, Marine Drive',
    shipping_city: 'Kochi', shipping_state: 'Kerala', shipping_pincode: '682001',
    items: [
      { id: 'oi18', order_id: 'o7', product_id: 'p1', product_name: 'Masala Khichdi', product_price: 150, quantity: 2 },
      { id: 'oi19', order_id: 'o7', product_id: 'p2', product_name: 'Vanilla Cake', product_price: 150, quantity: 2 },
      { id: 'oi20', order_id: 'o7', product_id: 'p14', product_name: 'Kashmiri Kahwa', product_price: 250, quantity: 2 },
    ],
    created_at: '2026-03-10T10:00:00Z', updated_at: '2026-03-12T14:00:00Z',
  },
]

// ============================================
// MOCK COUPONS
// ============================================
export const mockCoupons: Coupon[] = [
  {
    id: 'cp1', code: 'WELCOME10', type: 'percentage', value: 10,
    min_order: 500, max_discount: 200, usage_limit: 100, used_count: 34,
    expires_at: '2026-06-30T23:59:59Z', is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'cp2', code: 'SAVE10', type: 'percentage', value: 10,
    min_order: 1000, max_discount: 300, usage_limit: 50, used_count: 12,
    expires_at: '2026-05-31T23:59:59Z', is_active: true,
    created_at: '2026-02-01T00:00:00Z',
  },
  {
    id: 'cp3', code: 'FLAT50', type: 'flat', value: 50,
    min_order: 300, usage_limit: null, used_count: 67,
    expires_at: null, is_active: true,
    created_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 'cp4', code: 'DIWALI25', type: 'percentage', value: 25,
    min_order: 800, max_discount: 500, usage_limit: 200, used_count: 200,
    expires_at: '2025-11-15T23:59:59Z', is_active: false,
    created_at: '2025-10-15T00:00:00Z',
  },
  {
    id: 'cp5', code: 'FIRST100', type: 'flat', value: 100,
    min_order: 500, usage_limit: 50, used_count: 50,
    expires_at: '2026-03-31T23:59:59Z', is_active: false,
    created_at: '2026-03-01T00:00:00Z',
  },
]

// ============================================
// MOCK REVIEWS
// ============================================
export const mockReviews: Review[] = [
  { id: 'r1', product_id: 'p1', user_id: 'u1', rating: 5, comment: 'Tastes exactly like maa ke haath ka khana!', is_approved: true, profile: mockCustomers[0], created_at: '2026-03-20T10:00:00Z' },
  { id: 'r2', product_id: 'p1', user_id: 'u2', rating: 4, comment: 'Very convenient. Ready in 5 minutes as promised.', is_approved: true, profile: mockCustomers[1], created_at: '2026-03-18T14:00:00Z' },
  { id: 'r3', product_id: 'p3', user_id: 'u3', rating: 5, comment: 'Best moong chila I have ever had in a ready-to-cook mix!', is_approved: true, profile: mockCustomers[2], created_at: '2026-03-22T09:00:00Z' },
  { id: 'r4', product_id: 'p2', user_id: 'u5', rating: 5, comment: 'My kids loved this eggless cake. So good!', is_approved: true, profile: mockCustomers[4], created_at: '2026-02-15T16:00:00Z' },
  { id: 'r5', product_id: 'p4', user_id: 'u4', rating: 4, comment: 'Good shev bhaji. Could be a bit spicier for my taste.', is_approved: true, profile: mockCustomers[3], created_at: '2026-03-10T12:00:00Z' },
]

// ============================================
// MOCK DASHBOARD STATS
// ============================================
export const mockDashboardStats: DashboardStats = {
  total_revenue: 42350,
  total_orders: 142,
  pending_orders: 8,
  total_customers: 234,
  revenue_change: 12.5,
  orders_change: 8.3,
}

// ============================================
// REVENUE DATA (for charts)
// ============================================
export const revenueData = [
  { month: 'Oct', revenue: 4200, orders: 18 },
  { month: 'Nov', revenue: 8500, orders: 35 },
  { month: 'Dec', revenue: 6800, orders: 28 },
  { month: 'Jan', revenue: 5200, orders: 22 },
  { month: 'Feb', revenue: 7100, orders: 30 },
  { month: 'Mar', revenue: 10550, orders: 42 },
]

export const topProducts = [
  { name: 'Masala Khichdi', sales: 89, revenue: 13350 },
  { name: 'Moong Chila', sales: 64, revenue: 9600 },
  { name: 'Poha', sales: 57, revenue: 4560 },
  { name: 'Shev Bhaji', sales: 42, revenue: 8400 },
  { name: 'Vanilla Cake', sales: 38, revenue: 5700 },
]

export const categoryBreakdown = [
  { name: 'Breakfast', value: 38, fill: '#F47B40' },
  { name: 'Meals', value: 32, fill: '#16703A' },
  { name: 'Sweet & Drinks', value: 20, fill: '#DD2D2B' },
  { name: 'Condiments', value: 10, fill: '#D89339' },
]
