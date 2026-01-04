import KingsButton from '@/components/ui/kings-button'

const steps = [
  {
    number: '01',
    title: 'Request Your Quote',
    description: 'Build your package online or give us a quick call. We confirm pricing and answer questions fast.',
  },
  {
    number: '02',
    title: 'Drop Off / Relax',
    description: 'Bring your vehicle in or hang out in our lounge with Wi-Fi, espresso, and full visibility into the bay.',
  },
  {
    number: '03',
    title: 'Precision Install',
    description: 'Computer-cut patterns, dust-controlled bays, and veteran installers who sweat the details.',
  },
  {
    number: '04',
    title: 'Drive Away Proud',
    description: 'We walk you through care instructions, warranty coverage, and schedule any follow-up you need.',
  },
]

export default function ProcessSteps() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-12">
        <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
          <p className="text-gold-accent text-xs font-semibold tracking-[0.35rem] uppercase">What to Expect</p>
          <h2 className="mt-4 text-2xl font-semibold text-white sm:text-4xl">What Perfect Execution Looks Like</h2>
          <p className="mt-3 text-base leading-relaxed text-light-grey">
            From first click to final inspection, every step is designed to keep you confident, informed, and excited to
            hit the road.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-aos="fade-up" data-aos-delay="150">
          {steps.map((step) => (
            <div key={step.number} className="relative rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
              <div className="text-gold-accent text-xs font-semibold tracking-[0.4rem]">{step.number}</div>
              <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-light-grey">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center" data-aos="fade-up" data-aos-delay="250">
          <KingsButton variant="primary" href="/contact" className="px-6 py-3 text-xs sm:text-sm">
            Schedule Your Install
          </KingsButton>
          <KingsButton variant="ghost" href="/pricing" className="px-6 py-3 text-xs sm:text-sm" arrow>
            Start Your Quote
          </KingsButton>
        </div>
      </div>
    </section>
  )
}

