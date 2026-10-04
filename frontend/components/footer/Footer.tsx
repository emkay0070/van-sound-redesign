'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/van_sound_events/', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )},
  { label: 'Facebook', href: 'https://www.facebook.com/vansoundevents', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )},
  { label: 'YouTube', href: 'https://www.youtube.com/@vansoundeventsug', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
    </svg>
  )},
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = 'https://wa.me/+256704141823?text=' + encodeURIComponent("Hi VAN SOUND EVENTS, I'd like to discuss an event project.");

  return (
    <footer className="bg-[#050505] border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 flex items-center justify-center">
                <img src="/images/vansound%20logo.webp" alt="Van Sound Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-label font-semibold tracking-[0.2em] text-xs text-foreground/60 uppercase">Van Sound Events</span>
            </div>
            <p className="font-sans text-sm text-foreground/35 leading-relaxed mb-8 max-w-xs">
              Premium event production services across Uganda — sound, lighting, staging and entertainment built for moments that matter.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/5 flex items-center justify-center text-foreground/30 hover:text-brand-primary hover:border-brand-primary/40 transition-all duration-300"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.08 }}>
            <h5 className="font-label text-[9px] tracking-[0.45em] text-foreground/30 uppercase mb-6">Navigate</h5>
            <ul className="space-y-3">
              {['Work', 'Services', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="font-sans text-sm text-foreground/40 hover:text-foreground/80 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.16 }}>
            <h5 className="font-label text-[9px] tracking-[0.45em] text-foreground/30 uppercase mb-6">Services</h5>
            <ul className="space-y-3">
              {['Sound Systems', 'Lighting', 'Staging', 'Entertainment', 'Production'].map((item) => (
                <li key={item}>
                  <span className="font-sans text-sm text-foreground/35">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.24 }}>
            <h5 className="font-label text-[9px] tracking-[0.45em] text-foreground/30 uppercase mb-6">Contact</h5>
            <ul className="space-y-3 mb-8">
              <li><span className="font-sans text-sm text-foreground/35">Along Bombo Road, Kampala</span></li>
              <li><a href="mailto:vansoundsltd@gmail.com" className="font-sans text-sm text-foreground/35 hover:text-foreground/70 transition-colors">vansoundsltd@gmail.com</a></li>
              <li><a href="tel:+256322414916" className="font-sans text-sm text-foreground/35 hover:text-foreground/70 transition-colors">+256 322 414916</a></li>
              <li><a href="tel:+256704141823" className="font-sans text-sm text-foreground/35 hover:text-foreground/70 transition-colors">+256 704 141823</a></li>
            </ul>
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366]/10 hover:bg-[#25D366] border border-[#25D366]/30 hover:border-[#25D366] text-[#25D366] hover:text-white font-label text-[10px] tracking-[0.2em] uppercase transition-all duration-300"
            >
              <MessageCircle size={14} />
              WhatsApp
            </Link>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="font-label text-[9px] tracking-[0.3em] text-foreground/20 uppercase">
            © {currentYear} Van Sound Events — All rights reserved
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-label text-[9px] tracking-[0.25em] text-foreground/20 hover:text-foreground/40 uppercase transition-colors">Privacy</a>
            <a href="#" className="font-label text-[9px] tracking-[0.25em] text-foreground/20 hover:text-foreground/40 uppercase transition-colors">Terms</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
