'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart-store'
import { INDIAN_STATES } from '@/lib/constants'
import { ArrowLeft, MapPin, CreditCard, Package } from 'lucide-react'
import Navbar from '@/components/navbar'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getSubtotal, getShipping, getTotal, clearCart } = useCartStore()
  const [step, setStep] = useState(1)
  const [address, setAddress] = useState({ name: '', phone: '', line1: '', line2: '', city: '', state: 'Maharashtra', pincode: '' })
  const [payment, setPayment] = useState('upi')

  if (items.length === 0) {
    return (
      <><Navbar /><div className="min-h-screen pt-24 text-center" style={{background:'#FFF9ED'}}>
        <p className="text-xl font-black text-[#995424]">Your cart is empty</p>
        <Link href="/shop" className="text-[#F47B40] font-bold mt-4 inline-block">← Go to Shop</Link>
      </div></>
    )
  }

  const handlePlaceOrder = () => {
    const orderId = `SC-2026-${String(Math.floor(Math.random()*900)+100)}`
    clearCart()
    router.push(`/order-success?id=${orderId}`)
  }

  const steps = [
    { num: 1, label: 'Address', icon: MapPin },
    { num: 2, label: 'Payment', icon: CreditCard },
    { num: 3, label: 'Review', icon: Package },
  ]

  return (
    <><Navbar />
      <div className="min-h-screen pt-20" style={{ background: '#FFF9ED' }}>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-bold text-[#995424] hover:text-[#F47B40] mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>
          <h1 className="text-3xl font-black text-[#1e0f00] mb-8">Checkout</h1>

          {/* Steps */}
          <div className="flex items-center gap-2 mb-10">
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.num} className="flex items-center gap-2 flex-1">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${step >= s.num ? 'bg-[#F47B40] border-[#1e0f00] text-white' : 'bg-white border-[#995424]/20 text-[#995424]/40'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-bold hidden sm:block ${step >= s.num ? 'text-[#1e0f00]' : 'text-[#995424]/40'}`}>{s.label}</span>
                  {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${step > s.num ? 'bg-[#F47B40]' : 'bg-[#995424]/10'}`} />}
                </div>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Step 1: Address */}
              {step === 1 && (
                <div className="bg-white border-2 border-[#1e0f00] rounded-2xl p-6 shadow-[4px_4px_0_#1e0f00]" style={{borderWidth:2.5}}>
                  <h2 className="font-black text-[#1e0f00] mb-5">📍 Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-xs font-bold text-[#995424] mb-1 block">Full Name</label><input value={address.name} onChange={e => setAddress({...address, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" /></div>
                      <div><label className="text-xs font-bold text-[#995424] mb-1 block">Phone</label><input value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" /></div>
                    </div>
                    <div><label className="text-xs font-bold text-[#995424] mb-1 block">Address Line 1</label><input value={address.line1} onChange={e => setAddress({...address, line1: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" /></div>
                    <div><label className="text-xs font-bold text-[#995424] mb-1 block">Address Line 2</label><input value={address.line2} onChange={e => setAddress({...address, line2: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" /></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div><label className="text-xs font-bold text-[#995424] mb-1 block">City</label><input value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" /></div>
                      <div><label className="text-xs font-bold text-[#995424] mb-1 block">State</label>
                        <select value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]">
                          {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div><label className="text-xs font-bold text-[#995424] mb-1 block">Pincode</label><input value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" /></div>
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className="mt-6 bg-[#F47B40] text-white font-black py-3 px-8 rounded-full border-2 border-[#1e0f00] shadow-[3px_3px_0_#1e0f00] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_#1e0f00] transition-all" style={{borderWidth:2.5}}>
                    Continue to Payment →
                  </button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="bg-white border-2 border-[#1e0f00] rounded-2xl p-6 shadow-[4px_4px_0_#1e0f00]" style={{borderWidth:2.5}}>
                  <h2 className="font-black text-[#1e0f00] mb-5">💳 Payment Method</h2>
                  <div className="space-y-3">
                    {[{v:'upi',l:'UPI (Google Pay, PhonePe)',e:'📱'},{v:'card',l:'Credit / Debit Card',e:'💳'},{v:'netbanking',l:'Net Banking',e:'🏦'},{v:'cod',l:'Cash on Delivery',e:'💵'}].map(m => (
                      <label key={m.v} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${payment === m.v ? 'border-[#F47B40] bg-[#F47B40]/5' : 'border-[#995424]/10 hover:border-[#995424]/30'}`}>
                        <input type="radio" name="payment" value={m.v} checked={payment === m.v} onChange={() => setPayment(m.v)} className="accent-[#F47B40]" />
                        <span className="text-xl">{m.e}</span>
                        <span className="text-sm font-bold text-[#1e0f00]">{m.l}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(1)} className="px-6 py-3 rounded-full border-2 border-[#995424] text-[#995424] font-bold text-sm">← Back</button>
                    <button onClick={() => setStep(3)} className="bg-[#F47B40] text-white font-black py-3 px-8 rounded-full border-2 border-[#1e0f00] shadow-[3px_3px_0_#1e0f00] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all" style={{borderWidth:2.5}}>
                      Review Order →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="bg-white border-2 border-[#1e0f00] rounded-2xl p-6 shadow-[4px_4px_0_#1e0f00]" style={{borderWidth:2.5}}>
                  <h2 className="font-black text-[#1e0f00] mb-5">📦 Review & Place Order</h2>
                  <div className="bg-[#FFF9ED] rounded-xl p-4 mb-4">
                    <p className="text-xs font-bold text-[#995424] mb-1">SHIPPING TO</p>
                    <p className="text-sm font-bold text-[#1e0f00]">{address.name || 'Your Name'}</p>
                    <p className="text-xs text-[#7a4a20]">{address.line1} {address.line2}</p>
                    <p className="text-xs text-[#7a4a20]">{address.city}, {address.state} - {address.pincode}</p>
                  </div>
                  <div className="bg-[#FFF9ED] rounded-xl p-4 mb-4">
                    <p className="text-xs font-bold text-[#995424] mb-1">PAYMENT</p>
                    <p className="text-sm font-bold text-[#1e0f00] capitalize">{payment === 'upi' ? 'UPI' : payment === 'cod' ? 'Cash on Delivery' : payment}</p>
                  </div>
                  <div className="space-y-2 mb-4">
                    {items.map(i => (
                      <div key={i.product.id} className="flex justify-between text-sm"><span className="text-[#5a3010]">{i.product.name} × {i.quantity}</span><span className="font-bold">₹{i.product.price * i.quantity}</span></div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(2)} className="px-6 py-3 rounded-full border-2 border-[#995424] text-[#995424] font-bold text-sm">← Back</button>
                    <button onClick={handlePlaceOrder} className="bg-[#16703A] text-white font-black py-3 px-8 rounded-full border-2 border-[#1e0f00] shadow-[3px_3px_0_#1e0f00] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all" style={{borderWidth:2.5}}>
                      Place Order ₹{getTotal()} →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border-2 border-[#995424]/20 rounded-2xl p-5 sticky top-24">
                <h3 className="font-black text-[#1e0f00] mb-4 text-sm">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  {items.map(i => <div key={i.product.id} className="flex justify-between"><span className="text-[#7a4a20]">{i.product.name} ×{i.quantity}</span><span className="font-bold">₹{i.product.price * i.quantity}</span></div>)}
                </div>
                <div className="border-t border-[#995424]/10 mt-4 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-[#7a4a20]">Subtotal</span><span className="font-bold">₹{getSubtotal()}</span></div>
                  <div className="flex justify-between"><span className="text-[#7a4a20]">Shipping</span><span className="font-bold">{getShipping() === 0 ? 'Free' : `₹${getShipping()}`}</span></div>
                </div>
                <div className="border-t border-[#995424]/10 mt-4 pt-4 flex justify-between">
                  <span className="font-black text-[#1e0f00]">Total</span>
                  <span className="font-black text-xl text-[#DD2D2B]">₹{getTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
