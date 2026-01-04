import KingsButton from '@/components/ui/kings-button'

const packages = [
  {
    name: 'Essentials',
    price: 'Starts at $349',
    description: 'Great for commuters who need heat relief and UV protection on their daily drive.',
    features: [
      'Full sides and rear coverage',
      'XPEL Prime CS ceramic technology',
      'Computer-cut install, zero light gaps',
      'Lifetime film and labor warranty',
    ],
  },
  {
    name: 'All-Season Ceramic',
    price: 'Starts at $449',
    description: 'Most popular option for balancing clarity with top-tier heat rejection and style.',
    features: [
      'XPEL Prime XR Plus ceramic film',
      'Infrared heat blockage up to 98%',
      'Windshield visor strip included',
      'Complimentary 30-day check-up',
    ],
  },
  {
    name: 'Full Climate Command',
    price: 'Starts at $749',
    description: 'Ultimate comfort with complete coverage and options for front windshield protection.',
    features: [
      'Full vehicle coverage including windshield',
      'Interior IR reduction for hybrid and EV battery efficiency',
      'Hydrophobic top coat for easier cleaning',
      'Priority scheduling and loaner availability',
    ],
  },
]

export default function WindowTintPackages() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between" data-aos="fade-up">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35rem] text-gold-accent">Tint Packages</p>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-4xl">Choose Coverage Built for Your Drive</h2>
            <p className="mt-3 text-base leading-relaxed text-light-grey">
              Every tint package is computer-cut, installed by certified pros, and backed by a lifetime warranty. Add-ons
              like windshield tinting or sunroof coverage can be tailored to your vehicle during booking.
            </p>
          </div>
          <KingsButton variant="primary" href="/pricing" className="w-full px-6 py-3 text-xs sm:w-auto sm:text-sm">
            Compare Full Pricing
          </KingsButton>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3" data-aos="fade-up" data-aos-delay="150">
          {packages.map((plan) => (
            <article key={plan.name} className="flex flex-col rounded-3xl border border-white/10 bg-obsidian/70 p-8">
              <div>
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-1 text-sm uppercase tracking-wide text-gold-accent">{plan.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-light-grey">{plan.description}</p>
              </div>

              <ul className="mt-5 flex-1 space-y-2 text-sm text-light-grey">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="text-gold-accent">&#10003;</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <KingsButton
                variant="gold"
                href="/pricing"
                className="mt-6 w-full justify-center px-6 py-3 text-xs"
              >
                See Options
              </KingsButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

