'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const moments = [
  {
    id: 1,
    category: 'CONCERT',
    location: 'KAMPALA',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=2000&q=85',
    services: 'SOUND · LIGHTING · STAGING',
    tall: true,
  },
  {
    id: 2,
    category: 'CORPORATE',
    location: 'KAMPALA',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=2000&q=85',
    services: 'EVENT PRODUCTION · STAGING',
    tall: false,
  },
  {
    id: 3,
    category: 'LIVE EVENT',
    location: 'ENTEBBE',
    image: 'https://images.unsplash.com/photo-1520483691742-bada60a1edd6?auto=format&fit=crop&w=2000&q=85',
    services: 'SOUND · ENTERTAINMENT',
    tall: false,
  },
  {
    id: 4,
    category: 'FESTIVAL',
    location: 'JINJA',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=2000&q=85',
    services: 'SOUND · LIGHTING · PRODUCTION',
    tall: true,
  },
];

function MomentCard({
  moment,
  index,
}: {
  moment: (typeof moments)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.0, 1.06]);
  const clipReveal = useTransform(scrollYProgress, [0, 0.25], ['inset(0 0 100% 0)', 'inset(0 0 0% 0)']);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative overflow-hidden rounded-2xl group ${moment.tall ? 'h-[80vh] md:h-[90vh]' : 'h-[60vh] md:h-[70vh]'}`}
    >
      {/* Image with scale parallax */}
      <motion.div
        style={{ scale: imgScale, clipPath: clipReveal }}
        className="absolute inset-0 will-change-transform origin-center"
      >
        <img
          src={moment.image}
          alt={`${moment.category} — ${moment.location}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/30 to-transparent pointer-events-none" />

      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-label text-[9px] md:text-[10px] tracking-[0.5em] text-foreground/40 uppercase mb-2">
            {moment.location}
          </p>
          <h3
            className="font-display font-bold text-foreground leading-none tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
          >
            {moment.category}
          </h3>
          <div className="flex items-center gap-3">
            <span className="w-5 h-px bg-brand-primary/60 block" />
            <p className="font-label text-[9px] md:text-[10px] tracking-[0.35em] text-foreground/40 uppercase">
              {moment.services}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="showcase" ref={ref} className="relative bg-[#080808]">
      {/* Section header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pt-32 md:pt-48 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="font-label text-[10px] tracking-[0.5em] text-brand-primary uppercase">03 / Selected Moments</span>
            <span className="flex-1 max-w-[80px] h-px bg-brand-primary/30 block" />
          </div>
          <h2
            className="font-display font-bold text-foreground tracking-tight leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)' }}
          >
            WHERE THE ENERGY
            <br />
            <span className="text-gradient-orange">HAPPENS.</span>
          </h2>
        </motion.div>
      </div>

      {/* Moment cards — constrained to layout width */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pb-0">
        <div className="space-y-3 md:space-y-4">
          {/* First moment — full width */}
          <MomentCard moment={moments[0]} index={0} />

          {/* Two-column row */}
          <div className="grid md:grid-cols-2 gap-3 md:gap-4">
            <MomentCard moment={moments[1]} index={1} />
            <MomentCard moment={moments[2]} index={2} />
          </div>

          {/* Last — full width */}
          <MomentCard moment={moments[3]} index={3} />
        </div>
      </div>
    </section>
  );
}
