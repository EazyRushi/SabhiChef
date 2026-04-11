import { getUserAddresses } from '@/lib/supabase/queries'
import { getCurrentUser } from '@/lib/supabase/queries'
import CheckoutClient from './CheckoutClient'

export default async function CheckoutPage() {
  const user = await getCurrentUser()
  const savedAddresses = user ? await getUserAddresses() : []
  return <CheckoutClient savedAddresses={savedAddresses} />
}
