'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function StatementSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative py-40 md:py-56 lg:py-72 bg-[#080808] overflow-hidden">
      {/* Subtle texture gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a06] via-[#080808] to-[#080808] pointer-events-none" />

      <motion.div style={{ y }} className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-16 md:mb-20"
        >
          <span className="font-label text-[10px] tracking-[0.5em] text-brand-primary uppercase">01 / The Experience</span>
          <span className="flex-1 max-w-[80px] h-px bg-brand-primary/30 block" />
        </motion.div>

        {/* Main statement */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold tracking-tight leading-[0.88] text-foreground mb-8"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 10rem)' }}
        >
          SOUND ISN'T<br />
          JUST HEARD.
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold tracking-tight leading-[0.88] text-gradient-orange mb-16 md:mb-20"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 10rem)' }}
        >
          IT'S FELT.
        </motion.h2>

        {/* Supporting paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-lg md:text-xl text-foreground/55 max-w-xl leading-relaxed"
        >
          Every event we touch is designed to move people — physically, emotionally, electrically.
          We build the energy behind the moment.
        </motion.p>
      </motion.div>
    </section>
  );
}
