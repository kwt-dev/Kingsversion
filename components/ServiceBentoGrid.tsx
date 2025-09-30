"use client"
import React from 'react'
import MagicBento from './MagicBento'
import './ServiceBentoGrid.css'

interface ServiceBentoGridProps {
  cards: Array<{
    title: string
    description: string
    label: string
  }>
  settings?: {
    textAutoHide?: boolean
    enableStars?: boolean
    enableSpotlight?: boolean
    enableBorderGlow?: boolean
    enableTilt?: boolean
    enableMagnetism?: boolean
    clickEffect?: boolean
    spotlightRadius?: number
    particleCount?: number
    glowColor?: string
    cardColor?: string
    gridLayout?: string
  }
}

export default function ServiceBentoGrid({ cards, settings }: ServiceBentoGridProps) {
  // Default settings if none provided
  const defaultSettings = {
    textAutoHide: false,
    enableStars: false,
    enableSpotlight: false,
    enableBorderGlow: true,
    enableTilt: false,
    enableMagnetism: false,
    clickEffect: false,
    spotlightRadius: 300,
    particleCount: 12,
    glowColor: "196, 30, 58",
    cardColor: "#100a1a",
    gridLayout: "2x3"
  }

  // Merge provided settings with defaults
  const mergedSettings = { ...defaultSettings, ...settings }

  // Transform cards to include the color property expected by MagicBento
  const bentoCards = cards.map(card => ({
    ...card,
    color: mergedSettings.cardColor
  }))

  // Apply grid layout class
  const gridLayoutClass = getGridLayoutClass(mergedSettings.gridLayout)

  return (
    <div className={gridLayoutClass}>
      <MagicBento 
        textAutoHide={mergedSettings.textAutoHide}
        enableStars={mergedSettings.enableStars}
        enableSpotlight={mergedSettings.enableSpotlight}
        enableBorderGlow={mergedSettings.enableBorderGlow}
        enableTilt={mergedSettings.enableTilt}
        enableMagnetism={mergedSettings.enableMagnetism}
        clickEffect={mergedSettings.clickEffect}
        spotlightRadius={mergedSettings.spotlightRadius}
        particleCount={mergedSettings.particleCount}
        glowColor={mergedSettings.glowColor}
        cards={bentoCards}
      />
    </div>
  )
}

function getGridLayoutClass(layout?: string): string {
  switch(layout) {
    case "2x3":
      return "bento-grid-2x3"
    case "3x2":
      return "bento-grid-3x2"
    case "featured":
      return "bento-grid-featured"
    case "1x6":
      return "bento-grid-1x6"
    case "2x2":
      return "bento-grid-2x2"
    default:
      return "bento-grid-2x3"
  }
}