"use client";

import Image from 'next/image';
import { Coffee, Thermometer, Wrench } from 'lucide-react';
import KingsButton from '@/components/ui/kings-button';

const facilityHighlights = [
  {
    icon: Thermometer,
    title: 'Climate-Controlled Bays',
    description: 'Dust-free, temperature-stable install bays so every film cures perfectly—no unexpected bubbles or edges lifting later on.',
  },
  {
    icon: Wrench,
    title: 'Computer-Cut Precision',
    description: 'Patterns pulled straight from XPEL so every edge is razor-clean without trimming on your paint or glass.',
  },
  {
    icon: Coffee,
    title: 'Customer Lounge',
    description: 'Fast Wi-Fi, fresh coffee, and a front-row view of the work while you wait—or grab a ride from us if you need to head out.',
  },
];

export default function ServicesShowcase() {
  return (
    <section className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-stretch">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12">
            <p className="text-xs uppercase tracking-[0.25em] text-gold-accent">Our Columbus, IN Studio</p>
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-white">
              Step inside the shop my dad built and I now run every day
            </h2>
            <p className="mt-4 text-light-grey max-w-xl">
              I'm Skyler King. I grew up sweeping these floors while my dad, Rex, perfected installs for the local car community. Today we've refreshed the space with modern tooling, but the care, precision, and personal follow-through are still pure King's.
            </p>

            <div className="mt-8 space-y-4">
              {facilityHighlights.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-accent/30 bg-gold-accent/10">
                    <Icon className="h-6 w-6 text-gold-accent" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-medium">{title}</h3>
                    <p className="text-sm text-light-grey mt-1 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <KingsButton variant="gold" href="/contact" className="px-6 py-3">
                BOOK YOUR VISIT
              </KingsButton>
              <KingsButton variant="ghost" href="tel:+15551234567" className="px-6 py-3">
                CALL SKYLER DIRECTLY
              </KingsButton>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10">
            <Image
              src="/images/base.png"
              alt="Inside King's Window Tint facility"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 540px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/40 to-black/70" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/40 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.25em] text-gold-accent">What You'll Notice</p>
              <h3 className="mt-2 text-white text-xl font-semibold">Clean, quiet, and obsessively organized</h3>
              <p className="mt-2 text-light-grey text-sm">
                Every car is taped, inspected, and photographed before and after the install. It’s the only way I’ll sign off on work that carries my name.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
