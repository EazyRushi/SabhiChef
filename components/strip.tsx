'use client';

export default function Strip() {
  const text = "🎉 Zero Preservatives • 100% Homemade • Fresh Daily • Indian Recipes • Family Love • ";
  const repeatedText = text + text + text;

  return (
    <div className="bg-green text-yellow px-0 overflow-hidden border-y-4 border-ink" style={{
      background: '#16703A',
      color: '#FEE472',
      borderTopColor: '#1e0f00',
      borderBottomColor: '#1e0f00'
    }}>
      <div className="flex whitespace-nowrap animate-scroll py-3">
        <div className="flex animate-scroll">
          <span className="text-xs font-black letter-spacing tracking-wider text-yellow px-8">{repeatedText}</span>
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 22s linear infinite;
        }
      `}</style>
    </div>
  );
}
