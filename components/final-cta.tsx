import KingsButton from '@/components/ui/kings-button'

const reassurances = [
  'Transparent pricing before the keys ever leave your hand',
  'Lifetime warranty support backed by the King family',
  'Dust-controlled bays, climate-stable cures, zero rushing',
  'Aftercare check-ins so your investment keeps performing',
]

export default function FinalCta() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-12">
        <div className="surface-king rounded-[2.5rem] p-10 text-center md:p-14">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Your Vehicle, Done Right the First Time.</h2>
          <p className="mt-3 text-base leading-relaxed text-light-grey">
            Backed by premium materials, precise installs, and a family that stands behind every job.
          </p>

          <ul className="mx-auto mt-8 grid max-w-3xl gap-3 text-left text-sm text-light-grey sm:grid-cols-2">
            {reassurances.map((item) => (
              <li key={item} className="rounded-2xl border border-white/5 bg-white/5 px-5 py-4">
                <span className="text-gold-accent">&#10003;</span> {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <KingsButton variant="gold" href="/pricing" className="px-6 py-3 text-xs sm:text-sm">
              Get a Free Quote
            </KingsButton>
            <KingsButton variant="ghost" href="/contact" className="px-6 py-3 text-xs sm:text-sm">
              Schedule Your Install
            </KingsButton>
          </div>

          <div className="mt-6 text-sm text-light-grey/80">
            4.9 &#9733; Google Rating &bull; XPEL Certified &bull; Serving Columbus &amp; Central Ohio
          </div>
        </div>
      </div>
    </section>
  )
}
