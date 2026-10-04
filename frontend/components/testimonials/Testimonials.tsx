'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    quote: "They don't just provide sound equipment, they engineer the entire atmosphere. The energy in the room was palpable.",
    author: "Sarah N.",
    role: "Festival Director",
  },
  {
    id: 2,
    quote: "Flawless execution. From the initial rig to the final teardown, the professionalism was unmatched.",
    author: "David M.",
    role: "Production Lead",
  },
  {
    id: 3,
    quote: "Van Sound understands that in live events, there are no second chances. They delivered absolute perfection.",
    author: "Grace K.",
    role: "Corporate Events Coordinator",
  },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false); // Pause auto-play if user interacts
  };

  return (
    <section className="relative py-32 md:py-48 bg-[#080808]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center gap-4 mb-24 md:mb-32"
        >
          <span className="font-label text-[10px] tracking-[0.5em] text-brand-primary uppercase">
            05 / Word of Mouth
          </span>
          <span className="flex-1 max-w-[80px] h-px bg-brand-primary/30 block" />
        </motion.div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 lg:gap-32 items-end">
          
          {/* Quote Display */}
          <div className="relative min-h-[300px] md:min-h-[250px] flex flex-col justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease }}
              >
                {/* Giant decorative quote mark */}
                <span className="absolute -top-10 -left-6 md:-top-16 md:-left-10 font-display text-[8rem] md:text-[12rem] leading-none text-foreground/5 select-none pointer-events-none">
                  "
                </span>
                
                <h3 
                  className="font-display font-bold text-foreground leading-[0.95] tracking-tight mb-12 relative z-10"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)' }}
                >
                  {testimonials[activeIndex].quote}
                </h3>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-px bg-brand-primary" />
                  <div>
                    <p className="font-sans text-sm md:text-base text-foreground font-medium uppercase tracking-wider mb-1">
                      {testimonials[activeIndex].author}
                    </p>
                    <p className="font-label text-[10px] md:text-xs text-foreground/40 tracking-[0.2em] uppercase">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex lg:flex-col gap-6 lg:gap-8 pb-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className="group relative flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 outline-none"
                aria-label={`View testimonial ${idx + 1}`}
              >
                {/* Background circle */}
                <div className="absolute inset-0 rounded-full border border-white/5 transition-colors duration-500 group-hover:border-white/10 group-focus-visible:border-brand-primary" />
                
                {/* Active fill ring */}
                {activeIndex === idx && (
                  <motion.div
                    layoutId="activeTestimonialRing"
                    className="absolute inset-0 rounded-full border-2 border-brand-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Number */}
                <span className={`font-label text-[10px] tracking-widest transition-colors duration-500 ${
                  activeIndex === idx ? 'text-brand-primary' : 'text-foreground/40 group-hover:text-foreground/80'
                }`}>
                  0{idx + 1}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
