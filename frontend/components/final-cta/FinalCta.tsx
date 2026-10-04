'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

export default function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  const whatsappNumber = '+256704141823';
  const whatsappMessage = encodeURIComponent("Hi VAN SOUND EVENTS, I'd like to discuss an event project.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section
      id="event-inquiry"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080808] py-16"
    >
      <div className="relative w-full max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="relative rounded-2xl overflow-hidden py-32 md:py-48 px-6 text-center">
          {/* Background image — very dark */}
          <motion.div style={{ scale: bgScale }} className="absolute inset-0 will-change-transform">
            <img
              src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=2000&q=70"
              alt="Live event atmosphere"
              className="w-full h-full object-cover opacity-15"
              loading="lazy"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/60 to-[#060606]/80" />

          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[600px] h-[40vh] bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 w-full max-w-[1000px] mx-auto">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="flex items-center justify-center gap-4 mb-16"
            >
              <span className="w-8 h-px bg-brand-primary/50 block" />
              <span className="font-label text-[10px] tracking-[0.5em] text-brand-primary uppercase">Your Event Starts Here</span>
              <span className="w-8 h-px bg-brand-primary/50 block" />
            </motion.div>

            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="mb-16 md:mb-20"
            >
              <h2
                className="font-display font-bold text-foreground leading-[0.88] tracking-tight"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 12rem)' }}
              >
                YOUR EVENT
              </h2>
              <h2
                className="font-display font-bold text-gradient-orange leading-[0.88] tracking-tight"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 12rem)' }}
              >
                STARTS
              </h2>
              <h2
                className="font-display font-bold text-foreground leading-[0.88] tracking-tight"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 12rem)' }}
              >
                HERE.
              </h2>
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="font-sans text-base md:text-lg text-foreground/45 max-w-md mx-auto mb-14 leading-relaxed"
            >
              Tell us what you're planning. We'll take it from there.
            </motion.p>

            {/* Primary CTA — WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-5 bg-[#25D366] hover:bg-[#20B858] text-white font-label text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:scale-105"
              >
                <MessageCircle size={18} />
                WhatsApp Us →
              </a>

              <a
                href="mailto:vansoundsltd@gmail.com"
                className="group inline-flex items-center gap-3 px-8 py-5 border border-white/5 hover:border-brand-primary/50 text-foreground/50 hover:text-foreground font-label text-xs tracking-[0.25em] uppercase transition-all duration-300"
              >
                Start an Enquiry
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Contact meta */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-6 text-foreground/25"
            >
              <a href="mailto:vansoundsltd@gmail.com" className="font-label text-[10px] tracking-[0.25em] hover:text-foreground/50 transition-colors uppercase">
                vansoundsltd@gmail.com
              </a>
              <span className="hidden sm:block w-px h-4 bg-foreground/15" />
              <a href="tel:+256322414916" className="font-label text-[10px] tracking-[0.25em] hover:text-foreground/50 transition-colors uppercase">
                +256 322 414916
              </a>
              <span className="hidden sm:block w-px h-4 bg-foreground/15" />
              <span className="font-label text-[10px] tracking-[0.25em] uppercase">Along Bombo Road, Kampala</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
