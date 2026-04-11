import { getProducts } from '@/lib/supabase/queries'
import HeroSettingsClient from './HeroSettingsClient'

export const revalidate = 0

export default async function HeroSettingsPage() {
  const products = await getProducts()
  return <HeroSettingsClient products={products} />
}
