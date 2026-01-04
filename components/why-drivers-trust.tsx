import { Clock, Gem, ShieldCheck, UsersRound } from 'lucide-react'

const differentiators = [
  {
    title: '25+ Years Family-Owned',
    description: 'Two generations protecting Columbus vehicles with pride and precision.',
    icon: Clock,
  },
  {
    title: 'Premium XPEL Products',
    description: 'We only install XPEL tint, PPF, and coatings backed by industry-leading warranties.',
    icon: Gem,
  },
  {
    title: 'Computer-Cut Precision',
    description: 'Cut to exact vehicle specs for seamless edges and zero razor blades near your paint.',
    icon: ShieldCheck,
  },
  {
    title: 'Lifetime Warranty',
    description: 'Guaranteed performance on every install. If it ever fails, we make it right.',
    icon: UsersRound,
  },
]

export default function WhyDriversTrust() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-12">
        <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
          <p className="text-gold-accent text-xs font-semibold tracking-[0.35rem]">WHY DRIVERS TRUST KING&apos;S</p>
          <h2 className="mt-4 text-2xl font-semibold text-white sm:text-4xl">The Difference Is in the Details</h2>
          <p className="mt-3 text-base leading-relaxed text-light-grey">
            We combine obsessive craftsmanship with technology that keeps your ride cooler, safer, and
            protected longer than the bargain installs down the street.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2" data-aos="fade-up" data-aos-delay="150">
          {differentiators.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-accent/20 text-gold-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-light-grey">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-10 rounded-3xl border border-gold-accent/30 bg-obsidian/60 p-8 text-center text-sm text-light-grey"
          data-aos="fade-up"
          data-aos-delay="250"
        >
          <span className="font-semibold text-white">Local, approachable, and here when you need us</span> &mdash; stop by the shop, text us, or
          call. You&apos;ll always speak with the King family. No pushy sales, ever.
        </div>
      </div>
    </section>
  )
}
