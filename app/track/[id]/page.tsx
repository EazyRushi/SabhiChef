'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Package, CheckCircle, Truck, MapPin, Clock, Box } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const trackingSteps = [
  { status: 'pending', label: 'Order Placed', icon: Clock, desc: 'Your order has been received' },
  { status: 'confirmed', label: 'Confirmed', icon: CheckCircle, desc: 'Order confirmed & payment verified' },
  { status: 'preparing', label: 'Preparing', icon: Package, desc: 'Freshly cooking your items' },
  { status: 'packed', label: 'Packed', icon: Box, desc: 'Packed with love & care' },
  { status: 'shipped', label: 'Shipped', icon: Truck, desc: 'On the way to you' },
  { status: 'delivered', label: 'Delivered', icon: MapPin, desc: 'Delivered to your doorstep!' },
]

export default function TrackOrder() {
  const { id } = useParams()
  // Simulate a "shipped" status for demo
  const currentStatusIdx = 4 // shipped

  return (
    <><Navbar />
      <div className="min-h-screen pt-20" style={{ background: '#FFF9ED' }}>
        <div className="max-w-2xl mx-auto px-6 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#995424] hover:text-[#F47B40] mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-3xl font-black text-[#1e0f00] mb-2">Track Your Order</h1>
          <p className="text-sm text-[#7a4a20] font-semibold mb-8">Order ID: <span className="text-[#F47B40] font-black">{id}</span></p>

          <div className="bg-white border-3 border-[#1e0f00] rounded-2xl p-8 shadow-[5px_5px_0_#1e0f00]" style={{borderWidth:3}}>
            <div className="space-y-0">
              {trackingSteps.map((step, i) => {
                const Icon = step.icon
                const isCompleted = i <= currentStatusIdx
                const isCurrent = i === currentStatusIdx
                return (
                  <div key={step.status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-[#16703A] border-[#16703A] text-white'
                          : 'bg-white border-[#995424]/20 text-[#995424]/30'
                      } ${isCurrent ? 'ring-4 ring-[#16703A]/20 scale-110' : ''}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {i < trackingSteps.length - 1 && (
                        <div className={`w-0.5 h-12 ${i < currentStatusIdx ? 'bg-[#16703A]' : 'bg-[#995424]/10'}`} />
                      )}
                    </div>
                    <div className="pb-8">
                      <p className={`font-black text-sm ${isCompleted ? 'text-[#1e0f00]' : 'text-[#995424]/40'}`}>{step.label}</p>
                      <p className={`text-xs font-semibold mt-0.5 ${isCompleted ? 'text-[#5a3010]' : 'text-[#995424]/30'}`}>{step.desc}</p>
                      {isCurrent && <span className="inline-block mt-2 text-[10px] font-bold bg-[#16703A]/10 text-[#16703A] px-2 py-0.5 rounded-full">Current Status</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-[#FEE472] border-2 border-[#995424] rounded-2xl p-5 mt-6">
            <p className="text-sm font-bold text-[#995424]">📦 Tracking Number: <span className="text-[#1e0f00]">DTDC789012</span></p>
            <p className="text-xs text-[#7a4a20] font-semibold mt-1">Estimated delivery: 5–10 working days</p>
          </div>
        </div>
      </div>
    <Footer /></>
  )
}
