'use client'

import { useState } from 'react'
import { BUSINESS, SHIPPING } from '@/lib/constants'
import { Save, Check } from 'lucide-react'

export default function AdminSettings() {
  const [saved, setSaved] = useState(false)
  const [biz, setBiz] = useState<{name:string;tagline:string;phone:string;email:string;instagram:string;whatsapp:string}>({ name: BUSINESS.name, tagline: BUSINESS.tagline, phone: BUSINESS.phone, email: BUSINESS.email, instagram: BUSINESS.instagram, whatsapp: BUSINESS.whatsapp })
  const [ship, setShip] = useState<{freeThreshold:number;flatRate:number;estimate:string}>({ freeThreshold: SHIPPING.FREE_THRESHOLD, flatRate: SHIPPING.FLAT_RATE, estimate: SHIPPING.DELIVERY_ESTIMATE })

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const inputClass = "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50"
  const labelClass = "block text-xs font-bold text-white/40 mb-1.5 uppercase tracking-wider"

  return (
    <div className="max-w-3xl space-y-8">
      {/* Business Info */}
      <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white/70 mb-6">Business Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>Business Name</label><input value={biz.name} onChange={e => setBiz({...biz, name: e.target.value})} className={inputClass} /></div>
            <div><label className={labelClass}>Tagline</label><input value={biz.tagline} onChange={e => setBiz({...biz, tagline: e.target.value})} className={inputClass} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>Phone</label><input value={biz.phone} onChange={e => setBiz({...biz, phone: e.target.value})} className={inputClass} /></div>
            <div><label className={labelClass}>Email</label><input value={biz.email} onChange={e => setBiz({...biz, email: e.target.value})} className={inputClass} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>Instagram URL</label><input value={biz.instagram} onChange={e => setBiz({...biz, instagram: e.target.value})} className={inputClass} /></div>
            <div><label className={labelClass}>WhatsApp URL</label><input value={biz.whatsapp} onChange={e => setBiz({...biz, whatsapp: e.target.value})} className={inputClass} /></div>
          </div>
        </div>
      </div>

      {/* Shipping */}
      <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white/70 mb-6">Shipping Rules</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div><label className={labelClass}>Free Shipping Above (₹)</label><input type="number" value={ship.freeThreshold} onChange={e => setShip({...ship, freeThreshold: Number(e.target.value)})} className={inputClass} /></div>
            <div><label className={labelClass}>Flat Rate (₹)</label><input type="number" value={ship.flatRate} onChange={e => setShip({...ship, flatRate: Number(e.target.value)})} className={inputClass} /></div>
            <div><label className={labelClass}>Delivery Estimate</label><input value={ship.estimate} onChange={e => setShip({...ship, estimate: e.target.value})} className={inputClass} /></div>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white/70 mb-6">Payment Configuration</h3>
        <div className="space-y-4">
          <div><label className={labelClass}>Razorpay Key ID</label><input defaultValue="rzp_live_xxxxx" className={inputClass} /></div>
          <div><label className={labelClass}>Razorpay Key Secret</label><input type="password" defaultValue="secret" className={inputClass} /></div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-white/60"><input type="checkbox" defaultChecked className="accent-[#F47B40]" />UPI</label>
            <label className="flex items-center gap-2 text-sm text-white/60"><input type="checkbox" defaultChecked className="accent-[#F47B40]" />Cards</label>
            <label className="flex items-center gap-2 text-sm text-white/60"><input type="checkbox" defaultChecked className="accent-[#F47B40]" />Net Banking</label>
            <label className="flex items-center gap-2 text-sm text-white/60"><input type="checkbox" defaultChecked className="accent-[#F47B40]" />COD</label>
          </div>
        </div>
      </div>

      <button onClick={handleSave}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition ${
          saved ? 'bg-green-500/20 text-green-400' : 'bg-gradient-to-r from-[#F47B40] to-[#DD2D2B] text-white hover:opacity-90'
        }`}>
        {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Settings</>}
      </button>
    </div>
  )
}
