'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import { toggleWishlist } from '@/lib/supabase/actions'
import { useCartStore } from '@/lib/store/cart-store'
import type { WishlistItem } from '@/lib/types'
import { useRouter } from 'next/navigation'

export default function WishlistClient({ wishlist: initial }: { wishlist: WishlistItem[] }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(initial)
  const addItem = useCartStore(s => s.addItem)
  const router = useRouter()

  const handleRemove = async (productId: string) => {
    setWishlist(prev => prev.filter(w => w.product_id !== productId))
    await toggleWishlist(productId)
    router.refresh()
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-[#1e0f00] mb-6">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="text-center py-16 bg-white border-2 border-[#995424]/10 rounded-2xl">
          <Heart className="w-12 h-12 mx-auto text-[#995424]/20 mb-4" />
          <p className="font-bold text-[#995424]">Your wishlist is empty</p>
          <Link href="/shop" className="text-sm font-bold text-[#F47B40] hover:underline mt-2 inline-block">Explore Products →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishlist.map(item => {
            const product = item.product
            if (!product) return null
            return (
              <div key={item.id} className="bg-white border-2 border-[#1e0f00] rounded-2xl p-4 shadow-[3px_3px_0_#1e0f00] flex gap-4" style={{ borderWidth: 2.5 }}>
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#FEE472]/30 to-[#F47B40]/20 flex items-center justify-center text-3xl flex-shrink-0">
                  {product.image_url && !product.image_url.includes('placeholder') ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    product.category === 'breakfast' ? '🌅' : product.category === 'meals' ? '🍲' : product.category === 'sweet' ? '🍰' : '🌿'
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${product.id}`}>
                    <p className="font-black text-[#1e0f00] hover:text-[#F47B40] transition truncate">{product.name}</p>
                  </Link>
                  <p className="text-xs text-[#7a4a20] font-semibold mt-0.5">{product.weight}</p>
                  <p className="text-lg font-black text-[#16703A] mt-1">₹{product.price}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => addItem(product)} className="flex items-center gap-1.5 text-xs font-bold bg-[#F47B40] text-white px-3 py-1.5 rounded-lg border border-[#1e0f00]">
                      <ShoppingCart className="w-3 h-3" /> Add to Cart
                    </button>
                    <button onClick={() => handleRemove(product.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition">
                      <Trash2 className="w-4 h-4 text-[#DD2D2B]" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
