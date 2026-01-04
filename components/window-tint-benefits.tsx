import { ShieldHalf, SunDim, ThermometerSnowflake, Zap } from 'lucide-react'

const benefits = [
  {
    title: 'Beat the Heat',
    description:
      'Ceramic particles reject up to 98% of infrared rays so your cabin stays comfortable without blasting the AC.',
    icon: ThermometerSnowflake,
  },
  {
    title: 'Protect What Matters',
    description:
      'Blocks 99% of UV rays to prevent skin damage and stop your leather, plastics, and stitching from fading or cracking.',
    icon: ShieldHalf,
  },
  {
    title: 'Crystal-Clear Visibility',
    description:
      'Zero interference with cameras or signal. Our films stay true-to-color and distortion-free day or night.',
    icon: SunDim,
  },
  {
    title: 'Installations You Can Trust',
    description:
      'Computer-cut templates tailored to your VIN mean no razors on your glass and flawless edges every time.',
    icon: Zap,
  },
]

export default function WindowTintBenefits() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-12">
        <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.35rem] text-gold-accent">Why It Matters</p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-4xl">Protection You Feel Every Time You Drive</h2>
          <p className="mt-3 text-base leading-relaxed text-light-grey">
            Columbus sun, winter glare, daily commutes &mdash; we engineer each install to handle your real-world routine
            while keeping your vehicle looking elite.
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
