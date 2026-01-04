import KingsButton from '@/components/ui/kings-button'

const steps = [
  {
    title: 'Inspection & Mapping',
    description:
      'We paint-measure every panel, note existing chips, and plan edge wraps and seams before cutting a single sheet of film.',
  },
  {
    title: 'Surface Prep',
    description:
      'Decontamination, paint correction touch-ups, and alcohol wipedowns guarantee a clean surface and perfect adhesion.',
  },
  {
    title: 'Precision Install',
    description:
      'Computer-patterned film is laid with slip solutions, heat-shaped to complex curves, then tucked for invisible edges.',
  },
  {
    title: 'Cure & Quality Check',
    description:
      'We cure under IR lamps, inspect every seam, and walk you through aftercare plus warranty registration before delivery.',
  },
]

export default function PpfProcess() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-12">
        <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.35rem] text-gold-accent">How We Work</p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-4xl">Obsessive Installs From First Panel to Final Cure</h2>
          <p className="mt-3 text-base leading-relaxed text-light-grey">
            You get a turnkey process built on 25+ years of protection experience, plus a team that treats your vehicle like
            it&apos;s family.
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
            Request Install Consultation
          </KingsButton>
        </div>
      </div>
    </section>
  )
}

