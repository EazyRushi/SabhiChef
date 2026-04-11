import { adminGetDashboardStats, adminGetRevenueChart, adminGetTopProducts, adminGetCategoryBreakdown, adminGetAllOrders } from '@/lib/supabase/queries'
import AdminDashboardClient from './DashboardClient'

export const revalidate = 60

export default async function AdminDashboard() {
  const [stats, revenueData, topProducts, categoryBreakdown, recentOrders] = await Promise.all([
    adminGetDashboardStats(),
    adminGetRevenueChart(),
    adminGetTopProducts(),
    adminGetCategoryBreakdown(),
    adminGetAllOrders(),
  ])

  return (
    <AdminDashboardClient
      stats={stats}
      revenueData={revenueData}
      topProducts={topProducts}
      categoryBreakdown={categoryBreakdown}
      recentOrders={recentOrders.slice(0, 5)}
    />
  )
}
