'use client';

export default function DeliverySection() {
  const steps = [
    { num: '1', title: 'Order Now', desc: 'Browse & select your favorites' },
    { num: '2', title: 'We Cook', desc: 'Fresh cooked in our kitchen' },
    { num: '3', title: 'Quick Pack', desc: 'Packed with care & love' },
    { num: '4', title: 'Delivered', desc: 'Hot & fresh at your door' },
  ];

  return (
    <section id="delivery" className="py-24 px-12 bg-green" style={{ background: '#16703A' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-black text-white mb-4 text-center">How We Deliver</h2>
        <p className="text-center text-white/70 font-semibold mb-16 max-w-2xl mx-auto">
          From our kitchen to your table in just 4 simple steps. Fresh, hot, and ready to eat.
        </p>

        <div className="grid grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="w-20 h-20 bg-yellow rounded-full flex items-center justify-center mx-auto mb-4 font-black text-2xl text-ink border-3 border-white">
                {step.num}
              </div>
              <h3 className="text-xl font-black text-white mb-2">{step.title}</h3>
              <p className="text-white/60 font-semibold text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
