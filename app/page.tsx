import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Strip from '@/components/strip';
import WhySection from '@/components/why-section';
import AudienceSection from '@/components/audience-section';
import ProductsSection from '@/components/products-section';
import StorySection from '@/components/story-section';
import Footer from '@/components/footer';
import { getFeaturedProducts } from '@/lib/supabase/queries';

export const revalidate = 60;

function DeliverySection() {
  const steps = [
    { num: '1', title: 'Order Now', desc: 'Browse & select your favorites' },
    { num: '2', title: 'We Cook', desc: 'Fresh cooked in our kitchen' },
    { num: '3', title: 'Quick Pack', desc: 'Packed with care & love' },
    { num: '4', title: 'Delivered', desc: 'Hot & fresh at your door' },
  ];

  return (
    <section id="delivery" className="py-24 px-12" style={{ background: '#16703A' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-black text-white mb-4 text-center">How We Deliver</h2>
        <p className="text-center text-white/70 font-semibold mb-16 max-w-2xl mx-auto">
          From our kitchen to your table in just 4 simple steps. Fresh, hot, and ready to eat.
        </p>

        <div className="grid grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 font-black text-2xl border-3 border-white" style={{ background: '#FEE472', color: '#1e0f00' }}>
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

function ContactSection() {
  return (
    <section id="contact" className="py-24 px-12" style={{ background: '#FEE472' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-16 items-center">
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

        <div className="bg-white border-3 rounded-3xl p-8" style={{ borderColor: '#995424', boxShadow: '8px 8px 0 #995424' }}>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border-2 rounded-xl font-semibold focus:outline-none"
              style={{ borderColor: '#995424', color: '#995424' }}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border-2 rounded-xl font-semibold focus:outline-none"
              style={{ borderColor: '#995424', color: '#995424' }}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border-2 rounded-xl font-semibold focus:outline-none"
              style={{ borderColor: '#995424', color: '#995424' }}
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 border-2 rounded-xl font-semibold focus:outline-none resize-none"
              style={{ borderColor: '#995424', color: '#995424' }}
            />
            <button
              type="submit"
              className="w-full text-white font-black py-3 rounded-full border-2 transition-all hover:-translate-x-1 hover:-translate-y-1"
              style={{ background: '#DD2D2B', borderColor: '#1e0f00', boxShadow: '5px 5px 0 #1e0f00' }}
            >
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <Navbar />
      <Hero featuredProducts={featuredProducts} />
      <Strip />
      <WhySection />
      <AudienceSection />
      <ProductsSection />
      <StorySection />
      <DeliverySection />
      <ContactSection />
      <Footer />
    </>
  );
}
