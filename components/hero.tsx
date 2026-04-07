'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const greetings = [
    'नमस्ते!',
    'Namaste!',
    'ਸਤ ਸ੍ਰੀ ਅਕਾਲ!',
    'வணக்கம்!',
    'నమస్కారం!',
    'ನಮಸ್ಕಾರ!',
    'Kem Cho!',
    'Namaskar!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fading out
      setTimeout(() => {
        setGreetingIndex((prev) => (prev + 1) % greetings.length);
        setFade(true); // Fade back in with new word
      }, 300); // Wait for fade out to complete before changing word
    }, 2200);

    return () => clearInterval(interval);
  }, [greetings.length]);

  return (
    <section className="min-h-screen bg-yellow flex items-center pt-24 px-12 relative overflow-hidden" style={{
      background: '#FEE472',
    }}>
      {/* Decorative circles */}
      <div className="absolute top-[-80px] right-[-80px] w-96 h-96 rounded-full bg-orange opacity-15 pointer-events-none"></div>
      <div className="absolute bottom-[-100px] left-[28%] w-80 h-80 rounded-full bg-red opacity-8 pointer-events-none"></div>

      <div className="grid grid-cols-2 gap-10 items-center w-full max-w-7xl mx-auto relative z-10">
        {/* Left Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white border-2 border-brown rounded-full px-5 py-2 mb-6 font-black text-sm text-brown shadow-md" style={{boxShadow: '3px 3px 0 #995424'}}>
            👋 <span 
                 className="min-w-[110px]" 
                 style={{ 
                   color: '#F47B40', 
                   transition: 'opacity 0.3s ease-in-out', 
                   opacity: fade ? 1 : 0 
                 }}
               >
                 {greetings[greetingIndex]}
               </span> — from our kitchen to yours
          </div>

          <h1 className="text-7xl font-black leading-tight mb-4 text-brown">
            Real Indian food.<br/>
            <span style={{ color: '#DD2D2B' }}>Tasty.</span>{' '}<span style={{ color: '#16703A' }}>Healthy.</span><br/>
            Ready in minutes.
          </h1>

          <p className="text-lg leading-relaxed text-amber-900 font-semibold max-w-96 mb-8">
            No long hours. No Maggii. No refined oil. No preservatives. Just authentic, healthy Indian food made with love at home.
          </p>

          <div className="flex gap-4 mb-9">
            <a href="#products" className="inline-flex items-center gap-2 font-black text-lg px-8 py-3 rounded-full border-2 transition-all hover:-translate-x-1 hover:-translate-y-1" style={{ background: '#DD2D2B', color: '#fff', borderColor: '#1e0f00', boxShadow: '5px 5px 0 #1e0f00' }}>
              Shop Now →
            </a>
            <a href="#story" className="inline-flex items-center gap-2 bg-white text-brown font-black text-lg px-6 py-3 rounded-full border-2 border-brown transition-all hover:-translate-x-1 hover:-translate-y-1" style={{boxShadow: '5px 5px 0 #995424'}}>
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            <div className="bg-white border-2 border-brown rounded-2xl px-4 py-3 text-center shadow-md bg-opacity-100 transition-all hover:-translate-y-1" style={{boxShadow: '4px 4px 0 #995424'}}>
              <p className="text-2xl font-black leading-none" style={{ color: '#F47B40' }}>5K+</p>
              <p className="text-[10px] font-black uppercase tracking-wider text-brown mt-1">Happy Customers</p>
            </div>
            <div className="bg-white border-2 border-brown rounded-2xl px-4 py-3 text-center shadow-md bg-opacity-100 transition-all hover:-translate-y-1" style={{boxShadow: '4px 4px 0 #995424'}}>
              <p className="text-2xl font-black leading-none" style={{ color: '#F47B40' }}>100%</p>
              <p className="text-[10px] font-black uppercase tracking-wider text-brown mt-1">Homemade</p>
            </div>
            <div className="bg-white border-2 border-brown rounded-2xl px-4 py-3 text-center shadow-md bg-opacity-100 transition-all hover:-translate-y-1" style={{boxShadow: '4px 4px 0 #995424'}}>
              <p className="text-2xl font-black leading-none" style={{ color: '#F47B40' }}>0%</p>
              <p className="text-[10px] font-black uppercase tracking-wider text-brown mt-1">Preservatives</p>
            </div>
          </div>
        </div>

        {/* Right Content - Products Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Masala Khichdi */}
          <div className="bg-white border-3 rounded-3xl overflow-hidden transition-all hover:-translate-x-1 hover:-translate-y-1" style={{ borderColor: '#1e0f00', boxShadow: '6px 6px 0 #1e0f00' }}>
            <div className="h-28 w-full flex items-center justify-center text-5xl" style={{ background: 'linear-gradient(to br, rgba(254,228,114,0.3), rgba(254,228,114,0.1))' }}>🍲</div>
            <div className="p-3.5">
              <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: '#F47B40' }}>Meals</p>
              <p className="text-sm font-black" style={{ color: '#1e0f00' }}>Masala Khichdi</p>
              <p className="text-xs font-semibold" style={{ color: '#7a4a20' }}>150gm · Serves 2</p>
              <p className="text-base font-black mt-1.5" style={{ color: '#16703A' }}>₹150</p>
            </div>
          </div>

          {/* Vanilla Cake */}
          <div className="bg-white border-3 rounded-3xl overflow-hidden transition-all hover:-translate-x-1 hover:-translate-y-1" style={{ borderColor: '#1e0f00', boxShadow: '6px 6px 0 #1e0f00' }}>
            <div className="h-28 w-full flex items-center justify-center text-5xl" style={{ background: 'linear-gradient(to br, rgba(244,123,64,0.2), rgba(244,123,64,0.05))' }}>🍰</div>
            <div className="p-3.5">
              <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: '#F47B40' }}>Sweet</p>
              <p className="text-sm font-black" style={{ color: '#1e0f00' }}>Vanilla Cake</p>
              <p className="text-xs font-semibold" style={{ color: '#7a4a20' }}>200gm · Serves 5</p>
              <p className="text-base font-black mt-1.5" style={{ color: '#16703A' }}>₹150</p>
            </div>
          </div>

          {/* Moong Chilla */}
          <div className="bg-white border-3 rounded-3xl overflow-hidden transition-all hover:-translate-x-1 hover:-translate-y-1" style={{ borderColor: '#1e0f00', boxShadow: '6px 6px 0 #1e0f00' }}>
            <div className="h-28 w-full flex items-center justify-center text-5xl" style={{ background: 'linear-gradient(to br, rgba(244,123,64,0.25), rgba(244,123,64,0.08))' }}>🌅</div>
            <div className="p-3.5">
              <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: '#F47B40' }}>Breakfast</p>
              <p className="text-sm font-black" style={{ color: '#1e0f00' }}>Moong Chilla</p>
              <p className="text-xs font-semibold" style={{ color: '#7a4a20' }}>150gm · Makes 8</p>
              <p className="text-base font-black mt-1.5" style={{ color: '#16703A' }}>₹150</p>
            </div>
          </div>

          {/* Poha */}
          <div className="bg-white border-3 rounded-3xl overflow-hidden transition-all hover:-translate-x-1 hover:-translate-y-1" style={{ borderColor: '#1e0f00', boxShadow: '6px 6px 0 #1e0f00' }}>
            <div className="h-28 w-full flex items-center justify-center text-5xl" style={{ background: 'linear-gradient(to br, rgba(22,112,58,0.15), rgba(22,112,58,0.05))' }}>🌅</div>
            <div className="p-3.5">
              <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: '#F47B40' }}>Breakfast</p>
              <p className="text-sm font-black" style={{ color: '#1e0f00' }}>Poha</p>
              <p className="text-xs font-semibold" style={{ color: '#7a4a20' }}>150gm · Serves 2</p>
              <p className="text-base font-black mt-1.5" style={{ color: '#16703A' }}>₹80</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
