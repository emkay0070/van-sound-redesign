'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: 'sound',
    num: '01',
    title: 'EVENT P.A. SYSTEMS',
    sub: 'Sound Engineering',
    desc: 'Crystal clear, high-fidelity sound delivery for any venue size. From intimate corporate gatherings to full-scale outdoor festivals, our engineering ensures every note and spoken word is felt.',
    image: '/images/P.A-02.webp',
  },
  {
    id: 'planning',
    num: '02',
    title: 'EVENT PLANNING',
    sub: 'Logistics & Execution',
    desc: 'We do more than supply equipment. We engineer the logistics. From concept and floor plans to run-of-show execution, our team ensures your event flows flawlessly.',
    image: '/images/EVENT-02.webp',
  },
  {
    id: 'entertainment',
    num: '03',
    title: 'ENTERTAINMENT',
    sub: 'Talent & Performance',
    desc: 'Curating the right energy requires the right talent. We provide and manage top-tier DJs, live bands, and performers to keep the room captivated from start to finish.',
    image: '/images/EVENT.webp',
  },
  {
    id: 'lighting',
    num: '04',
    title: 'LIGHTING & STAGING',
    sub: 'Visual Atmosphere',
    desc: 'Transforming empty spaces into immersive environments. Our lighting designers and staging crew build the visual atmosphere that turns a simple gathering into a cinematic experience.',
    image: '/images/Wed-setup.webp',
  },
  {
    id: 'marketing',
    num: '05',
    title: 'MARKETING & BRANDING',
    sub: 'Audience Engagement',
    desc: 'Amplify your event before the doors even open. We integrate physical event branding, digital presence, and strategic marketing to ensure your audience shows up and stays engaged.',
    image: '/images/serv-vansound.webp',
  },
];

export default function Services() {
  const [active, setActive] = useState(services[0]);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const headerY = useTransform(scrollYProgress, [0, 0.4], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section id="services" ref={ref} className="relative py-32 md:py-48 bg-[#080808] overflow-hidden">
      {/* Subtle ambient glow behind the image */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[60vh] bg-brand-primary/4 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section header */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="mb-20 md:mb-28">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-label text-[10px] tracking-[0.5em] text-brand-primary uppercase">02 / What We Do</span>
            <span className="flex-1 max-w-[80px] h-px bg-brand-primary/30 block" />
          </div>
          <h2
            className="font-display font-bold text-foreground tracking-tight leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)' }}
          >
            SERVICES
          </h2>
        </motion.div>

        {/* Desktop: Two-column interaction */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1fr] gap-24 items-center min-h-[70vh]">
          {/* Left: Service list */}
          <div className="space-y-0">
            {services.map((service, i) => (
              <motion.button
                key={service.id}
                onMouseEnter={() => setActive(service)}
                onClick={() => setActive(service)}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`group w-full text-left py-7 border-b transition-all duration-300 ${
                  active.id === service.id
                    ? 'border-brand-primary/40'
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-8">
                  {/* Number */}
                  <span className={`font-label text-xs tracking-[0.3em] transition-colors duration-300 ${
                    active.id === service.id ? 'text-brand-primary' : 'text-foreground/25'
                  }`}>
                    {service.num}
                  </span>

                  {/* Title */}
                  <span className={`font-display font-bold tracking-tight transition-all duration-400 ${
                    active.id === service.id
                      ? 'text-gradient-orange'
                      : 'text-foreground/50 group-hover:text-foreground/80'
                  }`}
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1 }}
                  >
                    {service.title}
                  </span>

                  {/* Active indicator */}
                  {active.id === service.id && (
                    <motion.span
                      layoutId="serviceIndicator"
                      className="ml-auto w-2 h-2 rounded-full bg-brand-primary flex-shrink-0"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>

                {/* Sub label — appears when active */}
                <AnimatePresence>
                  {active.id === service.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-base text-foreground/50 leading-relaxed mt-3 ml-[3.5rem] max-w-sm">
                        {service.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>

          {/* Right: Cinematic image panel */}
          <div className="relative h-[65vh] rounded-none overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.04, clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0)' }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />
                {/* Service label overlay */}
                <div className="absolute bottom-8 left-8">
                  <p className="font-label text-[10px] tracking-[0.4em] text-foreground/50 uppercase mb-1">{active.num}</p>
                  <p className="font-display font-bold text-foreground text-2xl">{active.title}</p>
                  <p className="font-label text-xs tracking-[0.2em] text-brand-accent mt-1">{active.sub}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: Accordion */}
        <div className="lg:hidden space-y-0">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="border-b border-white/5"
            >
              <button
                onClick={() => setActive(active.id === service.id ? services[0] : service)}
                className="w-full text-left py-6 flex items-center gap-5"
              >
                <span className="font-label text-[10px] tracking-[0.3em] text-foreground/30">{service.num}</span>
                <span
                  className={`font-display font-bold tracking-tight flex-1 ${
                    active.id === service.id ? 'text-gradient-orange' : 'text-foreground/60'
                  }`}
                  style={{ fontSize: 'clamp(1.5rem, 6vw, 2.5rem)' }}
                >
                  {service.title}
                </span>
                <span className={`font-label text-lg transition-transform duration-300 ${active.id === service.id ? 'rotate-45 text-brand-primary' : 'text-foreground/30'}`}>+</span>
              </button>

              <AnimatePresence>
                {active.id === service.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6">
                      <div className="relative h-56 rounded overflow-hidden mb-4">
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 to-transparent" />
                      </div>
                      <p className="font-label text-xs tracking-[0.15em] text-brand-accent uppercase mb-2">{service.sub}</p>
                      <p className="font-sans text-sm text-foreground/55 leading-relaxed">{service.desc}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
