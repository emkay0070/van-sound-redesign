'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ImmersiveImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.0, 1.05]);

  return (
    <section ref={ref} className="relative bg-[#080808]">
      {/* Constrained to layout width — matches the page grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 py-0">
        <div className="relative h-[65vh] md:h-[80vh] overflow-hidden rounded-2xl">

          {/* Parallax image */}
          <motion.div
            style={{ y: imgY, scale: imgScale }}
            className="absolute inset-0 will-change-transform origin-center"
          >
            <img
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2400&q=85"
              alt="Live event production — immersive concert experience"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/35 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#080808]/20 pointer-events-none" />

          {/* Text overlay — sits inside the image at bottom-left */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <p className="font-label text-[10px] tracking-[0.4em] text-foreground/50 uppercase mb-4">
                Live Events
              </p>
              <h2
                className="font-display font-bold text-foreground leading-none tracking-tight mb-4"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)' }}
              >
                THAT FEEL<br />
                <span className="text-gradient-orange">ALIVE.</span>
              </h2>
              <div className="flex items-center gap-3 mt-6">
                <span className="w-6 h-px bg-brand-primary/60 block" />
                <span className="font-label text-[10px] tracking-[0.35em] text-foreground/40 uppercase">
                  Sound · Lighting · Staging
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
