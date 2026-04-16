import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Strip from '@/components/strip';
import WhySection from '@/components/why-section';
import AudienceSection from '@/components/audience-section';
import ProductsSection from '@/components/products-section';
import StorySection from '@/components/story-section';
import Footer from '@/components/footer';
import ContactSection from '@/components/contact-section';
import { getFeaturedProducts, getProducts } from '@/lib/supabase/queries';

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


export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const allProducts = await getProducts();

  // If the admin hasn't specifically checked the "Featured" box on any products yet, 
  // gracefully fallback to showing the first 4 latest products dynamically instead of hardcoded dummies.
  const heroProducts = featuredProducts.length > 0 ? featuredProducts : allProducts.slice(0, 4);

  return (
    <>
      <Navbar />
      <Hero featuredProducts={heroProducts} />
      <Strip />
      <WhySection />
      <AudienceSection />
      <ProductsSection products={allProducts} />
      <StorySection />
      <DeliverySection />
      <ContactSection />
      <Footer />
    </>
  );
}
