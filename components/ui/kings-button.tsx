import Link from 'next/link'
import { ReactNode } from 'react'
import GlassSurface from '../GlassSurface'

interface KingsButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'badge' | 'gold' | 'primary-hover' | 'primary-active'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  arrow?: boolean
}

// Glass surface parameters for each variant
const glassVariantConfig = {
  primary: {
    borderRadius: 10,
    borderWidth: 0.08,
    brightness: 30,
    opacity: 0.85,
    blur: 12,
    displace: 8,
    backgroundOpacity: 0.4,
    saturation: 1.2,
    distortionScale: -150,
    redOffset: 5,
    greenOffset: 15,
    blueOffset: 25,
    mixBlendMode: 'screen' as const,
    // Custom styling for primary variant
    customClass: 'bg-gradient-to-r from-king-red/60 to-king-red/40'
  },
  secondary: {
    borderRadius: 10,
    borderWidth: 0.07,
    brightness: 60,
    opacity: 0.9,
    blur: 8,
    displace: 5,
    backgroundOpacity: 0.3,
    saturation: 1.5,
    distortionScale: -120,
    redOffset: 3,
    greenOffset: 10,
    blueOffset: 18,
    mixBlendMode: 'difference' as const,
    customClass: 'bg-gradient-to-r from-gold-accent/70 to-gold-accent/50'
  },
  ghost: {
    borderRadius: 10,
    borderWidth: 0.05,
    brightness: 25,
    opacity: 0.95,
    blur: 6,
    displace: 2,
    backgroundOpacity: 0.1,
    saturation: 0.8,
    distortionScale: -100,
    redOffset: 2,
    greenOffset: 8,
    blueOffset: 15,
    mixBlendMode: 'normal' as const,
    customClass: 'bg-dark-grey/10'
  },
  badge: {
    borderRadius: 20,
    borderWidth: 0.06,
    brightness: 35,
    opacity: 0.88,
    blur: 10,
    displace: 6,
    backgroundOpacity: 0.35,
    saturation: 1.1,
    distortionScale: -130,
    redOffset: 4,
    greenOffset: 12,
    blueOffset: 20,
    mixBlendMode: 'screen' as const,
    customClass: 'bg-gradient-to-r from-king-red/50 to-gold-accent/30'
  },
  gold: {
    borderRadius: 12,
    borderWidth: 0.09,
    brightness: 55,
    opacity: 0.92,
    blur: 14,
    displace: 10,
    backgroundOpacity: 0.45,
    saturation: 1.6,
    distortionScale: -160,
    redOffset: 6,
    greenOffset: 18,
    blueOffset: 28,
    mixBlendMode: 'screen' as const,
    customClass: 'bg-gradient-to-r from-gold-accent/60 via-light-brown/40 to-gold-accent/60 shadow-[0_0_20px_rgba(245,197,66,0.3)]'
  },
  // Hover state for primary button - tweak these values to customize
  'primary-hover': {
    borderRadius: 10,
    borderWidth: 0.08,
    brightness: 35,  // Slightly brighter on hover
    opacity: 0.88,    // Slightly more opaque
    blur: 14,         // More blur for depth
    displace: 10,     // More displacement for effect
    backgroundOpacity: 0.45,
    saturation: 1.3,  // More saturated colors
    distortionScale: -160,  // More distortion
    redOffset: 6,
    greenOffset: 18,
    blueOffset: 30,
    mixBlendMode: 'screen' as const,
    customClass: 'bg-gradient-to-r from-king-red/65 to-king-red/45'
  },
  // Active/pressed state for primary button - tweak these values to customize  
  'primary-active': {
    borderRadius: 10,
    borderWidth: 0.08,
    brightness: 25,   // Darker when pressed
    opacity: 0.82,    // Less opaque
    blur: 10,         // Less blur
    displace: 6,      // Less displacement
    backgroundOpacity: 0.35,
    saturation: 1.1,  // Less saturated
    distortionScale: -140,  // Less distortion
    redOffset: 4,
    greenOffset: 12,
    blueOffset: 20,
    mixBlendMode: 'screen' as const,
    customClass: 'bg-gradient-to-r from-king-red/55 to-king-red/35'
  }
}

export default function KingsButton({ 
  children, 
  href, 
  variant = 'primary', 
  size = 'md',
  className = '',
  onClick,
  arrow = false
}: KingsButtonProps) {
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  const textColorClasses = {
    primary: 'text-white',
    secondary: 'text-obsidian',
    ghost: 'text-light-grey',
    badge: 'text-light-grey',
    gold: 'text-white',
    'primary-hover': 'text-white',
    'primary-active': 'text-white'
  }
  
  const glassConfig = glassVariantConfig[variant]
  
  // Calculate dimensions based on size
  const getDimensions = () => {
    switch(size) {
      case 'sm':
        return { width: 'auto', height: 36 }
      case 'lg':
        return { width: 'auto', height: 52 }
      default:
        return { width: 'auto', height: 44 }
    }
  }

  const content = (
    <span className="relative inline-flex items-center font-montserrat font-semibold tracking-[0.25px] z-10">
      {children}
      {arrow && (
        <span className="tracking-normal text-current ml-1">
          →
        </span>
      )}
    </span>
  )

  const dimensions = getDimensions()
  const buttonClass = `group relative inline-flex items-center justify-center ${sizeClasses[size]} ${textColorClasses[variant]} ${glassConfig.customClass} ${className}`

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <GlassSurface
          {...dimensions}
          {...glassConfig}
          className={buttonClass}
          style={{ display: 'inline-flex' }}
        >
          {content}
        </GlassSurface>
      </Link>
    )
  }

  return (
    <GlassSurface
      {...dimensions}
      {...glassConfig}
      className={`${buttonClass} cursor-pointer`}
      style={{ display: 'inline-flex' }}
    >
      <div onClick={onClick} className="w-full h-full flex items-center justify-center">
        {content}
      </div>
    </GlassSurface>
  )
}