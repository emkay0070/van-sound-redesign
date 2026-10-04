import Navigation from '@/components/navigation/Navigation';
import Hero from '@/components/hero/Hero';
import Statement from '@/components/statement/Statement';
import ImmersiveImage from '@/components/immersive/ImmersiveImage';
import Services from '@/components/services/Services';
import Showcase from '@/components/showcase/Showcase';
import EventReel from '@/components/event-reel/EventReel';
import About from '@/components/about/About';
import Testimonials from '@/components/testimonials/Testimonials';
import FinalCta from '@/components/final-cta/FinalCta';
import Footer from '@/components/footer/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808]">
      <Navigation />

      {/* 1. Hero — cinematic full-screen */}
      <Hero />

      {/* 2. Statement — editorial breathing room */}
      <Statement />

      {/* 3. Immersive full-bleed event image */}
      <ImmersiveImage />

      {/* 4. Interactive services */}
      <Services />

      {/* 5. Selected moments — cinematic film sequence */}
      <Showcase />

      {/* 6. Horizontal event reel */}
      <EventReel />

      {/* 7. The People */}
      <About />

      {/* 8. Word of Mouth (Testimonials) */}
      <Testimonials />

      {/* 8. Dramatic CTA */}
      <FinalCta />

      {/* 9. Footer */}
      <Footer />

      {/* Floating WhatsApp */}
      <WhatsAppButton />
    </main>
  );
}
