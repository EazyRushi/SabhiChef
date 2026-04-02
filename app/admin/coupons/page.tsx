'use client'

import { useState } from 'react'
import { mockCoupons } from '@/lib/mock-data'
import { Plus, Pencil, Trash2, X, Copy, Check } from 'lucide-react'
import type { Coupon } from '@/lib/types'

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Coupon | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const c: Coupon = {
      id: editing?.id || `cp${Date.now()}`,
      code: (fd.get('code') as string).toUpperCase(),
      type: fd.get('type') as 'percentage' | 'flat',
      value: Number(fd.get('value')),
      min_order: Number(fd.get('min_order')),
      max_discount: fd.get('max_discount') ? Number(fd.get('max_discount')) : null,
      usage_limit: fd.get('usage_limit') ? Number(fd.get('usage_limit')) : null,
      used_count: editing?.used_count || 0,
      expires_at: fd.get('expires_at') as string || null,
      is_active: fd.get('is_active') === 'on',
      created_at: editing?.created_at || new Date().toISOString(),
    }
    if (editing) setCoupons(coupons.map(cp => cp.id === editing.id ? c : cp))
    else setCoupons([...coupons, c])
    setShowForm(false); setEditing(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-white/40">{coupons.filter(c => c.is_active).length} active coupons</p>
        <button onClick={() => { setEditing(null); setShowForm(true) }}
          className="flex items-center gap-2 bg-gradient-to-r from-[#F47B40] to-[#DD2D2B] text-white font-bold text-sm px-5 py-2.5 rounded-xl">
          <Plus className="w-4 h-4" /> Add Coupon
        </button>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left py-4 px-6 text-xs font-bold text-white/40 uppercase">Code</th>
              <th className="text-left py-4 px-6 text-xs font-bold text-white/40 uppercase">Discount</th>
              <th className="text-left py-4 px-6 text-xs font-bold text-white/40 uppercase">Min Order</th>
              <th className="text-left py-4 px-6 text-xs font-bold text-white/40 uppercase">Usage</th>
              <th className="text-left py-4 px-6 text-xs font-bold text-white/40 uppercase">Expires</th>
              <th className="text-left py-4 px-6 text-xs font-bold text-white/40 uppercase">Status</th>
              <th className="text-right py-4 px-6 text-xs font-bold text-white/40 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(coupon => (
              <tr key={coupon.id} className="border-b border-white/[0.03] hover:bg-white/[0.03]">
                <td className="py-4 px-6">
                  <button onClick={() => copyCode(coupon.code, coupon.id)}
                    className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg text-sm font-black text-[#FEE472] hover:bg-white/10 transition">
                    {coupon.code}
                    {copiedId === coupon.id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-white/30" />}
                  </button>
                </td>
                <td className="py-4 px-6 text-sm font-bold text-white">
                  {coupon.type === 'percentage' ? `${coupon.value}%` : `₹${coupon.value}`}
                  {coupon.max_discount && <span className="text-xs text-white/30 ml-1">(max ₹{coupon.max_discount})</span>}
                </td>
                <td className="py-4 px-6 text-sm text-white/60">₹{coupon.min_order}</td>
                <td className="py-4 px-6 text-sm text-white/60">
                  {coupon.used_count}{coupon.usage_limit ? `/${coupon.usage_limit}` : ''}
                </td>
                <td className="py-4 px-6 text-xs text-white/40">
                  {coupon.expires_at ? new Date(coupon.expires_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Never'}
                </td>
                <td className="py-4 px-6">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${coupon.is_active ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                    {coupon.is_active ? 'Active' : 'Expired'}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => { setEditing(coupon); setShowForm(true) }} className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => setCoupons(coupons.filter(c => c.id !== coupon.id))} className="p-2 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-md p-8">
            <div className="flex justify-between mb-6">
              <h3 className="text-lg font-black text-white">{editing ? 'Edit Coupon' : 'New Coupon'}</h3>
              <button onClick={() => { setShowForm(false); setEditing(null) }} className="p-2 rounded-lg hover:bg-white/10"><X className="w-5 h-5 text-white/40" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <input name="code" defaultValue={editing?.code} required placeholder="CODE" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white uppercase placeholder:normal-case focus:outline-none focus:border-[#F47B40]/50" />
              <div className="grid grid-cols-2 gap-4">
                <select name="type" defaultValue={editing?.type || 'percentage'} className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none">
                  <option value="percentage" style={{background:'#1a1a1a'}}>Percentage (%)</option>
                  <option value="flat" style={{background:'#1a1a1a'}}>Flat (₹)</option>
                </select>
                <input name="value" type="number" defaultValue={editing?.value} required placeholder="Value" className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input name="min_order" type="number" defaultValue={editing?.min_order} placeholder="Min order ₹" className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50" />
                <input name="max_discount" type="number" defaultValue={editing?.max_discount || ''} placeholder="Max discount ₹" className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input name="usage_limit" type="number" defaultValue={editing?.usage_limit || ''} placeholder="Usage limit" className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50" />
                <input name="expires_at" type="date" defaultValue={editing?.expires_at?.split('T')[0]} className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50" />
              </div>
              <label className="flex items-center gap-2 text-sm text-white/60"><input type="checkbox" name="is_active" defaultChecked={editing?.is_active ?? true} className="accent-[#F47B40]" />Active</label>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white/50 bg-white/5">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#F47B40] to-[#DD2D2B]">{editing ? 'Save' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
