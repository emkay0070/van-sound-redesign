'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll — wraps the app with Lenis smooth scroll.
 *
 * Key design decisions:
 * - Uses `window` as the scroll container (not a div) so that native browser
 *   APIs (like Framer Motion's useScroll, IntersectionObserver, anchor links)
 *   all work without special configuration.
 * - The RAF loop manually ticks Lenis each frame — no GSAP required.
 * - Respects prefers-reduced-motion: if the user has it enabled, we bail out
 *   and fall back to the browser's native scroll.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Bail out if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      // Exponential ease-out: starts fast, glides to stop
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // RAF loop — drives Lenis each frame
    let raf: number;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    // Expose globally for debugging
    (window as any).__lenis = lenis;

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).__lenis;
    };
  }, []);

  return <>{children}</>;
}
