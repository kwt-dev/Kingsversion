'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './logo';
import MenuButton from './menu-button';
import KingsButton from './kings-button';
import GlassSurface from '../GlassSurface';
import { Building2 } from 'lucide-react';

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="w-full z-30 absolute top-0 left-0 bg-obsidian">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-12">
        <div className="flex items-center justify-between w-full py-3 sm:py-4">
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
          <div className="mt-4">
            <GlassSurface
              width="100%"
              height="auto"
              borderRadius={12}
              borderWidth={0.08}
              brightness={30}
              opacity={0.85}
              blur={12}
              displace={8}
              backgroundOpacity={0.4}
              saturation={1.2}
              distortionScale={-150}
              redOffset={5}
              greenOffset={15}
              blueOffset={25}
              mixBlendMode="screen"
              className="bg-gradient-to-r from-king-red/60 to-king-red/40 border border-gold-accent/20"
              style={{ display: 'block' }}
            >
              <ul className="px-4 py-4 space-y-3">
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
            </GlassSurface>
          </div>
        </nav>
      </div>
    </header>
  );
}
