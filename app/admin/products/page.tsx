import { getProducts } from '@/lib/supabase/queries'
import AdminProductsClient from './ProductsClient'

export const revalidate = 0

export default async function AdminProductsPage() {
  const products = await getProducts()
  return <AdminProductsClient products={products} />
}
