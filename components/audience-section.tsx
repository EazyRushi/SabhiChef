'use client';

export default function AudienceSection() {
  const audiences = [
    {
      emoji: '🎓',
      title: 'Students Abroad',
      desc: 'Missing home food? Get the taste of home delivered to your hostel or apartment.',
      color: '#1a2a00',
      quote: '"Finally, I can eat like Mom cooks!" - Priya, Toronto'
    },
    {
      emoji: '💼',
      title: 'Busy Professionals',
      desc: 'No time to cook? Heat for 5 mins and enjoy authentic Indian food guilt-free.',
      color: '#2e1400',
      quote: '"Game changer for my work week!" - Rahul, Delhi'
    },
    {
      emoji: '❤️',
      title: 'Health Conscious',
      desc: 'Real food with zero preservatives. Know exactly what goes into your meals.',
      color: '#001a2e',
      quote: '"Finally healthy Indian food!" - Neha, Mumbai'
    },
  ];

  return (
    <section className="py-20 px-12 bg-ink text-white border-y-4 border-yellow" style={{
      background: '#1e0f00',
      borderTopColor: '#FEE472',
      borderBottomColor: '#FEE472'
    }}>
      <div className="max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-yellow text-brown border-2 border-brown rounded-full px-4 py-1.5 mb-3 font-black text-xs" style={{
          background: '#FEE472',
          borderColor: '#995424'
        }}>
          👥 Made for Everyone
        </div>
        <h2 className="text-5xl font-black leading-tight mb-9 text-yellow">
          Who is this for?
        </h2>

        <div className="grid grid-cols-3 gap-5">
          {audiences.map((item, i) => (
            <div
              key={i}
              className="rounded-3xl px-7 py-8 border-3 border-white/12 transition-all hover:border-yellow hover:-translate-y-1.5"
              style={{ background: item.color }}
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-2xl font-black mb-2.5">{item.title}</h3>
              <p className="text-sm leading-relaxed text-white/62 font-semibold mb-3.5">
                {item.desc}
              </p>
              <p className="text-xs italic font-bold text-yellow">
                {item.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
