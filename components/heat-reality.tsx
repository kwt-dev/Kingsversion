import Image from 'next/image'

export default function HeatReality() {
  return (
    <section className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="surface-king p-6 md:p-8 rounded-[2rem]">
          <div className="text-center mb-6">
            <h3 className="text-white text-xl md:text-2xl tracking-wide">THE HEAT &amp; DAMAGE REALITY</h3>
            <div className="mx-auto mt-2 w-16 h-px bg-white/30" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Metric card */}
            <div className="bg-white/95 text-obsidian rounded-2xl p-6 md:p-8 shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full" style={{background:'#FCE7E7', color:'#c41e3a'}}>°</span>
                <div className="text-3xl font-extrabold" style={{color:'#c41e3a'}}>140°F+</div>
              </div>
              <p className="text-[15px] leading-relaxed text-slate-700">
                Your vehicle&apos;s interior reaches 140°F+ on summer days. Every minute of UV exposure accelerates leather cracking, dashboard fading, and creates a dangerously uncomfortable driving environment that forces your AC to work overtime.
              </p>
            </div>

            {/* Photo with chip */}
            <div className="relative rounded-2xl overflow-hidden shadow">
              <Image src="/images/customer-06.jpg" alt="Vehicle interior" width={800} height={500} className="w-full h-auto object-cover" />
              <div className="absolute bottom-3 left-3 chip">UV Damage in Progress</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
