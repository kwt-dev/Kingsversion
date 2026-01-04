'use client'

import KingsButton from '@/components/ui/kings-button'
import { useBookingWidget } from '@/components/booking-widget-provider'

export default function InstantQuoteCallout() {
  const { openWidget } = useBookingWidget()

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-12">
        <div
          className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between"
          data-aos="fade-up"
        >
          <div className="max-w-2xl text-sm text-light-grey">
            <span className="font-semibold text-white">Instant Quote Widget</span> &mdash;
            build your package in seconds and lock in transparent pricing before you ever step into the shop.
          </div>
          <KingsButton
            variant="gold"
            onClick={openWidget}
            className="whitespace-nowrap px-6 py-2 text-xs sm:text-sm"
          >
            Launch Quote Tool
          </KingsButton>
        </div>
      </div>
    </section>
  )
}
