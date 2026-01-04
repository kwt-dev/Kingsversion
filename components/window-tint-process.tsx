import KingsButton from '@/components/ui/kings-button'

const steps = [
  {
    title: 'Consult & Quote',
    description: 'Tell us about your vehicle and goals. We recommend film levels that match your comfort and Ohio tint laws.',
  },
  {
    title: 'Prep & Protection',
    description: 'We deep clean glass, mask sensitive panels, and stage precision tools before a single panel is installed.',
  },
  {
    title: 'Ceramic Install',
    description: 'Computer patterns are laid with slip solutions, then heat-formed for a factory-level finish and zero contamination.',
  },
  {
    title: 'Quality Check & Care',
    description: 'Lead installers inspect edges, defrosters, and dot matrix. We review aftercare and schedule your follow-up.',
  },
]

export default function WindowTintProcess() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-12">
        <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.35rem] text-gold-accent">Our Process</p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-4xl">Perfect Results Without Guesswork</h2>
          <p className="mt-3 text-base leading-relaxed text-light-grey">
            You&apos;ll know exactly what to expect before, during, and after install &mdash; no surprises, just a cooler ride
            engineered by the same family trusted across Columbus for 25+ years.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2" data-aos="fade-up" data-aos-delay="150">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-[0.4rem] text-gold-accent">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-light-grey">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center" data-aos="fade-up" data-aos-delay="250">
          <KingsButton variant="primary" href="/contact" className="px-6 py-3 text-xs sm:text-sm">
            Schedule Your Install
          </KingsButton>
        </div>
      </div>
    </section>
  )
}
