import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Info } from 'lucide-react';
import { BookingData, BookingDataUpdate } from '../WindowTintingBookingStepper';

interface FilmGradeStepProps {
  bookingData: Partial<BookingData>;
  updateBookingData: (updates: BookingDataUpdate) => void;
  onNext: () => void;
}

const FILM_TIERS = [
  {
    id: 'CS',
    title: 'CS (Ceramic Series)',
    description: 'Premium ceramic film with excellent heat rejection',
    features: ['UV Protection', 'Heat Rejection', 'Fade Resistant'],
    specs: [
      { label: 'Infrared Heat Rejection', value: '45%', note: 'Keeps interiors noticeably cooler.' },
      { label: 'UV Protection', value: '99%', note: 'Blocks skin-damaging UVA/UVB rays.' },
      { label: 'Glare Reduction', value: 'Up to 80%', note: 'Comfortable daytime driving.' },
      { label: 'Warranty', value: 'Lifetime', note: 'Covers bubbling, peeling, fading.' },
    ],
    popular: false,
  },
  {
    id: 'XR',
    title: 'XR (Xtreme)',
    description: 'Superior performance with enhanced durability',
    features: ['Maximum UV Protection', 'Superior Heat Rejection', 'Lifetime Warranty'],
    specs: [
      { label: 'Infrared Heat Rejection', value: '88%', note: 'Feels dramatically cooler even in direct sun.' },
      { label: 'UV Protection', value: '99%', note: 'Skin-safe and interior fade resistant.' },
      { label: 'Glare Reduction', value: 'Up to 92%', note: 'Sharp visibility with less eye strain.' },
      { label: 'Warranty', value: 'Lifetime', note: 'Film + labor covered through King’s.' },
    ],
    popular: true,
  },
  {
    id: 'XR_PLUS',
    title: 'XR Plus (Premium)',
    description: 'Top-tier film with cutting-edge technology',
    features: ['Ultimate Performance', 'Maximum Clarity', 'Premium Warranty'],
    specs: [
      { label: 'Infrared Heat Rejection', value: '98%', note: 'Our best option for luxury cabins & daily commuters.' },
      { label: 'UV Protection', value: '99%', note: 'Top level UV defense for families & long drives.' },
      { label: 'Glare Reduction', value: 'Up to 94%', note: 'Crystal clarity even in harsh glare.' },
      { label: 'Warranty', value: 'Lifetime', note: 'Includes King’s personal satisfaction guarantee.' },
    ],
    popular: false,
  },
];

const TINT_LEVELS = [
  { id: '5%', label: '5%', description: 'Darkest legal' },
  { id: '20%', label: '20%', description: 'Very dark' },
  { id: '35%', label: '35%', description: 'Medium dark' },
  { id: '50%', label: '50%', description: 'Light' },
  { id: '70%', label: '70%', description: 'Very light' },
];

export const FilmGradeStep: React.FC<FilmGradeStepProps> = ({
  bookingData,
  updateBookingData,
}) => {
  const responses: Partial<BookingData['responses']> = bookingData.responses || {};
  const selectedFilmTier = responses['film-tier'];
  const selectedWindshieldTier = responses['windshield-tier'];
  const selectedTintLevel = responses['tint-level'];
  const previousTintRemoval = responses['previous-tint-removal'] || false;
  const windshieldAddon = responses['addon-windshield'] || false;
  const coverageSelections = responses['coverage-selections'] || [];

  // Calculate price for each tier based on coverage selections
  const calculateTierPrice = (tierId: string, isWindshield = false): number => {
    const TIER_PRICING = {
      'CS': {
        'FRONTS': 159,
        'SIDES_REAR': 299,
        'WINDSHIELD': 199,
        'SUN_STRIP': 49,
      },
      'XR': {
        'FRONTS': 179,
        'SIDES_REAR': 424,
        'WINDSHIELD': 274,
        'SUN_STRIP': 49,
      },
      'XR_PLUS': {
        'FRONTS': 199,
        'SIDES_REAR': 549,
        'WINDSHIELD': 349,
        'SUN_STRIP': 49,
      },
    };

    let total = 0;
    const tierPrices = TIER_PRICING[tierId as keyof typeof TIER_PRICING];
    
    if (tierPrices) {
      if (isWindshield) {
        // For windshield tier, only calculate windshield price
        return tierPrices['WINDSHIELD'] || 0;
      } else {
        // For main tier, calculate all non-windshield coverage
        coverageSelections.forEach((selection: string) => {
          if (selection !== 'WINDSHIELD') {
            const price = tierPrices[selection as keyof typeof tierPrices];
            if (price) {
              total += price;
            }
          }
        });
      }
    }

    return total;
  };

  // Generate variant code for Cal.com
  const generateVariantCode = (): string => {
    const serviceSubtype = responses['service-subtype'] || '';
    const vehicleClass = responses['vehicle-class'] || '';
    const filmTier = selectedFilmTier || '';
    const windshieldTier = windshieldAddon && selectedWindshieldTier ? `_WINDSHIELD_${selectedWindshieldTier}` : '';
    
    return `${serviceSubtype}__${vehicleClass}__${filmTier}${windshieldTier}`.toUpperCase();
  };

  // Get coverage display names
  const getCoverageDisplayNames = (): string[] => {
    const displayNames: { [key: string]: string } = {
      'FRONTS': 'Front Windows',
      'SIDES_REAR': 'Sides & Rear',
      'WINDSHIELD': 'Full Windshield',
      'SUN_STRIP': 'Sun Strip'
    };
    
    return coverageSelections.map(selection => displayNames[selection] || selection);
  };

  // Calculate total estimated price
  const calculateTotalPrice = (): number => {
    let total = 0;
    
    if (selectedFilmTier) {
      total += calculateTierPrice(selectedFilmTier, false);
      
      // Add windshield price if selected
      if (windshieldAddon && selectedWindshieldTier) {
        total += calculateTierPrice(selectedWindshieldTier, true);
      }
    }
    
    return total;
  };

  const handleFilmTierSelect = (tierId: string) => {
    const totalPrice = calculateTotalPrice();
    updateBookingData({
      responses: {
        ...responses,
        'film-tier': tierId,
        'estimated-price': totalPrice,
      },
    });
  };

  const handleWindshieldTierSelect = (tierId: string) => {
    const totalPrice = calculateTotalPrice();
    updateBookingData({
      responses: {
        ...responses,
        'windshield-tier': tierId,
        'estimated-price': totalPrice,
      },
    });
  };

  const handleTintLevelSelect = (level: string) => {
    updateBookingData({
      responses: {
        ...responses,
        'tint-level': selectedTintLevel === level ? undefined : level,
      },
    });
  };

  const handlePreviousTintToggle = (checked: boolean) => {
    updateBookingData({
      responses: {
        ...responses,
        'previous-tint-removal': checked,
      },
    });
  };



  // TierCard Component
  const TierCard: React.FC<{ tier: typeof FILM_TIERS[0]; isSelected: boolean; price: number; onSelect: () => void; isWindshield?: boolean }> = ({ 
    tier, 
    isSelected, 
    price, 
    onSelect,
    isWindshield = false 
  }) => (
    <motion.div
      layout
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="w-full"
    >
      <Card
        className={`min-h-[190px] md:min-h-[210px] p-4 cursor-pointer transition-all duration-200 hover:shadow-lg relative overflow-visible ${
          isSelected
            ? 'ring-2 ring-primary shadow-md bg-primary/5'
            : 'hover:shadow-sm'
        }`}
        onClick={onSelect}
      >
        <div className="h-full flex flex-col gap-3 relative">
          {/* Most Popular Badge - positioned in top-left corner */}
          {!isWindshield && tier.popular && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
              className="absolute -top-2 -left-2 z-10"
            >
              <div className="relative">
                <div className="bg-gradient-to-r from-gold-accent to-gold-accent/80 text-white px-3 py-1 rounded-full shadow-lg text-[10px] font-semibold uppercase tracking-wide">
                  Most Popular
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold-accent to-gold-accent/80 rounded-full blur-sm opacity-50 -z-10"></div>
              </div>
            </motion.div>
          )}

          {/* Top Row - Tier name and radio */}
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold truncate">{isWindshield ? tier.id : tier.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground truncate">{tier.description}</p>
            </div>

            <motion.div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                isSelected
                  ? 'border-primary bg-primary'
                  : 'border-muted-foreground/30'
              }`}
              animate={isSelected ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {isSelected && (
                <motion.svg
                  className="w-3 h-3 text-primary-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              )}
            </motion.div>
          </div>

          {/* Quick spec highlights */}
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {tier.specs.slice(0, 2).map((spec) => (
              <span
                key={spec.label}
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 ${
                  isSelected ? 'border-primary/40 text-primary' : 'border-border'
                }`}
              >
                <span className="font-semibold">{spec.value}</span>
                <span className="uppercase tracking-tight">{spec.label.replace('Infrared ', '').replace(' Protection', '')}</span>
              </span>
            ))}
          </div>

          {/* Expanded specs when selected */}
          <AnimatePresence initial={false}>
            {isSelected && (
              <motion.div
                key={`${tier.id}-specs`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden rounded-xl border border-border/40 bg-muted/30 p-4"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary/80 mb-3">
                  <Info className="w-3 h-3" />
                  Performance Snapshot
                </div>
                <dl className="grid gap-3 sm:grid-cols-2 text-sm">
                  {tier.specs.map((spec) => (
                    <div key={spec.label} className="rounded-lg border border-border/50 bg-background/40 p-3">
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{spec.label}</dt>
                      <dd className="text-lg font-semibold text-foreground">{spec.value}</dd>
                      <p className="mt-1 text-xs text-muted-foreground">{spec.note}</p>
                    </div>
                  ))}
                </dl>

                <div className="mt-4">
                  <h5 className="text-sm font-medium text-foreground">Why drivers pick this tier</h5>
                  <ul className="mt-2 space-y-1 text-sm">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Price and helper */}
          <div className="mt-auto flex items-end justify-between text-sm">
            <span className="text-muted-foreground">
              {isSelected ? 'Specs selected • tap to collapse' : 'Tap to compare full specs'}
            </span>
            {price > 0 && (
              <div className="text-right">
                <div className="text-lg font-semibold">${price}</div>
                <div className="text-[11px] text-muted-foreground">With selected coverage</div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2>Choose Your Film Grade</h2>
        <p className="text-muted-foreground">
          Select the film quality and tint level for your vehicle
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column - Film Tiers */}
        <div className="flex-1">
          {/* Film Tier Grid */}
          <div className="space-y-4">
            <h3>Film Tier (Required)</h3>
            <motion.div 
              layout
              className="flex flex-wrap gap-4"
            >
              {FILM_TIERS.map((tier) => {
                const isSelected = selectedFilmTier === tier.id;
                const tierPrice = calculateTierPrice(tier.id, false);

                return (
                  <TierCard
                    key={tier.id}
                    tier={tier}
                    isSelected={isSelected}
                    price={tierPrice}
                    onSelect={() => handleFilmTierSelect(tier.id)}
                  />
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Right Column - Sticky Sidebar */}
        <div className="w-full md:w-[440px] md:sticky md:top-6 md:self-start">
          <div className="flex flex-col gap-4">
            {/* Selection Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-4">
                <div className="space-y-4">
                  {/* Coverage selections */}
                  <div className="space-y-2">
                    {getCoverageDisplayNames().map((coverage, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {coverage}
                      </div>
                    ))}
                  </div>

                  {/* Film Tier */}
                  <div className="flex justify-between text-sm">
                    <span>Film Tier:</span>
                    <span className="font-medium">{selectedFilmTier || 'Not selected'}</span>
                  </div>

                  {/* Windshield Tier */}
                  {windshieldAddon && (
                    <div className="flex justify-between text-sm">
                      <span>Windshield Tier:</span>
                      <span className="font-medium">{selectedWindshieldTier || 'Not selected'}</span>
                    </div>
                  )}

                  {/* Add-ons */}
                  {windshieldAddon && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Full Windshield
                    </div>
                  )}

                  {/* Removal */}
                  {previousTintRemoval && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Previous Tint Removal
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-t"></div>

                  {/* Price Range or Total */}
                  {selectedFilmTier ? (
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Estimated Total</span>
                      <div className="text-right">
                        <div className="text-2xl font-semibold">${calculateTotalPrice()}</div>
                        <div className="text-xs text-muted-foreground">Est.</div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Price Range</span>
                      <div className="text-right">
                        <div className="text-2xl font-semibold">
                          ${Math.min(...FILM_TIERS.map(tier => calculateTierPrice(tier.id, false)))} - ${Math.max(...FILM_TIERS.map(tier => calculateTierPrice(tier.id, false)))}
                        </div>
                        <div className="text-xs text-muted-foreground">Based on coverage</div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Tint Level Selection */}
            <div className="space-y-3">
              <div>
                <h4>Tint Level (Optional)</h4>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred darkness level
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {TINT_LEVELS.map((level) => {
                  const isSelected = selectedTintLevel === level.id;
                  
                  return (
                    <motion.button
                      key={level.id}
                      onClick={() => handleTintLevelSelect(level.id)}
                      className={`h-10 px-3 rounded-lg border transition-all text-sm ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-muted-foreground'
                      }`}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{level.label}</span>
                        <span className="text-xs text-muted-foreground">({level.description})</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Previous Tint Removal */}
            <Card className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">Previous Tint Removal</h4>
                    <p className="text-sm text-muted-foreground">
                      Remove existing tint?
                    </p>
                  </div>
                  <Switch
                    checked={previousTintRemoval}
                    onCheckedChange={handlePreviousTintToggle}
                  />
                </div>
                {previousTintRemoval && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-muted-foreground"
                  >
                    Removal pricing confirmed in shop.
                  </motion.p>
                )}
              </div>
            </Card>

            {/* Continue Helper */}
            {!selectedFilmTier && (
              <p className="text-xs text-muted-foreground text-center">
                Choose a film tier to continue.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
