'use client';

export default function WhySection() {
  const features = [
    { emoji: '🧑‍🍳', title: 'Cooked by Moms', desc: 'Real mothers, real recipes, real love' },
    { emoji: '🌿', title: 'Healthy', desc: 'No artificial chemicals or additives' },
    { emoji: '⚡', title: 'Ready in Minutes', desc: 'Heat and serve in 5 minutes max' },
    { emoji: '💚', title: 'Budget Friendly', desc: 'Homemade quality, affordable prices' },
  ];

  return (
    <section className="py-20 px-12 bg-cream border-y-4 border-ink" style={{
      background: '#FFF9ED',
      borderTopColor: '#1e0f00',
      borderBottomColor: '#1e0f00'
    }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-14 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-1.5 bg-yellow border-2 border-brown rounded-full px-4 py-1.5 mb-3 font-black text-xs" style={{
              background: '#FEE472',
              borderColor: '#995424'
            }}>
              ⭐ Why Choose Us?
            </div>
            <h2 className="text-5xl font-black leading-tight mb-2.5 text-brown">
              Real food from<br/>real kitchens
            </h2>
            <p className="text-base leading-relaxed text-amber-900 font-semibold mb-5 max-w-sm">
              We started Sabhi Chef because we missed home-cooked food. Our moms cook authentic recipes with love.
            </p>

            <div className="flex flex-wrap gap-2.5 mt-5">
              <div className="inline-flex items-center gap-1.5 bg-white border-2 border-brown rounded-full px-3.5 py-1.5 text-xs font-black text-brown shadow-sm" style={{boxShadow: '3px 3px 0 #995424'}}>
                No Preservatives
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white border-2 border-brown rounded-full px-3.5 py-1.5 text-xs font-black text-brown shadow-sm" style={{boxShadow: '3px 3px 0 #995424'}}>
                100% Homemade
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white border-2 border-brown rounded-full px-3.5 py-1.5 text-xs font-black text-brown shadow-sm" style={{boxShadow: '3px 3px 0 #995424'}}>
                Fresh Daily
              </div>
            </div>
          </div>

          {/* Right - Cards Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="bg-yellow rounded-4xl p-5 border-3 border-ink transition-all hover:-translate-x-1 hover:-translate-y-1" style={{
              background: '#FEE472',
              boxShadow: '4px 4px 0 #1e0f00'
            }}>
              <div className="text-4xl mb-2.5">{features[0].emoji}</div>
              <h4 className="text-sm font-black mb-1 text-brown">{features[0].title}</h4>
              <p className="text-xs font-semibold text-amber-900">{features[0].desc}</p>
            </div>

            <div className="bg-orange rounded-4xl p-5 border-3 border-ink text-white transition-all hover:-translate-x-1 hover:-translate-y-1" style={{
              background: '#F47B40',
              boxShadow: '4px 4px 0 #1e0f00'
            }}>
              <div className="text-4xl mb-2.5">{features[1].emoji}</div>
              <h4 className="text-sm font-black mb-1">{features[1].title}</h4>
              <p className="text-xs font-semibold opacity-85">{features[1].desc}</p>
            </div>

            <div className="bg-green rounded-4xl p-5 border-3 border-ink transition-all hover:-translate-x-1 hover:-translate-y-1" style={{
              background: '#e0f5e8',
              boxShadow: '4px 4px 0 #1e0f00'
            }}>
              <div className="text-4xl mb-2.5">{features[2].emoji}</div>
              <h4 className="text-sm font-black mb-1 text-brown">{features[2].title}</h4>
              <p className="text-xs font-semibold text-amber-900">{features[2].desc}</p>
            </div>

            <div className="bg-peach rounded-4xl p-5 border-3 border-ink transition-all hover:-translate-x-1 hover:-translate-y-1" style={{
              background: '#F4A789',
              boxShadow: '4px 4px 0 #1e0f00'
            }}>
              <div className="text-4xl mb-2.5">{features[3].emoji}</div>
              <h4 className="text-sm font-black mb-1 text-brown">{features[3].title}</h4>
              <p className="text-xs font-semibold text-amber-900">{features[3].desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
