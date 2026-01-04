'use client'

import Image from 'next/image'

import { useBookingWidget } from '@/components/booking-widget-provider'
import KingsButton from '@/components/ui/kings-button'

export default function PpfHero() {
  const { openWidget } = useBookingWidget()

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/ppf.webp"
          alt="Paint protection film being installed on a sports car"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-obsidian/90 via-obsidian/70 to-obsidian/60" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[65vh] w-full max-w-6xl flex-col justify-center gap-8 px-4 py-20 sm:px-12 sm:py-28">
        <div className="max-w-3xl" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.35rem] text-gold-accent">Paint Protection Film</p>
          <h1 className="mt-4 font-montserrat text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Stop Rock Chips Before They Happen With XPEL PPF
          </h1>
          <p className="mt-4 text-base leading-relaxed text-light-grey">
            Columbus highways are brutal on paint. King&apos;s protects daily drivers and dream cars alike with self-healing
            XPEL film that disappears on your finish while taking the abuse of every mile.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row" data-aos="fade-up" data-aos-delay="150">
          <KingsButton variant="gold" onClick={openWidget} className="px-6 py-3 text-xs sm:text-sm">
            Start Your PPF Quote
          </KingsButton>
          <KingsButton variant="ghost" href="/gallery" className="px-6 py-3 text-xs sm:text-sm" arrow>
            View Protected Rides
          </KingsButton>
        </div>

        <div className="grid gap-4 text-sm text-light-grey sm:grid-cols-3" data-aos="fade-up" data-aos-delay="250">
          {[
            'Self-healing top coat erases swirls when exposed to heat',
            'Pre-cut patterns customized to each panel for perfect edges',
            'Licensed XPEL installer with lifetime workmanship guarantee',
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <span className="text-gold-accent">&#10003;</span> {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

