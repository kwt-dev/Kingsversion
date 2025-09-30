import Image from 'next/image'

export default function TrustSocialProof() {
  return (
    <section className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Ratings row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="chip">⭐⭐⭐⭐⭐</div>
            <p className="text-light-grey">4.9/5 average rating • 350+ Google Reviews</p>
          </div>
          <div className="flex items-center gap-6 opacity-80">
            <Image src="/images/client-01.svg" alt="Brand 1" width={88} height={24} />
            <Image src="/images/client-02.svg" alt="Brand 2" width={88} height={24} />
            <Image src="/images/client-03.svg" alt="Brand 3" width={88} height={24} />
            <Image src="/images/client-04.svg" alt="Brand 4" width={88} height={24} />
          </div>
        </div>

        {/* Short quote */}
        <div className="surface-king p-6 md:p-8 rounded-2xl text-center">
          <blockquote className="text-white text-lg md:text-xl max-w-3xl mx-auto">
            “We refuse to cut corners where others might — because your vehicle deserves nothing less than perfection.”
          </blockquote>
          <div className="text-light-grey mt-2">— The King&apos;s Window Tint Family</div>
        </div>
      </div>
    </section>
  )
}

