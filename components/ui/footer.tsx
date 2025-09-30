import Logo from './logo'

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Company */}
          <div>
            <Logo />
            <p className="text-light-grey mt-3 text-sm">25+ Years of Precision Protection</p>
            <p className="text-light-grey/80 mt-2 text-sm max-w-xs">Family-owned expertise delivering premium vehicle protection with lifetime warranty confidence.</p>
            <div className="flex gap-3 mt-4">
              <a aria-label="Instagram" href="#" className="chip">IG</a>
              <a aria-label="Facebook" href="#" className="chip">FB</a>
              <a aria-label="Google" href="#" className="chip">G</a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h6 className="text-white font-semibold mb-3">Contact Info</h6>
            <ul className="text-sm text-light-grey space-y-2">
              <li><a href="tel:+15551234567" className="hover:text-white">(555) 123‑4567</a></li>
              <li><a href="mailto:info@kingswindowtint.com" className="hover:text-white">info@kingswindowtint.com</a></li>
              <li>123 Main Street, Your City, ST 12345</li>
              <li>Mon–Fri 8AM–6PM, Sat 9AM–4PM</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h6 className="text-white font-semibold mb-3">Our Services</h6>
            <ul className="text-sm text-light-grey space-y-2">
              <li><a href="/services/window-tint" className="hover:text-white">Automotive Window Tint</a></li>
              <li><a href="/services/paint-protection" className="hover:text-white">Paint Protection Film</a></li>
              <li><a href="/services/ceramic-coating" className="hover:text-white">Ceramic Coating</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-white font-semibold mb-3">Quick Links</h6>
            <ul className="text-sm text-light-grey space-y-2">
              <li><a href="/contact" className="hover:text-white">Book Appointment</a></li>
              <li><a href="#" className="hover:text-white">View Gallery</a></li>
              <li><a href="#" className="hover:text-white">Customer Reviews</a></li>
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Warranty Information</a></li>
            </ul>
          </div>
        </div>

        {/* Service Area + badges */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-sm text-light-grey">Proudly Serving: Your City, Nearby City 1, Nearby City 2, and surrounding areas within 30 miles</div>
          <div className="flex gap-4 opacity-80">
            <span className="chip">XPEL</span>
            <span className="chip">BBB A+</span>
            <span className="chip">Google ★★★★★</span>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-8 pt-6 border-t border-white/10 text-xs text-light-grey flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>© 2025 King&apos;s Window Tint. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Warranty Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
