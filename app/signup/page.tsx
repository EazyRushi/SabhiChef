'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { signUp } from '@/lib/supabase/actions'

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    const result = await signUp(fd)
    if (result?.error) { setError(result.error); setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #FEE472 0%, #F4A789 50%, #FFF9ED 100%)' }}>
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F47B40] to-[#DD2D2B] flex items-center justify-center text-white font-black text-lg shadow-lg">SC</div>
          <span className="text-2xl font-black text-[#1e0f00]">Sabhi Chef</span>
        </Link>
        <div className="bg-white border-3 border-[#1e0f00] rounded-3xl p-8 shadow-[6px_6px_0_#1e0f00]" style={{ borderWidth: 3 }}>
          <h1 className="text-2xl font-black text-[#1e0f00] mb-2">Create Account 🍳</h1>
          <p className="text-sm text-[#7a4a20] font-semibold mb-6">Join the Sabhi Chef family</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-700 font-semibold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#995424] uppercase tracking-wider mb-1 block">Full Name</label>
              <input name="name" type="text" placeholder="Priya Sharma" required className="w-full px-4 py-3 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#995424] uppercase tracking-wider mb-1 block">Email</label>
              <input name="email" type="email" placeholder="priya@example.com" required className="w-full px-4 py-3 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#995424] uppercase tracking-wider mb-1 block">Phone Number</label>
              <input name="phone" type="tel" placeholder="+91 98765 43210" required className="w-full px-4 py-3 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#995424] uppercase tracking-wider mb-1 block">Password</label>
              <div className="relative">
                <input name="password" type={showPass ? 'text' : 'password'} placeholder="Min 8 characters" required minLength={8}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40] pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#995424]/40">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-full bg-[#16703A] text-white font-black border-2 border-[#1e0f00] shadow-[4px_4px_0_#1e0f00] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#1e0f00] transition-all disabled:opacity-50" style={{ borderWidth: 2.5 }}>
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>
          </form>
        </div>
        <p className="text-center mt-6 text-sm font-semibold text-[#5a3010]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#F47B40] font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}
