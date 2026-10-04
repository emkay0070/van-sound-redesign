'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section id="about" ref={ref} className="relative py-32 md:py-48 bg-[#080808] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center gap-4 mb-20 md:mb-28"
        >
          <span className="font-label text-[10px] tracking-[0.5em] text-brand-primary uppercase">04 / The People</span>
          <span className="flex-1 max-w-[80px] h-px bg-brand-primary/30 block" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 md:gap-24 items-center">

          {/* Left: Image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease }}
            className="relative h-[60vh] md:h-[70vh] overflow-hidden"
          >
            <motion.div style={{ y: imgY }} className="absolute inset-0 will-change-transform">
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80"
                alt="Van Sound Events team at work — sound engineers and crew"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/50 to-transparent" />
            </motion.div>

            {/* Amber accent border */}
            <div className="absolute top-0 left-0 w-0.5 h-24 bg-brand-primary" />
          </motion.div>

          {/* Right: Typography content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1, delay: 0.15, ease }}
              className="font-display font-bold text-foreground tracking-tight leading-[0.9] mb-10"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 6rem)' }}
            >
              THE PEOPLE<br />
              BEHIND<br />
              <span className="text-gradient-orange">THE MOMENT.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.3, ease }}
              className="font-sans text-base md:text-lg text-foreground/55 leading-relaxed mb-8 max-w-md"
            >
              Based in Kampala, we are a team of audio engineers, lighting designers, producers
              and event specialists who live and breathe live events. We don't just show up —
              we build the atmosphere, manage the moment and leave the audience wanting more.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.45, ease }}
              className="font-sans text-sm text-foreground/40 leading-relaxed max-w-md"
            >
              From corporate conferences to full festival productions across Uganda —
              every event is personal, every performance is ours to protect.
            </motion.p>

            {/* Divider row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-6 mt-12 pt-12 border-t border-white/5"
            >
              <div>
                <p className="font-label text-[10px] tracking-[0.3em] text-foreground/30 uppercase mb-1">Location</p>
                <p className="font-sans text-sm text-foreground/70">Kampala, Uganda</p>
              </div>
              <div className="w-px h-10 bg-foreground/10" />
              <div>
                <p className="font-label text-[10px] tracking-[0.3em] text-foreground/30 uppercase mb-1">Services</p>
                <p className="font-sans text-sm text-foreground/70">Sound · Lighting · Staging · Entertainment</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
