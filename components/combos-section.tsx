'use client';

export default function CombosSection() {
  const combos = [
    {
      emoji: '🌟',
      title: 'Starter Pack',
      desc: 'Perfect to try us out',
      items: ['Samosa (6)', 'Pakora Mix', 'Chutney'],
      price: '₹249'
    },
    {
      emoji: '💪',
      title: 'Family Feast',
      desc: 'Feed 3-4 people',
      items: ['Butter Chicken', 'Dal Makhni', 'Roti Set', 'Salad'],
      price: '₹599'
    },
    {
      emoji: '🎉',
      title: 'Celebration Box',
      desc: 'For special occasions',
      items: ['2x Curry', 'Breads', 'Dessert', 'Drinks'],
      price: '₹999'
    },
  ];

  return (
    <section id="combos" className="py-20 px-12 bg-orange border-y-4 border-ink" style={{
      background: '#F47B40',
      borderTopColor: '#1e0f00',
      borderBottomColor: '#1e0f00'
    }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-black text-white mb-9">
          🎁 Smart Combos
        </h2>

        <div className="grid grid-cols-3 gap-3.5">
          {combos.map((combo, i) => (
            <div
              key={i}
              className="bg-white border-3 border-ink rounded-4xl p-6 shadow-md transition-all hover:-translate-x-1 hover:-translate-y-1"
              style={{
                boxShadow: '5px 5px 0 #1e0f00'
              }}
            >
              <div className="text-4xl mb-2.5">{combo.emoji}</div>
              <h3 className="text-2xl font-black text-brown mb-1">{combo.title}</h3>
              <p className="text-sm text-amber-800 font-semibold mb-2.5">{combo.desc}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {combo.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-xs font-black bg-cream border-2 border-brown rounded-4xl px-2.5 py-1 text-brown"
                    style={{
                      background: '#FFF9ED',
                      borderColor: '#995424'
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex items-end justify-between">
                <div className="text-2xl font-black text-orange">{combo.price}</div>
                <button className="bg-red text-white border-2 border-brown px-4 py-2 rounded-full font-black text-xs cursor-pointer transition-all hover:-translate-x-0.5 hover:-translate-y-0.5" style={{boxShadow: '3px 3px 0 #1e0f00'}}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
