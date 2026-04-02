'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 px-12" style={{ background: '#FEE472' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-16 items-center">
        {/* Left - Text */}
        <div>
          <h2 className="text-5xl font-black text-brown mb-6">Get in Touch</h2>
          <p className="text-lg text-amber-900 font-semibold mb-8 leading-relaxed">
            Have questions? Want to collaborate? Or just want to say hello? We&apos;d love to hear from you. Drop us a message and we&apos;ll get back to you within 24 hours.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="text-2xl">📧</div>
              <div>
                <p className="font-black text-brown">Email</p>
                <p className="text-amber-800 text-sm">hello@sabhichef.com</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="text-2xl">📱</div>
              <div>
                <p className="font-black text-brown">WhatsApp</p>
                <p className="text-amber-800 text-sm">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="text-2xl">📍</div>
              <div>
                <p className="font-black text-brown">Location</p>
                <p className="text-amber-800 text-sm">Delhi, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="bg-white border-3 border-brown rounded-3xl p-8" style={{ boxShadow: '8px 8px 0 #995424' }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-brown rounded-xl font-semibold text-brown placeholder-brown/40 focus:outline-none focus:ring-2 focus:ring-orange"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-brown rounded-xl font-semibold text-brown placeholder-brown/40 focus:outline-none focus:ring-2 focus:ring-orange"
                required
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-brown rounded-xl font-semibold text-brown placeholder-brown/40 focus:outline-none focus:ring-2 focus:ring-orange"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-brown rounded-xl font-semibold text-brown placeholder-brown/40 focus:outline-none focus:ring-2 focus:ring-orange resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red text-white font-black py-3 rounded-full border-2 border-ink transition-all hover:-translate-x-1 hover:-translate-y-1"
              style={{ boxShadow: '5px 5px 0 #1e0f00' }}
            >
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
