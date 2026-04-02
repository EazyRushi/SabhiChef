'use client';

export default function StorySection() {
  return (
    <section id="story" className="py-20 px-12 bg-cream" style={{ background: '#FFF9ED' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-15 items-center">
          {/* Left - Story Card */}
          <div className="relative">
            <div className="bg-yellow border-3 border-ink rounded-4xl p-11 text-center shadow-lg" style={{
              background: '#FEE472',
              boxShadow: '7px 7px 0 #1e0f00'
            }}>
              <div className="text-7xl mb-3.5 block">🍳</div>
              <h3 className="text-2xl font-black text-brown mb-1">Our Story</h3>
              <p className="text-xs text-amber-800 font-black">How Sabhi Chef began</p>
            </div>

            <div className="absolute bottom-[-20px] right-[-20px] bg-red text-white border-3 border-ink rounded-3xl p-3.5 max-w-52 shadow-md" style={{boxShadow: '4px 4px 0 #1e0f00'}}>
              <p className="text-xs leading-relaxed font-bold mb-1.5 italic">
                "We were missing mom's food so badly, we decided to bring it to everyone!"
              </p>
              <p className="text-xs font-black opacity-85">— Founders, Delhi 2023</p>
            </div>
          </div>

          {/* Right - Story Text */}
          <div>
            <p className="text-base leading-relaxed text-amber-900 font-semibold mb-3.5">
              Sabhi Chef started when three friends realized they were spending hundreds eating out and still missing home-cooked food. We partnered with real home cooks (moms and grandmas!) who share our passion for authentic Indian recipes.
            </p>
            <p className="text-base leading-relaxed text-amber-900 font-semibold mb-5.5">
              Today, we deliver fresh, homemade Indian food to thousands across India. Every meal is made with the same love and care our mothers gave us.
            </p>

            <div className="grid grid-cols-2 gap-2.5 mt-5.5">
              <div className="flex items-center gap-2">
                <div className="w-6.5 h-6.5 rounded-2xl bg-yellow border-2 border-brown flex items-center justify-center text-xs font-black" style={{
                  background: '#FEE472',
                  borderColor: '#995424'
                }}>
                  ✓
                </div>
                <span className="text-xs font-black text-brown">Real Mothers Cook</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6.5 h-6.5 rounded-2xl bg-yellow border-2 border-brown flex items-center justify-center text-xs font-black" style={{
                  background: '#FEE472',
                  borderColor: '#995424'
                }}>
                  ✓
                </div>
                <span className="text-xs font-black text-brown">Zero Preservatives</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6.5 h-6.5 rounded-2xl bg-yellow border-2 border-brown flex items-center justify-center text-xs font-black" style={{
                  background: '#FEE472',
                  borderColor: '#995424'
                }}>
                  ✓
                </div>
                <span className="text-xs font-black text-brown">Made Fresh Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6.5 h-6.5 rounded-2xl bg-yellow border-2 border-brown flex items-center justify-center text-xs font-black" style={{
                  background: '#FEE472',
                  borderColor: '#995424'
                }}>
                  ✓
                </div>
                <span className="text-xs font-black text-brown">Authentic Recipes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
