import Image from 'next/image';
import KingsButton from './ui/kings-button';

export default function RefinedHero() {
  return (
    <section className="w-full pb-6 md:pb-8">
      <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] flex max-w-7xl mx-auto items-end overflow-hidden pt-8 sm:pt-16 rounded-b-[2rem] sm:rounded-b-[3rem]">
        {/* Background Image */}
        <div id="backgroundHeroImg" className="absolute inset-0 rounded-b-[2rem] sm:rounded-b-[3rem] overflow-hidden">
          <Image
            src="/images/hero_bg.webp"
            alt="Luxury BMW with professional window tinting"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-obsidian/30"></div>
        </div>

        <div className="relative w-full max-w-7xl mb-8 sm:mb-14 mx-auto px-4 sm:px-12 lg:px-18">
          {/* Hero content */}
          <div className="max-w-4xl flex flex-col justify-end gap-3 sm:gap-4 text-left">
            {/* Problem-focused headline */}
            <h1 className="text-white w-full text-2xl sm:text-4xl lg:text-5xl font-montserrat font-semibold leading-tight" data-aos="fade-right">
              STOP WORRYING ABOUT <span className="text-gold-accent italic">PAINT DAMAGE</span> & HEAT
            </h1>

            {/* Clear value proposition */}
            <p
              className="text-white max-w-3xl text-sm sm:text-base leading-relaxed sm:leading-snug"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              Professional protection for your investment. 25+ years of experience, premium materials,
              and flawless installation that preserves your vehicle's value and your peace of mind.
            </p>

            {/* Urgency-driven CTA */}
            <div className="pt-2" data-aos="fade-right" data-aos-delay="400">
              <KingsButton variant="primary" href="/contact" className="text-xs sm:text-sm px-6 sm:px-8 py-2.5 sm:py-3">
                BOOK YOUR PROTECTION TODAY
              </KingsButton>
            </div>

            {/* Trust indicators - streamlined */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-4" data-aos="fade-up" data-aos-delay="600">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-gold-accent" viewBox="0 0 20 20">
                      <path d="M10 1l2.5 6.5H19l-5.5 4 2 6.5L10 14l-5.5 4 2-6.5L1 7.5h6.5L10 1z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white text-xs sm:text-sm font-medium">
                  5/5 (300+ Reviews)
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-gold-accent" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span className="text-white text-xs sm:text-sm font-medium">
                  25+ Years Experience
                </span>
              </div>

              <div className="flex items-center space-x-2 col-span-2 lg:col-span-1">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-gold-accent" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-white text-xs sm:text-sm font-medium">
                  Phoenix Area Leader
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}