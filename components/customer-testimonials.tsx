export default function CustomerTestimonials() {
  const testimonials = [
    {
      name: "Sarah M.",
      location: "Phoenix, AZ",
      service: "Paint Protection Film",
      review: "Best investment I've made for my car. The PPF is completely invisible and has already saved my paint from several rock chips. King's did an amazing job.",
      rating: 5,
      vehicle: "2022 BMW X5"
    },
    {
      name: "Mike R.",
      location: "Scottsdale, AZ",
      service: "Window Tint",
      review: "Professional installation and the difference in heat is incredible. No more burning steering wheel in summer. Highly recommend King's Window Tint.",
      rating: 5,
      vehicle: "2023 Tesla Model Y"
    },
    {
      name: "Jennifer L.",
      location: "Tempe, AZ",
      service: "Ceramic Coating",
      review: "My car looks brand new even after 6 months. The coating makes washing so easy and the gloss is amazing. Worth every penny.",
      rating: 5,
      vehicle: "2021 Porsche 911"
    }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="kings-section-title mb-4">What Our Customers Say</h2>
          <p className="text-light-grey text-base max-w-2xl mx-auto">
            Over 300 five-star reviews from satisfied customers across the Phoenix area.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-xl" data-aos="fade-up" data-aos-delay={index * 100}>
              {/* Star rating */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-gold-accent" viewBox="0 0 20 20">
                    <path d="M10 1l2.5 6.5H19l-5.5 4 2 6.5L10 14l-5.5 4 2-6.5L1 7.5h6.5L10 1z" />
                  </svg>
                ))}
              </div>

              {/* Review text */}
              <blockquote className="text-light-grey text-sm leading-relaxed mb-6">
                "{testimonial.review}"
              </blockquote>

              {/* Customer info */}
              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-light-grey text-xs">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gold-accent text-xs font-medium">{testimonial.service}</p>
                    <p className="text-light-grey text-xs">{testimonial.vehicle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 bg-obsidian/40 border border-gold-accent/20 rounded-full px-8 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-accent">300+</div>
              <div className="text-xs text-light-grey">Happy Customers</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-accent">25+</div>
              <div className="text-xs text-light-grey">Years Experience</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-accent">100%</div>
              <div className="text-xs text-light-grey">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}