'use client';

import Navigation from '@/components/navigation/Navigation';
import Footer from '@/components/footer/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    id: '01',
    title: 'EVENT P.A. SYSTEMS',
    description: 'Crystal clear, high-fidelity sound delivery for any venue size. From intimate corporate gatherings to full-scale outdoor festivals, our engineering ensures every note and spoken word is felt.',
    image: '/images/P.A-01.webp',
  },
  {
    id: '02',
    title: 'EVENT PLANNING SERVICES',
    description: 'We do more than supply equipment. We engineer the logistics. From concept and floor plans to run-of-show execution, our team ensures your event flows flawlessly.',
    image: '/images/EVENT-02.webp',
  },
  {
    id: '03',
    title: 'ENTERTAINMENT',
    description: 'Curating the right energy requires the right talent. We provide and manage top-tier DJs, live bands, and performers to keep the room captivated from start to finish.',
    image: '/images/EVENT.webp',
  },
  {
    id: '04',
    title: 'LIGHTING & STAGING',
    description: 'Transforming empty spaces into immersive environments. Our lighting designers and staging crew build the visual atmosphere that turns a simple gathering into a cinematic experience.',
    image: '/images/Wed-setup.webp',
  },
  {
    id: '05',
    title: 'MARKETING & BRANDING',
    description: 'Amplify your event before the doors even open. We integrate physical event branding, digital presence, and strategic marketing to ensure your audience shows up and stays engaged.',
    image: '/images/serv-vansound.webp',
  },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#080808]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 md:pt-56 md:pb-32 px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-8 h-px bg-brand-primary block" />
            <span className="font-label text-[10px] tracking-[0.5em] text-brand-primary uppercase">Services</span>
          </div>
          
          <h1 
            className="font-display font-bold leading-[0.9] tracking-tight text-foreground max-w-4xl"
            style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
          >
            WE CREATE THE INFRASTRUCTURE BEHIND{' '}
            <span className="text-gradient-orange">UNFORGETTABLE EVENTS.</span>
          </h1>
        </motion.div>
      </section>

      {/* Services List */}
      <section className="pb-32 md:pb-48">
        {services.map((service, idx) => (
          <ServiceBlock key={service.id} service={service} index={idx} />
        ))}
      </section>

      {/* Dramatic CTA to replace pricing */}
      <section className="relative py-32 md:py-48 px-6 md:px-10 lg:px-16 border-t border-white/5 bg-[#050505]">
        <div className="max-w-[1600px] mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease }}
            className="max-w-3xl"
          >
            <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6 uppercase tracking-tight">
              Ready to elevate your next event?
            </h2>
            <p className="font-sans text-foreground/50 text-lg mb-12">
              Every production is unique. Tell us about your vision, scale, and requirements, and we'll engineer the perfect setup for you.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-5 bg-brand-primary hover:bg-brand-primary/90 text-[#080808] font-label text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:scale-105"
            >
              Get a Quote
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Separate component for each block to manage scroll parallax cleanly
function ServiceBlock({ service, index }: { service: typeof services[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  
  return (
    <div ref={ref} className="relative w-full max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24">
      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-center">
        
        {/* Content (Left) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
          className="order-2 lg:order-1"
        >
          <span className="font-label text-brand-primary tracking-widest text-sm mb-6 block">
            {service.id} —
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-8 uppercase tracking-tight leading-[0.9]">
            {service.title}
          </h2>
          <p className="font-sans text-foreground/55 text-base md:text-lg leading-relaxed max-w-md">
            {service.description}
          </p>
        </motion.div>

        {/* Image (Right) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, ease }}
          className="order-1 lg:order-2 relative h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden group"
        >
          <motion.div style={{ y: imgY }} className="absolute inset-0 will-change-transform scale-110">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-[#080808]/20 transition-colors duration-500 group-hover:bg-transparent" />
          </motion.div>
        </motion.div>
        
      </div>
    </div>
  );
}
