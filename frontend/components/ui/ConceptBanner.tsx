'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';

/**
 * ConceptBanner — a two-stage review notice for the Van Sound team.
 *
 * Behaviour:
 *   1. On first load a centred modal introduces the concept and asks the team
 *      to review it. It is dismissible via the X, the backdrop, Escape, or the
 *      primary CTA.
 *   2. Once the modal is dismissed, a compact "medium" reminder card stays
 *      permanently pinned to the bottom-right corner — it is NOT dismissible —
 *      with the floating WhatsApp button sitting ABOVE it. The card publishes
 *      its own height as the `--concept-stack` CSS variable so the WhatsApp
 *      button can offset itself automatically and never overlap (see
 *      WhatsAppButton).
 *
 * Design notes:
 * - Matches the site's cinematic obsidian/brand-orange language (see globals.css).
 * - Uses the shared reveal easing curve [0.16, 1, 0.3, 1] used across sections.
 * - Locks page scroll (Lenis-aware) while the modal is open.
 */

/** Shared site easing curve — exponential ease-out. */
const EASE = [0.16, 1, 0.3, 1] as const;

/** Delay (ms) before the intro modal reveals, so it lands after first paint. */
const REVEAL_DELAY = 900;

/** WhatsApp contact for project enquiries (Emkay). */
const WHATSAPP_NUMBER = '256780698341';
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I'd like to start a project like the Van Sound concept.",
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function ConceptBanner() {
  /** Intro modal visibility. */
  const [modalOpen, setModalOpen] = useState(false);
  /** Whether the intro modal has already been dismissed once. */
  const [introSeen, setIntroSeen] = useState(false);
  /** Bottom-right reminder card visibility. */
  const [reminderVisible, setReminderVisible] = useState(false);

  /** Ref to the reminder card — used to measure its height. */
  const reminderRef = useRef<HTMLDivElement>(null);

  // Reveal the intro modal shortly after mount (after first paint).
  useEffect(() => {
    const t = setTimeout(() => setModalOpen(true), REVEAL_DELAY);
    return () => clearTimeout(t);
  }, []);

  // Publish the reminder's height as `--concept-stack` so the floating WhatsApp
  // button offsets itself above the card. Resets to 0 while the card is hidden.
  useEffect(() => {
    const root = document.documentElement;
    const stacked = reminderVisible && !modalOpen && reminderRef.current;
    root.style.setProperty(
      '--concept-stack',
      stacked ? `${reminderRef.current!.offsetHeight + 12}px` : '0px',
    );
  }, [reminderVisible, modalOpen]);

  // While the modal is open: lock page scroll (Lenis-aware) and close on Escape.
  useEffect(() => {
    if (!modalOpen) return;

    // SmoothScroll exposes the Lenis instance on window; pause it if present.
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismissIntro();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  /** Close the intro modal and hand over to the persistent reminder card. */
  const dismissIntro = useCallback(() => {
    setModalOpen(false);
    setIntroSeen(true);
    setReminderVisible(true);
  }, []);

  return (
    <>
      {/* ── Stage 1: centred intro modal ─────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="concept-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Concept review notice"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={dismissIntro}
              aria-hidden="true"
            />

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative w-full max-w-[560px] overflow-hidden bg-[#0b0b0b] border border-white/10 shadow-2xl shadow-black/70"
            >
              {/* Ambient brand glow */}
              <div className="absolute -top-24 -right-16 w-64 h-64 bg-brand-primary/10 blur-[90px] rounded-full pointer-events-none" />

              {/* Close */}
              <button
                onClick={dismissIntro}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 p-2 text-foreground/40 hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>

              <div className="relative px-8 py-10 sm:px-12 sm:py-12">
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-px bg-brand-primary/60 block" />
                  <span className="font-label text-[10px] tracking-[0.4em] text-brand-primary uppercase">
                    Confidential Concept — 2026
                  </span>
                </div>

                {/* Headline */}
                <h2
                  className="font-display font-bold text-foreground leading-[0.9] tracking-tight"
                  style={{ fontSize: 'clamp(2.25rem, 7vw, 3.5rem)' }}
                >
                  Hello,
                  <br />
                  VanTeam
                </h2>

                {/* Body */}
                <p className="mt-5 font-sans text-sm sm:text-base text-foreground/55 leading-relaxed max-w-[42ch]">
                  This is the Van-Sound Events concept — a reimagined digital
                  experience crafted exclusively for you.
                </p>

                {/* Signature */}
                <div className="mt-7 flex items-center gap-2">
                  <span className="font-label text-[10px] tracking-[0.3em] text-foreground/35 uppercase">
                    Presented to you by
                  </span>
                  <span className="font-label text-[10px] tracking-[0.3em] text-brand-primary uppercase">
                    Emkay
                  </span>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={dismissIntro}
                  className="group mt-8 inline-flex items-center gap-3 px-7 py-4 bg-brand-primary hover:bg-brand-accent text-[#080808] font-label text-[11px] tracking-[0.25em] uppercase transition-all duration-300 hover:scale-[1.03]"
                >
                  Got it — I&apos;ll review it
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Stage 2: persistent medium reminder (bottom-right, below WhatsApp) */}
      <AnimatePresence>
        {reminderVisible && introSeen && !modalOpen && (
          <motion.div
            key="concept-reminder"
            ref={reminderRef}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="fixed bottom-6 right-6 z-40 w-[calc(100vw-3rem)] max-w-[300px]"
          >
            <div className="relative overflow-hidden bg-[#0d0d0d]/95 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/60">
              {/* Ambient brand glow */}
              <div className="absolute -top-10 -right-8 w-32 h-32 bg-brand-primary/10 blur-[60px] rounded-full pointer-events-none" />

              <div className="relative p-5">
                {/* Title */}
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-brand-primary" />
                  <span className="font-label text-[10px] tracking-[0.3em] text-brand-primary uppercase">
                    Concept Website
                  </span>
                </div>

                {/* Body */}
                <p className="font-sans text-[13px] text-foreground/70 leading-snug mb-4">
                  Want this for your brand? Let&apos;s talk.
                </p>

                {/* CTA — opens WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-brand-primary hover:bg-brand-accent text-[#080808] font-label text-[10px] tracking-[0.25em] uppercase transition-all duration-300"
                >
                  Start your project
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
