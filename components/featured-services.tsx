import Image from 'next/image'

import KingsButton from '@/components/ui/kings-button'

const services = [
  {
    name: 'Window Tinting',
    description:
      'Beat the heat, protect your interior, and drive in comfort with expert-installed ceramic tint tailored to every contour.',
    image: '/images/tint.webp',
    href: '/services/window-tint',
  },
  {
    name: 'Paint Protection Film',
    description:
      'Stop rock chips and road rash before they happen with virtually invisible XPEL paint protection film that self-heals.',
    image: '/images/ppf.webp',
    href: '/services/paint-protection',
  },
  {
    name: 'Ceramic Coatings',
    description:
      'Lock in a glass-like gloss and effortless cleaning with ceramic protection that resists UV, chemicals, and Ohio winters.',
    image: '/images/ceramicCoating.webp',
    href: '/services/ceramic-coating',
  },
]

export default function FeaturedServices() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-12">
        <div className="text-center" data-aos="fade-up">
          <p className="text-gold-accent text-xs font-semibold tracking-[0.35rem] uppercase">Featured Services</p>
          <h2 className="mt-4 text-2xl font-semibold text-white sm:text-4xl">Protection Packages Built Around You</h2>
          <p className="mt-3 text-base leading-relaxed text-light-grey">
            Choose the coverage that fits your goals, then let our master installers handle the rest.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3" data-aos="fade-up" data-aos-delay="150">
          {services.map((service) => (
            <article
              key={service.name}
              className="flex flex-col overflow-hidden rounded-[1.75rem] border border-white/5 bg-obsidian/70"
            >
              <div className="relative aspect-video">
                <Image
                  src={service.image}
                  alt={`${service.name} installation`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
                />
              </div>

              <div className="flex flex-1 flex-col gap-4 p-8">
                <div>
                  <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-light-grey">{service.description}</p>
                </div>

                <div className="mt-auto pt-4">
                  <KingsButton variant="secondary" href={service.href} className="w-full justify-center px-6 py-3 text-xs">
                    See Packages &amp; Pricing
                  </KingsButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

