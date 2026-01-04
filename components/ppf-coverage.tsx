import Image from 'next/image'

const coverageLevels = [
  {
    title: 'High-Impact Front',
    description:
      'Covers bumper, headlights, mirror caps, and optional hood/fender leading edges. Daily drivers get instant chip protection where they need it most.',
    image: '/images/Booking-Images/STD-CAB-TRUCK/Truck-PPF.webp',
  },
  {
    title: 'Track Car Package',
    description:
      'Full hood, fenders, bumper, rocker panels, and A-pillars. Perfect for sports cars and performance builds that see spirited driving.',
    image: '/images/Booking-Images/Coupe/Coupe-PPF.webp',
  },
  {
    title: 'Full Body Wrap',
    description:
      'Every painted surface protected with XPEL Ultimate Plus. Absolute peace of mind with hydrophobic gloss or stealth satin finishes.',
    image: '/images/Booking-Images/Sedan/Sedan-PPF.webp',
  },
]

export default function PpfCoverage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-12">
        <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.35rem] text-gold-accent">Coverage Options</p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-4xl">Protection Packages Built Around Your Drive</h2>
          <p className="mt-3 text-base leading-relaxed text-light-grey">
            From city commutes to track days, we tailor protection to the panels that take the most abuse &mdash; then finish
            every edge to disappear on your paint.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3" data-aos="fade-up" data-aos-delay="150">
          {coverageLevels.map((level) => (
            <article key={level.title} className="overflow-hidden rounded-3xl border border-white/10 bg-obsidian/70">
              <div className="relative aspect-video">
                <Image
                  src={level.image}
                  alt={`${level.title} paint protection coverage`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">{level.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-light-grey">{level.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
