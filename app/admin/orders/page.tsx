import { adminGetAllOrders } from '@/lib/supabase/queries'
import AdminOrdersClient from './OrdersClient'

export const revalidate = 0

export default async function AdminOrdersPage() {
  const orders = await adminGetAllOrders()
  return <AdminOrdersClient orders={orders} />
}
