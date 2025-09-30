import Image from 'next/image';

export default function ResultsGallery() {
  const beforeAfterImages = [
    {
      before: '/images/gallery/before-1.webp',
      after: '/images/gallery/after-1.webp',
      title: 'Paint Protection Film',
      description: 'Full front end protection'
    },
    {
      before: '/images/gallery/before-2.webp',
      after: '/images/gallery/after-2.webp',
      title: 'Window Tint',
      description: '50% ceramic tint'
    },
    {
      before: '/images/gallery/before-3.webp',
      after: '/images/gallery/after-3.webp',
      title: 'Ceramic Coating',
      description: '9H hardness coating'
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-dark-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="kings-section-title mb-4">See The Transformation</h2>
          <p className="text-light-grey text-base max-w-3xl mx-auto">
            Real results from real customers. Professional installation makes all the difference
            in both appearance and long-term protection.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {beforeAfterImages.map((item, index) => (
            <div key={index} className="group" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="relative overflow-hidden rounded-xl bg-obsidian/40 border border-gold-accent/20">
                <div className="aspect-[4/3] relative">
                  {/* Placeholder for before/after comparison */}
                  <div className="absolute inset-0 bg-gradient-to-br from-king-red/20 to-gold-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gold-accent/20 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gold-accent font-medium text-sm">Before/After Gallery</p>
                      <p className="text-light-grey text-xs mt-1">Professional Results</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 font-montserrat">{item.title}</h3>
                  <p className="text-light-grey text-sm">{item.description}</p>

                  <div className="mt-4 flex items-center gap-2 text-gold-accent text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="font-medium">View Details</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-obsidian/60 border border-gold-accent/30 text-gold-accent px-8 py-3 rounded-lg hover:bg-gold-accent/10 transition-colors font-medium">
            View Complete Gallery
          </button>
        </div>
      </div>
    </section>
  );
}