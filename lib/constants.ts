// ============================================
// PRODUCT CATEGORIES
// ============================================
export const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'meals', label: 'Meals' },
  { value: 'sweet', label: 'Sweet & Drinks' },
  { value: 'condiment', label: 'Condiments' },
] as const

export type CategoryValue = (typeof CATEGORIES)[number]['value']

// ============================================
// SHIPPING
// ============================================
export const SHIPPING = {
  FREE_THRESHOLD: 1500,
  FLAT_RATE: 150,
  DELIVERY_ESTIMATE: '5–10 working days',
} as const

// ============================================
// ORDER STATUSES
// ============================================
export const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending', color: '#D89339' },
  { value: 'confirmed', label: 'Confirmed', color: '#F47B40' },
  { value: 'preparing', label: 'Preparing', color: '#F47B40' },
  { value: 'packed', label: 'Packed', color: '#B7C158' },
  { value: 'shipped', label: 'Shipped', color: '#16703A' },
  { value: 'delivered', label: 'Delivered', color: '#16703A' },
  { value: 'cancelled', label: 'Cancelled', color: '#DD2D2B' },
  { value: 'refunded', label: 'Refunded', color: '#995424' },
] as const

// ============================================
// BUSINESS INFO
// ============================================
export const BUSINESS = {
  name: 'Sabhi Chef',
  tagline: 'Homely Food in Minutes',
  phone: '+91 84218 88128',
  email: 'sabhichef@gmail.com',
  instagram: 'https://www.instagram.com/sabhi.chef/',
  whatsapp: 'https://wa.me/918421888128',
  facebook: 'https://www.facebook.com/sabhichef',
  website: 'https://www.sabhichef.com',
  shop: 'https://www.sabhichef.com/shop',
} as const

// ============================================
// INDIAN STATES (for address forms)
// ============================================
export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry',
  'Chandigarh', 'Andaman and Nicobar Islands', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep',
] as const
