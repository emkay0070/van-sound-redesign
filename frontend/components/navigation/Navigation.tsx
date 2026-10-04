'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { label: 'WORK', href: '/#showcase' },
  { label: 'SERVICES', href: '/services' },
  { label: 'ABOUT', href: '/#about' },
  { label: 'CONTACT', href: '/contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 400);
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -16 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between">

          {/* Logo — Wordmark */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
              <img src="/images/vansound%20logo.webp" alt="Van Sound Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-label font-semibold tracking-[0.2em] text-xs text-foreground/80 group-hover:text-foreground transition-colors hidden sm:block uppercase">
              Van Sound
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-label text-[10px] tracking-[0.3em] text-foreground/45 hover:text-foreground transition-colors duration-300 uppercase"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/+256704141823"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-accent text-[#080808] font-label text-[10px] tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105"
            >
              Plan Event
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#080808] lg:hidden flex flex-col"
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/images/vansound%20logo.webp" alt="Van Sound Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-label text-xs tracking-[0.2em] text-foreground/60 uppercase">Van Sound</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-foreground/50 hover:text-foreground"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col flex-1 px-6 pt-12">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="font-display font-bold text-foreground/60 hover:text-foreground py-5 border-b border-white/5 transition-colors duration-300"
                  style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-10"
              >
                <a
                  href="https://wa.me/+256704141823"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-5 bg-brand-primary text-[#080808] font-label text-xs tracking-[0.25em] uppercase hover:bg-brand-accent transition-colors"
                >
                  Plan Your Event
                </a>
              </motion.div>
            </div>

            {/* Footer of mobile menu */}
            <div className="px-6 py-8 border-t border-white/5">
              <p className="font-label text-[9px] tracking-[0.35em] text-foreground/25 uppercase">
                Kampala, Uganda — vansoundsltd@gmail.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
