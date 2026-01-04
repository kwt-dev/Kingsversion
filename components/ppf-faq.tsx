const faqs = [
  {
    question: 'How long does PPF last?',
    answer:
      'XPEL Ultimate Plus carries a 10-year manufacturer warranty. With our maintenance guidance, most clients see flawless performance well beyond that timeline.',
  },
  {
    question: 'Can you see the edges?',
    answer:
      'Our installs use wrapped edges wherever possible and micro seams where necessary. We place seams in low-visibility areas so the film disappears on your paint.',
  },
  {
    question: 'Does PPF change the look of my car?',
    answer:
      'Ultimate Plus keeps a glossy factory look. Prefer stealth satin? We offer XPEL Stealth for matte conversions or matching matte factory paints.',
  },
  {
    question: 'How do I care for PPF after install?',
    answer:
      'Hand wash with pH-neutral soap, avoid touchless washes for the first week, and use ceramic-safe toppers for slickness. We arm you with a full care guide after install.',
  },
]

export default function PpfFaq() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-12">
        <div className="text-center" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.35rem] text-gold-accent">PPF FAQ</p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-4xl">Your Paint Protection Questions, Answered</h2>
          <p className="mt-3 text-base leading-relaxed text-light-grey">
            Need to compare packages or confirm Ohio road protection needs? Text or call &mdash; we love talking protection.
          </p>
        </div>

        <div className="mt-10 space-y-6" data-aos="fade-up" data-aos-delay="150">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-light-grey">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
