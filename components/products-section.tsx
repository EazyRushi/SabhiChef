'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { useCartStore } from '@/lib/store/cart-store';

interface ProductsSectionProps {
  products: Product[];
}

export default function ProductsSection({ products }: ProductsSectionProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const addItem = useCartStore(s => s.addItem);

  const categories = ['All', 'Meals', 'Breakfast', 'Sweet', 'Condiment', 'Beverage', 'Snack'];

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="products" className="py-20 px-12 bg-cream" style={{ background: '#FFF9ED' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-9 flex-wrap gap-5">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-yellow border-2 border-brown rounded-full px-4 py-1.5 mb-3 font-black text-xs" style={{
              background: '#FEE472',
              borderColor: '#995424'
            }}>
              🍽️ Our Products
            </div>
            <h2 className="text-5xl font-black text-brown">
              Authentic <span className="text-orange">Flavors</span>
            </h2>
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter.toLowerCase())}
                className={`px-4.5 py-2 rounded-full border-2 font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === filter.toLowerCase()
                    ? 'bg-[#F47B40] border-[#F47B40] text-white shadow-md'
                    : 'bg-transparent border-[#995424] text-[#995424] hover:bg-[#F47B40] hover:border-[#F47B40] hover:text-white'
                }`}
                style={{
                  boxShadow: activeFilter === filter.toLowerCase() ? '3px 3px 0 #1e0f00' : '3px 3px 0 #995424'
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
          {filteredProducts.map(product => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div
                className="bg-white border-3 border-ink rounded-4xl overflow-hidden shadow-md transition-all hover:-translate-x-1 hover:-translate-y-1 cursor-pointer"
                style={{
                  borderColor: '#1e0f00',
                  boxShadow: '5px 5px 0 #1e0f00'
                }}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-[#FEE472]/30 to-[#F47B40]/20 aspect-square flex items-center justify-center text-6xl">
                  {product.image_url && !product.image_url.includes('placeholder') ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    product.category === 'breakfast' ? '🌅' : product.category === 'meals' ? '🍲' : product.category === 'sweet' ? '🍰' : product.category === 'beverage' ? '☕' : '🌿'
                  )}
                  {product.is_featured && (
                    <div className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-full border-2 border-ink bg-[#FEE472] text-[#1e0f00]">
                      Featured
                    </div>
                  )}
                  <span className="absolute top-3 right-3 bg-white border-2 border-[#1e0f00] rounded-full px-2 py-0.5 text-[10px] font-bold text-[#1e0f00]">{product.prep_time}</span>
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#F47B40] mb-1">{product.category}</p>
                  <p className="text-sm font-black mb-1 text-[#1e0f00] truncate">{product.name}</p>
                  <p className="text-xs text-[#7a4a20] font-semibold mb-2.5">{product.weight} · {product.servings}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-black text-[#16703A]">₹{product.price}</p>
                    <button 
                      onClick={(e) => { e.preventDefault(); addItem(product); }}
                      className="w-8 h-8 rounded-full border-2 bg-[#FEE472] font-black text-base flex items-center justify-center transition-all hover:bg-[#F47B40] hover:text-white" 
                      style={{borderColor: '#1e0f00', boxShadow: '3px 3px 0 #1e0f00'}}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
