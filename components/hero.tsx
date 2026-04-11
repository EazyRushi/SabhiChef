'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Check } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import type { Product } from '@/lib/types'

const greetings = [
  { text: 'Namaste!', lang: 'Hindi' },
  { text: 'Namaskar!', lang: 'Marathi' },
  { text: 'Vanakkam!', lang: 'Tamil' },
  { text: 'Nomoshkar!', lang: 'Bengali' },
  { text: 'Kem Cho!', lang: 'Gujarati' },
  { text: 'Sat Sri Akal!', lang: 'Punjabi' },
  { text: 'Namasthe!', lang: 'Telugu' },
]

const CATEGORY_EMOJI: Record<string, string> = {
  breakfast: '🌅',
  meals: '🍲',
  sweet: '🍰',
  condiment: '🌿',
  beverage: '☕',
  snack: '🥜',
}

interface HeroProps {
  featuredProducts: Product[]
}

export default function Hero({ featuredProducts }: HeroProps) {
  const [greetingIndex, setGreetingIndex] = useState(0)
  const [addedIds, setAddedIds] = useState<string[]>([])
  const addItem = useCartStore(s => s.addItem)

  useEffect(() => {
    const iv = setInterval(() => {
      setGreetingIndex(i => (i + 1) % greetings.length)
    }, 2000)
    return () => clearInterval(iv)
  }, [])

  const handleAdd = (product: Product) => {
    addItem(product)
    setAddedIds(prev => [...prev, product.id])
    setTimeout(() => setAddedIds(prev => prev.filter(id => id !== product.id)), 1200)
  }

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-20" style={{ background: 'linear-gradient(135deg, #FFF9ED 0%, #FFF3D0 60%, #FFEAD0 100%)' }}>
      {/* Background blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: '#FEE472' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#F47B40' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left */}
        <div>
          {/* Greeting pill */}
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6 border-2 text-sm font-black" style={{ background: '#FEE472', borderColor: '#1e0f00', boxShadow: '3px 3px 0 #1e0f00' }}>
            <span className="text-lg">🙏</span>
            <span className="transition-all duration-500" style={{ color: '#1e0f00' }}>
              {greetings[greetingIndex].text}
            </span>
            — from our kitchen to yours
          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-4" style={{ color: '#1e0f00' }}>
            Real Indian food.<br />
            <span style={{ color: '#DD2D2B' }}>Tasty.</span>{' '}
            <span style={{ color: '#16703A' }}>Healthy.</span><br />
            Ready in minutes.
          </h1>

          <p className="text-lg leading-relaxed font-semibold max-w-md mb-8" style={{ color: '#7a4a20' }}>
            No long hours. No Maggii. No refined oil. No preservatives. Just authentic, healthy Indian food made with love at home.
          </p>

          <div className="flex gap-4 mb-9">
            <Link href="/shop" className="inline-flex items-center gap-2 font-black text-lg px-8 py-3 rounded-full border-2 transition-all hover:-translate-x-1 hover:-translate-y-1" style={{ background: '#DD2D2B', color: '#fff', borderColor: '#1e0f00', boxShadow: '5px 5px 0 #1e0f00' }}>
              Shop Now →
            </Link>
            <a href="#story" className="inline-flex items-center gap-2 bg-white font-black text-lg px-6 py-3 rounded-full border-2 transition-all hover:-translate-x-1 hover:-translate-y-1" style={{ color: '#1e0f00', borderColor: '#995424', boxShadow: '5px 5px 0 #995424' }}>
              Our Story
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-4 flex-wrap">
            {[
              { value: '5K+', label: 'Happy Customers' },
              { value: '100%', label: 'Homemade' },
              { value: '0%', label: 'Preservatives' },
            ].map(stat => (
              <div key={stat.label} className="bg-white border-2 rounded-2xl px-4 py-3 text-center transition-all hover:-translate-y-1" style={{ borderColor: '#995424', boxShadow: '4px 4px 0 #995424' }}>
                <p className="text-2xl font-black leading-none" style={{ color: '#F47B40' }}>{stat.value}</p>
                <p className="text-[10px] font-black uppercase tracking-wider mt-1" style={{ color: '#995424' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Dynamic Featured Products Grid */}
        <div className="grid grid-cols-2 gap-3">
          {featuredProducts.length > 0 ? (
            featuredProducts.slice(0, 4).map(product => (
              <div key={product.id} className="bg-white border-3 rounded-3xl overflow-hidden transition-all hover:-translate-x-1 hover:-translate-y-1" style={{ borderColor: '#1e0f00', borderWidth: 3, boxShadow: '6px 6px 0 #1e0f00' }}>
                <Link href={`/product/${product.id}`}>
                  <div className="h-28 w-full flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(254,228,114,0.3), rgba(244,123,64,0.15))' }}>
                    {product.image_url && !product.image_url.includes('placeholder') ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl">{CATEGORY_EMOJI[product.category] || '🍽️'}</span>
                    )}
                  </div>
                </Link>
                <div className="p-3.5">
                  <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: '#F47B40' }}>{product.category}</p>
                  <Link href={`/product/${product.id}`}>
                    <p className="text-sm font-black hover:text-[#F47B40] transition truncate" style={{ color: '#1e0f00' }}>{product.name}</p>
                  </Link>
                  <p className="text-xs font-semibold" style={{ color: '#7a4a20' }}>{product.weight} · {product.servings}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-base font-black" style={{ color: '#16703A' }}>₹{product.price}</p>
                    <button
                      onClick={() => handleAdd(product)}
                      className={`w-7 h-7 rounded-full border-2 border-[#1e0f00] flex items-center justify-center text-sm font-black transition-all shadow-[2px_2px_0_#1e0f00] ${
                        addedIds.includes(product.id) ? 'bg-[#16703A] text-white' : 'bg-[#FEE472] text-[#1e0f00] hover:bg-[#F47B40] hover:text-white'
                      }`}>
                      {addedIds.includes(product.id) ? <Check className="w-3 h-3" /> : '+'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Fallback placeholders if no featured products set
            [
              { emoji: '🍲', category: 'Meals', name: 'Masala Khichdi', weight: '150gm · Serves 2', price: 150 },
              { emoji: '🍰', category: 'Sweet', name: 'Vanilla Cake', weight: '200gm · Serves 4', price: 150 },
              { emoji: '🌅', category: 'Breakfast', name: 'Moong Chilla', weight: '100gm · Serves 2', price: 120 },
              { emoji: '☀️', category: 'Breakfast', name: 'Poha', weight: '200gm · Serves 2', price: 80 },
            ].map((item, i) => (
              <div key={i} className="bg-white border-3 rounded-3xl overflow-hidden" style={{ borderWidth: 3, borderColor: '#1e0f00', boxShadow: '6px 6px 0 #1e0f00' }}>
                <div className="h-28 w-full flex items-center justify-center text-5xl" style={{ background: 'linear-gradient(135deg, rgba(254,228,114,0.3), rgba(244,123,64,0.15))' }}>{item.emoji}</div>
                <div className="p-3.5">
                  <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: '#F47B40' }}>{item.category}</p>
                  <p className="text-sm font-black" style={{ color: '#1e0f00' }}>{item.name}</p>
                  <p className="text-xs font-semibold" style={{ color: '#7a4a20' }}>{item.weight}</p>
                  <p className="text-base font-black mt-1.5" style={{ color: '#16703A' }}>₹{item.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
