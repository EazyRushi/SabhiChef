'use client';

export default function Strip() {
  const items = [
    '🎉 Zero Preservatives',
    '100% Homemade',
    'Fresh Daily',
    'Indian Recipes',
    'Family Love',
    '❤️ Made by Moms',
    'No Chemicals',
    'Ready in Minutes',
  ];

  const textBlock = items.join(' • ') + ' • ';

  return (
    <div
      className="overflow-hidden border-y-4"
      style={{
        marginTop: '5px',
        background: '#16703A',
        borderTopColor: '#1e0f00',
        borderBottomColor: '#1e0f00',
      }}
    >
      <div className="strip-scroll-container py-3">
        <span className="strip-scroll-text">{textBlock}</span>
        <span className="strip-scroll-text">{textBlock}</span>
      </div>
      <style>{`
        .strip-scroll-container {
          display: flex;
          width: max-content;
          animation: strip-scroll 28s linear infinite;
        }
        .strip-scroll-text {
          white-space: nowrap;
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 0.05em;
          color: #FEE472;
          padding: 0 0;
          flex-shrink: 0;
        }
        @keyframes strip-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
