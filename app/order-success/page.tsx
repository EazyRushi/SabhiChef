'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Package, Home } from 'lucide-react'
import Navbar from '@/components/navbar'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id') || 'SC-2026-XXX'

  return (
    <div className="max-w-lg mx-auto text-center px-6 py-24">
      <div className="w-20 h-20 rounded-full bg-[#16703A] flex items-center justify-center mx-auto mb-6 animate-bounce">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-3xl font-black text-[#1e0f00] mb-3">Order Placed! 🎉</h1>
      <p className="text-[#5a3010] font-semibold mb-2">Thank you for your order. We&apos;re preparing your homemade goodness!</p>
      <div className="bg-white border-3 border-[#1e0f00] rounded-2xl p-6 mt-8 shadow-[5px_5px_0_#1e0f00]" style={{borderWidth:3}}>
        <p className="text-xs font-bold text-[#995424] uppercase tracking-wider mb-2">Order Number</p>
        <p className="text-2xl font-black text-[#F47B40]">{orderId}</p>
        <p className="text-xs text-[#7a4a20] font-semibold mt-3">You&apos;ll receive a confirmation on WhatsApp shortly.</p>
        <p className="text-xs text-[#7a4a20] font-semibold">Estimated delivery: 5–10 working days</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
        <Link href={`/track/${orderId}`} className="flex items-center justify-center gap-2 bg-[#F47B40] text-white font-black py-3 px-6 rounded-full border-2 border-[#1e0f00] shadow-[3px_3px_0_#1e0f00] hover:translate-y-[-2px] transition-all" style={{borderWidth:2.5}}>
          <Package className="w-4 h-4" /> Track Order
        </Link>
        <Link href="/" className="flex items-center justify-center gap-2 bg-white text-[#995424] font-bold py-3 px-6 rounded-full border-2 border-[#995424] hover:bg-[#FEE472] transition">
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <><Navbar />
      <div className="min-h-screen pt-20" style={{ background: '#FFF9ED' }}>
        <Suspense fallback={<div className="text-center py-24"><p className="text-[#995424] font-bold">Loading...</p></div>}>
          <OrderSuccessContent />
        </Suspense>
      </div>
    </>
  )
}
