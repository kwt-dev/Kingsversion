import Image from 'next/image'

export default function PersonalStory() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div data-aos="fade-right">
            <p className="text-gold-accent text-xs font-semibold tracking-[0.35rem] uppercase">Our Story</p>
            <h2 className="mt-4 text-2xl font-semibold text-white sm:text-4xl">Family-Owned Since 1998</h2>
            <p className="mt-4 text-base leading-relaxed text-light-grey">
              &ldquo;My dad, Rex, started King&apos;s over 25 years ago. Today, I continue his legacy with the same promise: no
              shortcuts, ever. Every car leaves our shop with the care we&apos;d give our own. We remember your name, your
              vehicle, and every detail that matters to you.&rdquo;
            </p>

            <div className="mt-6 grid gap-4 text-sm text-light-grey">
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-xl">
                <span className="text-white">Our shop is built on trust.</span> Most of our clients come from referrals and
                keep coming back with every new vehicle.
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-xl">
                We support local car clubs, partner with dealers who expect perfection, and love walking customers
                through what makes protection last.
              </div>
            </div>
          </div>

          <div className="relative" data-aos="fade-left" data-aos-delay="150">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-gold-accent/30 bg-obsidian/60">
              <Image
                src="/images/custom_hero_bg.jpeg"
                alt="The King family inside the shop"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 460px, 100vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/80 via-obsidian/40 to-transparent p-6">
                <p className="text-sm font-medium text-white">Skyler &amp; Rex King</p>
                <p className="text-xs text-light-grey/80">Second-generation tint &amp; protection specialists</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
