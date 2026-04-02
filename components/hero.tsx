'use client';

export default function Hero() {
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
            👋 <span className="text-orange min-w-[110px]">नमस्ते!</span> — from our kitchen to yours
          </div>

          <h1 className="text-7xl font-black leading-tight mb-4 text-brown">
            Real Indian food.<br/>
            <span className="text-red">Tasty.</span> <span className="text-green">Healthy.</span><br/>
            Ready in minutes.
          </h1>

          <p className="text-lg leading-relaxed text-amber-900 font-semibold max-w-96 mb-8">
            No long hours. No Maggi. No refined oil. No preservatives. Just authentic, healthy Indian food made with love at home.
          </p>

          <div className="flex gap-4 mb-9">
            <a href="#products" className="inline-flex items-center gap-2 bg-red text-white font-black text-lg px-8 py-3 rounded-full border-2 border-ink transition-all hover:-translate-x-1 hover:-translate-y-1" style={{boxShadow: '5px 5px 0 #1e0f00'}}>
              Shop Now →
            </a>
            <a href="#story" className="inline-flex items-center gap-2 bg-white text-brown font-black text-lg px-6 py-3 rounded-full border-2 border-brown transition-all hover:-translate-x-1 hover:-translate-y-1" style={{boxShadow: '5px 5px 0 #995424'}}>
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            <div className="bg-white border-2 border-brown rounded-2xl px-4 py-3 text-center shadow-md" style={{boxShadow: '4px 4px 0 #995424'}}>
              <p className="text-2xl font-black text-orange leading-none">5K+</p>
              <p className="text-xs font-black uppercase tracking-wider text-brown mt-1">Happy Customers</p>
            </div>
            <div className="bg-white border-2 border-brown rounded-2xl px-4 py-3 text-center shadow-md" style={{boxShadow: '4px 4px 0 #995424'}}>
              <p className="text-2xl font-black text-orange leading-none">100%</p>
              <p className="text-xs font-black uppercase tracking-wider text-brown mt-1">Homemade</p>
            </div>
            <div className="bg-white border-2 border-brown rounded-2xl px-4 py-3 text-center shadow-md" style={{boxShadow: '4px 4px 0 #995424'}}>
              <p className="text-2xl font-black text-orange leading-none">0%</p>
              <p className="text-xs font-black uppercase tracking-wider text-brown mt-1">Preservatives</p>
            </div>
          </div>
        </div>

        {/* Right Content - Products Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border-3 border-ink rounded-3xl overflow-hidden shadow-md transition-all hover:-translate-x-1 hover:-translate-y-1" style={{boxShadow: '6px 6px 0 #1e0f00'}}>
            <div className="bg-gradient-to-b from-orange/30 to-orange/10 h-32 w-full flex items-center justify-center text-5xl">🌅</div>
            <div className="p-4">
              <p className="text-xs font-black uppercase tracking-wider text-orange mb-1">Breakfast</p>
              <p className="text-sm font-black">Moong Chilla</p>
              <p className="text-xs text-amber-800 font-semibold">150gm · Makes 8</p>
              <p className="text-base font-black text-green mt-2">₹150</p>
            </div>
          </div>

          <div className="bg-white border-3 border-ink rounded-3xl overflow-hidden shadow-md transition-all hover:-translate-x-1 hover:-translate-y-1" style={{boxShadow: '6px 6px 0 #1e0f00'}}>
            <div className="bg-gradient-to-b from-peach/30 to-peach/10 h-32 w-full flex items-center justify-center text-5xl">☕</div>
            <div className="p-4">
              <p className="text-xs font-black uppercase tracking-wider text-orange mb-1">Beverage</p>
              <p className="text-sm font-black">Coconut Coffee</p>
              <p className="text-xs text-amber-800 font-semibold">150gm · Serves 15</p>
              <p className="text-base font-black text-green mt-2">₹250</p>
            </div>
          </div>

          <div className="col-span-2 bg-white border-3 border-ink rounded-3xl overflow-hidden shadow-md transition-all hover:-translate-x-1 hover:-translate-y-1" style={{boxShadow: '6px 6px 0 #1e0f00'}}>
            <div className="grid grid-cols-2">
              <div className="bg-gradient-to-b from-yellow/30 to-yellow/10 h-48 w-full flex items-center justify-center text-6xl">🍲</div>
              <div className="p-5 flex flex-col justify-center">
                <p className="text-xs font-black uppercase tracking-wider text-orange mb-2">Meals</p>
                <p className="text-sm font-black">Masala Khichdi</p>
                <p className="text-xs text-amber-800 font-semibold mb-3">150gm · Serves 2</p>
                <p className="text-lg font-black text-green mb-2">₹150</p>
                <a href="#products" className="bg-yellow border-2 border-ink rounded-full px-3 py-1.5 font-black text-sm cursor-pointer transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 text-center" style={{boxShadow: '3px 3px 0 #1e0f00'}}>
                  Shop Now →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
