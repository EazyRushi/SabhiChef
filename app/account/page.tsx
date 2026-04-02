'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

export default function ProfilePage() {
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({ name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43210' })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-[#1e0f00] mb-6">My Profile</h1>
      <div className="bg-white border-2 border-[#1e0f00] rounded-2xl p-6 shadow-[4px_4px_0_#1e0f00]" style={{borderWidth:2.5}}>
        <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-[#995424]/10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FEE472] to-[#F47B40] flex items-center justify-center text-xl font-black text-[#1e0f00]">PS</div>
          <div>
            <p className="font-black text-lg text-[#1e0f00]">{profile.name}</p>
            <p className="text-sm text-[#7a4a20]">Member since November 2025</p>
          </div>
        </div>
        <form onSubmit={handleSave} className="space-y-4 max-w-lg">
          <div>
            <label className="text-xs font-bold text-[#995424] uppercase tracking-wider mb-1 block">Full Name</label>
            <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" />
          </div>
          <div>
            <label className="text-xs font-bold text-[#995424] uppercase tracking-wider mb-1 block">Email</label>
            <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" />
          </div>
          <div>
            <label className="text-xs font-bold text-[#995424] uppercase tracking-wider mb-1 block">Phone</label>
            <input value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" />
          </div>
          <button type="submit" className={`flex items-center gap-2 font-black py-3 px-6 rounded-full border-2 transition-all ${
            saved ? 'bg-[#16703A] text-white border-[#1e0f00]' : 'bg-[#F47B40] text-white border-[#1e0f00] shadow-[3px_3px_0_#1e0f00] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_#1e0f00]'
          }`} style={{borderWidth:2.5}}>
            {saved ? <><Check className="w-4 h-4" /> Saved!</> : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}
