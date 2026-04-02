'use client'

import { useState } from 'react'
import { mockCustomers, mockOrders } from '@/lib/mock-data'
import { Search, Eye, X, ShoppingCart, Calendar } from 'lucide-react'
import type { Profile } from '@/lib/types'

export default function AdminCustomers() {
  const [search, setSearch] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Profile | null>(null)

  const customers = mockCustomers.filter(c => c.role === 'customer')

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search)
  )

  const getCustomerOrders = (userId: string) => mockOrders.filter(o => o.user_id === userId)
  const getCustomerSpend = (userId: string) => getCustomerOrders(userId).reduce((t, o) => t + o.total, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-white/40">{customers.length} registered customers</p>
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#F47B40]/50"
          />
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-4 px-6 text-xs font-bold text-white/40 uppercase tracking-wider">Customer</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-white/40 uppercase tracking-wider">Phone</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-white/40 uppercase tracking-wider">Orders</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-white/40 uppercase tracking-wider">Total Spent</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-white/40 uppercase tracking-wider">Joined</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-white/40 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(customer => {
                const orderCount = getCustomerOrders(customer.id).length
                const totalSpend = getCustomerSpend(customer.id)
                return (
                  <tr key={customer.id} className="border-b border-white/[0.03] hover:bg-white/[0.03] transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FEE472] to-[#F47B40] flex items-center justify-center text-xs font-black text-[#1e0f00]">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <p className="text-sm font-bold text-white">{customer.name}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-white/60">{customer.phone}</td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-bold text-white flex items-center gap-1.5">
                        <ShoppingCart className="w-3.5 h-3.5 text-white/30" />
                        {orderCount}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm font-bold text-[#16703A]">₹{totalSpend.toLocaleString()}</td>
                    <td className="py-4 px-6 text-xs text-white/40">
                      {new Date(customer.created_at || '').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="p-2 rounded-lg hover:bg-white/10 transition text-white/40 hover:text-white"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FEE472] to-[#F47B40] flex items-center justify-center text-sm font-black text-[#1e0f00]">
                  {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{selectedCustomer.name}</h3>
                  <p className="text-xs text-white/40">{selectedCustomer.phone}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="p-2 rounded-lg hover:bg-white/10 transition">
                <X className="w-5 h-5 text-white/40" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white/[0.03] rounded-xl p-4 text-center">
                <p className="text-xl font-black text-white">{getCustomerOrders(selectedCustomer.id).length}</p>
                <p className="text-[10px] text-white/40 font-bold uppercase">Orders</p>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-4 text-center">
                <p className="text-xl font-black text-[#16703A]">₹{getCustomerSpend(selectedCustomer.id).toLocaleString()}</p>
                <p className="text-[10px] text-white/40 font-bold uppercase">Total Spent</p>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-4 text-center">
                <p className="text-xl font-black text-white flex items-center justify-center gap-1"><Calendar className="w-4 h-4 text-white/30" /></p>
                <p className="text-[10px] text-white/40 font-bold uppercase">
                  {new Date(selectedCustomer.created_at || '').toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-white/40 font-bold mb-3">ORDER HISTORY</p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {getCustomerOrders(selectedCustomer.id).length === 0 ? (
                  <p className="text-sm text-white/30 text-center py-4">No orders yet</p>
                ) : (
                  getCustomerOrders(selectedCustomer.id).map(order => (
                    <div key={order.id} className="flex items-center justify-between bg-white/[0.03] rounded-xl p-3">
                      <div>
                        <p className="text-sm font-bold text-white">{order.order_number}</p>
                        <p className="text-xs text-white/30">{order.items?.length} items · {new Date(order.created_at || '').toLocaleDateString('en-IN')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">₹{order.total}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">{order.order_status}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
