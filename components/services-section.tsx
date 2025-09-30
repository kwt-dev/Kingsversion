import ServiceCard from './service-card';

export default function ServicesSection() {
  const services = [
    {
      title: 'Paint Protection Film',
      description:
        "Finally, stop stressing about rock chips and road damage. Our invisible shield preserves your paint's perfect look while you enjoy your drive without a second thought.",
      backgroundImage: '/images/ppf.webp',
      buttonHref: '/services/paint-protection',
    },
    {
      title: 'Window Tint',
      description:
        "Block harmful UV rays and reduce heat while maintaining your vehicle's sleek appearance. Professional installation ensures perfect clarity and lasting protection.",
      backgroundImage: '/images/tint.webp',
      buttonHref: '/services/window-tint',
    },
    {
      title: 'Ceramic Coating',
      description:
        "Advanced protection that creates a permanent bond with your vehicle's surface. Enjoy enhanced gloss, easier cleaning, and superior resistance to environmental damage.",
      backgroundImage: '/images/ceramicCoating.webp',
      buttonHref: '/services/ceramic-coating',
    },
  ];

  return (
    <section className="py-6 md:py-8 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.25em] text-gold-accent">How We Protect Your Vehicle</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
            Every install is handled in-house right here in Columbus, IN
          </h2>
          <p className="mt-3 text-light-grey max-w-2xl">
            From heat-rejecting window tint to XPEL paint protection film and ceramic coatings, these are the services I personally stand behind. Pick the coverage that fits your drive and I’ll walk you through the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              backgroundImage={service.backgroundImage}
              buttonHref={service.buttonHref}
              className="data-aos='fade-up' data-aos-delay={`${index * 100}`}"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
