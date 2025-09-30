import KingsButton from '@/components/ui/kings-button'

export default function FinalCta() {
  return (
    <section className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="surface-king rounded-[2rem] p-8 md:p-12 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-semibold mb-2">Ready to Drive in Comfort Instead of an Oven?</h2>
          <p className="text-light-grey max-w-2xl mx-auto mb-6">Join thousands of smart vehicle owners who chose protection that truly lasts over shortcuts that fail.</p>

          <ul className="text-light-grey text-sm grid md:grid-cols-2 gap-2 mb-8 max-w-3xl mx-auto text-left">
            <li>✓ Computer‑precision installation (not hand‑cut)</li>
            <li>✓ Premium ceramic technology (not cheap dyed film)</li>
            <li>✓ Lifetime warranty protection</li>
            <li>✓ 25+ years of proven expertise</li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <KingsButton variant="gold" href="/contact" className="px-6 py-3">SECURE YOUR PROTECTION TODAY</KingsButton>
            <KingsButton variant="ghost" href="tel:+15551234567" className="px-6 py-3">CALL (555) 123‑4567</KingsButton>
          </div>

          <div className="mt-6 text-light-grey/80 text-sm">Trusted by 15,000+ vehicle owners • 4.9/5 stars • Lifetime warranty guaranteed</div>
          <div className="mt-4 text-amber-300/90 text-xs">Limited premium appointments available this week</div>
        </div>
      </div>
    </section>
  )
}

