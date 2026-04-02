'use client'

import { useState } from 'react'
import { products } from '@/lib/products'
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react'
import type { Product } from '@/lib/types'

export default function AdminProducts() {
  const [items, setItems] = useState<Product[]>(products)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)

  const categories = ['all', 'breakfast', 'meals', 'sweet', 'condiment']

  const filtered = items.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter
    return matchSearch && matchCat
  })

  const handleDelete = (id: string) => {
    setItems(items.filter(p => p.id !== id))
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const updated: Product = {
      id: editingProduct?.id || `p${Date.now()}`,
      name: fd.get('name') as string,
      slug: (fd.get('name') as string).toLowerCase().replace(/\s+/g, '-'),
      description: fd.get('description') as string,
      price: Number(fd.get('price')),
      category: fd.get('category') as Product['category'],
      image_url: editingProduct?.image_url || '/products/placeholder.jpg',
      weight: fd.get('weight') as string,
      servings: fd.get('servings') as string,
      prep_time: fd.get('prep_time') as string,
      ingredients: fd.get('ingredients') as string,
      instructions: fd.get('instructions') as string,
      tags: (fd.get('tags') as string).split(',').map(t => t.trim()),
      in_stock: fd.get('in_stock') === 'on',
      is_featured: fd.get('is_featured') === 'on',
      sort_order: editingProduct?.sort_order || items.length + 1,
    }

    if (editingProduct) {
      setItems(items.map(p => p.id === editingProduct.id ? updated : p))
    } else {
      setItems([...items, updated])
    }
    setShowForm(false)
    setEditingProduct(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#F47B40]/50"
            />
          </div>
          <div className="flex gap-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-2 rounded-lg text-xs font-bold capitalize transition ${
                  categoryFilter === cat
                    ? 'bg-[#F47B40] text-white'
                    : 'bg-white/5 text-white/40 hover:text-white/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => { setEditingProduct(null); setShowForm(true) }}
          className="flex items-center gap-2 bg-gradient-to-r from-[#F47B40] to-[#DD2D2B] text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-4 px-6 text-xs font-bold text-white/40 uppercase tracking-wider">Product</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-white/40 uppercase tracking-wider">Category</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-white/40 uppercase tracking-wider">Price</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-white/40 uppercase tracking-wider">Stock</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-white/40 uppercase tracking-wider">Featured</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-white/40 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} className="border-b border-white/[0.03] hover:bg-white/[0.03] transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F47B40]/20 to-[#FEE472]/20 flex items-center justify-center text-lg">
                        {product.category === 'breakfast' ? '🌅' : product.category === 'meals' ? '🍲' : product.category === 'sweet' ? '🍰' : '🌿'}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{product.name}</p>
                        <p className="text-xs text-white/30">{product.weight} · {product.prep_time}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/50 bg-white/5 px-2 py-1 rounded-md">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-white">₹{product.price}</td>
                  <td className="py-4 px-6">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      product.in_stock ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
                    }`}>
                      {product.in_stock ? 'In Stock' : 'Out'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {product.is_featured && (
                      <span className="text-xs font-bold text-[#FEE472] bg-[#FEE472]/10 px-2 py-1 rounded-full">★ Featured</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 rounded-lg hover:bg-white/10 transition text-white/40 hover:text-white"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 transition text-white/40 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-white/5 text-xs text-white/30">
          Showing {filtered.length} of {items.length} products
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-white">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => { setShowForm(false); setEditingProduct(null) }} className="p-2 rounded-lg hover:bg-white/10 transition">
                <X className="w-5 h-5 text-white/40" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/40 mb-1.5 uppercase tracking-wider">Name</label>
                  <input name="name" defaultValue={editingProduct?.name} required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/40 mb-1.5 uppercase tracking-wider">Price (₹)</label>
                  <input name="price" type="number" defaultValue={editingProduct?.price} required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-white/40 mb-1.5 uppercase tracking-wider">Description</label>
                <textarea name="description" rows={3} defaultValue={editingProduct?.description}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50 resize-none" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/40 mb-1.5 uppercase tracking-wider">Category</label>
                  <select name="category" defaultValue={editingProduct?.category || 'meals'}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50">
                    <option value="breakfast">Breakfast</option>
                    <option value="meals">Meals</option>
                    <option value="sweet">Sweet & Drinks</option>
                    <option value="condiment">Condiments</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/40 mb-1.5 uppercase tracking-wider">Weight</label>
                  <input name="weight" defaultValue={editingProduct?.weight}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/40 mb-1.5 uppercase tracking-wider">Prep Time</label>
                  <input name="prep_time" defaultValue={editingProduct?.prep_time}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/40 mb-1.5 uppercase tracking-wider">Servings</label>
                  <input name="servings" defaultValue={editingProduct?.servings}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/40 mb-1.5 uppercase tracking-wider">Tags (comma separated)</label>
                  <input name="tags" defaultValue={editingProduct?.tags.join(', ')}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-white/40 mb-1.5 uppercase tracking-wider">Ingredients</label>
                <textarea name="ingredients" rows={2} defaultValue={editingProduct?.ingredients}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50 resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/40 mb-1.5 uppercase tracking-wider">Instructions</label>
                <textarea name="instructions" rows={3} defaultValue={editingProduct?.instructions}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F47B40]/50 resize-none" />
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
                  <input type="checkbox" name="in_stock" defaultChecked={editingProduct?.in_stock ?? true} className="accent-[#F47B40]" />
                  In Stock
                </label>
                <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
                  <input type="checkbox" name="is_featured" defaultChecked={editingProduct?.is_featured ?? false} className="accent-[#FEE472]" />
                  Featured
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => { setShowForm(false); setEditingProduct(null) }}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white/50 hover:text-white/80 bg-white/5 hover:bg-white/10 transition">
                  Cancel
                </button>
                <button type="submit"
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#F47B40] to-[#DD2D2B] hover:opacity-90 transition">
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
