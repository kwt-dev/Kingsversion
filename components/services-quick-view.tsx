import ServiceCard from './service-card';

export default function ServicesQuickView() {
  const services = [
    {
      title: 'Paint Protection Film',
      subtitle: 'Auto Armor for the discerning driver',
      description:
        "Invisible shield that stops rock chips, scratches, and road damage. Drive worry-free knowing your paint stays perfect.",
      backgroundImage: '/images/ppf.webp',
      buttonHref: '/contact?service=ppf',
    },
    {
      title: 'Window Tint',
      subtitle: 'Style, Comfort, and Privacy - that will last',
      description:
        "Block 99% of UV rays and reduce interior heat by up to 60%. Comfort, privacy, and protection in one.",
      backgroundImage: '/images/tint.webp',
      buttonHref: '/contact?service=tint',
    },
    {
      title: 'Ceramic Coating',
      subtitle: "You'll never walk away from your vehicle without double taking again",
      description:
        "Permanent protection that makes washing effortless. Enhanced gloss and years of durability.",
      backgroundImage: '/images/ceramicCoating.webp',
      buttonHref: '/contact?service=ceramic',
    },
  ];

  return (
    <section className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.25em] text-gold-accent">Why Drivers Trust King's</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
            25+ years of delivering quality installations in southern Indiana
          </h2>
          <p className="mt-3 text-light-grey max-w-2xl">
            From heat-rejecting window tint to XPEL paint protection film and ceramic coatings, these are the services drivers trust us with most. Pick the protection that fits your needs and we'll handle the rest with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              subtitle={service.subtitle}
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