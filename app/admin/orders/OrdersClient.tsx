'use client'

import { useState } from 'react'
import { ORDER_STATUSES } from '@/lib/constants'
import { Search, Eye, X, Package } from 'lucide-react'
import { adminUpdateOrderStatus } from '@/lib/supabase/actions'
import type { Order, OrderStatus } from '@/lib/types'
import { useRouter } from 'next/navigation'

export default function AdminOrdersClient({ orders: initial }: { orders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initial)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [trackingInput, setTrackingInput] = useState('')
  const router = useRouter()

  const filtered = orders.filter(o => {
    const matchSearch = o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.shipping_name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || o.order_status === statusFilter
    return matchSearch && matchStatus
  })

  const statusCounts: Record<string, number> = { all: orders.length }
  orders.forEach(o => { statusCounts[o.order_status] = (statusCounts[o.order_status] || 0) + 1 })

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, order_status: newStatus } : o))
    if (selectedOrder?.id === orderId) setSelectedOrder(s => s ? { ...s, order_status: newStatus } : s)
    await adminUpdateOrderStatus(orderId, newStatus)
    router.refresh()
  }

  const handleSaveTracking = async () => {
    if (!selectedOrder || !trackingInput) return
    await adminUpdateOrderStatus(selectedOrder.order_status, selectedOrder.order_status, trackingInput)
    setSelectedOrder(s => s ? { ...s, tracking_number: trackingInput } : s)
    setTrackingInput('')
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <div className="flex gap-2 flex-wrap">
          {['all', ...ORDER_STATUSES.map(s => s.value)].map(status => (
            <button key={status} onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 rounded-lg text-xs font-bold capitalize transition flex items-center gap-1.5 ${statusFilter === status ? 'bg-[#F47B40] text-white' : 'bg-white/5 text-white/40 hover:text-white/70'}`}>
              {status}
              {statusCounts[status] > 0 && <span className="bg-white/10 px-1.5 py-0.5 rounded-md text-[10px]">{statusCounts[status] || 0}</span>}
            </button>
          ))}
        </div>
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input type="text" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#F47B40]/50" />
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Order', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className={`${h === 'Actions' ? 'text-right' : 'text-left'} py-4 px-6 text-xs font-bold text-white/40 uppercase tracking-wider`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => {
                const statusConfig = ORDER_STATUSES.find(s => s.value === order.order_status)
                return (
                  <tr key={order.id} className="border-b border-white/[0.03] hover:bg-white/[0.03] transition">
                    <td className="py-4 px-6"><p className="text-sm font-bold text-white">{order.order_number}</p></td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-semibold text-white">{order.shipping_name}</p>
                      <p className="text-xs text-white/30">{order.shipping_city}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-white/60">{order.items?.length || 0} items</td>
                    <td className="py-4 px-6 text-sm font-bold text-white">₹{order.total}</td>
                    <td className="py-4 px-6">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${order.payment_status === 'paid' ? 'text-green-400 bg-green-400/10' : order.payment_status === 'refunded' ? 'text-purple-400 bg-purple-400/10' : 'text-yellow-400 bg-yellow-400/10'}`}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <select value={order.order_status} onChange={e => handleStatusUpdate(order.id, e.target.value as OrderStatus)}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none cursor-pointer"
                        style={{ color: statusConfig?.color }}>
                        {ORDER_STATUSES.map(s => <option key={s.value} value={s.value} style={{ color: '#fff', background: '#1a1a1a' }}>{s.label}</option>)}
                      </select>
                    </td>
                    <td className="py-4 px-6 text-xs text-white/40">
                      {new Date(order.created_at || '').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button onClick={() => { setSelectedOrder(order); setTrackingInput(order.tracking_number || '') }} className="p-2 rounded-lg hover:bg-white/10 transition text-white/40 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="py-12 text-center text-white/30 text-sm">No orders found</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-white/5 text-xs text-white/30">Showing {filtered.length} of {orders.length} orders</div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F47B40]/20 to-[#DD2D2B]/20 flex items-center justify-center"><Package className="w-5 h-5 text-[#F47B40]" /></div>
                <div>
                  <h3 className="text-lg font-black text-white">{selectedOrder.order_number}</h3>
                  <p className="text-xs text-white/40">{new Date(selectedOrder.created_at || '').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 rounded-lg hover:bg-white/10"><X className="w-5 h-5 text-white/40" /></button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/[0.03] rounded-xl p-4">
                <p className="text-xs text-white/40 font-bold mb-2">SHIPPING TO</p>
                <p className="text-sm font-bold text-white">{selectedOrder.shipping_name}</p>
                <p className="text-xs text-white/50 mt-1">{selectedOrder.shipping_phone}</p>
                <p className="text-xs text-white/50">{selectedOrder.shipping_address}</p>
                <p className="text-xs text-white/50">{selectedOrder.shipping_city}, {selectedOrder.shipping_state} – {selectedOrder.shipping_pincode}</p>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-4">
                <p className="text-xs text-white/40 font-bold mb-2">ORDER INFO</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-white/40">Payment:</span><span className="text-white font-bold">{selectedOrder.payment_method}</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Status:</span><span className="text-white font-bold capitalize">{selectedOrder.payment_status}</span></div>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-white/40 font-bold mb-1.5">TRACKING NUMBER</p>
                  <div className="flex gap-2">
                    <input value={trackingInput} onChange={e => setTrackingInput(e.target.value)}
                      placeholder="Enter tracking #"
                      className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#F47B40]/50" />
                    <button onClick={handleSaveTracking} className="px-3 py-1.5 bg-[#F47B40] text-white text-xs font-bold rounded-lg">Save</button>
                  </div>
                  {selectedOrder.tracking_number && <p className="text-xs text-green-400 mt-1">Current: {selectedOrder.tracking_number}</p>}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs text-white/40 font-bold mb-3">ITEMS</p>
              <div className="space-y-2">
                {selectedOrder.items?.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-white/[0.03] rounded-xl p-3">
                    <div>
                      <p className="text-sm font-bold text-white">{item.product_name}</p>
                      <p className="text-xs text-white/40">Qty: {item.quantity} × ₹{item.product_price}</p>
                    </div>
                    <p className="text-sm font-bold text-white">₹{item.quantity * item.product_price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-white/40">Subtotal</span><span className="text-white">₹{selectedOrder.subtotal}</span></div>
              {selectedOrder.discount > 0 && <div className="flex justify-between text-sm"><span className="text-green-400">Discount ({selectedOrder.coupon_code})</span><span className="text-green-400">–₹{selectedOrder.discount}</span></div>}
              <div className="flex justify-between text-sm"><span className="text-white/40">Shipping</span><span className="text-white">{selectedOrder.shipping === 0 ? 'Free' : `₹${selectedOrder.shipping}`}</span></div>
              <div className="flex justify-between text-lg font-black border-t border-white/5 pt-3 mt-2"><span className="text-white">Total</span><span className="text-[#F47B40]">₹{selectedOrder.total}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
