export const metadata = {
  title: "King's Window Tint | Columbus Tint, PPF & Ceramic Coatings",
  description:
    "Family-owned for over 25 years, King's Window Tint delivers precision tint, paint protection film, and ceramic coatings to drivers across Columbus and Central Ohio.",
}

import Hero from '@/components/hero'
import WhyDriversTrust from '@/components/why-drivers-trust'
import InstantQuoteCallout from '@/components/instant-quote-callout'
import Transformation from '@/components/transformation'
import FeaturedServices from '@/components/featured-services'
import SocialProof from '@/components/social-proof'
import PersonalStory from '@/components/personal-story'
import ProcessSteps from '@/components/process-steps'
import FinalCta from '@/components/final-cta'

export default function Home() {
  return (
    <>
      <Hero />
      <WhyDriversTrust />
      <PersonalStory />
      <InstantQuoteCallout />
      <Transformation />
      <FeaturedServices />
      <SocialProof />
      <ProcessSteps />
      <FinalCta />
    </>
  )
}
