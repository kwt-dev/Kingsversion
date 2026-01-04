'use client'

import Image from 'next/image'

import { useBookingWidget } from '@/components/booking-widget-provider'
import KingsButton from './ui/kings-button'

const stats = [
  { label: '5/5 Rating', detail: '400+ local reviews' },
  { label: '25+ Years', detail: 'Family-owned craftsmanship' },
  { label: 'XPEL Certified', detail: 'Authorized Columbus installer' },
]

export default function Hero() {
  const { openWidget } = useBookingWidget()

  return (
    <section className="relative isolate pt-[80px]">
      <div className="relative flex min-h-[50vh] w-full items-center overflow-hidden py-16">
        <div className="absolute inset-0">
          <Image
            src="/images/custom_hero_bg.jpeg"
            alt="Mercedes SUV receiving premium window tint"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-obsidian/85 via-obsidian/60 to-obsidian/40" />
        </div>

        <div className="relative z-10 w-full">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-12">
            <div className="max-w-3xl" data-aos="fade-right">
              <p className="text-gold-accent text-xs font-semibold tracking-[0.25rem]">KING&apos;S WINDOW TINT</p>
              <h1 className="mt-4 font-montserrat text-3xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Two Generations of Precision Tint &amp; Protection
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-light-grey sm:text-base">
                For over 25 years, we&apos;ve helped Columbus drivers stay cool, protect their vehicles,
                and take pride in every detail. Your vehicle deserves craftsmanship that lasts.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row" data-aos="fade-right" data-aos-delay="150">
              <KingsButton variant="primary" onClick={openWidget} className="px-6 py-3 text-xs sm:text-sm">
                Get an Instant Quote
              </KingsButton>
            </div>

            <div className="hidden md:grid md:grid-cols-3 gap-4" data-aos="fade-up" data-aos-delay="250">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/5 bg-obsidian/60 p-4 text-sm text-light-grey/90">
                  <div className="text-base font-semibold text-white">{stat.label}</div>
                  <div className="mt-1 text-xs uppercase tracking-wide text-light-grey/70">{stat.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
