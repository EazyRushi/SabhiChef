'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { router.push('/account') }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #FEE472 0%, #F4A789 50%, #FFF9ED 100%)' }}>
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F47B40] to-[#DD2D2B] flex items-center justify-center text-white font-black text-lg shadow-lg">SC</div>
          <span className="text-2xl font-black text-[#1e0f00]">Sabhi Chef</span>
        </Link>

        <div className="bg-white border-3 border-[#1e0f00] rounded-3xl p-8 shadow-[6px_6px_0_#1e0f00]" style={{borderWidth:3}}>
          <h1 className="text-2xl font-black text-[#1e0f00] mb-2">Welcome back! 👋</h1>
          <p className="text-sm text-[#7a4a20] font-semibold mb-6">Log in to your Sabhi Chef account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#995424] uppercase tracking-wider mb-1 block">Email or Phone</label>
              <input type="text" placeholder="priya@example.com" required
                className="w-full px-4 py-3 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold text-[#1e0f00] focus:outline-none focus:border-[#F47B40]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#995424] uppercase tracking-wider mb-1 block">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} placeholder="••••••••" required
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold text-[#1e0f00] focus:outline-none focus:border-[#F47B40] pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#995424]/40">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-xs text-[#7a4a20] font-semibold cursor-pointer">
                <input type="checkbox" className="accent-[#F47B40]" /> Remember me
              </label>
              <a href="#" className="text-xs font-bold text-[#F47B40] hover:underline">Forgot password?</a>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-full bg-[#DD2D2B] text-white font-black border-2 border-[#1e0f00] shadow-[4px_4px_0_#1e0f00] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#1e0f00] transition-all disabled:opacity-50" style={{borderWidth:2.5}}>
              {loading ? 'Logging in...' : 'Log In →'}
            </button>
          </form>

          <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#995424]/10" /></div><div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-[#995424] font-bold">OR</span></div></div>

          <button className="w-full py-3 rounded-full bg-white border-2 border-[#995424]/20 text-[#1e0f00] font-bold text-sm hover:bg-[#FEE472] transition flex items-center justify-center gap-2">
            📱 Login with OTP
          </button>
        </div>

        <p className="text-center mt-6 text-sm font-semibold text-[#5a3010]">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#F47B40] font-bold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
