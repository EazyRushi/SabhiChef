'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, MapPin, Star, X } from 'lucide-react'
import { upsertAddress, deleteAddress } from '@/lib/supabase/actions'
import { INDIAN_STATES } from '@/lib/constants'
import type { Address } from '@/lib/types'
import { useRouter } from 'next/navigation'

export default function AddressesClient({ addresses: initial }: { addresses: Address[] }) {
  const [addresses, setAddresses] = useState<Address[]>(initial)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Address | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    if (editing) fd.append('id', editing.id)
    await upsertAddress(fd)
    setShowForm(false); setEditing(null); setLoading(false)
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id))
    await deleteAddress(id)
    router.refresh()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-[#1e0f00]">My Addresses</h1>
        <button onClick={() => { setEditing(null); setShowForm(true) }}
          className="flex items-center gap-2 bg-[#F47B40] text-white font-bold text-sm px-4 py-2 rounded-full border-2 border-[#1e0f00] shadow-[2px_2px_0_#1e0f00]" style={{ borderWidth: 2 }}>
          <Plus className="w-4 h-4" /> Add Address
        </button>
      </div>
      <div className="space-y-4">
        {addresses.map(addr => (
          <div key={addr.id} className="bg-white border-2 border-[#1e0f00] rounded-2xl p-5 shadow-[3px_3px_0_#1e0f00]" style={{ borderWidth: 2.5 }}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#F47B40]" />
                <span className="font-black text-sm text-[#1e0f00]">{addr.label}</span>
                {addr.is_default && <span className="flex items-center gap-1 text-[10px] font-bold text-[#16703A] bg-[#16703A]/10 px-2 py-0.5 rounded-full"><Star className="w-3 h-3" />Default</span>}
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditing(addr); setShowForm(true) }} className="p-1.5 rounded-lg hover:bg-[#FEE472] transition"><Pencil className="w-3.5 h-3.5 text-[#995424]" /></button>
                <button onClick={() => handleDelete(addr.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition"><Trash2 className="w-3.5 h-3.5 text-[#DD2D2B]" /></button>
              </div>
            </div>
            <p className="text-sm font-bold text-[#1e0f00]">{addr.full_name}</p>
            <p className="text-xs text-[#7a4a20] mt-0.5">{addr.address_line1}{addr.address_line2 ? `, ${addr.address_line2}` : ''}</p>
            <p className="text-xs text-[#7a4a20]">{addr.city}, {addr.state} – {addr.pincode}</p>
            <p className="text-xs text-[#7a4a20]">{addr.phone}</p>
          </div>
        ))}
        {addresses.length === 0 && (
          <div className="text-center py-12 bg-white border-2 border-[#995424]/10 rounded-2xl">
            <MapPin className="w-10 h-10 mx-auto text-[#995424]/20 mb-3" />
            <p className="font-bold text-[#995424]">No saved addresses</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white border-3 border-[#1e0f00] rounded-2xl w-full max-w-lg p-6 shadow-[6px_6px_0_#1e0f00]" style={{ borderWidth: 3 }}>
            <div className="flex justify-between mb-4">
              <h3 className="font-black text-[#1e0f00]">{editing ? 'Edit' : 'Add'} Address</h3>
              <button onClick={() => { setShowForm(false); setEditing(null) }}><X className="w-5 h-5 text-[#995424]" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input name="label" defaultValue={editing?.label} placeholder="Label (Home, Office)" required className="px-3 py-2 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" />
                <input name="full_name" defaultValue={editing?.full_name} placeholder="Full Name" required className="px-3 py-2 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" />
              </div>
              <input name="phone" defaultValue={editing?.phone} placeholder="Phone" required className="w-full px-3 py-2 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" />
              <input name="line1" defaultValue={editing?.address_line1} placeholder="Address Line 1" required className="w-full px-3 py-2 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" />
              <input name="line2" defaultValue={editing?.address_line2} placeholder="Address Line 2" className="w-full px-3 py-2 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" />
              <div className="grid grid-cols-3 gap-3">
                <input name="city" defaultValue={editing?.city} placeholder="City" required className="px-3 py-2 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" />
                <select name="state" defaultValue={editing?.state || 'Maharashtra'} className="px-3 py-2 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]">
                  {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                </select>
                <input name="pincode" defaultValue={editing?.pincode} placeholder="Pincode" required className="px-3 py-2 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" />
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-[#995424]"><input type="checkbox" name="is_default" defaultChecked={editing?.is_default} className="accent-[#F47B40]" /> Set as default</label>
              <button type="submit" disabled={loading} className="w-full py-2.5 rounded-full bg-[#F47B40] text-white font-black border-2 border-[#1e0f00] shadow-[3px_3px_0_#1e0f00] disabled:opacity-50" style={{ borderWidth: 2.5 }}>
                {loading ? 'Saving...' : editing ? 'Save Changes' : 'Add Address'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
