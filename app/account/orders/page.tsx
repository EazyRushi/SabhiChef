'use client'

import Link from 'next/link'
import { mockOrders } from '@/lib/mock-data'
import { Package, Eye, RotateCcw } from 'lucide-react'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-orange-100 text-orange-700',
  preparing: 'bg-orange-100 text-orange-700',
  packed: 'bg-lime-100 text-lime-700',
  shipped: 'bg-green-100 text-green-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  refunded: 'bg-purple-100 text-purple-700',
}

export default function UserOrders() {
  // Show orders for user u1 (Priya)
  const orders = mockOrders.filter(o => o.user_id === 'u1')

  return (
    <div>
      <h1 className="text-2xl font-black text-[#1e0f00] mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white border-2 border-[#995424]/10 rounded-2xl">
          <Package className="w-12 h-12 mx-auto text-[#995424]/20 mb-4" />
          <p className="font-bold text-[#995424]">No orders yet</p>
          <Link href="/shop" className="text-sm font-bold text-[#F47B40] hover:underline mt-2 inline-block">Start Shopping →</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white border-2 border-[#1e0f00] rounded-2xl p-5 shadow-[3px_3px_0_#1e0f00]" style={{borderWidth:2.5}}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-black text-[#1e0f00]">{order.order_number}</p>
                  <p className="text-xs text-[#7a4a20] mt-0.5">{new Date(order.created_at || '').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${statusColors[order.order_status] || ''}`}>{order.order_status}</span>
              </div>
              <div className="space-y-1 mb-3">
                {order.items?.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[#5a3010]">{item.product_name} × {item.quantity}</span>
                    <span className="font-bold text-[#1e0f00]">₹{item.product_price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#995424]/10">
                <span className="text-lg font-black text-[#DD2D2B]">₹{order.total}</span>
                <div className="flex gap-2">
                  <Link href={`/track/${order.order_number}`}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#F47B40] bg-[#F47B40]/10 px-3 py-1.5 rounded-lg hover:bg-[#F47B40]/20 transition">
                    <Eye className="w-3 h-3" /> Track
                  </Link>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-[#16703A] bg-[#16703A]/10 px-3 py-1.5 rounded-lg hover:bg-[#16703A]/20 transition">
                    <RotateCcw className="w-3 h-3" /> Reorder
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
