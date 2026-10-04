'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function EventStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  return (
    <section ref={ref} className="relative min-h-screen py-32 bg-neutral-950 overflow-hidden">
      <motion.div style={{ opacity, y }} className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs tracking-[0.4em] text-amber-500">01</span>
            <div className="h-px flex-1 bg-neutral-800" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight">
            THE MOMENT
          </h2>
        </motion.div>

        {/* Editorial Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col justify-center"
          >
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-8">
              From the first soundcheck to the final applause, every detail matters. This is where technical precision meets creative vision.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-xs tracking-[0.3em] text-neutral-500 mb-2">CLIENT</h4>
                <p className="text-base text-neutral-200">Kampala International Conference Center</p>
              </div>
              
              <div>
                <h4 className="text-xs tracking-[0.3em] text-neutral-500 mb-2">SCOPE</h4>
                <p className="text-base text-neutral-200">Full-scale corporate gala production</p>
              </div>
              
              <div>
                <h4 className="text-xs tracking-[0.3em] text-neutral-500 mb-2">DELIVERABLES</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs tracking-[0.15em] text-neutral-400 px-3 py-1 border border-neutral-800">
                    SOUND DESIGN
                  </span>
                  <span className="text-xs tracking-[0.15em] text-neutral-400 px-3 py-1 border border-neutral-800">
                    LIGHTING
                  </span>
                  <span className="text-xs tracking-[0.15em] text-neutral-400 px-3 py-1 border border-neutral-800">
                    STAGE DESIGN
                  </span>
                  <span className="text-xs tracking-[0.15em] text-neutral-400 px-3 py-1 border border-neutral-800">
                    PRODUCTION
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Featured Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80"
                alt="Corporate event production"
                className="w-full h-[60vh] md:h-[70vh] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
              
              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <p className="text-2xl md:text-3xl font-medium text-neutral-50 leading-relaxed max-w-2xl">
                  "The energy in the room was electric. Every element worked in harmony to create an unforgettable experience."
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Supporting Imagery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-2 gap-6 mt-12"
        >
          <div className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80"
              alt="Stage setup"
              className="w-full h-[40vh] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent" />
          </div>
          <div className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
              alt="Lighting design"
              className="w-full h-[40vh] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
