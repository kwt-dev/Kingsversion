import Image from 'next/image';
import KingsButton from './ui/kings-button';

export default function Hero() {
  return (
    <section className="w-full pb-6 md:pb-8">
      <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] flex w-full items-end overflow-hidden pt-8 sm:pt-16">
        {/* Background Image */}
        <div id="backgroundHeroImg" className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero_bg.webp"
            alt="Luxury BMW with professional window tinting"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay for text readability */}
          {/* <div className="absolute inset-0 bg-obsidian/40"></div> */}
        </div>

        <div className="relative w-full max-w-7xl mb-8 sm:mb-14 mx-auto px-4 sm:px-12 lg:px-18">
          {/* Hero content */}
          <div className="max-w-3xl flex flex-col justify-end gap-3 sm:gap-4 text-left">
            <h1 className="text-white w-full sm:w-[75%] text-2xl sm:text-4xl lg:text-5xl font-montserrat font-semibold leading-tight" data-aos="fade-right">
              STYLE & PROTECTION THAT <span className="text-gold-accent italic">TRULY</span> LASTS
            </h1>

            <p
              className="text-white max-w-2xl text-sm sm:text-base leading-relaxed sm:leading-snug"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              Family-owned for 25+ years, we combine premium materials with precision craftsmanship
              to protect what you value most.
            </p>

            <div className="pt-2" data-aos="fade-right" data-aos-delay="400">
              <KingsButton variant="primary" href="/contact" className="text-xs sm:text-sm px-6 sm:px-8 py-2.5 sm:py-3">
                PROTECT YOUR VEHICLE TODAY
              </KingsButton>
            </div>

            {/* Stats Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 pt-2" data-aos="fade-up" data-aos-delay="600">
              {/* Star Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-gold-accent" viewBox="0 0 20 20">
                      <path d="M10 1l2.5 6.5H19l-5.5 4 2 6.5L10 14l-5.5 4 2-6.5L1 7.5h6.5L10 1z" />
                    </svg>
                  ))}
                </div>
                <span
                  className="text-white text-xs sm:text-sm font-medium"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  5/5 (300+ Reviews)
                </span>
              </div>

              {/* Years Experience */}
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 sm:w-6 sm:h-6 fill-gold-accent" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span
                  className="text-white text-xs sm:text-sm font-medium"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  25+ Years Experience
                </span>
              </div>

              {/* Certified Professionals - Hidden on mobile for space */}
              <div className="hidden sm:flex items-center space-x-2">
                <svg className="w-6 h-6 fill-gold-accent" viewBox="0 0 24 24">
                  <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.2L12 21.04l3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12zm-10 5l-4-4 1.41-1.41L13 14.17l6.59-6.59L21 9l-8 8z" />
                </svg>
                <span
                  className="text-white text-sm font-medium"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  Certified Professionals
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
