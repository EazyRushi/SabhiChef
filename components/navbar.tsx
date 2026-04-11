'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/store/cart-store';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About Us', href: '/#story' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const itemCount = useCartStore(s => s.getItemCount());

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-3 border-b-4" style={{ background: 'rgba(255,249,237,0.96)', backdropFilter: 'blur(16px)', borderColor: '#FEE472' }}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-base" style={{ background: '#F47B40' }}>SC</div>
        <span className="font-black text-sm hidden sm:inline" style={{ color: '#1e0f00' }}>Sabhi Chef</span>
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden lg:flex gap-1 list-none items-center">
        {NAV_LINKS.map(link => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="no-underline font-black text-xs uppercase tracking-wider px-4 py-2 rounded-full transition-all hover:bg-[#FEE472]"
              style={{ color: '#1e0f00' }}
            >
              {link.label}
            </Link>
          </li>
        ))}

        {/* User icon */}
        <li>
          <Link href={user ? '/account' : '/login'} className="flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all hover:bg-[#FEE472]" style={{ borderColor: '#995424', color: '#995424' }}>
            <User className="w-4 h-4" />
          </Link>
        </li>

        {/* Cart icon */}
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

        {/* Shop Now CTA */}
        <li>
          <Link href="/shop" className="no-underline font-black text-sm px-4 py-2 rounded-full text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5" style={{ background: '#F47B40', boxShadow: '4px 4px 0 #995424' }}>
            Shop Now →
          </Link>
        </li>
      </ul>

      {/* Mobile icons */}
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
          {NAV_LINKS.map(link => (
            <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="block font-black text-sm py-2" style={{ color: '#1e0f00' }}>
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/account" onClick={() => setMobileOpen(false)} className="block font-black text-sm py-2" style={{ color: '#F47B40' }}>My Account</Link>
              <button onClick={handleSignOut} className="flex items-center gap-2 font-black text-sm py-2 text-red-500">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setMobileOpen(false)} className="block font-black text-sm py-2" style={{ color: '#16703A' }}>Login / Sign Up</Link>
          )}
        </div>
      )}
    </nav>
  );
}
