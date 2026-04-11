import { getUserWishlist, getCurrentUser } from '@/lib/supabase/queries'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import WishlistClient from './WishlistClient'

export default async function WishlistPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  const wishlist = await getUserWishlist()
  return <WishlistClient wishlist={wishlist} />
}
