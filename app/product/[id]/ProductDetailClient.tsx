'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart-store'
import { ArrowLeft, ShoppingCart, Star, Minus, Plus, Check, Clock, Users, Weight } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import type { Product, Review } from '@/lib/types'

const CATEGORY_EMOJI: Record<string, string> = {
  breakfast: '🌅', meals: '🍲', sweet: '🍰', condiment: '🌿', beverage: '☕', snack: '🥜'
}

interface Props {
  product: Product
  reviews: Review[]
  related: Product[]
}

export default function ProductDetailClient({ product, reviews, related }: Props) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore(s => s.addItem)
  const itemCount = useCartStore(s => s.getItemCount())

  const avgRating = reviews.length > 0 ? reviews.reduce((t, r) => t + r.rating, 0) / reviews.length : 0

  const handleAdd = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <><Navbar />
      <div className="min-h-screen pt-20" style={{ background: '#FFF9ED' }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-[#995424] hover:text-[#F47B40]">
              <ArrowLeft className="w-4 h-4" /> Back to Shop
            </Link>
            <Link href="/cart" className="relative flex items-center gap-2 bg-[#DD2D2B] text-white font-bold text-sm px-4 py-2 rounded-full border-2 border-[#1e0f00]">
              <ShoppingCart className="w-4 h-4" />
              {itemCount > 0 && <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#FEE472] text-[#1e0f00] text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#1e0f00]">{itemCount}</span>}
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="bg-white border-3 border-[#1e0f00] rounded-3xl overflow-hidden shadow-[6px_6px_0_#1e0f00] aspect-square flex items-center justify-center" style={{ borderWidth: 3, background: 'linear-gradient(135deg, #FEE47220, #F47B4020)' }}>
              {product.image_url && !product.image_url.includes('placeholder') ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-8xl">{CATEGORY_EMOJI[product.category] || '🍽️'}</span>
              )}
            </div>

            {/* Details */}
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#F47B40]">{product.category}</span>
              <h1 className="text-3xl font-black text-[#1e0f00] mt-2">{product.name}</h1>

              {reviews.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= avgRating ? 'fill-[#FEE472] text-[#FEE472]' : 'text-[#995424]/20'}`} />)}</div>
                  <span className="text-xs font-bold text-[#995424]">{avgRating.toFixed(1)} ({reviews.length} reviews)</span>
                </div>
              )}

              {!product.in_stock && (
                <span className="inline-block mt-3 px-3 py-1 bg-[#DD2D2B]/10 text-[#DD2D2B] text-xs font-black rounded-full">Out of Stock</span>
              )}

              <p className="text-[#5a3010] font-semibold mt-4 leading-relaxed">{product.description}</p>

              <div className="flex gap-4 mt-6 flex-wrap">
                <div className="flex items-center gap-2 bg-white border-2 border-[#995424]/20 rounded-xl px-4 py-2">
                  <Weight className="w-4 h-4 text-[#995424]" /><span className="text-sm font-bold text-[#995424]">{product.weight}</span>
                </div>
                <div className="flex items-center gap-2 bg-white border-2 border-[#995424]/20 rounded-xl px-4 py-2">
                  <Users className="w-4 h-4 text-[#995424]" /><span className="text-sm font-bold text-[#995424]">{product.servings}</span>
                </div>
                <div className="flex items-center gap-2 bg-white border-2 border-[#995424]/20 rounded-xl px-4 py-2">
                  <Clock className="w-4 h-4 text-[#995424]" /><span className="text-sm font-bold text-[#995424]">{product.prep_time}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.map(tag => (
                  <span key={tag} className="bg-[#FEE472]/40 border border-[#995424]/20 rounded-full px-3 py-1 text-xs font-bold text-[#995424] capitalize">{tag}</span>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-6">
                <div>
                  <span className="text-3xl font-black text-[#16703A]">₹{product.price}</span>
                  {product.compare_price && <span className="ml-2 text-sm text-[#995424]/50 line-through">₹{product.compare_price}</span>}
                </div>
                <div className="flex items-center border-2 border-[#1e0f00] rounded-full overflow-hidden">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center bg-[#FEE472] hover:bg-[#F47B40] hover:text-white transition"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center font-black">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center bg-[#FEE472] hover:bg-[#F47B40] hover:text-white transition"><Plus className="w-4 h-4" /></button>
                </div>
              </div>

              <button onClick={handleAdd} disabled={!product.in_stock}
                className={`mt-6 flex items-center gap-3 font-black text-lg px-8 py-4 rounded-full border-3 transition-all disabled:opacity-40 ${
                  added
                    ? 'bg-[#16703A] text-white border-[#1e0f00] shadow-[4px_4px_0_#1e0f00]'
                    : 'bg-[#DD2D2B] text-white border-[#1e0f00] shadow-[5px_5px_0_#1e0f00] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[8px_8px_0_#1e0f00]'
                }`} style={{ borderWidth: 3 }}>
                {added ? <><Check className="w-5 h-5" /> Added!</> : <><ShoppingCart className="w-5 h-5" /> Add to Cart — ₹{product.price * qty}</>}
              </button>
            </div>
          </div>

          {/* Ingredients & Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {product.ingredients && (
              <div className="bg-white border-2 border-[#995424]/20 rounded-2xl p-6">
                <h3 className="font-black text-[#1e0f00] mb-3">🥘 Ingredients</h3>
                <p className="text-sm text-[#5a3010] font-semibold leading-relaxed">{product.ingredients}</p>
              </div>
            )}
            {product.instructions && (
              <div className="bg-white border-2 border-[#995424]/20 rounded-2xl p-6">
                <h3 className="font-black text-[#1e0f00] mb-3">📖 How to Cook</h3>
                <div className="space-y-2">
                  {product.instructions.split('\n').map((step, i) => (
                    <p key={i} className="text-sm text-[#5a3010] font-semibold">{step}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reviews */}
          {reviews.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-black text-[#1e0f00] mb-6">Customer Reviews</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map(r => (
                  <div key={r.id} className="bg-white border-2 border-[#995424]/10 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className={`w-3.5 h-3.5 ${i <= r.rating ? 'fill-[#FEE472] text-[#FEE472]' : 'text-gray-200'}`} />)}</div>
                    </div>
                    <p className="text-sm text-[#5a3010] font-semibold">{r.comment}</p>
                    <p className="text-xs text-[#995424] font-bold mt-2">— {r.profile?.name || 'Customer'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-black text-[#1e0f00] mb-6">You Might Also Like</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {related.map(p => (
                  <Link key={p.id} href={`/product/${p.id}`} className="bg-white border-2 border-[#1e0f00] rounded-xl p-4 shadow-[3px_3px_0_#1e0f00] hover:translate-y-[-3px] hover:shadow-[3px_6px_0_#1e0f00] transition-all">
                    <div className="text-3xl text-center mb-2">
                      {p.image_url && !p.image_url.includes('placeholder') ? (
                        <img src={p.image_url} alt={p.name} className="w-12 h-12 object-cover rounded-lg mx-auto" />
                      ) : (
                        CATEGORY_EMOJI[p.category] || '🍽️'
                      )}
                    </div>
                    <p className="text-sm font-black text-[#1e0f00]">{p.name}</p>
                    <p className="text-sm font-black text-[#16703A] mt-1">₹{p.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    <Footer /></>
  )
}
