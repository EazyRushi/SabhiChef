import { getProducts, getCurrentUser, getUserWishlistIds } from '@/lib/supabase/queries'
import ShopClient from './ShopClient'

export const revalidate = 60

export default async function ShopPage() {
  const [products, user] = await Promise.all([
    getProducts(),
    getCurrentUser(),
  ])
  const wishlistIds = user ? await getUserWishlistIds() : []

  return <ShopClient products={products} wishlistIds={wishlistIds} />
}
