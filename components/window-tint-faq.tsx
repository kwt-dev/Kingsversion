const faqs = [
  {
    question: 'How long does a full tint install take?',
    answer:
      'Most sedans and SUVs are completed within 2-3 hours. Larger vehicles, full windshield coverage, or sunroof/glass roof additions can extend install time to 4 hours. We confirm the timeline during booking.',
  },
  {
    question: 'When can I roll my windows down?',
    answer:
      'We recommend waiting 48 hours so the film fully cures. You can drive right away &mdash; just keep windows up and avoid pressing on the film during the first two days.',
  },
  {
    question: 'Will ceramic tint interfere with defrosters or sensors?',
    answer:
      'No. XPEL ceramic films are signal-safe and work flawlessly with defroster lines, ADAS sensors, toll tags, and mobile devices. We take extra care around rear defroster grids to ensure proper adhesion.',
  },
  {
    question: 'What is covered under the lifetime warranty?',
    answer:
      'Bubbling, peeling, fading, or discoloration are all covered. If you ever have an issue, bring the vehicle by and the King family will make it right with OEM-level reinstallation at no cost.',
  },
]

export default function WindowTintFaq() {
  return (
    <section id="faqs" className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-12">
        <div className="text-center" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.35rem] text-gold-accent">Window Tint FAQ</p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-4xl">Everything You Need to Know Before Booking</h2>
          <p className="mt-3 text-base leading-relaxed text-light-grey">
            Still curious about laws, film shades, or prep? Reach out anytime &mdash; we&apos;re here to make the process simple.
          </p>
        </div>

        <div className="mt-10 space-y-6" data-aos="fade-up" data-aos-delay="150">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold text-white">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-light-grey">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
