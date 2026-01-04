export const metadata = {
  title: "XPEL Paint Protection Film in Columbus | King's Window Tint",
  description:
    "XPEL paint protection film installs in Columbus, Ohio. Shield your paint from rock chips, scratches, and Ohio road salt with lifetime craftsmanship from the King family.",
}

import PpfHero from '@/components/ppf-hero'
import InstantQuoteCallout from '@/components/instant-quote-callout'
import PpfCoverage from '@/components/ppf-coverage'
import PpfBenefits from '@/components/ppf-benefits'
import PpfProcess from '@/components/ppf-process'
import PpfFaq from '@/components/ppf-faq'
import SocialProof from '@/components/social-proof'
import FinalCta from '@/components/final-cta'

export default function PaintProtectionPage() {
  return (
    <>
      <PpfHero />
      <InstantQuoteCallout />
      <PpfCoverage />
      <PpfBenefits />
      <PpfProcess />
      <SocialProof />
      <PpfFaq />
      <FinalCta />
    </>
  )
}

