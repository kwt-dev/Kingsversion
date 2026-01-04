import Logo from './logo'

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Company */}
          <div>
            <Logo />
            <p className="text-light-grey mt-3 text-sm">Columbus&apos; family shop for tint &amp; protection since 1998.</p>
            <p className="text-light-grey/80 mt-2 text-sm max-w-xs">Two generations of the King family delivering premium installs, honest guidance, and warranty support that never ghosts you.</p>
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
              <li><a href="tel:+16145550198" className="hover:text-white">(614) 555-0198</a></li>
              <li><a href="mailto:hello@kingswindowtint.com" className="hover:text-white">hello@kingswindowtint.com</a></li>
              <li>
                <a href="https://maps.google.com/?q=4567+Hamilton+Rd,+Columbus,+OH+43230" className="hover:text-white" target="_blank" rel="noreferrer">
                  4567 Hamilton Rd, Columbus, OH 43230
                </a>
              </li>
              <li>Mon&ndash;Fri 8AM&ndash;6PM &bull; Sat 9AM&ndash;2PM</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h6 className="text-white font-semibold mb-3">Our Services</h6>
            <ul className="text-sm text-light-grey space-y-2">
              <li><a href="/services/window-tint" className="hover:text-white">Automotive Window Tint</a></li>
              <li><a href="/services/paint-protection" className="hover:text-white">Paint Protection Film</a></li>
              <li><a href="/services/ceramic-coating" className="hover:text-white">Ceramic Coating</a></li>
              <li><a href="/pricing" className="hover:text-white">Packages &amp; Pricing</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-white font-semibold mb-3">Quick Links</h6>
            <ul className="text-sm text-light-grey space-y-2">
              <li><a href="/pricing" className="hover:text-white">Get a Quote</a></li>
              <li><a href="/gallery" className="hover:text-white">See Our Work</a></li>
              <li><a href="/#faqs" className="hover:text-white">FAQ</a></li>
              <li><a href="/about" className="hover:text-white">About King&apos;s</a></li>
              <li><a href="/contact" className="hover:text-white">Schedule Install</a></li>
            </ul>
          </div>
        </div>

        {/* Service Area + badges */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-sm text-light-grey">Serving Columbus, New Albany, Westerville, and the greater Central Ohio community.</div>
          <div className="flex gap-4 opacity-80">
            <span className="chip">Google &#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="chip">XPEL Authorized</span>
            <span className="chip">Family Owned Since 1998</span>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-8 pt-6 border-t border-white/10 text-xs text-light-grey flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>&copy; {new Date().getFullYear()} King&apos;s Window Tint. All rights reserved.</div>
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
