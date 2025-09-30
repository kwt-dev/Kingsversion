'use client';

import { useState } from 'react';
import Image from 'next/image';
import KingsButton from './ui/kings-button';

interface ServiceCardProps {
  title: string;
  subtitle?: string;
  description: string;
  backgroundImage: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

export default function ServiceCard({
  title,
  subtitle,
  description,
  backgroundImage,
  buttonText = 'GET MY QUOTE NOW',
  buttonHref = '/contact',
  className = '',
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-full h-64 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out border border-light-brown ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={backgroundImage} alt={title} fill className="object-cover object-center" />
        {/* Gradient overlay - stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/40 to-transparent"></div>
      </div>

      {/* Hover Background Gradient */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(423.05% 216.14% at -25.28% 137.99%, rgba(103, 37, 48, 0.65) 0%, var(--color-obsidian, rgba(4, 7, 7, 0.65)) 100%)'
        }}
      />

      {/* Title and Subtitle - slides from bottom to top */}
      <div className="absolute inset-0 flex items-end p-4 z-20">
        <div
          className={`transition-transform duration-500 ease-in-out ${
            isHovered ? '-translate-y-48' : 'translate-y-0'
          }`}
        >
          <h3
            className="text-white text-lg uppercase tracking-wide font-medium"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              className="text-gold-accent text-xs uppercase tracking-wider mt-1 font-medium"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Hover Content - slides up from below */}
      <div
        className={`absolute inset-0 flex flex-col justify-end p-4 transition-transform duration-500 ease-in-out z-10 ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Content section */}
        <div className="flex-1 flex flex-col justify-center">
          <p
            className="text-light-grey text-sm md:text-base leading-relaxed mb-6 font-light"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            {description}
          </p>

          <KingsButton variant="gold" href={buttonHref} className="text-xs px-6 py-2 w-fit">
            {buttonText}
          </KingsButton>
        </div>
      </div>
    </div>
  );
}
