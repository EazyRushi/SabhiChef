'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart-store'
import { Trash2, ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getShipping, getTotal } = useCartStore()

  return (
    <><Navbar />
      <div className="min-h-screen pt-20" style={{ background: '#FFF9ED' }}>
        <div className="max-w-5xl mx-auto px-6 py-12">
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-[#995424] hover:text-[#F47B40] mb-6">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
          <h1 className="text-3xl font-black text-[#1e0f00] mb-8">Your Cart 🛒</h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart className="w-16 h-16 mx-auto text-[#995424]/20 mb-4" />
              <p className="text-xl font-black text-[#995424]">Your cart is empty</p>
              <p className="text-sm text-[#7a4a20] mt-2 mb-6">Looks like you haven&apos;t added anything yet.</p>
              <Link href="/shop" className="bg-[#DD2D2B] text-white font-black px-6 py-3 rounded-full border-2 border-[#1e0f00] shadow-[4px_4px_0_#1e0f00] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#1e0f00] transition-all inline-block">
                Explore Products →
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map(item => (
                  <div key={item.product.id} className="bg-white border-2 border-[#1e0f00] rounded-2xl p-5 flex gap-4 shadow-[3px_3px_0_#1e0f00]" style={{borderWidth:2.5}}>
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#FEE472]/30 to-[#F47B40]/20 flex items-center justify-center text-3xl flex-shrink-0">
                      {item.product.category === 'breakfast' ? '🌅' : item.product.category === 'meals' ? '🍲' : item.product.category === 'sweet' ? '🍰' : '🌿'}
                    </div>
                    <div className="flex-1">
                      <Link href={`/product/${item.product.id}`} className="font-black text-[#1e0f00] hover:text-[#F47B40] transition">{item.product.name}</Link>
                      <p className="text-xs text-[#7a4a20] font-semibold mt-0.5">{item.product.weight} · {item.product.servings}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border-2 border-[#995424] rounded-full overflow-hidden">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center bg-[#FFF9ED] hover:bg-[#FEE472] transition"><Minus className="w-3 h-3" /></button>
                          <span className="w-8 text-center text-sm font-black">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-[#FFF9ED] hover:bg-[#FEE472] transition"><Plus className="w-3 h-3" /></button>
                        </div>
                        <span className="text-lg font-black text-[#16703A]">₹{item.product.price * item.quantity}</span>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="text-[#DD2D2B]/50 hover:text-[#DD2D2B] transition self-start">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white border-3 border-[#1e0f00] rounded-2xl p-6 shadow-[5px_5px_0_#1e0f00] sticky top-24" style={{borderWidth:3}}>
                  <h2 className="text-lg font-black text-[#1e0f00] mb-5">Order Summary</h2>
                  <div className="space-y-3 mb-5 pb-5 border-b-2 border-[#995424]/10">
                    <div className="flex justify-between text-sm"><span className="text-[#7a4a20] font-semibold">Subtotal</span><span className="font-bold text-[#1e0f00]">₹{getSubtotal()}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-[#7a4a20] font-semibold">Shipping</span><span className="font-bold text-[#1e0f00]">{getShipping() === 0 ? <span className="text-[#16703A]">Free!</span> : `₹${getShipping()}`}</span></div>
                  </div>
                  <div className="flex justify-between mb-6"><span className="font-black text-[#1e0f00]">Total</span><span className="text-2xl font-black text-[#DD2D2B]">₹{getTotal()}</span></div>
                  {getSubtotal() < 1500 && (
                    <p className="text-xs text-[#7a4a20] font-semibold mb-4 p-3 bg-[#FEE472]/30 rounded-xl">🚚 Add ₹{1500 - getSubtotal()} more for free shipping!</p>
                  )}
                  <Link href="/checkout" className="block text-center bg-[#DD2D2B] text-white font-black py-3 rounded-full border-2 border-[#1e0f00] shadow-[4px_4px_0_#1e0f00] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#1e0f00] transition-all" style={{borderWidth:2.5}}>
                    Proceed to Checkout →
                  </Link>
                  <Link href="/shop" className="block text-center text-sm font-bold text-[#995424] mt-3 hover:text-[#F47B40]">
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    <Footer /></>
  )
}
