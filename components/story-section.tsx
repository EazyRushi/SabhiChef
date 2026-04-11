'use client';

export default function StorySection() {
  return (
    <section id="story" className="py-20 px-12 bg-cream" style={{ background: '#FFF9ED' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-15 items-center">
          {/* Left - Story Card */}
          <div className="relative pb-7">
            <div className="bg-yellow border-3 border-ink rounded-4xl p-11 text-center shadow-lg" style={{
              background: '#FEE472',
              boxShadow: '7px 7px 0 #1e0f00'
            }}>
              <span className="text-7xl mb-3.5 block">👩‍🍳</span>
              <h3 className="text-xl font-black text-brown mb-1">Surekha & Ruchita</h3>
              <p className="text-xs text-[#7a4a20] font-black">Founders, Sabhi Chef</p>
              <p className="mt-2.5 text-[12px] text-[#7a4a20] font-semibold leading-relaxed">
                A mother–daughter duo who turned a longing for home food into a brand that feeds thousands.
              </p>
            </div>

            <div className="absolute bottom-[8px] right-[-20px] bg-red text-white border-3 border-ink rounded-2xl p-4 max-w-[200px] shadow-md" style={{ background: '#DD2D2B', boxShadow: '4px 4px 0 #1e0f00'}}>
              <p className="text-xs leading-relaxed font-bold mb-1.5 italic">
                "I just wanted my daughter to have a warm meal, no matter where she was."
              </p>
              <div className="text-[10px] font-black opacity-85 mt-1.5">— Surekha, Head Chef</div>
            </div>
          </div>

          {/* Right - Story Text */}
          <div>
            <div className="inline-flex items-center gap-1.5 bg-yellow border-2 border-brown rounded-full px-4 py-1.5 mb-3 font-black text-xs uppercase tracking-wider" style={{
              background: '#FEE472',
              borderColor: '#995424'
            }}>
              Our Story
            </div>
            <h2 className="text-5xl font-black leading-tight mb-4 text-brown">
              Born from a <span style={{ color: '#DD2D2B' }}>mother's love</span>
            </h2>
            <p className="text-[15px] leading-relaxed text-amber-900 font-semibold mb-3.5">
              When Ruchita left home to study abroad, she carried her textbooks, her ambitions — and a deep craving for her mother's cooking. Surekha felt it too, on the other side of the world.
            </p>
            <p className="text-[15px] leading-relaxed text-amber-900 font-semibold mb-3.5">
              So Surekha did what any loving Indian mother would: she sent homemade mixes. Ruchita would open each packet in her tiny dorm kitchen and suddenly — thousands of miles from home — it smelled exactly like Sunday mornings.
            </p>
            <p className="text-[15px] leading-relaxed text-amber-900 font-semibold mb-5.5">
              They realised thousands of students, professionals, and travellers felt the same way. Sabhi Chef was born — so everyone could have a taste of home, every single day.
            </p>

            <div className="grid grid-cols-2 gap-2.5 mt-5.5">
              <div className="flex items-center gap-2">
                <div className="w-[26px] h-[26px] min-w-[26px] rounded-lg border-2 flex items-center justify-center text-xs font-black" style={{ background: '#FEE472', borderColor: '#995424' }}>🌿</div>
                <span className="text-[12px] font-black text-brown">Preservative-free, always</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[26px] h-[26px] min-w-[26px] rounded-lg border-2 flex items-center justify-center text-xs font-black" style={{ background: '#FEE472', borderColor: '#995424' }}>🏠</div>
                <span className="text-[12px] font-black text-brown">Homemade with care</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[26px] h-[26px] min-w-[26px] rounded-lg border-2 flex items-center justify-center text-xs font-black" style={{ background: '#FEE472', borderColor: '#995424' }}>✨</div>
                <span className="text-[12px] font-black text-brown">Highest hygiene standards</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[26px] h-[26px] min-w-[26px] rounded-lg border-2 flex items-center justify-center text-xs font-black" style={{ background: '#FEE472', borderColor: '#995424' }}>💛</div>
                <span className="text-[12px] font-black text-brown">Authentic family recipes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[26px] h-[26px] min-w-[26px] rounded-lg border-2 flex items-center justify-center text-xs font-black" style={{ background: '#FEE472', borderColor: '#995424' }}>⚡</div>
                <span className="text-[12px] font-black text-brown">Ready in minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[26px] h-[26px] min-w-[26px] rounded-lg border-2 flex items-center justify-center text-xs font-black" style={{ background: '#FEE472', borderColor: '#995424' }}>🌍</div>
                <span className="text-[12px] font-black text-brown">Made for Indians everywhere</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
