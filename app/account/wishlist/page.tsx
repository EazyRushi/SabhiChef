'use client'

import { useState } from 'react'
import Link from 'next/link'
import { products } from '@/lib/products'
import { useCartStore } from '@/lib/store/cart-store'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(products.slice(0, 4))
  const addItem = useCartStore(s => s.addItem)

  const removeFromWishlist = (id: string) => setWishlist(wishlist.filter(p => p.id !== id))
  const moveToCart = (product: typeof products[0]) => {
    addItem(product)
    removeFromWishlist(product.id)
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-[#1e0f00] mb-6">My Wishlist ❤️</h1>
      {wishlist.length === 0 ? (
        <div className="text-center py-16 bg-white border-2 border-[#995424]/10 rounded-2xl">
          <Heart className="w-12 h-12 mx-auto text-[#995424]/20 mb-4" />
          <p className="font-bold text-[#995424]">Your wishlist is empty</p>
          <Link href="/shop" className="text-sm font-bold text-[#F47B40] hover:underline mt-2 inline-block">Browse Products →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishlist.map(product => (
            <div key={product.id} className="bg-white border-2 border-[#1e0f00] rounded-2xl p-4 shadow-[3px_3px_0_#1e0f00] flex gap-4" style={{borderWidth:2.5}}>
              <Link href={`/product/${product.id}`} className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#FEE472]/30 to-[#F47B40]/20 flex items-center justify-center text-3xl flex-shrink-0">
                {product.category === 'breakfast' ? '🌅' : product.category === 'meals' ? '🍲' : '🍰'}
              </Link>
              <div className="flex-1">
                <Link href={`/product/${product.id}`} className="font-black text-sm text-[#1e0f00] hover:text-[#F47B40]">{product.name}</Link>
                <p className="text-xs text-[#7a4a20] mt-0.5">{product.weight}</p>
                <p className="text-lg font-black text-[#16703A] mt-1">₹{product.price}</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => moveToCart(product)} className="flex items-center gap-1 text-xs font-bold text-white bg-[#F47B40] px-3 py-1.5 rounded-lg hover:bg-[#DD2D2B] transition">
                    <ShoppingCart className="w-3 h-3" /> Move to Cart
                  </button>
                  <button onClick={() => removeFromWishlist(product.id)} className="p-1.5 rounded-lg text-[#DD2D2B]/40 hover:text-[#DD2D2B] hover:bg-red-50 transition">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
