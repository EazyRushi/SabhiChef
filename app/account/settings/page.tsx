'use client'

import { useState } from 'react'
import { Check, Eye, EyeOff } from 'lucide-react'

export default function AccountSettings() {
  const [saved, setSaved] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [notifications, setNotifications] = useState({ orders: true, promos: true, sms: false })

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div>
      <h1 className="text-2xl font-black text-[#1e0f00] mb-6">Settings</h1>
      <div className="space-y-6">
        {/* Change Password */}
        <div className="bg-white border-2 border-[#1e0f00] rounded-2xl p-6 shadow-[3px_3px_0_#1e0f00]" style={{borderWidth:2.5}}>
          <h3 className="font-black text-[#1e0f00] mb-4">🔐 Change Password</h3>
          <div className="space-y-3 max-w-md">
            <div>
              <label className="text-xs font-bold text-[#995424] mb-1 block">Current Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} className="w-full px-4 py-2.5 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40] pr-10" />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#995424]/40">{showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-[#995424] mb-1 block">New Password</label>
              <input type="password" className="w-full px-4 py-2.5 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#995424] mb-1 block">Confirm Password</label>
              <input type="password" className="w-full px-4 py-2.5 rounded-xl border-2 border-[#995424]/20 bg-[#FFF9ED] text-sm font-semibold focus:outline-none focus:border-[#F47B40]" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border-2 border-[#1e0f00] rounded-2xl p-6 shadow-[3px_3px_0_#1e0f00]" style={{borderWidth:2.5}}>
          <h3 className="font-black text-[#1e0f00] mb-4">🔔 Notifications</h3>
          <div className="space-y-3">
            {[
              { key: 'orders' as const, label: 'Order updates', desc: 'Get notified about order status changes' },
              { key: 'promos' as const, label: 'Promotions & offers', desc: 'Receive exclusive deals and discounts' },
              { key: 'sms' as const, label: 'SMS notifications', desc: 'Get updates via SMS' },
            ].map(n => (
              <label key={n.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FEE472]/20 cursor-pointer transition">
                <div>
                  <p className="text-sm font-bold text-[#1e0f00]">{n.label}</p>
                  <p className="text-xs text-[#7a4a20]">{n.desc}</p>
                </div>
                <input type="checkbox" checked={notifications[n.key]} onChange={() => setNotifications({...notifications, [n.key]: !notifications[n.key]})} className="accent-[#F47B40] w-4 h-4" />
              </label>
            ))}
          </div>
        </div>

        <button onClick={handleSave}
          className={`flex items-center gap-2 font-black py-3 px-6 rounded-full border-2 transition-all ${
            saved ? 'bg-[#16703A] text-white border-[#1e0f00]' : 'bg-[#F47B40] text-white border-[#1e0f00] shadow-[3px_3px_0_#1e0f00] hover:translate-x-[-2px] hover:translate-y-[-2px]'
          }`} style={{borderWidth:2.5}}>
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : 'Save Settings'}
        </button>

        {/* Danger Zone */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
          <h3 className="font-black text-[#DD2D2B] mb-2">⚠️ Danger Zone</h3>
          <p className="text-xs text-[#DD2D2B]/60 mb-3">Once you delete your account, there is no going back.</p>
          <button className="text-xs font-bold text-[#DD2D2B] border border-[#DD2D2B] px-4 py-2 rounded-lg hover:bg-[#DD2D2B] hover:text-white transition">Delete Account</button>
        </div>
      </div>
    </div>
  )
}
