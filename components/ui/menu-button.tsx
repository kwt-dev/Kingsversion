'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import GlassSurface from '../GlassSurface'
import MenuIcon from '@/public/images/menu-icon.svg'

interface MenuButtonProps {
  onToggle?: (isOpen: boolean) => void
  className?: string
  isOpen?: boolean
}

export default function MenuButton({ onToggle, className = '', isOpen: controlledIsOpen }: MenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Sync internal state with parent if controlled
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen)
    }
  }, [controlledIsOpen])

  const handleClick = () => {
    const newState = !isOpen
    setIsOpen(newState)
    onToggle?.(newState)
  }

  return (
    <GlassSurface
      width={48}
      height={48}
      borderRadius={10}
      borderWidth={0.07}
      brightness={35}
      opacity={0.85}
      blur={10}
      displace={4}
      backgroundOpacity={0.3}
      saturation={1.1}
      distortionScale={-120}
      redOffset={3}
      greenOffset={10}
      blueOffset={18}
      mixBlendMode="screen"
      className={`relative cursor-pointer transition-all duration-200 hover:scale-105 bg-gradient-to-r from-king-red/40 to-king-red/20 border border-king-red/30 hover:from-king-red/50 hover:to-king-red/30 ${className}`}
      style={{ display: 'inline-flex' }}
    >
      <button
        onClick={handleClick}
        className="w-full h-full flex items-center justify-center focus:outline-none"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          <Image
            src={MenuIcon}
            alt=""
            width={32}
            height={32}
            className="max-w-none"
          />
        </div>
      </button>
    </GlassSurface>
  )
}