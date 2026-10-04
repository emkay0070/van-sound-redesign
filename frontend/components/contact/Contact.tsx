'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  // TODO: Replace with actual VAN SOUND WhatsApp number from their website
  const whatsappNumber = '+256700000000'; // Placeholder - needs real number
  const whatsappMessage = encodeURIComponent('Hi VAN SOUND EVENTS, I\'d like to discuss an event project.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="contact" ref={ref} className="relative py-32 bg-background overflow-hidden">
      <motion.div style={{ opacity, y }} className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="font-label text-xs tracking-[0.4em] text-foreground-muted mb-4 block">GET IN TOUCH</span>
          <h3 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            LET'S CREATE
          </h3>
          <h3 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gradient">
            SOMETHING AMAZING
          </h3>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <h4 className="font-label font-semibold text-foreground mb-2">LOCATION</h4>
                <p className="font-sans text-foreground-muted">Kampala, Uganda</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-brand-secondary" />
              </div>
              <div>
                <h4 className="font-label font-semibold text-foreground mb-2">EMAIL</h4>
                <a 
                  href="mailto:info@vansoundevents.com" 
                  className="font-sans text-foreground-muted hover:text-brand-primary transition-colors"
                >
                  info@vansoundevents.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <h4 className="font-label font-semibold text-foreground mb-2">PHONE</h4>
                <a 
                  href="tel:+256700000000" 
                  className="font-sans text-foreground-muted hover:text-brand-primary transition-colors"
                >
                  +256 700 000 000
                </a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pt-8"
            >
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-label text-sm tracking-[0.15em] rounded-full transition-all duration-300 hover:scale-105"
              >
                <MessageCircle size={20} />
                WHATSAPP US
              </Link>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-surface rounded-2xl p-8 md:p-12"
          >
            <h4 className="font-display text-2xl font-bold text-foreground mb-6">FOLLOW US</h4>
            <div className="space-y-4">
              <a
                href="https://www.facebook.com/vansoundevents"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-label text-sm tracking-[0.15em] text-foreground-muted hover:text-brand-primary transition-colors"
              >
                FACEBOOK
              </a>
              <a
                href="https://www.instagram.com/van_sound_events/"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-label text-sm tracking-[0.15em] text-foreground-muted hover:text-brand-primary transition-colors"
              >
                INSTAGRAM
              </a>
              <a
                href="https://www.youtube.com/@vansoundeventsug"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-label text-sm tracking-[0.15em] text-foreground-muted hover:text-brand-primary transition-colors"
              >
                YOUTUBE
              </a>
              <a
                href="http://linkedin.com/company/vansoundevents"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-label text-sm tracking-[0.15em] text-foreground-muted hover:text-brand-primary transition-colors"
              >
                LINKEDIN
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
