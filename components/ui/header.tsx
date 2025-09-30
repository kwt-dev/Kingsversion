'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './logo';
import MenuButton from './menu-button';
import KingsButton from './kings-button';
import { Building2 } from 'lucide-react';

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="absolute w-full z-30">
      <div className="relative w-full max-w-7xl mx-auto px-12 sm:px-18">
        <div className="flex items-center justify-between w-full pt-12 sm:pt-16 h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-1">
            <Logo />
          </div>

          {/* Desktop Navigation - hidden on mobile, visible on md+ */}
          <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            <Link
              className="font-medium text-sm text-white hover:text-gold-accent transition-colors"
              href="/about"
            >
              About
            </Link>
            <Link
              className="font-medium text-sm text-white hover:text-gold-accent transition-colors"
              href="/services"
            >
              Services
            </Link>
            <Link
              className="font-medium text-sm text-white hover:text-gold-accent transition-colors"
              href="/pricing"
            >
              Pricing
            </Link>
            <Link
              className="font-medium text-sm text-white hover:text-gold-accent transition-colors"
              href="/gallery"
            >
              Gallery
            </Link>
            <Link
              className="font-medium text-sm text-white hover:text-gold-accent transition-colors"
              href="/contact"
            >
              Contact
            </Link>
          </nav>

          {/* Navigation and CTA Button */}
          <div className="flex items-center space-x-4 flex-1 justify-end">

            {/* CTA Button - hidden on mobile, visible on tablet+ */}
            <div className="hidden sm:block">
              <KingsButton
                variant="primary"
                href="/contact"
                className="text-xs px-4 py-2 whitespace-nowrap"
              >
                PROTECT YOUR VEHICLE TODAY
              </KingsButton>
            </div>

            {/* Menu button - only on mobile */}
            <div className="md:hidden">
              <MenuButton onToggle={setMobileNavOpen} isOpen={mobileNavOpen} />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`absolute top-full left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            mobileNavOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="bg-obsidian/95 backdrop-blur-md border border-gold-accent/20 rounded-lg px-4 py-4 mt-4 space-y-3">
            <li>
              <Link
                className="flex font-medium text-sm text-white hover:text-gold-accent transition-colors py-2"
                href="/about"
                onClick={() => setMobileNavOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="flex font-medium text-sm text-white hover:text-gold-accent transition-colors py-2"
                href="/services"
                onClick={() => setMobileNavOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                className="flex font-medium text-sm text-white hover:text-gold-accent transition-colors py-2"
                href="/pricing"
                onClick={() => setMobileNavOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                className="flex font-medium text-sm text-white hover:text-gold-accent transition-colors py-2"
                href="/gallery"
                onClick={() => setMobileNavOpen(false)}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                className="flex font-medium text-sm text-white hover:text-gold-accent transition-colors py-2"
                href="/contact"
                onClick={() => setMobileNavOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
