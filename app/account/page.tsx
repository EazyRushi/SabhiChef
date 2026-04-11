import { getCurrentProfile } from '@/lib/supabase/queries'
import { redirect } from 'next/navigation'
import ProfileClient from './ProfileClient'

export default async function ProfilePage() {
  const profile = await getCurrentProfile()
  if (!profile) redirect('/login')
  return <ProfileClient profile={profile} />
}
