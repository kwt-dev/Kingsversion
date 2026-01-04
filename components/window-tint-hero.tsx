'use client'

import Image from 'next/image'

import { useBookingWidget } from '@/components/booking-widget-provider'
import KingsButton from '@/components/ui/kings-button'

export default function WindowTintHero() {
  const { openWidget } = useBookingWidget()

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/tint.webp"
          alt="Luxury sedan receiving ceramic window tint"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-obsidian/90 via-obsidian/70 to-obsidian/60" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[65vh] w-full max-w-6xl flex-col justify-center gap-8 px-4 py-20 sm:px-12 sm:py-28">
        <div className="max-w-3xl" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.35rem] text-gold-accent">
            Ceramic Window Tinting
          </p>
          <h1 className="mt-4 font-montserrat text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Stay Cooler, Drive Safer, and Love Every Mile in Columbus Heat
          </h1>
          <p className="mt-4 text-base leading-relaxed text-light-grey">
            King&apos;s installs premium ceramic films that block dangerous UV, cut brutal cabin heat, and deliver a
            seamless factory finish &mdash; without the bubbles, gaps, or purple fade you see from bargain shops.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row" data-aos="fade-up" data-aos-delay="150">
          <KingsButton variant="gold" onClick={openWidget} className="px-6 py-3 text-xs sm:text-sm">
            Build My Tint Package
          </KingsButton>
          <KingsButton variant="ghost" href="/gallery" className="px-6 py-3 text-xs sm:text-sm" arrow>
            See Recent Installs
          </KingsButton>
        </div>

        <div className="grid gap-4 text-sm text-light-grey sm:grid-cols-3" data-aos="fade-up" data-aos-delay="250">
          {[
            'Heat rejection up to 98% on infrared radiation',
            'Computer-cut patterns for every make and model',
            'Lifetime warranty backed by the King family',
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
