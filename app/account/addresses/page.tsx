import { getUserAddresses, getCurrentUser } from '@/lib/supabase/queries'
import { redirect } from 'next/navigation'
import AddressesClient from './AddressesClient'

export default async function AddressesPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  const addresses = await getUserAddresses()
  return <AddressesClient addresses={addresses} />
}
