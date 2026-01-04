import { Droplet, ShieldCheck, Sparkles, Wrench } from 'lucide-react'

const benefits = [
  {
    title: 'Self-Healing Finish',
    description:
      'XPEL Ultimate Plus uses elastomeric polymers that reform when warmed &mdash; light swirls, scratches, and scuffs vanish with a little sun or warm water.',
    icon: Sparkles,
  },
  {
    title: 'Rock-Chip Defense',
    description:
      '8-mil thickness absorbs the abuse from gravel, road debris, and salt, keeping your paint and leading edge geometry pristine.',
    icon: ShieldCheck,
  },
  {
    title: 'Hydrophobic Top Coat',
    description:
      'A slick, gloss-enhancing top coat makes bug guts and winter grime rinse away without harsh scrubbing.',
    icon: Droplet,
  },
  {
    title: 'Factory-Level Fitment',
    description:
      'Pre-cut patterns combined with edge wrapping and strategic tucks deliver seamless installs &mdash; without trimming on your paint.',
    icon: Wrench,
  },
]

export default function PpfBenefits() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-12">
        <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.35rem] text-gold-accent">Why PPF Wins</p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-4xl">Invisible Armor With Showroom Shine</h2>
          <p className="mt-3 text-base leading-relaxed text-light-grey">
            Paint protection film is the only solution that actually absorbs impact. King&apos;s pair that with detail-obsessed
            installs so your protection looks as flawless as the day you leave the shop.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2" data-aos="fade-up" data-aos-delay="150">
          {benefits.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-accent/20 text-gold-accent">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-light-grey">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
