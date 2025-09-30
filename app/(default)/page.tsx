export const metadata = {
  title: 'Home - Stellar',
  description: 'Page description',
};

import Hero from '@/components/hero';
import Credibility from '@/components/credibility';
import InlineBookingCta from '@/components/inline-booking-cta';
import ServicesSection from '@/components/services-section';
import Features from '@/components/features';
// New custom sections for King's redesign
import ServicesShowcase from '@/components/services-showcase';
import ServicesShowcaseTest from '@/components/services-showcase-test';
import KingsDifference from '@/components/kings-difference';
import HeatReality from '@/components/heat-reality';
import Faqs from '@/components/faqs';
import FinalCta from '@/components/final-cta';

export default function Home() {
  return (
    <>
      <Hero />
      <Credibility />
      <InlineBookingCta />
      {/* Mini services directly below credibility intro */}
      <ServicesSection />

      {/* Appointment stepper placeholder - keep as provided */}
      <Features />

      {/* Main services showcase (large panel with tabs) */}
      <ServicesShowcase />
       <ServicesShowcaseTest />

      {/* King's Difference stats & narrative */}
      <KingsDifference />

      {/* Heat & Damage Reality panel */}
      {/* <HeatReality /> */}

      {/* Trust strip intentionally omitted to match current design mock */}

      {/* FAQs populated with client copy */}
      <Faqs />

      {/* Final conversion CTA */}
      <FinalCta />
    </>
  );
}
