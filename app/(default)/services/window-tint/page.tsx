export const metadata = {
  title: "Ceramic Window Tinting in Columbus | King's Window Tint",
  description:
    "Premium ceramic window tint installs in Columbus, Ohio. Beat the heat, protect your interior, and enjoy lifetime warranty coverage from the King family.",
}

import WindowTintHero from '@/components/window-tint-hero'
import InstantQuoteCallout from '@/components/instant-quote-callout'
import WindowTintBenefits from '@/components/window-tint-benefits'
import WindowTintPackages from '@/components/window-tint-packages'
import WindowTintProcess from '@/components/window-tint-process'
import WindowTintFaq from '@/components/window-tint-faq'
import SocialProof from '@/components/social-proof'
import FinalCta from '@/components/final-cta'

export default function WindowTintPage() {
  return (
    <>
      <WindowTintHero />
      <InstantQuoteCallout />
      <WindowTintBenefits />
      <WindowTintPackages />
      <WindowTintProcess />
      <SocialProof />
      <WindowTintFaq />
      <FinalCta />
    </>
  )
}

