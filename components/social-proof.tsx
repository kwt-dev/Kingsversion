import Image from 'next/image'

import KingsButton from '@/components/ui/kings-button'

const testimonials = [
  {
    name: 'Taylor H.',
    vehicle: '2023 Tesla Model Y',
    review:
      "Dropped the cabin temp by 20 degrees. The tint is flawless and the team walked me through every option without the hard sell.",
    photo: '/images/customer-avatar-01.jpg',
  },
  {
    name: 'Marcus L.',
    vehicle: '2022 Ford F-150',
    review:
      "Rock chips destroyed my last truck. The XPEL film King's installed is invisible and already saved me twice.",
    photo: '/images/customer-avatar-02.jpg',
  },
  {
    name: 'Elena R.',
    vehicle: '2021 Porsche Macan',
    review:
      'Ceramic coating still beads like day one. They care about the little things &mdash; the interior looked better than when I arrived.',
    photo: '/images/customer-avatar-03.jpg',
  },
]

const galleryImages = [
  {
    src: '/images/customer-bg-02.png',
    alt: 'Window tint application on SUV',
  },
  {
    src: '/images/customer-bg-06.png',
    alt: 'Paint protection film installation',
  },
  {
    src: '/images/customer-bg-04.png',
    alt: 'Finished tint with ceramic gloss',
  },
  {
    src: '/images/customer-bg-09.png',
    alt: 'Detailing bay inside shop',
  },
]

export default function SocialProof() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
          <div className="lg:w-1/2" data-aos="fade-right">
            <p className="text-gold-accent text-xs font-semibold tracking-[0.35rem] uppercase">Social Proof</p>
            <h2 className="mt-4 text-2xl font-semibold text-white sm:text-4xl">Trusted by Thousands of Local Drivers</h2>
            <p className="mt-3 text-base leading-relaxed text-light-grey">
              Real reviews. Real installs. King&apos;s has served more than 15,000 Columbus drivers with a consistent
              4.9-star experience.
            </p>

            <div className="mt-8 space-y-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="flex gap-4 rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border border-gold-accent/40">
                    <Image
                      src={testimonial.photo}
                      alt={`${testimonial.name} headshot`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <p className="text-sm leading-relaxed text-light-grey">&ldquo;{testimonial.review}&rdquo;</p>
                    <div className="mt-3 text-xs uppercase tracking-wide text-light-grey/80">
                      <span className="font-semibold text-white">{testimonial.name}</span> &bull; {testimonial.vehicle}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <KingsButton variant="gold" href="/pricing" className="px-6 py-3 text-xs sm:text-sm">
                Get a Quote
              </KingsButton>
              <KingsButton variant="ghost" href="/gallery" className="px-6 py-3 text-xs sm:text-sm" arrow>
                Browse Gallery
              </KingsButton>
            </div>
          </div>

          <div className="lg:w-1/2" data-aos="fade-left" data-aos-delay="150">
            <div className="grid gap-4 sm:grid-cols-2">
              {galleryImages.map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/5 bg-obsidian/60"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 320px, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
