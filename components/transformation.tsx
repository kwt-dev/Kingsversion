'use client'

import Image from 'next/image'
import { useState } from 'react'

import KingsButton from '@/components/ui/kings-button'

export default function Transformation() {
  const [sliderValue, setSliderValue] = useState(55)

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div data-aos="fade-up">
            <p className="text-gold-accent text-xs font-semibold tracking-[0.35rem] uppercase">The Transformation</p>
            <h2 className="mt-4 text-2xl font-semibold text-white sm:text-4xl">More Than Tint. It&apos;s Peace of Mind.</h2>
            <p className="mt-3 text-base leading-relaxed text-light-grey">
              Most tint jobs cut corners. We don&apos;t. With King&apos;s, you get protection that lasts, installs done right,
              and craftsmanship that shows every time you get behind the wheel.
            </p>

            <div className="mt-8 space-y-5 text-sm text-light-grey">
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-gold-accent/40 text-xs text-gold-accent">1</span>
                <p>Premium ceramic tint filters the heat while keeping visibility crystal clear &mdash; no bubbling, no purple film.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-gold-accent/40 text-xs text-gold-accent">2</span>
                <p>Computer-cut patterns glide into place for factory-level edges with zero risk to your paint or glass seals.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-gold-accent/40 text-xs text-gold-accent">3</span>
                <p>Every install is inspected by our master installer before you drive away cooler, safer, and proud.</p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <KingsButton variant="primary" href="/pricing" className="px-6 py-3 text-xs sm:text-sm">
                Get an Instant Quote
              </KingsButton>
              <KingsButton variant="ghost" href="/gallery" className="px-6 py-3 text-xs sm:text-sm" arrow>
                View Before &amp; Afters
              </KingsButton>
            </div>
          </div>

          <div className="relative" data-aos="fade-left" data-aos-delay="150">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian/80">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/coolInterior.png"
                  alt="Vehicle interior without tint protection"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 520px, 100vw"
                />

                <div
                  className="absolute inset-0 overflow-hidden border-r border-gold-accent/60 transition-all duration-200"
                  style={{ width: `${sliderValue}%` }}
                >
                  <Image
                    src="/images/tint.webp"
                    alt="Vehicle interior after professional tint and PPF"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 520px, 100vw"
                  />
                  <div className="absolute inset-y-0 right-[-1px] flex w-10 items-center justify-center">
                    <div className="h-20 w-1 rounded-full bg-gold-accent" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 text-xs uppercase tracking-wide text-light-grey/80">
                <span>Before</span>
                <div className="flex flex-1 items-center justify-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sliderValue}
                    onChange={(event) => setSliderValue(Number(event.target.value))}
                    className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/20"
                    style={{ accentColor: '#F5C542' }}
                    aria-label="Drag to compare before and after results"
                  />
                </div>
                <span>After</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
