'use client'

import { TrendingUp, TrendingDown, Package, ShoppingCart, Users, IndianRupee } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { mockDashboardStats, mockOrders, revenueData, topProducts, categoryBreakdown } from '@/lib/mock-data'

const statusColors: Record<string, string> = {
  pending: '#D89339',
  confirmed: '#F47B40',
  preparing: '#F47B40',
  packed: '#B7C158',
  shipped: '#16703A',
  delivered: '#16703A',
  cancelled: '#DD2D2B',
  refunded: '#995424',
}

export default function AdminDashboard() {
  const stats = [
    {
      label: 'Total Revenue',
      value: `₹${mockDashboardStats.total_revenue.toLocaleString()}`,
      change: mockDashboardStats.revenue_change,
      icon: IndianRupee,
      gradient: 'from-[#16703A] to-[#0a4d25]',
    },
    {
      label: 'Total Orders',
      value: mockDashboardStats.total_orders,
      change: mockDashboardStats.orders_change,
      icon: ShoppingCart,
      gradient: 'from-[#F47B40] to-[#c45520]',
    },
    {
      label: 'Pending Orders',
      value: mockDashboardStats.pending_orders,
      change: null,
      icon: Package,
      gradient: 'from-[#D89339] to-[#a66f20]',
    },
    {
      label: 'Total Customers',
      value: mockDashboardStats.total_customers,
      change: null,
      icon: Users,
      gradient: 'from-[#DD2D2B] to-[#a81d1b]',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={i}
              className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                {stat.change !== null && (
                  <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                    stat.change > 0 ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
                  }`}>
                    {stat.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(stat.change)}%
                  </div>
                )}
              </div>
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-xs text-white/40 font-semibold mt-1">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white/70 mb-6">Revenue & Orders (6 months)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="month" tick={{ fill: '#ffffff40', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#ffffff40', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#2a2a2a', border: '1px solid #ffffff10', borderRadius: 12, color: '#fff' }}
              />
              <Bar dataKey="revenue" fill="#F47B40" radius={[6, 6, 0, 0]} name="Revenue (₹)" />
              <Bar dataKey="orders" fill="#FEE472" radius={[6, 6, 0, 0]} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white/70 mb-6">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {categoryBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#2a2a2a', border: '1px solid #ffffff10', borderRadius: 12, color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {categoryBreakdown.map((cat, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.fill }} />
                  <span className="text-white/60 font-semibold">{cat.name}</span>
                </div>
                <span className="text-white/80 font-bold">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Recent Orders */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white/70 mb-6">Recent Orders</h3>
          <div className="space-y-3">
            {mockOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition">
                <div>
                  <p className="text-sm font-bold text-white">{order.order_number}</p>
                  <p className="text-xs text-white/40">{order.shipping_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">₹{order.total}</p>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block"
                    style={{
                      color: statusColors[order.order_status] || '#999',
                      backgroundColor: (statusColors[order.order_status] || '#999') + '20',
                    }}
                  >
                    {order.order_status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white/70 mb-6">Top Selling Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F47B40]/20 to-[#DD2D2B]/20 flex items-center justify-center text-xs font-black text-[#F47B40]">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{product.name}</p>
                  <div className="w-full bg-white/5 rounded-full h-1.5 mt-2">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-[#F47B40] to-[#FEE472]"
                      style={{ width: `${(product.sales / topProducts[0].sales) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-white/60">{product.sales} sold</p>
                  <p className="text-xs text-white/40">₹{product.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
