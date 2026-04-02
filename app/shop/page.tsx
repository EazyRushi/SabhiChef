'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { products } from '@/lib/products'
import { useCartStore } from '@/lib/store/cart-store'
import { Search, SlidersHorizontal, ArrowLeft, ShoppingCart, Check } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const CATEGORIES = [
  { value: 'all', label: 'All', emoji: '🍽️' },
  { value: 'breakfast', label: 'Breakfast', emoji: '🌅' },
  { value: 'meals', label: 'Meals', emoji: '🍲' },
  { value: 'sweet', label: 'Sweet & Drinks', emoji: '🍰' },
  { value: 'condiment', label: 'Condiments', emoji: '🌿' },
]

const SORT_OPTIONS = [
  { value: 'popular', label: 'Popularity' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
]

export default function ShopPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('popular')
  const [addedIds, setAddedIds] = useState<string[]>([])
  const addItem = useCartStore(s => s.addItem)
  const itemCount = useCartStore(s => s.getItemCount())

  const filtered = useMemo(() => {
    let list = [...products]
    if (category !== 'all') list = list.filter(p => p.category === category)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)))
    }
    switch (sort) {
      case 'price-low': list.sort((a, b) => a.price - b.price); break
      case 'price-high': list.sort((a, b) => b.price - a.price); break
      case 'name': list.sort((a, b) => a.name.localeCompare(b.name)); break
    }
    return list
  }, [category, search, sort])

  const handleAdd = (product: typeof products[0]) => {
    addItem(product)
    setAddedIds(prev => [...prev, product.id])
    setTimeout(() => setAddedIds(prev => prev.filter(id => id !== product.id)), 1200)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20" style={{ background: '#FFF9ED' }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#995424] hover:text-[#F47B40] transition mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
              <h1 className="text-4xl font-black text-[#1e0f00]">
                Our <span className="text-[#16703A]">Products</span>
              </h1>
              <p className="text-sm text-[#5a3010] font-semibold mt-2">{filtered.length} products available</p>
            </div>
            <Link href="/cart" className="relative flex items-center gap-2 bg-[#DD2D2B] text-white font-bold text-sm px-5 py-3 rounded-full border-2 border-[#1e0f00] shadow-[4px_4px_0_#1e0f00] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#1e0f00] transition-all">
              <ShoppingCart className="w-4 h-4" /> Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#FEE472] text-[#1e0f00] text-xs font-black rounded-full flex items-center justify-center border-2 border-[#1e0f00]">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Filters Bar */}
          <div className="bg-white border-3 border-[#1e0f00] rounded-2xl p-4 mb-8 shadow-[4px_4px_0_#1e0f00]" style={{ borderWidth: 3 }}>
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#995424]/40" />
                <input type="text" placeholder="Search products, tags..." value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FFF9ED] border-2 border-[#995424]/20 rounded-xl text-sm font-semibold text-[#1e0f00] focus:outline-none focus:border-[#F47B40]" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map(cat => (
                  <button key={cat.value} onClick={() => setCategory(cat.value)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition border-2 shadow-[2px_2px_0_#995424] ${
                      category === cat.value
                        ? 'bg-[#F47B40] border-[#1e0f00] text-white shadow-[3px_3px_0_#1e0f00]'
                        : 'bg-white border-[#995424] text-[#995424] hover:bg-[#FEE472]'
                    }`}>
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#995424]" />
                <select value={sort} onChange={e => setSort(e.target.value)}
                  className="bg-[#FFF9ED] border-2 border-[#995424]/20 rounded-xl px-3 py-2 text-xs font-bold text-[#995424] focus:outline-none">
                  {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(product => (
              <div key={product.id} className="bg-white border-3 border-[#1e0f00] rounded-2xl overflow-hidden shadow-[5px_5px_0_#1e0f00] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[8px_8px_0_#1e0f00] transition-all group" style={{ borderWidth: 3 }}>
                <Link href={`/product/${product.id}`}>
                  <div className="relative overflow-hidden">
                    <div className="w-full aspect-square bg-gradient-to-br from-[#FEE472]/30 to-[#F47B40]/20 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
                      {product.category === 'breakfast' ? '🌅' : product.category === 'meals' ? '🍲' : product.category === 'sweet' ? '🍰' : '🌿'}
                    </div>
                    {product.is_featured && (
                      <span className="absolute top-3 left-3 bg-[#FEE472] border-2 border-[#1e0f00] rounded-full px-3 py-1 text-[10px] font-black uppercase">⭐ Hero</span>
                    )}
                    <span className="absolute top-3 right-3 bg-white border-2 border-[#1e0f00] rounded-full px-2 py-0.5 text-[10px] font-bold">{product.prep_time}</span>
                  </div>
                </Link>
                <div className="p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#F47B40] mb-1">{product.category}</p>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-black text-[#1e0f00] hover:text-[#F47B40] transition">{product.name}</h3>
                  </Link>
                  <p className="text-xs text-[#7a4a20] font-semibold mt-1">{product.weight} · {product.servings}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-black text-[#16703A]">₹{product.price}</span>
                    <button onClick={() => handleAdd(product)}
                      className={`w-9 h-9 rounded-full border-2 border-[#1e0f00] flex items-center justify-center font-black text-lg transition-all shadow-[2px_2px_0_#1e0f00] ${
                        addedIds.includes(product.id)
                          ? 'bg-[#16703A] text-white'
                          : 'bg-[#FEE472] text-[#1e0f00] hover:bg-[#F47B40] hover:text-white'
                      }`}>
                      {addedIds.includes(product.id) ? <Check className="w-4 h-4" /> : '+'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl mb-2">🔍</p>
              <p className="text-lg font-bold text-[#995424]">No products found</p>
              <p className="text-sm text-[#7a4a20]">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
