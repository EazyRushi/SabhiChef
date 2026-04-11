'use client'

import { useState } from 'react'
import { Check, Star, Info } from 'lucide-react'
import { adminSaveHeroSettings } from '@/lib/supabase/actions'
import type { Product } from '@/lib/types'
import { useRouter } from 'next/navigation'

const CATEGORY_EMOJI: Record<string, string> = {
  breakfast: '🌅', meals: '🍲', sweet: '🍰', condiment: '🌿', beverage: '☕', snack: '🥜'
}

export default function HeroSettingsClient({ products }: { products: Product[] }) {
  const [selected, setSelected] = useState<string[]>(
    products.filter(p => p.is_featured).map(p => p.id)
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const router = useRouter()

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 4 ? [...prev, id] : prev
    )
  }

  const handleSave = async () => {
    setSaving(true)
    await adminSaveHeroSettings(selected)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    router.refresh()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Homepage Hero Tiles</h2>
          <p className="text-sm text-white/40 mt-1">Select up to <span className="text-[#F47B40] font-bold">4 products</span> to feature on the homepage hero section. These will appear in the 2×2 grid.</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-black text-white transition-all disabled:opacity-50"
          style={{ background: saved ? '#16703A' : 'linear-gradient(to right, #F47B40, #DD2D2B)' }}>
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : saving ? 'Saving...' : <><Star className="w-4 h-4" /> Save Hero</>}
        </button>
      </div>

      {/* Info */}
      <div className="flex items-start gap-2 bg-[#F47B40]/10 border border-[#F47B40]/20 rounded-xl p-4">
        <Info className="w-4 h-4 text-[#F47B40] flex-shrink-0 mt-0.5" />
        <p className="text-xs text-white/60 font-semibold">
          Selected: <span className="text-[#F47B40] font-black">{selected.length}/4</span> products.
          {selected.length === 4 && ' Maximum reached. Deselect one to choose another.'}
        </p>
      </div>

      {/* Preview */}
      {selected.length > 0 && (
        <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white/70 mb-4">Preview — Hero Tiles</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {selected.map(id => {
              const p = products.find(x => x.id === id)
              if (!p) return null
              return (
                <div key={id} className="bg-[#FEE472] border-2 border-[#1e0f00] rounded-2xl p-3 text-center shadow-[3px_3px_0_#1e0f00]">
                  <div className="text-3xl mb-2">{CATEGORY_EMOJI[p.category] || '🍽️'}</div>
                  <p className="text-[11px] font-black text-[#1e0f00] leading-tight">{p.name}</p>
                  <p className="text-[10px] text-[#7a4a20] font-semibold mt-0.5">{p.weight}</p>
                  <p className="text-xs font-black text-[#16703A] mt-1">₹{p.price}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Product selector grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => {
          const isSelected = selected.includes(product.id)
          const isDisabled = !isSelected && selected.length >= 4
          return (
            <button key={product.id} onClick={() => toggle(product.id)} disabled={isDisabled}
              className={`text-left p-4 rounded-2xl border-2 transition-all ${
                isSelected
                  ? 'border-[#F47B40] bg-[#F47B40]/10'
                  : isDisabled
                    ? 'border-white/5 bg-white/[0.02] opacity-40 cursor-not-allowed'
                    : 'border-white/10 bg-[#1a1a1a] hover:border-white/20'
              }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-colors ${isSelected ? 'bg-[#F47B40]/20' : 'bg-white/5'}`}>
                  {product.image_url && !product.image_url.includes('placeholder') ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    CATEGORY_EMOJI[product.category] || '🍽️'
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{product.name}</p>
                  <p className="text-xs text-white/40 capitalize">{product.category} · ₹{product.price}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isSelected ? 'border-[#F47B40] bg-[#F47B40]' : 'border-white/20'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
