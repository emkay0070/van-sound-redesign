'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-[#080808]"
    >
      {/* ── Background image ── */}
      <motion.div
        style={{ scale: imgScale }}
        className="absolute inset-0 origin-center will-change-transform"
      >
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2400&q=85"
          alt="Van Sound Events — Live event production"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-[#080808]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-transparent" />
      </motion.div>

      {/* ── Content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full flex flex-col justify-between px-6 md:px-10 lg:px-16 pt-32 pb-12 md:pb-16"
      >
        {/* ── TOP: Brand name — readable, intentional sizing ── */}
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -20 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-6 h-px bg-brand-primary block" />
            <span className="font-label text-[9px] md:text-[10px] tracking-[0.45em] text-foreground/50 uppercase">
              Sound · Lighting · Staging · Entertainment
            </span>
          </motion.div>

          {/* VAN SOUND — brand name, calibrated to never overflow */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
            transition={{ duration: 1.2, delay: 0.5, ease }}
            className="font-display leading-[0.88] tracking-tight text-foreground"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 10rem)' }}
          >
            VAN{' '}
            <span className="text-gradient-orange">SOUND</span>
          </motion.h1>

          {/* EVENTS — secondary label beneath */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -20 }}
            transition={{ duration: 1, delay: 0.75, ease }}
            className="flex items-center gap-4 mt-3"
          >
            <span
              className="font-label tracking-[0.5em] text-foreground/35 uppercase"
              style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.85rem)' }}
            >
              EVENTS
            </span>
            <span className="h-px bg-foreground/15 flex-1 max-w-[120px] block" />
            <span
              className="font-label tracking-[0.4em] text-foreground/25 uppercase"
              style={{ fontSize: 'clamp(0.6rem, 1vw, 0.75rem)' }}
            >
              EST. KAMPALA
            </span>
          </motion.div>
        </div>

        {/* ── MIDDLE: Large statement tagline ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 40 }}
          transition={{ duration: 1.2, delay: 0.95, ease }}
        >
          <p
            className="font-display leading-[0.9] text-foreground/90 max-w-2xl"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 6rem)' }}
          >
            WE MAKE THE<br />
            ROOM{' '}
            <span className="text-gradient-orange">COME ALIVE.</span>
          </p>
        </motion.div>

        {/* ── BOTTOM: Location + CTAs + scroll hint ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 1, delay: 1.2, ease }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
        >
          {/* Location */}
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary block animate-pulse" />
            <span className="font-label text-[10px] tracking-[0.35em] text-foreground/45 uppercase">
              Kampala, Uganda
            </span>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-5">
            <Link
              href="#event-inquiry"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 text-[#080808] font-label text-[10px] tracking-[0.25em] uppercase transition-all duration-300 hover:scale-105"
            >
              Plan Your Event
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="#showcase"
              className="font-label text-[10px] tracking-[0.25em] text-foreground/45 hover:text-foreground/80 uppercase transition-colors duration-300"
            >
              View Work
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="hidden lg:flex items-center gap-3">
            <span className="font-label text-[9px] tracking-[0.35em] text-foreground/25 uppercase">
              Scroll to explore
            </span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-foreground/25 text-xs"
            >
              ↓
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
