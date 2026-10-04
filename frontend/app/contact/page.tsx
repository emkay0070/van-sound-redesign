'use client';

import Navigation from '@/components/navigation/Navigation';
import Footer from '@/components/footer/Footer';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Mail, Phone } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#080808]">
      <Navigation />

      <section className="relative pt-48 pb-32 md:pt-56 md:pb-48 px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto min-h-screen flex items-center">
        <div className="w-full grid lg:grid-cols-[1fr_1.2fr] gap-20 lg:gap-32 items-start">
          
          {/* Left: Contact Info & Typography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-px bg-brand-primary block" />
              <span className="font-label text-[10px] tracking-[0.5em] text-brand-primary uppercase">Contact</span>
            </div>
            
            <h1 
              className="font-display font-bold leading-[0.9] tracking-tight text-foreground mb-12"
              style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
            >
              LET'S BUILD<br />
              YOUR <span className="text-gradient-orange">MOMENT.</span>
            </h1>

            <div className="space-y-12">
              {/* Location */}
              <div className="flex gap-6">
                <div className="mt-1 text-brand-primary">
                  <MapPin size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-label text-xs tracking-widest text-foreground/40 uppercase mb-2">Location</h3>
                  <p className="font-sans text-lg text-foreground/80">
                    Along Bombo Road<br />
                    Kampala, Uganda
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-6">
                <div className="mt-1 text-brand-primary">
                  <Mail size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-label text-xs tracking-widest text-foreground/40 uppercase mb-2">Email</h3>
                  <a href="mailto:vansoundsltd@gmail.com" className="font-sans text-lg text-foreground/80 hover:text-brand-primary transition-colors">
                    vansoundsltd@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-6">
                <div className="mt-1 text-brand-primary">
                  <Phone size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-label text-xs tracking-widest text-foreground/40 uppercase mb-2">Phone</h3>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+256322414916" className="font-sans text-lg text-foreground/80 hover:text-brand-primary transition-colors">
                      +256 322 414916
                    </a>
                    <a href="tel:+256704141823" className="font-sans text-lg text-foreground/80 hover:text-brand-primary transition-colors">
                      +256 704 141823
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="bg-[#050505] border border-white/5 rounded-2xl p-8 md:p-12 lg:p-16"
          >
            <h3 className="font-display text-3xl mb-8 text-foreground">Project Inquiry</h3>
            
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="name" className="font-label text-[10px] tracking-widest uppercase text-foreground/40 block">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    className="w-full bg-transparent border-b border-white/5 py-3 text-foreground focus:outline-none focus:border-brand-primary transition-colors rounded-none"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="font-label text-[10px] tracking-widest uppercase text-foreground/40 block">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    className="w-full bg-transparent border-b border-white/5 py-3 text-foreground focus:outline-none focus:border-brand-primary transition-colors rounded-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="service" className="font-label text-[10px] tracking-widest uppercase text-foreground/40 block">Service Required</label>
                <select 
                  id="service"
                  className="w-full bg-transparent border-b border-white/5 py-3 text-foreground/80 focus:outline-none focus:border-brand-primary transition-colors appearance-none rounded-none cursor-pointer"
                >
                  <option value="" className="bg-[#080808]">Select a service...</option>
                  <option value="pa" className="bg-[#080808]">Event P.A. System</option>
                  <option value="planning" className="bg-[#080808]">Event Planning</option>
                  <option value="lighting" className="bg-[#080808]">Lighting & Staging</option>
                  <option value="entertainment" className="bg-[#080808]">Entertainment</option>
                  <option value="other" className="bg-[#080808]">Multiple / Other</option>
                </select>
              </div>

              <div className="space-y-3">
                <label htmlFor="message" className="font-label text-[10px] tracking-widest uppercase text-foreground/40 block">Event Details</label>
                <textarea 
                  id="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-white/5 py-3 text-foreground focus:outline-none focus:border-brand-primary transition-colors rounded-none resize-none"
                  placeholder="Tell us about your dates, venue, and expected scale..."
                />
              </div>

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-3 px-8 py-5 bg-foreground hover:bg-brand-primary text-[#080808] font-label text-xs tracking-[0.25em] uppercase transition-all duration-300"
              >
                Send Inquiry
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
