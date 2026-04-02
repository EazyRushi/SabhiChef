'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, Package, MapPin, Heart, Settings, LogOut, ChevronRight } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const accountLinks = [
  { href: '/account', label: 'Profile', icon: User },
  { href: '/account/orders', label: 'My Orders', icon: Package },
  { href: '/account/addresses', label: 'Addresses', icon: MapPin },
  { href: '/account/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/account/settings', label: 'Settings', icon: Settings },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href

  return (
    <><Navbar />
      <div className="min-h-screen pt-20" style={{ background: '#FFF9ED' }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white border-2 border-[#1e0f00] rounded-2xl p-5 shadow-[4px_4px_0_#1e0f00]" style={{borderWidth:2.5}}>
                <div className="flex items-center gap-3 mb-5 pb-5 border-b-2 border-[#995424]/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FEE472] to-[#F47B40] flex items-center justify-center text-sm font-black text-[#1e0f00]">PS</div>
                  <div>
                    <p className="font-black text-[#1e0f00] text-sm">Priya Sharma</p>
                    <p className="text-xs text-[#7a4a20]">+91 98765 43210</p>
                  </div>
                </div>
                <nav className="space-y-1">
                  {accountLinks.map(link => {
                    const Icon = link.icon
                    return (
                      <Link key={link.href} href={link.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          isActive(link.href)
                            ? 'bg-[#F47B40]/10 text-[#F47B40]'
                            : 'text-[#995424] hover:bg-[#FEE472]/30'
                        }`}>
                        <Icon className="w-4 h-4" />
                        {link.label}
                        {isActive(link.href) && <ChevronRight className="w-4 h-4 ml-auto" />}
                      </Link>
                    )
                  })}
                  <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-[#DD2D2B]/60 hover:text-[#DD2D2B] hover:bg-[#DD2D2B]/5 transition mt-2">
                    <LogOut className="w-4 h-4" /> Logout
                  </Link>
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1">
              {children}
            </div>
          </div>
        </div>
      </div>
    <Footer /></>
  )
}
