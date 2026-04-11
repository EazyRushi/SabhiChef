'use server'

import { createClient } from './server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { Product, Order, OrderStatus, Coupon } from '@/lib/types'

// ============================================
// AUTH ACTIONS
// ============================================

export async function signUp(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string

  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) return { error: error.message }

  if (data.user) {
    await supabase.from('profiles').insert({
      id: data.user.id,
      name,
      phone,
      role: 'customer',
    })
  }
  redirect('/account')
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }
  redirect('/account')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

// ============================================
// PROFILE ACTIONS
// ============================================

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not logged in' }

  const { error } = await supabase.from('profiles').update({
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    updated_at: new Date().toISOString(),
  }).eq('id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/account')
  return { success: true }
}

// ============================================
// ADDRESS ACTIONS
// ============================================

export async function upsertAddress(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not logged in' }

  const id = formData.get('id') as string
  const isDefault = formData.get('is_default') === 'on'

  if (isDefault) {
    await supabase.from('addresses').update({ is_default: false }).eq('user_id', user.id)
  }

  const payload = {
    user_id: user.id,
    label: formData.get('label') as string,
    full_name: formData.get('full_name') as string,
    phone: formData.get('phone') as string,
    address_line1: formData.get('line1') as string,
    address_line2: formData.get('line2') as string,
    city: formData.get('city') as string,
    state: formData.get('state') as string,
    pincode: formData.get('pincode') as string,
    is_default: isDefault,
  }

  if (id) {
    const { error } = await supabase.from('addresses').update(payload).eq('id', id).eq('user_id', user.id)
    if (error) return { error: error.message }
  } else {
    const { error } = await supabase.from('addresses').insert(payload)
    if (error) return { error: error.message }
  }

  revalidatePath('/account/addresses')
  return { success: true }
}

export async function deleteAddress(addressId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not logged in' }

  await supabase.from('addresses').delete().eq('id', addressId).eq('user_id', user.id)
  revalidatePath('/account/addresses')
}

// ============================================
// ORDER ACTIONS
// ============================================

export async function placeOrder(
  items: { productId: string; productName: string; productPrice: number; quantity: number }[],
  address: { name: string; phone: string; line1: string; line2: string; city: string; state: string; pincode: string },
  paymentMethod: string,
  subtotal: number,
  shipping: number,
  discount: number,
  couponCode?: string,
  couponId?: string,
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const total = subtotal + shipping - discount
  const orderNumber = `SC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`

  const { data: order, error } = await supabase.from('orders').insert({
    order_number: orderNumber,
    user_id: user?.id ?? null,
    subtotal,
    discount,
    shipping,
    total,
    coupon_id: couponId ?? null,
    coupon_code: couponCode ?? null,
    order_status: 'pending',
    payment_status: paymentMethod === 'cod' ? 'pending' : 'paid',
    payment_method: paymentMethod,
    shipping_name: address.name,
    shipping_phone: address.phone,
    shipping_address: `${address.line1}${address.line2 ? ', ' + address.line2 : ''}`,
    shipping_city: address.city,
    shipping_state: address.state,
    shipping_pincode: address.pincode,
  }).select().single()

  if (error) return { error: error.message }

  // Insert order items
  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.productName,
    product_price: item.productPrice,
    quantity: item.quantity,
  }))
  await supabase.from('order_items').insert(orderItems)

  // Increment coupon usage
  if (couponId) {
    await supabase.rpc('increment_coupon_usage', { coupon_id: couponId })
  }

  return { orderId: order.id, orderNumber: order.order_number }
}

// ============================================
// COUPON VALIDATION
// ============================================

export async function validateCoupon(code: string, subtotal: number) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('is_active', true)
    .single()

  if (error || !data) return { error: 'Invalid coupon code' }

  const coupon = data as Coupon
  const now = new Date()
  if (coupon.expires_at && new Date(coupon.expires_at) < now) return { error: 'Coupon has expired' }
  if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) return { error: 'Coupon usage limit reached' }
  if (subtotal < coupon.min_order) return { error: `Minimum order ₹${coupon.min_order} required` }

  let discount = coupon.type === 'flat' ? coupon.value : Math.floor((subtotal * coupon.value) / 100)
  if (coupon.max_discount) discount = Math.min(discount, coupon.max_discount)

  return { coupon, discount }
}

// ============================================
// WISHLIST ACTIONS
// ============================================

export async function toggleWishlist(productId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not logged in' }

  const { data: existing } = await supabase
    .from('wishlist_items')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .single()

  if (existing) {
    await supabase.from('wishlist_items').delete().eq('id', existing.id)
    revalidatePath('/account/wishlist')
    return { wishlisted: false }
  } else {
    await supabase.from('wishlist_items').insert({ user_id: user.id, product_id: productId })
    revalidatePath('/account/wishlist')
    return { wishlisted: true }
  }
}

// ============================================
// ADMIN: PRODUCT ACTIONS
// ============================================

export async function adminUpsertProduct(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  const payload = {
    name: formData.get('name') as string,
    slug: (formData.get('name') as string).toLowerCase().replace(/\s+/g, '-'),
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    compare_price: formData.get('compare_price') ? Number(formData.get('compare_price')) : null,
    category: formData.get('category') as Product['category'],
    image_url: formData.get('image_url') as string || '/placeholder.svg',
    weight: formData.get('weight') as string,
    servings: formData.get('servings') as string,
    prep_time: formData.get('prep_time') as string,
    ingredients: formData.get('ingredients') as string,
    instructions: formData.get('instructions') as string,
    tags: (formData.get('tags') as string).split(',').map((t: string) => t.trim()).filter(Boolean),
    in_stock: formData.get('in_stock') === 'on',
    is_featured: formData.get('is_featured') === 'on',
    updated_at: new Date().toISOString(),
  }

  if (id) {
    await supabase.from('products').update(payload).eq('id', id)
  } else {
    await supabase.from('products').insert({ ...payload, sort_order: 0 })
  }

  revalidatePath('/admin/products')
  revalidatePath('/shop')
  revalidatePath('/')
}

export async function adminDeleteProduct(id: string) {
  const supabase = await createClient()
  await supabase.from('products').delete().eq('id', id)
  revalidatePath('/admin/products')
  revalidatePath('/shop')
}

// ============================================
// ADMIN: ORDER STATUS
// ============================================

export async function adminUpdateOrderStatus(orderId: string, status: OrderStatus, trackingNumber?: string) {
  const supabase = await createClient()
  const update: Record<string, string> = { order_status: status, updated_at: new Date().toISOString() }
  if (trackingNumber) update.tracking_number = trackingNumber
  await supabase.from('orders').update(update).eq('id', orderId)
  revalidatePath('/admin/orders')
}

// ============================================
// ADMIN: HERO SETTINGS
// ============================================

export async function adminSaveHeroSettings(productIds: string[]) {
  const supabase = await createClient()
  await supabase.from('products').update({ is_featured: false })
  if (productIds.length > 0) {
    await supabase.from('products').update({ is_featured: true }).in('id', productIds)
  }
  revalidatePath('/')
  return { success: true }
}

// ============================================
// ADMIN: COUPON ACTIONS
// ============================================

export async function adminUpsertCoupon(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  const payload = {
    code: (formData.get('code') as string).toUpperCase(),
    type: formData.get('type') as 'percentage' | 'flat',
    value: Number(formData.get('value')),
    min_order: Number(formData.get('min_order') || 0),
    max_discount: formData.get('max_discount') ? Number(formData.get('max_discount')) : null,
    usage_limit: formData.get('usage_limit') ? Number(formData.get('usage_limit')) : null,
    expires_at: formData.get('expires_at') || null,
    is_active: formData.get('is_active') === 'on',
  }

  if (id) {
    await supabase.from('coupons').update(payload).eq('id', id)
  } else {
    await supabase.from('coupons').insert({ ...payload, used_count: 0 })
  }

  revalidatePath('/admin/coupons')
}

export async function adminDeleteCoupon(id: string) {
  const supabase = await createClient()
  await supabase.from('coupons').delete().eq('id', id)
  revalidatePath('/admin/coupons')
}
