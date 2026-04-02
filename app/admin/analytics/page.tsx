'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { revenueData, topProducts, categoryBreakdown, mockOrders } from '@/lib/mock-data'
import { TrendingUp, ShoppingCart, Users, IndianRupee } from 'lucide-react'

const conversionData = [
  { month: 'Oct', visitors: 1200, buyers: 18 },
  { month: 'Nov', visitors: 2100, buyers: 35 },
  { month: 'Dec', visitors: 1800, buyers: 28 },
  { month: 'Jan', visitors: 1500, buyers: 22 },
  { month: 'Feb', visitors: 1900, buyers: 30 },
  { month: 'Mar', visitors: 2800, buyers: 42 },
]

const cityData = [
  { city: 'Pune', orders: 48 },
  { city: 'Mumbai', orders: 32 },
  { city: 'Delhi', orders: 24 },
  { city: 'Bangalore', orders: 18 },
  { city: 'Ahmedabad', orders: 12 },
  { city: 'Nagpur', orders: 8 },
]

export default function AdminAnalytics() {
  const avgOrderValue = Math.round(mockOrders.reduce((t, o) => t + o.total, 0) / mockOrders.length)

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Avg Order Value', value: `₹${avgOrderValue}`, icon: IndianRupee, color: '#16703A' },
          { label: 'Conversion Rate', value: '1.5%', icon: TrendingUp, color: '#F47B40' },
          { label: 'Repeat Customers', value: '23%', icon: Users, color: '#DD2D2B' },
          { label: 'Cart Abandonment', value: '62%', icon: ShoppingCart, color: '#D89339' },
        ].map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <div key={i} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5">
              <Icon className="w-5 h-5 mb-3" style={{ color: kpi.color }} />
              <p className="text-2xl font-black text-white">{kpi.value}</p>
              <p className="text-xs text-white/40 font-semibold mt-1">{kpi.label}</p>
            </div>
          )
        })}
      </div>

      {/* Revenue Trend */}
      <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white/70 mb-6">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
            <XAxis dataKey="month" tick={{ fill: '#ffffff40', fontSize: 12 }} axisLine={false} />
            <YAxis tick={{ fill: '#ffffff40', fontSize: 12 }} axisLine={false} />
            <Tooltip contentStyle={{ background: '#2a2a2a', border: '1px solid #ffffff10', borderRadius: 12, color: '#fff' }} />
            <Line type="monotone" dataKey="revenue" stroke="#F47B40" strokeWidth={3} dot={{ fill: '#F47B40', r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Top Products */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white/70 mb-6">Best Selling Products</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProducts} layout="vertical">
              <XAxis type="number" tick={{ fill: '#ffffff40', fontSize: 12 }} axisLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} width={110} />
              <Tooltip contentStyle={{ background: '#2a2a2a', border: '1px solid #ffffff10', borderRadius: 12, color: '#fff' }} />
              <Bar dataKey="sales" fill="#16703A" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Orders by City */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white/70 mb-6">Orders by City</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="city" tick={{ fill: '#ffffff40', fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: '#ffffff40', fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#2a2a2a', border: '1px solid #ffffff10', borderRadius: 12, color: '#fff' }} />
              <Bar dataKey="orders" fill="#FEE472" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Pie + Conversion */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white/70 mb-6">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={categoryBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                {categoryBreakdown.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#2a2a2a', border: '1px solid #ffffff10', borderRadius: 12, color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {categoryBreakdown.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-white/50">
                <div className="w-2 h-2 rounded-full" style={{ background: c.fill }} />
                {c.name} ({c.value}%)
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white/70 mb-6">Conversion Funnel</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="month" tick={{ fill: '#ffffff40', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: '#ffffff40', fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#2a2a2a', border: '1px solid #ffffff10', borderRadius: 12, color: '#fff' }} />
              <Bar dataKey="visitors" fill="#ffffff15" radius={[6, 6, 0, 0]} name="Visitors" />
              <Bar dataKey="buyers" fill="#DD2D2B" radius={[6, 6, 0, 0]} name="Buyers" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
