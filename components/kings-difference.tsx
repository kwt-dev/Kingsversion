export default function KingsDifference() {
  return (
    <section className="relative isolate py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[0.5px] w-8 bg-gold-accent"></span>
            <span className="text-xs uppercase tracking-[.25em] text-white font-medium">Certified Professionals</span>
            <span className="h-[0.5px] w-8 bg-gold-accent"></span>
          </div>
          <h2 className="text-white text-2xl md:text-3xl font-semibold px-[20%]">
            Why drivers choose King&apos;s over the competition
            {/* Why Smart Vehicle Owners Choose King&apos;s Over the Competition */}
          </h2>
          {/* <p className="text-white text-sm md:text-base mt-2 max-w-2xl mx-auto">
            Quality that&apos;s immediately visible and guaranteed to last.
          </p> */}
        </div>

        {/* Inline “glass” stats (Option 1) */}
        <dl className="max-w-5xl mx-auto mb-10 overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-6 text-center">
              <dd className="text-3xl font-bold tracking-tight text-amber-300">350+</dd>
              <dt className="mt-3 text-xs uppercase tracking-widest text-white">
                Google Reviews
              </dt>
            </div>
            <div className="p-6 text-center">
              <dd className="text-3xl font-bold tracking-tight text-amber-300">25+</dd>
              <dt className="mt-3 text-xs uppercase tracking-widest text-white">
                Years of Family Excellence
              </dt>
            </div>
            <div className="p-6 text-center">
              <dd className="text-3xl font-bold tracking-tight text-amber-300">20,000+</dd>
              <dt className="mt-3 text-xs uppercase tracking-widest text-white">
                Vehicles Protected
              </dt>
            </div>
            <div className="p-6 text-center">
              <dd className="text-3xl font-bold tracking-tight text-amber-300">100%</dd>
              <dt className="mt-3 text-xs uppercase tracking-widest text-white">
                5-Star Reviews
              </dt>
            </div>
          </div>
        </dl>

      </div>
    </section>
  )
}
