"use client"
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import KingsButton from '@/components/ui/kings-button'
import EnhancedServiceBento, { type EnhancedBentoCard } from './EnhancedServiceBento'
import './ServicesShowcase.css'

type TabKey = 'tint' | 'ppf' | 'coating'

const TAB_COPY: Record<TabKey, { 
  title: string; 
  body: string; 
  cta: string; 
  bentoCards: EnhancedBentoCard[];
  bentoSettings?: {
    glowColor?: string;
    enableHover?: boolean;
    gridLayout?: string;
  }
}> = {
  tint: {
    title: 'Transform Every Drive From Uncomfortable to Luxurious',
    body:
      "Stop dreading hot days and sun glare. Our precision-installed ceramic tint delivers up to 15°F cooler interiors, 99% UV protection, and crystal-clear visibility that won't interfere with electronics.",
    cta: 'SECURE YOUR COOL, COMFORTABLE RIDE',
    bentoCards: [
      {
        id: 'tint-temp',
        size: 'large',
        backgroundImage: '/images/coolInterior.png',
        overlay: {
          type: 'gradient',
          value: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
          opacity: 0.7
        },
        primaryCopy: {
          text: '15°F',
          size: 'huge',
          highlight: true
        },
        secondaryCopy: 'COOLER INTERIOR',
        animation: 'heatWave',
        customClass: 'temperature-hero'
      },
      {
        id: 'tint-uv',
        size: 'small',
        backgroundImage: '/images/subtleBg.png',
        overlay: {
          type: 'gradient',
          value: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
          opacity: 0.7
        },
        primaryCopy: {
          text: '99%',
          size: 'large'
        },
        secondaryCopy: 'UV RADIATION BLOCKED',
        tertiaryCopy: 'SPF 1000+ equivalent',
        visualElement: 'shield'
      },
      {
        id: 'tint-clarity',
        size: 'small',
        backgroundImage: '/images/crystalClearView.jpeg',
        overlay: {
          type: 'gradient',
          value: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)',
          opacity: 0.8
        },
        primaryCopy: {
          text: 'CRYSTAL CLEAR VIEW',
          size: 'medium'
        },
        secondaryCopy: 'Zero electronic interference',
        visualElement: 'icon'
      },
      {
        id: 'tint-warranty',
        size: 'wide',
        backgroundColor: '#2a2a2a',
        primaryCopy: {
          text: 'LIFETIME WARRANTY',
          size: 'medium'
        },
        secondaryCopy: 'Nationwide coverage • No questions asked',
        visualElement: 'shield',
        badge: 'GUARANTEED',
        customClass: 'warranty-card'
      },
      {
        id: 'tint-price',
        size: 'small',
        backgroundGradient: 'linear-gradient(135deg, #c41e3a 0%, #672530 100%)',
        cta: {
          price: '$299',
          text: 'GET QUOTE'
        },
        secondaryCopy: 'Starting price'
      },
      {
        id: 'tint-schedule',
        size: 'wide',
        backgroundGradient: 'linear-gradient(135deg, #1a1410 0%, #2a2010 100%)',
        primaryCopy: {
          text: 'SAME DAY SERVICE',
          size: 'medium'
        },
        secondaryCopy: 'Professional installation in 2-4 hours',
        visualElement: 'icon',
        cta: {
          text: 'SCHEDULE NOW →'
        }
      }
    ],
    bentoSettings: {
      glowColor: "196, 30, 58",
      enableHover: true,
      gridLayout: "tint-grid"
    }
  },
  ppf: {
    title: "Invisible Armor That Keeps Your Vehicle Looking Showroom-New",
    body:
      'Every drive threatens your finish with rock chips and road debris. Our precision-cut PPF creates an invisible shield that self-heals minor scratches while preserving original brilliance.',
    cta: "SHIELD YOUR VEHICLE'S VALUE",
    bentoCards: [
      {
        id: 'ppf-healing',
        size: 'wide',
        backgroundImage: '/images/self-healing-film.jpg',
        overlay: {
          type: 'gradient',
          value: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, transparent 50%)',
          opacity: 0.8
        },
        badge: 'SELF-HEALING TECHNOLOGY',
        animation: 'scratch',
        primaryCopy: {
          text: 'Scratches Disappear',
          size: 'medium'
        }
      },
      {
        id: 'ppf-comparison',
        size: 'tall',
        backgroundImage: '/images/before-after-ppf.jpg',
        primaryCopy: {
          text: 'BEFORE/AFTER',
          size: 'small'
        },
        badge: '5 YEAR WARRANTY'
      },
      {
        id: 'ppf-military',
        size: 'small',
        backgroundColor: '#000000',
        primaryCopy: {
          text: '8mil',
          size: 'huge'
        },
        secondaryCopy: 'MILITARY-GRADE THICKNESS',
        visualElement: 'shield'
      },
      {
        id: 'ppf-coverage',
        size: 'large',
        backgroundImage: '/images/car-diagram.jpg',
        overlay: {
          type: 'solid',
          value: 'rgba(0,0,0,0.4)',
          opacity: 0.6
        },
        primaryCopy: {
          text: 'CHOOSE YOUR COVERAGE',
          size: 'medium'
        },
        secondaryCopy: 'Full Front • Partial • Track Pack • Full Body',
        visualElement: 'diagram'
      },
      {
        id: 'ppf-value',
        size: 'small',
        backgroundColor: '#1a1a1a',
        primaryCopy: {
          text: '10%',
          size: 'large'
        },
        secondaryCopy: 'HIGHER RESALE VALUE',
        tertiaryCopy: 'Documented protection history',
        visualElement: 'graph'
      },
      {
        id: 'ppf-pricing',
        size: 'wide',
        backgroundGradient: 'linear-gradient(135deg, #1a1410 0%, #2a2010 100%)',
        cta: {
          price: '$1,299',
          text: 'VIEW ALL OPTIONS →'
        },
        secondaryCopy: 'Partial coverage starting at'
      }
    ],
    bentoSettings: {
      glowColor: "245, 197, 66",
      enableHover: true,
      gridLayout: "ppf-grid"
    }
  },
  coating: {
    title: 'Show-Car Shine With Effortless Maintenance',
    body:
      'Enhance appearance while creating a hydrophobic barrier that repels water, dirt, and contaminants. Washing becomes easier while long-term gloss turns heads.',
    cta: "ENHANCE YOUR VEHICLE'S BEAUTY",
    bentoCards: [
      {
        id: 'ceramic-hero',
        size: 'xlarge',
        backgroundImage: '/images/water-beading-hood.jpg',
        animation: 'waterBead',
        customClass: 'no-text-overlay'
      },
      {
        id: 'ceramic-durability',
        size: 'tall',
        backgroundColor: '#040707',
        primaryCopy: {
          text: '5',
          size: 'huge'
        },
        secondaryCopy: 'YEARS',
        tertiaryCopy: 'Of brilliant protection',
        badge: 'With recommended maintenance'
      },
      {
        id: 'ceramic-maintenance',
        size: 'small',
        backgroundColor: '#262626',
        primaryCopy: {
          text: '75%',
          size: 'large'
        },
        secondaryCopy: 'LESS WASHING',
        tertiaryCopy: 'Self-cleaning hydrophobic surface',
        visualElement: 'icon'
      },
      {
        id: 'ceramic-price',
        size: 'wide',
        backgroundGradient: 'linear-gradient(135deg, #1a1612 0%, #2a2012 100%)',
        cta: {
          price: '$899',
          text: 'BOOK CONSULTATION'
        },
        secondaryCopy: 'Professional ceramic application',
        tertiaryCopy: 'Includes paint correction',
        animation: 'sparkle'
      }
    ],
    bentoSettings: {
      glowColor: "139, 115, 85",
      enableHover: true,
      gridLayout: "ceramic-grid"
    }
  },
}

export default function ServicesShowcaseTest() {
  const [active, setActive] = useState<TabKey>('tint')

  const current = TAB_COPY[active]

  return (
    <section className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] min-h-[520px]">
          {/* Static background with gradient overlay */}
          <div className="absolute inset-0">
            <Image src="/images/solutionsUpgrade.webp" alt="Service background" fill className="object-cover" sizes="(min-width: 1024px) 1200px, 100vw" />
            <div className="absolute inset-0 opacity-50 bg-[radial-gradient(120%_80%_at_70%_20%,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.75)_60%,rgba(0,0,0,0.85)_100%)]" />
          </div>

          {/* Content */}
          <div className="relative pt-8 pb-10 px-8 sm:pt-14 pb-18 px-14 md:pt-20 pb-26 px-20">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-[0.5px] w-8 bg-gold-accent"></span>
                <span className="text-xs uppercase tracking-[.25em] text-white font-medium">Satisfaction Guaranteed</span>
                <span className="h-[0.5px] w-8 bg-gold-accent"></span>
              </div>
              <h2 className="text-white text-2xl md:text-3xl font-semibold pb-8">Three Ways to Upgrade Your Vehicle</h2>
              {/* <p className="text-white mt-2 text-sm max-w-2xl mx-auto">Quality that transforms how your vehicle looks, feels, and performs—backed by our 25+ years and uncompromising craftsmanship.</p> */}
            </div>

            {/* Tabs */}
            <div role="tablist" aria-label="Services" className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
              {([
                ['tint', 'WINDOW TINTING'],
                ['ppf', 'PAINT PROTECTION FILM'],
                ['coating', 'CERAMIC COATING'],
              ] as [TabKey, string][]).map(([key, label]) => (
                <div key={key} className="service-tab-wrapper">
                  <KingsButton
                    variant="ghost"
                    onClick={() => setActive(key)}
                    className="min-w-[200px] md:min-w-[260px]"
                  >
                    {label}
                  </KingsButton>
                </div>
              ))}
            </div>

            {/* Bento Grid Panel */}
            <div 
              role="tabpanel" 
              className="mt-8 sm:mt-10 mx-auto"
              style={{
                width: '100%',
                maxWidth: '1200px'
              }}
            >
              <EnhancedServiceBento 
              cards={current.bentoCards} 
              settings={current.bentoSettings}
            />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
