'use client';

export default function Footer() {
  return (
    <footer className="bg-ink text-white px-12 pt-14 pb-7 border-t-1 border-yellow" style={{
      background: '#1e0f00',
      borderTopColor: '#FEE472'
    }}>
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-4 gap-11 mb-11 pb-9 border-b border-white/10">
          {/* Logo & About */}
          <div>
            <img src="/logo.png" alt="Sabhi Chef Logo" className="h-14 w-auto object-contain mb-3" />
            <p className="text-sm text-white/48 leading-relaxed max-w-57 font-semibold">
              Sabhi Chef brings authentic homemade Indian food to your doorstep. Cooked by real mothers with real love.
            </p>
            <div className="flex gap-2.25 mt-4">
              {['f', 'in', 'tw', 'ig'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8.5 h-8.5 rounded-full border border-white/18 flex items-center justify-center text-xs no-underline transition-all hover:bg-yellow hover:border-yellow"
                >
                  {social === 'f' && '📘'}
                  {social === 'in' && '📍'}
                  {social === 'tw' && '𝕏'}
                  {social === 'ig' && '📷'}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-white/32 mb-3.5">Products</h5>
            <ul className="list-none space-y-2.25">
              <li><a href="#products" className="text-sm text-white/58 no-underline font-black transition-colors hover:text-yellow">All Products</a></li>
              <li><a href="#" className="text-sm text-white/58 no-underline font-black transition-colors hover:text-yellow">New Arrivals</a></li>
              <li><a href="#" className="text-sm text-white/58 no-underline font-black transition-colors hover:text-yellow">Bestsellers</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-white/32 mb-3.5">Company</h5>
            <ul className="list-none space-y-2.25">
              <li><a href="#story" className="text-sm text-white/58 no-underline font-black transition-colors hover:text-yellow">About Us</a></li>
              <li><a href="#" className="text-sm text-white/58 no-underline font-black transition-colors hover:text-yellow">Blog</a></li>
              <li><a href="#" className="text-sm text-white/58 no-underline font-black transition-colors hover:text-yellow">Careers</a></li>
              <li><a href="#" className="text-sm text-white/58 no-underline font-black transition-colors hover:text-yellow">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-white/32 mb-3.5">Support</h5>
            <ul className="list-none space-y-2.25">
              <li><a href="#" className="text-sm text-white/58 no-underline font-black transition-colors hover:text-yellow">FAQ</a></li>
              <li><a href="#" className="text-sm text-white/58 no-underline font-black transition-colors hover:text-yellow">Shipping Info</a></li>
              <li><a href="#" className="text-sm text-white/58 no-underline font-black transition-colors hover:text-yellow">Returns</a></li>
              <li><a href="#" className="text-sm text-white/58 no-underline font-black transition-colors hover:text-yellow">Privacy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center text-xs text-white/28 font-black">
          <p>© 2024 Sabhi Chef. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-white/28 no-underline transition-colors hover:text-yellow">Terms</a>
            <a href="#" className="text-white/28 no-underline transition-colors hover:text-yellow">Privacy</a>
            <a href="#" className="text-white/28 no-underline transition-colors hover:text-yellow">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
