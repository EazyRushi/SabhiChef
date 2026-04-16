'use client';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-12" style={{ background: '#FEE472' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-5xl font-black mb-6" style={{ color: '#995424' }}>Get in Touch</h2>
          <p className="text-lg font-semibold mb-8 leading-relaxed" style={{ color: '#6B4423' }}>
            Have questions? Want to collaborate? Or just want to say hello? We&apos;d love to hear from you.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="text-2xl">📧</div>
              <div>
                <p className="font-black" style={{ color: '#995424' }}>Email</p>
                <p className="text-sm" style={{ color: '#6B4423' }}>hello@sabhichef.com</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="text-2xl">📱</div>
              <div>
                <p className="font-black" style={{ color: '#995424' }}>WhatsApp</p>
                <p className="text-sm" style={{ color: '#6B4423' }}>+91 98765 43210</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="text-2xl">📍</div>
              <div>
                <p className="font-black" style={{ color: '#995424' }}>Location</p>
                <p className="text-sm" style={{ color: '#6B4423' }}>Delhi, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-3 rounded-3xl p-8" style={{ borderColor: '#995424', boxShadow: '8px 8px 0 #995424', borderWidth: 3 }}>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border-2 rounded-xl font-semibold focus:outline-none"
              style={{ borderColor: '#995424', color: '#995424', borderWidth: 2 }}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border-2 rounded-xl font-semibold focus:outline-none"
              style={{ borderColor: '#995424', color: '#995424', borderWidth: 2 }}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border-2 rounded-xl font-semibold focus:outline-none"
              style={{ borderColor: '#995424', color: '#995424', borderWidth: 2 }}
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 border-2 rounded-xl font-semibold focus:outline-none resize-none"
              style={{ borderColor: '#995424', color: '#995424', borderWidth: 2 }}
            />
            <button
              type="submit"
              className="w-full text-white font-black py-3 rounded-full border-2 transition-all hover:-translate-x-1 hover:-translate-y-1"
              style={{ background: '#DD2D2B', borderColor: '#1e0f00', boxShadow: '5px 5px 0 #1e0f00', borderWidth: 2 }}
            >
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
