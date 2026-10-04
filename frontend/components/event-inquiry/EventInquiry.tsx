'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, MapPin, Users, Check } from 'lucide-react';

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Concert',
  'Conference',
  'Private Party',
  'Festival',
  'Other',
];

const serviceOptions = [
  'Event P.A Systems',
  'Event Planning Services',
  'Entertainment',
  'Lighting & Staging',
  'Marketing & Branding',
];

export default function EventInquiry() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  const [formData, setFormData] = useState({
    eventType: '',
    date: '',
    location: '',
    guests: '',
    services: [] as string[],
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend or WhatsApp
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="event-inquiry" ref={ref} className="relative py-32 bg-background overflow-hidden">
        <motion.div style={{ opacity, y }} className="max-w-[1800px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check size={40} className="text-brand-primary" />
            </div>
            <h3 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
              REQUEST RECEIVED
            </h3>
            <p className="font-sans text-lg text-foreground-muted max-w-xl mx-auto">
              Thank you for your interest! We'll review your event request and get back to you within 24 hours.
            </p>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="event-inquiry" ref={ref} className="relative py-32 bg-surface overflow-hidden">
      <motion.div style={{ opacity, y }} className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <span className="font-label text-xs tracking-[0.4em] text-foreground-muted mb-4 block">START HERE</span>
          <h3 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            PLAN YOUR EVENT
          </h3>
          <p className="font-sans text-lg text-foreground-muted max-w-2xl mx-auto">
            Tell us about your vision and we'll help bring it to life. This is an inquiry request — we'll confirm availability before any commitment.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-background rounded-2xl p-8 md:p-12 shadow-xl"
        >
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Event Type */}
            <div>
              <label className="font-label text-sm tracking-wider text-foreground mb-3 block">
                EVENT TYPE
              </label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full px-4 py-3 bg-surface border border-foreground/10 rounded-lg font-sans text-foreground focus:outline-none focus:border-brand-primary transition-colors"
                required
              >
                <option value="">Select event type</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="font-label text-sm tracking-wider text-foreground mb-3 block">
                PREFERRED DATE
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted" size={18} />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-surface border border-foreground/10 rounded-lg font-sans text-foreground focus:outline-none focus:border-brand-primary transition-colors"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="font-label text-sm tracking-wider text-foreground mb-3 block">
                LOCATION
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted" size={18} />
                <input
                  type="text"
                  placeholder="Event venue or city"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-surface border border-foreground/10 rounded-lg font-sans text-foreground focus:outline-none focus:border-brand-primary transition-colors"
                  required
                />
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className="font-label text-sm tracking-wider text-foreground mb-3 block">
                EXPECTED GUESTS
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted" size={18} />
                <input
                  type="number"
                  placeholder="Number of attendees"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-surface border border-foreground/10 rounded-lg font-sans text-foreground focus:outline-none focus:border-brand-primary transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-8">
            <label className="font-label text-sm tracking-wider text-foreground mb-4 block">
              SERVICES NEEDED
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {serviceOptions.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  className={`px-4 py-3 rounded-lg font-label text-xs tracking-wider transition-all ${
                    formData.services.includes(service)
                      ? 'bg-brand-primary text-white'
                      : 'bg-surface text-foreground-muted hover:bg-surface2'
                  }`}
                >
                  {formData.services.includes(service) && <Check size={14} className="inline mr-2" />}
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="font-label text-sm tracking-wider text-foreground mb-3 block">
                YOUR NAME
              </label>
              <input
                type="text"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-surface border border-foreground/10 rounded-lg font-sans text-foreground focus:outline-none focus:border-brand-primary transition-colors"
                required
              />
            </div>

            <div>
              <label className="font-label text-sm tracking-wider text-foreground mb-3 block">
                PHONE / WHATSAPP
              </label>
              <input
                type="tel"
                placeholder="+256 XXX XXX XXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-surface border border-foreground/10 rounded-lg font-sans text-foreground focus:outline-none focus:border-brand-primary transition-colors"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-label text-sm tracking-wider text-foreground mb-3 block">
                EMAIL
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-surface border border-foreground/10 rounded-lg font-sans text-foreground focus:outline-none focus:border-brand-primary transition-colors"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-label text-sm tracking-wider text-foreground mb-3 block">
                ADDITIONAL DETAILS
              </label>
              <textarea
                placeholder="Tell us more about your event vision..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-surface border border-foreground/10 rounded-lg font-sans text-foreground focus:outline-none focus:border-brand-primary transition-colors resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white font-label text-sm tracking-[0.15em] rounded-full transition-all duration-300"
          >
            SEND EVENT REQUEST
          </motion.button>

          <p className="font-sans text-xs text-foreground-muted text-center mt-4">
            By submitting, you agree to be contacted by VAN SOUND EVENTS regarding your event inquiry.
          </p>
        </motion.form>
      </motion.div>
    </section>
  );
}
