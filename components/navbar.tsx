'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCartStore } from '@/lib/store/cart-store';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore(s => s.getItemCount());

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-3 border-b-4" style={{ background: 'rgba(255,249,237,0.96)', backdropFilter: 'blur(16px)', borderColor: '#FEE472' }}>
      <Link href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-base" style={{ background: '#F47B40' }}>SC</div>
        <span className="font-black text-sm hidden sm:inline" style={{ color: '#1e0f00' }}>Sabhi Chef</span>
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden lg:flex gap-1 list-none items-center">
        <li><Link href="/shop" className="no-underline font-black text-xs uppercase tracking-wider px-4 py-2 rounded-full transition-all hover:bg-[#FEE472]" style={{ color: '#1e0f00' }}>Shop</Link></li>
        <li><a href="/#products" className="no-underline font-black text-xs uppercase tracking-wider px-4 py-2 rounded-full transition-all hover:bg-[#FEE472]" style={{ color: '#1e0f00' }}>Products</a></li>
        <li><a href="/#story" className="no-underline font-black text-xs uppercase tracking-wider px-4 py-2 rounded-full transition-all hover:bg-[#FEE472]" style={{ color: '#1e0f00' }}>Our Story</a></li>
        <li><a href="/#contact" className="no-underline font-black text-xs uppercase tracking-wider px-4 py-2 rounded-full transition-all hover:bg-[#FEE472]" style={{ color: '#1e0f00' }}>Contact</a></li>
        <li>
          <Link href="/account" className="flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all hover:bg-[#FEE472]" style={{ borderColor: '#995424', color: '#995424' }}>
            <User className="w-4 h-4" />
          </Link>
        </li>
        <li>
          <Link href="/cart" className="relative flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all hover:bg-[#FEE472]" style={{ borderColor: '#995424', color: '#995424' }}>
            <ShoppingCart className="w-4 h-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border-2" style={{ background: '#DD2D2B', color: '#fff', borderColor: '#1e0f00' }}>
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </Link>
        </li>
        <li>
          <Link href="/shop" className="no-underline font-black text-sm px-4 py-2 rounded-full text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5" style={{ background: '#F47B40', boxShadow: '4px 4px 0 #995424' }}>
            Shop Now →
          </Link>
        </li>
      </ul>

      {/* Mobile */}
      <div className="flex lg:hidden items-center gap-2">
        <Link href="/cart" className="relative flex items-center justify-center w-10 h-10 rounded-full border-2" style={{ borderColor: '#1e0f00', background: '#FEE472' }}>
          <ShoppingCart className="w-4 h-4" style={{ color: '#1e0f00' }} />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border-2" style={{ background: '#DD2D2B', color: '#fff', borderColor: '#1e0f00' }}>
              {itemCount > 9 ? '9+' : itemCount}
            </span>
          )}
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="w-10 h-10 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#1e0f00', background: '#FEE472' }}>
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b-4 shadow-lg p-6 space-y-3 lg:hidden" style={{ borderColor: '#FEE472' }}>
          <Link href="/shop" onClick={() => setMobileOpen(false)} className="block font-black text-sm py-2" style={{ color: '#1e0f00' }}>Shop</Link>
          <a href="/#products" onClick={() => setMobileOpen(false)} className="block font-black text-sm py-2" style={{ color: '#1e0f00' }}>Products</a>
          <a href="/#story" onClick={() => setMobileOpen(false)} className="block font-black text-sm py-2" style={{ color: '#1e0f00' }}>Our Story</a>
          <a href="/#contact" onClick={() => setMobileOpen(false)} className="block font-black text-sm py-2" style={{ color: '#1e0f00' }}>Contact</a>
          <Link href="/account" onClick={() => setMobileOpen(false)} className="block font-black text-sm py-2" style={{ color: '#F47B40' }}>My Account</Link>
          <Link href="/login" onClick={() => setMobileOpen(false)} className="block font-black text-sm py-2" style={{ color: '#16703A' }}>Login / Sign Up</Link>
        </div>
      )}
    </nav>
  );
}
