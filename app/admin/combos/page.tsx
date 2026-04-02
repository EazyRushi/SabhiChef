'use client'

import { useState } from 'react'
import { combos } from '@/lib/combos'
import { products } from '@/lib/products'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import type { Combo } from '@/lib/types'

export default function AdminCombos() {
  const [items, setItems] = useState<Combo[]>(combos)
  const [editingCombo, setEditingCombo] = useState<Combo | null>(null)
  const [showForm, setShowForm] = useState(false)

  const getProductName = (pid: string) => products.find(p => p.id === pid)?.name || 'Unknown'
  const handleDelete = (id: string) => setItems(items.filter(c => c.id !== id))

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const selProds = products.filter(p => fd.getAll('products').includes(p.id))
    const combo: Combo = {
      id: editingCombo?.id || `c${Date.now()}`,
      name: fd.get('name') as string,
      slug: (fd.get('name') as string).toLowerCase().replace(/\s+/g, '-'),
      description: fd.get('description') as string,
      price: Number(fd.get('price')),
      is_active: fd.get('is_active') === 'on',
      products: selProds.map((p, i) => ({ id: `ci-${i}`, combo_id: editingCombo?.id || '', product_id: p.id, quantity: 1 })),
    }
    if (editingCombo) setItems(items.map(c => c.id === editingCombo.id ? combo : c))
    else setItems([...items, combo])
    setShowForm(false); setEditingCombo(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-white/40">{items.length} combos</p>
        <button onClick={() => { setEditingCombo(null); setShowForm(true) }}
          className="flex items-center gap-2 bg-gradient-to-r from-[#F47B40] to-[#DD2D2B] text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition">
          <Plus className="w-4 h-4" /> Add Combo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {items.map(combo => (
          <div key={combo.id} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition">
            <div className="flex items-start justify-between mb-3">
              <div><h3 className="font-black text-white">{combo.name}</h3><p className="text-xs text-white/40 mt-1">{combo.description}</p></div>
              <div className="flex gap-1">
                <button onClick={() => { setEditingCombo(combo); setShowForm(true) }} className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(combo.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {combo.products?.map(it => <span key={it.id} className="text-[11px] font-bold bg-white/5 text-white/50 px-2 py-1 rounded-md">{getProductName(it.product_id)}</span>)}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-lg font-black text-[#16703A]">₹{combo.price}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${combo.is_active ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>{combo.is_active ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-white">{editingCombo ? 'Edit Combo' : 'Add Combo'}</h3>
              <button onClick={() => { setShowForm(false); setEditingCombo(null) }} className="p-2 rounded-lg hover:bg-white/10"><X className="w-5 h-5 text-white/40" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <input name="name" defaultValue={editingCombo?.name} required placeholder="Combo name" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50" />
              <input name="description" defaultValue={editingCombo?.description} placeholder="Description" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50" />
              <input name="price" type="number" defaultValue={editingCombo?.price} required placeholder="Price" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50" />
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {products.map(p => (
                  <label key={p.id} className="flex items-center gap-2 text-xs text-white/60 cursor-pointer bg-white/[0.03] rounded-lg p-2">
                    <input type="checkbox" name="products" value={p.id} defaultChecked={editingCombo?.products?.some(ci => ci.product_id === p.id)} className="accent-[#F47B40]" />{p.name}
                  </label>
                ))}
              </div>
              <label className="flex items-center gap-2 text-sm text-white/60"><input type="checkbox" name="is_active" defaultChecked={editingCombo?.is_active ?? true} className="accent-[#F47B40]" />Active</label>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => { setShowForm(false); setEditingCombo(null) }} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white/50 bg-white/5">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#F47B40] to-[#DD2D2B]">{editingCombo ? 'Save' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
