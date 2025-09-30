"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Shield, Zap, Eye, MoreHorizontal } from 'lucide-react'
import KingsButton from '@/components/ui/kings-button'
import './EnhancedServiceBento.css'

export interface EnhancedBentoCard {
  id: string
  size: 'small' | 'wide' | 'tall' | 'large' | 'xlarge'
  backgroundImage?: string
  backgroundColor?: string
  backgroundGradient?: string
  overlay?: {
    type: 'gradient' | 'solid'
    value: string
    opacity?: number
  }
  primaryCopy?: {
    text: string
    size?: 'huge' | 'large' | 'medium' | 'small'
    highlight?: boolean
  }
  secondaryCopy?: string
  tertiaryCopy?: string
  badge?: string
  visualElement?: 'shield' | 'graph' | 'diagram' | 'icon' | 'none'
  animation?: 'heatWave' | 'scratch' | 'waterBead' | 'sparkle' | 'none'
  cta?: {
    text: string
    price?: string
    link?: string
  }
  customClass?: string
}

interface EnhancedServiceBentoProps {
  cards: EnhancedBentoCard[]
  settings?: {
    glowColor?: string
    enableHover?: boolean
    gridLayout?: string
  }
}

export default function EnhancedServiceBento({ cards, settings }: EnhancedServiceBentoProps) {
  const gridClass = settings?.gridLayout || 'bento-custom-grid'
  
  return (
    <div className={`enhanced-bento-grid ${gridClass}`}>
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className={`bento-card bento-card--${card.size} ${card.customClass || ''}`}
          whileHover={settings?.enableHover ? { scale: 1.02 } : {}}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: card.backgroundColor,
            background: card.backgroundGradient,
            '--glow-color': settings?.glowColor || '196, 30, 58'
          } as React.CSSProperties}
        >
          {/* Background Image */}
          {card.backgroundImage && (
            <div className="bento-card__image">
              <Image 
                src={card.backgroundImage} 
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
          
          {/* Overlay */}
          {card.overlay && (
            <div 
              className="bento-card__overlay"
              style={{
                background: card.overlay.value,
                opacity: card.overlay.opacity || 0.6
              }}
            />
          )}
          
          {/* Content */}
          <div className="bento-card__content">
            {/* Badge */}
            {card.badge && (
              <div className="bento-card__badge">
                {card.badge}
              </div>
            )}
            
            {/* Visual Elements - Positioned first for warranty card */}
            {card.visualElement && card.visualElement !== 'none' && card.customClass === 'warranty-card' && (
              <div className={`bento-card__visual bento-card__visual--${card.visualElement}`}>
                <div className="w-14 h-14 rounded-full bg-gold-accent/20 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-gold-accent" strokeWidth={1.5} />
                </div>
              </div>
            )}
            
            {/* Text Content Wrapper for warranty card */}
            <div className={card.customClass === 'warranty-card' ? 'flex-1' : ''}>
              {/* Primary Copy */}
              {card.primaryCopy && (
                <h3 className={`bento-card__primary bento-card__primary--${card.primaryCopy.size || 'large'}`}>
                  {card.primaryCopy.highlight ? (
                    <span className="highlight">{card.primaryCopy.text}</span>
                  ) : card.primaryCopy.text}
                </h3>
              )}
              
              {/* Secondary Copy */}
              {card.secondaryCopy && (
                <p className="bento-card__secondary">
                  {card.secondaryCopy}
                </p>
              )}
              
              {/* Tertiary Copy */}
              {card.tertiaryCopy && (
                <p className="bento-card__tertiary">
                  {card.tertiaryCopy}
                </p>
              )}
            </div>
            
            {/* CTA */}
            {card.cta && (
              <div className="bento-card__cta">
                {card.cta.price && (
                  <span className="bento-card__price">{card.cta.price}</span>
                )}
                {card.cta.text && (
                  <KingsButton 
                    variant="primary"
                    size="md"
                    href={card.cta.link}
                    className="mt-2"
                  >
                    {card.cta.text}
                  </KingsButton>
                )}
              </div>
            )}
            
            {/* Visual Elements for non-warranty cards */}
            {card.visualElement && card.visualElement !== 'none' && card.customClass !== 'warranty-card' && (
              <div className={`bento-card__visual bento-card__visual--${card.visualElement}`}>
                {card.visualElement === 'shield' && (
                  <div className="w-14 h-14 rounded-full bg-gold-accent/20 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-gold-accent" strokeWidth={1.5} />
                  </div>
                )}
                {card.visualElement === 'icon' && (
                  <Eye className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                )}
                {card.visualElement === 'graph' && (
                  <Zap className="w-6 h-6 text-gold-accent" strokeWidth={1.5} />
                )}
              </div>
            )}
            
            {/* Animations */}
            {card.animation && card.animation !== 'none' && (
              <div className={`bento-card__animation bento-card__animation--${card.animation}`} />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}