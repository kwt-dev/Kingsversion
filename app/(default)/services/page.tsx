export const metadata = {
  title: 'Professional Automotive Services - Kings Window Tint',
  description: 'Premium window tinting, paint protection film, and ceramic coating services. 25+ years of experience protecting Phoenix area vehicles.',
};

import RefinedHero from '@/components/refined-hero';
import ServicesQuickView from '@/components/services-quick-view';
import ResultsGallery from '@/components/results-gallery';
import CustomerTestimonials from '@/components/customer-testimonials';
import ServicesShowcase from '@/components/services-showcase';
import InlineBookingCta from '@/components/inline-booking-cta';
import FinalCta from '@/components/final-cta';

export default function Services() {
  return (
    <>
      <RefinedHero />
      <ServicesQuickView />
      <ResultsGallery />
      <CustomerTestimonials />
      <ServicesShowcase />
      <InlineBookingCta />
      <FinalCta />
    </>
  );
}