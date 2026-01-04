import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Info, X } from 'lucide-react';
import { BookingData, BookingDataUpdate } from '../WindowTintingBookingStepper';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface CoverageSelectionStepProps {
  bookingData: Partial<BookingData>;
  updateBookingData: (updates: BookingDataUpdate) => void;
  onNext: () => void;
}

type CoverageOption = 'FRONTS' | 'SIDES_REAR' | 'WINDSHIELD' | 'SUN_STRIP';

const COVERAGE_OPTIONS = [
  {
    id: 'FRONTS' as CoverageOption,
    title: 'Factory Match (Fronts Only)',
    helper: 'Match your factory rear tint on the two front windows.',
    regions: ['front_sides'],
    priceRange: '$159–$199',
    tooltip: 'Perfect for vehicles that already have rear tint from the factory. We match the shade and darkness on your front windows.'
  },
  {
    id: 'SIDES_REAR' as CoverageOption,
    title: 'Sides & Rear (Excludes Fronts)',
    helper: 'All rear side windows + rear glass (does not include front windows).',
    regions: ['rear_sides', 'rear_glass'],
    priceRange: '$299–$549',
    tooltip: 'Complete rear window tinting for privacy and UV protection. Front windows remain untinted.'
  },
  {
    id: 'WINDSHIELD' as CoverageOption,
    title: 'Windshield',
    helper: 'Full windshield tint for heat & glare reduction.',
    regions: ['windshield_full'],
    priceRange: '$199–$349',
    tooltip: 'Specialized windshield film for heat rejection and glare reduction while maintaining visibility and legal compliance.'
  },
  {
    id: 'SUN_STRIP' as CoverageOption,
    title: 'Sun Strip (Brow)',
    helper: 'Narrow strip at top of windshield to cut glare.',
    regions: ['sun_brow'],
    priceRange: '+$49',
    tooltip: 'A 6-8 inch strip of tint applied to the top of your windshield to reduce glare from overhead sun.'
  },
];

const VehicleVisualization: React.FC<{
  vehicleClass: string;
  highlightedRegions: string[];
  selectedRegions: string[];
}> = ({ vehicleClass, highlightedRegions, selectedRegions }) => {
  const getRegionStyle = (regionId: string) => {
    const isHighlighted = highlightedRegions.includes(regionId);
    const isSelected = selectedRegions.includes(regionId);
    
    if (isSelected) {
      // Special case for windshield + sun strip layering
      if (regionId === 'windshield_full' && selectedRegions.includes('sun_brow')) {
        return 'fill-primary/40 stroke-primary stroke-2';
      } else if (regionId === 'sun_brow' && selectedRegions.includes('windshield_full')) {
        return 'fill-primary/60 stroke-primary stroke-2';
      } else {
        return 'fill-primary/40 stroke-primary stroke-2';
      }
    } else if (isHighlighted) {
      return 'fill-primary/20 stroke-primary/60 stroke-1';
    } else {
      return 'fill-transparent stroke-muted-foreground/30 stroke-1';
    }
  };

  return (
    <div className="bg-muted/20 rounded-lg p-8 flex items-center justify-center min-h-[320px]">
      <div className="space-y-4">
        <h3 className="font-medium text-center">Your {vehicleClass.toLowerCase()}</h3>
        
        <svg width="280" height="160" viewBox="0 0 280 160" className="max-w-full">
          {/* Vehicle outline */}
          <rect x="20" y="40" width="240" height="80" rx="20" ry="20" 
            className="fill-muted stroke-border stroke-2" />
          
          {/* Windshield full */}
          <motion.path 
            d="M 40 50 L 240 50 L 220 70 L 60 70 Z" 
            className={getRegionStyle('windshield_full')}
            id="windshield_full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Sun strip (brow) - appears on top of windshield */}
          <motion.path 
            d="M 40 50 L 240 50 L 240 58 L 40 58 Z" 
            className={getRegionStyle('sun_brow')}
            id="sun_brow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Front sides (left and right combined for simplicity) */}
          <motion.rect 
            x="35" y="75" width="45" height="40" rx="5" 
            className={getRegionStyle('front_sides')}
            id="front_sides"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          
          <motion.rect 
            x="200" y="75" width="45" height="40" rx="5" 
            className={getRegionStyle('front_sides')}
            id="front_sides_right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Rear sides */}
          <motion.rect 
            x="90" y="75" width="35" height="40" rx="5" 
            className={getRegionStyle('rear_sides')}
            id="rear_sides"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          
          <motion.rect 
            x="155" y="75" width="35" height="40" rx="5" 
            className={getRegionStyle('rear_sides')}
            id="rear_sides_right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Rear glass */}
          <motion.path 
            d="M 135 70 L 145 70 L 165 50 L 115 50 Z" 
            className={getRegionStyle('rear_glass')}
            id="rear_glass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </svg>
        
        <div className="text-sm space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary/40 border border-primary rounded-sm"></div>
            <span className="text-xs text-muted-foreground">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary/20 border border-primary/60 rounded-sm"></div>
            <span className="text-xs text-muted-foreground">Highlighted</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Highlighted areas show what's included.
          </p>
        </div>
      </div>
    </div>
  );
};

export const CoverageSelectionStep: React.FC<CoverageSelectionStepProps> = ({
  bookingData,
  updateBookingData,
  onNext,
}) => {
  const [hoveredRegions, setHoveredRegions] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);
  
  const responses: Partial<BookingData['responses']> = bookingData.responses || {};
  const vehicleClass = responses['vehicle-class'] || 'CAR';
  const coverageSelections = responses['coverage-selections'] || [];

  // Show error message when no selections are made
  const showValidationError = () => {
    if (coverageSelections.length === 0) {
      setHasError(true);
      setTimeout(() => setHasError(false), 3000); // Auto-hide after 3 seconds
    }
  };

  // Calculate selected regions for visualization
  const getSelectedRegions = (): string[] => {
    let regions: string[] = [];
    
    coverageSelections.forEach((selection) => {
      const option = COVERAGE_OPTIONS.find(opt => opt.id === selection);
      if (option) {
        regions.push(...option.regions);
      }
    });
    
    return regions;
  };

  const handleCoverageToggle = (coverageId: CoverageOption) => {
    const currentSelections = [...coverageSelections];
    const isSelected = currentSelections.includes(coverageId);
    
    let newSelections: CoverageOption[];
    if (isSelected) {
      newSelections = currentSelections.filter(id => id !== coverageId);
    } else {
      newSelections = [...currentSelections, coverageId];
    }

    updateBookingData({
      responses: {
        ...responses,
        'coverage-selections': newSelections,
      },
    });

    // Clear error if selections are made
    if (newSelections.length > 0) {
      setHasError(false);
    }
  };

  const handleClearAll = () => {
    updateBookingData({
      responses: {
        ...responses,
        'coverage-selections': [],
      },
    });
  };

  const calculatePriceRange = (): { min: number; max: number } => {
    // Price tiers for CS, XR, XR Plus respectively
    const PRICING_TIERS = {
      'FRONTS': { min: 159, max: 199 }, // CS to XR Plus
      'SIDES_REAR': { min: 299, max: 549 }, // CS to XR Plus  
      'WINDSHIELD': { min: 199, max: 349 }, // CS to XR Plus
      'SUN_STRIP': { min: 49, max: 49 }, // Fixed price across all tiers
    };
    
    let minTotal = 0;
    let maxTotal = 0;
    
    coverageSelections.forEach((selection) => {
      const pricing = PRICING_TIERS[selection];
      if (pricing) {
        minTotal += pricing.min;
        maxTotal += pricing.max;
      }
    });
    
    return { min: minTotal, max: maxTotal };
  };

  const formatPriceRange = (): string => {
    const { min, max } = calculatePriceRange();
    return min === max ? `${min}` : `${min}–${max}`;
  };

  const getConfigString = (): string => {
    if (coverageSelections.length === 0) return '';
    return coverageSelections.join(' + ');
  };

  // Trigger pulse effect on first selection
  const handleFirstSelection = (regions: string[]) => {
    // This would be implemented with a ref to the SVG elements for the pulse effect
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header Section - Title and Coverage Package Side by Side */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left Half - Title */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl mb-2">Coverage & Add-ons</h2>
            <p className="text-muted-foreground">
              Build your tinting package with instant visual feedback
            </p>
          </div>

          {/* Right Half - Coverage Package Summary */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Coverage Package</h4>
                {coverageSelections.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClearAll}
                    className="text-xs h-auto p-1"
                  >
                    Clear all
                  </Button>
                )}
              </div>
              
              <div className="space-y-2">
                {coverageSelections.length > 0 ? (
                  <>
                    <div className="flex flex-wrap gap-1">
                      {coverageSelections.map((selection) => {
                        const option = COVERAGE_OPTIONS.find(opt => opt.id === selection);
                        return (
                          <motion.div
                            key={selection}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          >
                            <Badge variant="secondary" className="text-xs">
                              {option?.title}
                            </Badge>
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm font-medium">Estimated Range</span>
                      <span className="font-semibold">{formatPriceRange()}</span>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      Final price depends on film grade selection
                    </div>
                    
                    {getConfigString() && (
                      <div className="text-xs text-muted-foreground">
                        Current config: {getConfigString()}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-1">No coverage selected</p>
                    <p className="text-xs text-muted-foreground">Choose options below to build your package</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Vehicle Visualization */}
          <div className="space-y-4">
            <VehicleVisualization
              vehicleClass={vehicleClass}
              highlightedRegions={hoveredRegions}
              selectedRegions={getSelectedRegions()}
            />
          </div>

          {/* Right Column - Coverage Options */}
          <div className="space-y-6">

            {/* Coverage Options List */}
            <div className="space-y-3">
              {COVERAGE_OPTIONS.map((option) => {
                const isSelected = coverageSelections.includes(option.id);
                
                return (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    onHoverStart={() => setHoveredRegions(option.regions)}
                    onHoverEnd={() => setHoveredRegions([])}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all duration-150 hover:shadow-md ${
                        isSelected
                          ? 'ring-2 ring-primary bg-primary/5'
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => handleCoverageToggle(option.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Checkbox checked={isSelected} className="pointer-events-none" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{option.title}</h4>
                            <Tooltip>
                              <TooltipTrigger onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">{option.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {option.helper}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{option.priceRange}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Error Message */}
            {hasError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive text-center"
              >
                Select at least one coverage option.
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
