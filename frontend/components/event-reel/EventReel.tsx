'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const reelItems = [
  {
    id: 1,
    category: 'CONCERT',
    location: 'KAMPALA',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    category: 'WEDDING',
    location: 'ENTEBBE',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    category: 'CORPORATE',
    location: 'KAMPALA',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    category: 'LIVE EVENT',
    location: 'JINJA',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    category: 'FESTIVAL',
    location: 'KAMPALA',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
  },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function EventReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [xDistance, setXDistance] = useState(0);

  // Track vertical scroll progress through the tall outer section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // All transforms derived at component top level — no hooks in JSX
  const x = useTransform(scrollYProgress, [0, 1], [0, xDistance]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.35]);
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Measure how far the strip needs to travel on mount + resize
  useEffect(() => {
    const measure = () => {
      if (!stripRef.current) return;
      const overscroll = stripRef.current.scrollWidth - window.innerWidth;
      setXDistance(-overscroll);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    /**
     * The outer section is intentionally tall — this gives the browser
     * vertical scroll room. The sticky inner "viewport" consumes that
     * height by converting scroll progress into horizontal x motion.
     *
     * Height = (cards + 1) × 100vh → comfortable pacing per card.
     */
    <section
      ref={sectionRef}
      className="relative bg-[#080808]"
      style={{ height: `${(reelItems.length + 1) * 100}vh` }}
    >
      {/* ── Sticky panel — pins while outer section scrolls ── */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center gap-8 md:gap-10">

        {/* Header row */}
        <div className="max-w-[1600px] mx-auto w-full px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between">

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, ease }}
              className="flex items-center gap-4"
            >
              <span className="font-label text-[10px] tracking-[0.5em] text-brand-primary uppercase">
                Event Reel
              </span>
              <span className="max-w-[80px] w-full h-px bg-brand-primary/30 block" />
            </motion.div>

            {/* "Scroll to explore" fades out as you progress */}
            <motion.span
              style={{ opacity: labelOpacity }}
              className="hidden md:block font-label text-[10px] tracking-[0.3em] text-foreground/25 uppercase"
            >
              Scroll to explore →
            </motion.span>

          </div>
        </div>

        {/* ── Card strip — translates horizontally ── */}
        {/*
          paddingLeft aligns the first card with the layout's left edge.
          The CSS calc ensures it matches on all screen sizes including
          those wider than the 1600px max-w container.
        */}
        <div className="w-full">
          <motion.div
            ref={stripRef}
            className="flex gap-3 md:gap-4"
            style={{
              x,
              paddingLeft: 'max(1.5rem, calc((100vw - 1600px) / 2 + 4rem))',
              paddingRight: 'max(1.5rem, calc((100vw - 1600px) / 2 + 4rem))',
            }}
          >
            {reelItems.map((item, i) => (
              <div
                key={item.id}
                className="relative flex-shrink-0 w-[75vw] md:w-[42vw] lg:w-[30vw] h-[55vh] md:h-[60vh] rounded-2xl overflow-hidden group"
              >
                <img
                  src={item.image}
                  alt={`${item.category} — ${item.location}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/85 via-transparent to-transparent" />

                {/* Card label */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="font-label text-[9px] tracking-[0.4em] text-foreground/40 uppercase mb-1">
                    {item.location}
                  </p>
                  <p className="font-display font-bold text-foreground text-2xl leading-tight">
                    {item.category}
                  </p>
                </div>

                {/* Index */}
                <div className="absolute top-5 right-5">
                  <span className="font-label text-[9px] tracking-[0.3em] text-foreground/25">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Progress bar — tracks how far through the reel */}
        <div className="max-w-[1600px] mx-auto w-full px-6 md:px-10 lg:px-16">
          <div className="relative h-px bg-foreground/8 w-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-brand-primary/60 origin-left"
              style={{ scaleX: progressScaleX }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
