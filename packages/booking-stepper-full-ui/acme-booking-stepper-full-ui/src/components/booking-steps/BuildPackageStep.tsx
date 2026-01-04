import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Info, ChevronLeft, ChevronRight } from "lucide-react";
import { BookingData } from "../WindowTintingBookingStepper";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface BuildPackageStepProps {
  bookingData: Partial<BookingData>;
  updateBookingData: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

type CoverageOption =
  | "FRONTS"
  | "SIDES_REAR"
  | "WINDSHIELD"
  | "SUN_STRIP";
type FilmTier = "CS" | "XR" | "XR_PLUS";
type Stage = "coverage" | "film";

const COVERAGE_OPTIONS = [
  {
    id: "FRONTS" as CoverageOption,
    title: "Front Windows (Factory Match)",
    helper:
      "Match your factory rear tint on the two front windows.",
    regions: ["front_sides"],
    priceRange: "$159–$199",
    tooltip:
      "Perfect for vehicles that already have rear tint from the factory. We match the shade and darkness on your front windows.",
  },
  {
    id: "SIDES_REAR" as CoverageOption,
    title: "Sides & Rear (Excludes Fronts)",
    helper:
      "All rear side windows + rear glass (does not include front windows).",
    regions: ["rear_sides", "rear_glass"],
    priceRange: "$299–$549",
    tooltip:
      "Complete rear window tinting for privacy and UV protection. Front windows remain untinted.",
  },
  {
    id: "WINDSHIELD" as CoverageOption,
    title: "Windshield",
    helper: "Full windshield tint for heat & glare reduction.",
    regions: ["windshield_full"],
    priceRange: "$199–$349",
    tooltip:
      "Specialized windshield film for heat rejection and glare reduction while maintaining visibility and legal compliance.",
  },
  {
    id: "SUN_STRIP" as CoverageOption,
    title: "Sun Strip (Brow)",
    helper: "Narrow strip at top of windshield to cut glare.",
    regions: ["sun_brow"],
    priceRange: "+$49",
    tooltip:
      "A 6-8 inch strip of tint applied to the top of your windshield to reduce glare from overhead sun.",
  },
];

// Pricing map per tier (as specified)
const PRICING_MAP = {
  FRONTS: { CS: 159, XR: 179, XR_PLUS: 199 },
  SIDES_REAR: { CS: 299, XR: 424, XR_PLUS: 549 },
  WINDSHIELD: { CS: 199, XR: 274, XR_PLUS: 349 },
  SUN_STRIP: 49, // flat rate across all tiers
};

const FILM_TIERS = [
  {
    id: "CS" as FilmTier,
    title: "CS",
    description:
      "Premium ceramic film with excellent heat rejection",
    features: [
      "UV Protection",
      "Heat Rejection",
      "Fade Resistant",
    ],
    popular: false,
  },
  {
    id: "XR" as FilmTier,
    title: "XR",
    description:
      "Superior performance with enhanced durability",
    features: [
      "Maximum UV Protection",
      "Superior Heat Rejection",
      "Lifetime Warranty",
    ],
    popular: true,
  },
  {
    id: "XR_PLUS" as FilmTier,
    title: "XR Plus",
    description: "Top-tier film with cutting-edge technology",
    features: [
      "Ultimate Performance",
      "Maximum Clarity",
      "Premium Warranty",
    ],
    popular: false,
  },
];

const TINT_LEVELS = [
  { id: "5", label: "5%", description: "Darkest legal" },
  { id: "20", label: "20%", description: "Very dark" },
  { id: "35", label: "35%", description: "Medium dark" },
  { id: "50", label: "50%", description: "Light" },
  { id: "70", label: "70%", description: "Very light" },
];

// Named transitions
const transitions = {
  "Coverage→Film": {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { duration: 0.2, ease: "easeOut" },
  },
  "Film→Coverage": {
    initial: { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 12 },
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

// Vehicle Silhouette Component with Real Car Image
const VehicleSilhouette: React.FC<{
  vehicleClass: string;
  selectedRegions: string[];
  hoveredRegion?: string;
  currentStage?: Stage;
}> = ({ vehicleClass, selectedRegions, hoveredRegion, currentStage }) => {
  const getRegionStyle = (regionId: string) => {
    const isHovered = hoveredRegion === regionId;
    const isSelected = selectedRegions.includes(regionId);

    if (isSelected) {
      return "fill-green-400/60 stroke-green-400 stroke-2";
    } else if (isHovered) {
      return "fill-yellow-400/40 stroke-yellow-400 stroke-1";
    } else {
      return "fill-transparent stroke-white/30 stroke-1";
    }
  };

  return (
    <div className="bg-muted/20 rounded-lg p-6 flex items-center justify-center min-h-[320px]">
      <div className="space-y-4 w-full">
        <h3 className="font-medium text-center text-white">
          Your {vehicleClass.toLowerCase()}
        </h3>
        <p className="text-center text-yellow-400 font-bold text-lg">
          🚗 TEST: Car image should appear below this text 🚗
        </p>

        <div className="relative w-full max-w-[300px] mx-auto">
          {/* Car Image Background */}
          <div className="relative">
            <Image
              src="/images/car-top-view.png"
              alt="Car top view"
              width={300}
              height={200}
              className="w-full h-auto"
            />

            {/* SVG Overlay for Tint Regions */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 300 200"
              className="absolute inset-0 pointer-events-none"
              style={{ aspectRatio: "3/2" }}
            >
              {/* Windshield */}
              <motion.path
                d="M 75 30 L 225 30 L 215 65 L 85 65 Z"
                className={getRegionStyle("windshield_full")}
                id="windshield_full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* Sun strip (top of windshield) */}
              <motion.path
                d="M 75 30 L 225 30 L 225 40 L 75 40 Z"
                className={getRegionStyle("sun_brow")}
                id="sun_brow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* Front side windows */}
              <motion.path
                d="M 65 70 L 95 70 L 85 100 L 65 100 Z"
                className={getRegionStyle("front_sides")}
                id="front_sides_left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M 205 70 L 235 70 L 235 100 L 215 100 Z"
                className={getRegionStyle("front_sides")}
                id="front_sides_right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* Rear side windows */}
              <motion.path
                d="M 90 105 L 120 105 L 115 135 L 90 135 Z"
                className={getRegionStyle("rear_sides")}
                id="rear_sides_left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M 180 105 L 210 105 L 210 135 L 185 135 Z"
                className={getRegionStyle("rear_sides")}
                id="rear_sides_right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* Rear glass */}
              <motion.path
                d="M 115 140 L 185 140 L 175 170 L 125 170 Z"
                className={getRegionStyle("rear_glass")}
                id="rear_glass"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </svg>
          </div>
        </div>

        {currentStage === "coverage" && (
          <div className="text-sm space-y-2">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-3 h-3 bg-green-400/60 border border-green-400 rounded-sm"></div>
              <span className="text-xs text-muted-foreground">
                Selected
              </span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <div className="w-3 h-3 bg-yellow-400/40 border border-yellow-400 rounded-sm"></div>
              <span className="text-xs text-muted-foreground">
                Highlighted
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Additional Options Card Component
const AdditionalOptionsCard: React.FC<{
  filmTier: FilmTier | null;
  tintLevel: string | null;
  prevTintRemoval: boolean;
  currentStage: Stage;
  onToggleRemoval: (checked: boolean) => void;
  onSelectTintLevel: (level: string) => void;
}> = ({
  filmTier,
  tintLevel,
  prevTintRemoval,
  currentStage,
  onToggleRemoval,
  onSelectTintLevel,
}) => {
  // Only show during film stage
  if (currentStage !== "film") return null;

  return (
    <Card className="p-4">
      <div className="space-y-3">
        <h3 className="font-medium">Additional Options</h3>

        {/* Previous Tint Removal */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium">
                Previous Tint Removal
              </h4>
              <p className="text-sm text-muted-foreground">
                Remove existing tint?
              </p>
            </div>
            <Switch
              checked={prevTintRemoval}
              onCheckedChange={onToggleRemoval}
            />
          </div>
          {prevTintRemoval && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-muted-foreground"
            >
              Removal pricing confirmed in shop.
            </motion.p>
          )}
        </div>

        {/* Tint Level (Optional) */}
        <div className="pt-3 border-t">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium">Tint Level (Optional)</h4>
              <p className="text-sm text-muted-foreground">
                Choose your preferred darkness level
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {TINT_LEVELS.map((level) => {
                const isSelected = tintLevel === level.id;

                return (
                  <motion.button
                    key={level.id}
                    onClick={() => onSelectTintLevel(level.id)}
                    className={`h-10 px-3 rounded-lg border transition-all text-sm ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-muted-foreground"
                    }`}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-1">
                      <span className="font-medium">
                        {level.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({level.description})
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Fixed Summary Card Component (never animates)
const SummaryCard: React.FC<{
  vehicleClass: string;
  coverageSelections: CoverageOption[];
  filmTier: FilmTier | null;
  tintLevel: string | null;
  prevTintRemoval: boolean;
  currentStage: Stage;
  onClearAll: () => void;
}> = ({
  vehicleClass,
  coverageSelections,
  filmTier,
  tintLevel,
  prevTintRemoval,
  currentStage,
  onClearAll,
}) => {
  // Calculate price range for coverage stage
  const calculatePriceRange = () => {
    let rangeMin = 0;
    let rangeMax = 0;

    coverageSelections.forEach((selection) => {
      if (selection === "SUN_STRIP") {
        rangeMin += PRICING_MAP.SUN_STRIP;
        rangeMax += PRICING_MAP.SUN_STRIP;
      } else {
        const prices = PRICING_MAP[selection];
        rangeMin += prices.CS;
        rangeMax += prices.XR_PLUS;
      }
    });

    return { rangeMin, rangeMax };
  };

  // Calculate total for film stage
  const calculateTotal = () => {
    if (!filmTier) return 0;

    let total = 0;
    coverageSelections.forEach((selection) => {
      if (selection === "SUN_STRIP") {
        total += PRICING_MAP.SUN_STRIP;
      } else {
        total += PRICING_MAP[selection][filmTier];
      }
    });

    return total;
  };

  const getCoverageDisplayNames = (): string[] => {
    const displayNames: { [key in CoverageOption]: string } = {
      FRONTS: "Factory Match (Fronts Only)",
      SIDES_REAR: "Sides & Rear (Excludes Fronts)",
      WINDSHIELD: "Windshield",
      SUN_STRIP: "Sun Strip (Brow)",
    };

    return coverageSelections.map(
      (selection) => displayNames[selection],
    );
  };

  const { rangeMin, rangeMax } = calculatePriceRange();
  const total = calculateTotal();

  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Coverage Package</h3>
          {coverageSelections.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="text-xs h-auto p-1"
            >
              Clear all
            </Button>
          )}
        </div>

        {/* Selected Coverage Items or Empty State */}
        <div className="space-y-2">
          {coverageSelections.length > 0 ? (
            getCoverageDisplayNames().map((coverage) => (
              <div key={coverage} className="text-sm">
                {coverage}
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">
              Select coverage options below to build your
              package
            </div>
          )}
        </div>

        {/* Price Display */}
        <div className="pt-2 border-t">
          {coverageSelections.length > 0 ? (
            currentStage === "coverage" ? (
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">
                    Estimated Range
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Final price depends on film grade selection
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Current config:{" "}
                    {coverageSelections.join(", ")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">
                    $
                    {rangeMin === rangeMax
                      ? rangeMin
                      : `${rangeMin}–${rangeMax}`}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">
                  Total Price
                </div>
                <div className="text-right">
                  {filmTier ? (
                    <motion.div
                      className="text-lg font-semibold"
                      key={total}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      ${total}
                    </motion.div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      $
                      {rangeMin === rangeMax
                        ? rangeMin
                        : `${rangeMin}–${rangeMax}`}
                    </div>
                  )}
                </div>
              </div>
            )
          ) : (
            <div className="text-center py-2">
              <div className="text-sm text-muted-foreground">
                Price will be calculated based on your
                selections
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

// Coverage View Component (4A)
const CoverageView: React.FC<{
  coverageSelections: CoverageOption[];
  onToggleCoverage: (id: CoverageOption) => void;
  onHoverCoverage: (regions: string[]) => void;
  onContinue: () => void;
}> = ({
  coverageSelections,
  onToggleCoverage,
  onHoverCoverage,
  onContinue,
}) => {
  return (
    <div className="space-y-4">
      {COVERAGE_OPTIONS.map((option) => {
        const isSelected = coverageSelections.includes(
          option.id,
        );

        return (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.99 }}
            onHoverStart={() => onHoverCoverage(option.regions)}
            onHoverEnd={() => onHoverCoverage([])}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            <Card
              className={`p-4 cursor-pointer transition-all duration-150 hover:shadow-md ${
                isSelected
                  ? "ring-2 ring-primary bg-primary/5"
                  : "hover:shadow-lg"
              }`}
              onClick={() => onToggleCoverage(option.id)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Checkbox
                    checked={isSelected}
                    className="pointer-events-none"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">
                      {option.title}
                    </h4>
                    <Tooltip>
                      <TooltipTrigger
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          {option.tooltip}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {option.helper}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">
                    {option.priceRange}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}

      <div className="pt-4">
        <Button
          onClick={onContinue}
          disabled={coverageSelections.length === 0}
          className="w-full gap-2"
        >
          Continue: Choose film
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Film View Component (4B)
const FilmView: React.FC<{
  coverageSelections: CoverageOption[];
  filmTier: FilmTier | null;
  tintLevel: string | null;
  prevTintRemoval: boolean;
  onSelectFilmTier: (tier: FilmTier) => void;
  onSelectTintLevel: (level: string) => void;
  onToggleRemoval: (checked: boolean) => void;
  onBack: () => void;
  onContinue: () => void;
}> = ({
  coverageSelections,
  filmTier,
  tintLevel,
  prevTintRemoval,
  onSelectFilmTier,
  onSelectTintLevel,
  onToggleRemoval,
  onBack,
  onContinue,
}) => {
  const calculateTierTotal = (tier: FilmTier): number => {
    let total = 0;
    coverageSelections.forEach((selection) => {
      if (selection === "SUN_STRIP") {
        total += PRICING_MAP.SUN_STRIP;
      } else {
        total += PRICING_MAP[selection][tier];
      }
    });
    return total;
  };

  return (
    <div className="space-y-6">


      {/* Film Grade Cards */}
      <div className="space-y-4">
        {FILM_TIERS.map((tier) => {
          const isSelected = filmTier === tier.id;
          const tierTotal = calculateTierTotal(tier.id);

          return (
            <motion.div
              key={tier.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isSelected
                    ? "ring-2 ring-primary shadow-md bg-primary/5"
                    : "hover:shadow-sm"
                }`}
                onClick={() => onSelectFilmTier(tier.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">
                        {tier.title}
                      </h4>
                      {tier.popular && (
                        <Badge
                          variant="secondary"
                          className="text-xs"
                        >
                          Most Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {tier.description}
                    </p>

                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          Learn more
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-80"
                        align="start"
                      >
                        <div className="space-y-2">
                          <h4 className="font-medium">
                            {tier.title}
                          </h4>
                          <ul className="space-y-1 text-sm">
                            {tier.features.map(
                              (feature, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                  {feature}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        ${tierTotal}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Total with coverage
                      </div>
                    </div>

                    <motion.div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/30"
                      }`}
                      animate={
                        isSelected
                          ? { scale: [1, 1.2, 1] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.2 }}
                    >
                      {isSelected && (
                        <motion.svg
                          className="w-3 h-3 text-primary-foreground"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          initial={{
                            pathLength: 0,
                            opacity: 0,
                          }}
                          animate={{
                            pathLength: 1,
                            opacity: 1,
                          }}
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
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>





      <div className="pt-4">
        <Button
          onClick={onContinue}
          disabled={!filmTier}
          className="w-full gap-2"
        >
          Continue: Your details
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export const BuildPackageStep: React.FC<
  BuildPackageStepProps
> = ({ bookingData, updateBookingData, onNext, onPrev }) => {
  const [currentStage, setCurrentStage] =
    useState<Stage>("coverage");
  const [hoveredRegion, setHoveredRegion] =
    useState<string>("");

  const responses = bookingData.responses || {};
  const vehicleClass = responses["vehicle-class"] || "CAR";
  const coverageSelections = (responses[
    "coverage-selections"
  ] || []) as CoverageOption[];
  const filmTier = responses["film-tier"] as FilmTier | null;
  const tintLevel = responses["tint-level"] || null;
  const previousTintRemoval =
    responses["previous-tint-removal"] || false;

  // Calculate selected regions for visualization
  const getSelectedRegions = (): string[] => {
    let regions: string[] = [];
    coverageSelections.forEach((option) => {
      const coverageOption = COVERAGE_OPTIONS.find(
        (opt) => opt.id === option,
      );
      if (coverageOption) {
        regions.push(...coverageOption.regions);
      }
    });
    return regions;
  };

  // Stage transition handlers
  const handleCoverageToFilm = () => {
    setCurrentStage("film");
  };

  const handleFilmToCoverage = () => {
    setCurrentStage("coverage");
  };

  // Coverage selection handlers
  const handleToggleCoverage = (option: CoverageOption) => {
    const newSelections = coverageSelections.includes(option)
      ? coverageSelections.filter((item) => item !== option)
      : [...coverageSelections, option];

    updateBookingData({
      responses: {
        ...responses,
        "coverage-selections": newSelections,
        "estimated-price": calculateEstimatedPrice(newSelections, filmTier),
      },
    });
  };

  const handleHoverCoverage = (regions: string[]) => {
    setHoveredRegion(regions[0] || "");
  };

  const handleClearAll = () => {
    updateBookingData({
      responses: {
        ...responses,
        "coverage-selections": [],
        "estimated-price": 0,
      },
    });
  };

  // Film selection handlers
  const handleSelectFilmTier = (tier: FilmTier) => {
    updateBookingData({
      responses: {
        ...responses,
        "film-tier": tier,
        "estimated-price": calculateEstimatedPrice(coverageSelections, tier),
      },
    });
  };

  const handleSelectTintLevel = (level: string) => {
    updateBookingData({
      responses: {
        ...responses,
        "tint-level": level,
      },
    });
  };

  const handleToggleRemoval = (checked: boolean) => {
    updateBookingData({
      responses: {
        ...responses,
        "previous-tint-removal": checked,
      },
    });
  };

  // Price calculation helper
  const calculateEstimatedPrice = (selections: CoverageOption[], tier: FilmTier | null): number => {
    if (!tier) return 0;
    let total = 0;
    selections.forEach((selection) => {
      if (selection === "SUN_STRIP") {
        total += PRICING_MAP.SUN_STRIP;
      } else {
        total += PRICING_MAP[selection][tier];
      }
    });
    return total;
  };

  return (
    <TooltipProvider>
      {/* Dynamic Header */}
      <div className="mb-6">
        <motion.h2
          key={currentStage}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="text-xl font-semibold"
        >
          {currentStage === "coverage" ? "Select Coverage Options" : "Choose Film Grade"}
        </motion.h2>
        <p className="text-sm text-muted-foreground mt-1">
          {currentStage === "coverage"
            ? "Choose which windows to tint"
            : "Select your preferred film quality and options"}
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Interactive Content */}
        <div className="w-full lg:w-1/2">
          <AnimatePresence mode="wait">
            {currentStage === "coverage" ? (
              <motion.div
                key="coverage-view"
                {...transitions["Coverage→Film"]}
              >
                <CoverageView
                  coverageSelections={coverageSelections}
                  onToggleCoverage={handleToggleCoverage}
                  onHoverCoverage={handleHoverCoverage}
                  onContinue={handleCoverageToFilm}
                />
              </motion.div>
            ) : (
              <motion.div
                key="film-view"
                {...transitions["Film→Coverage"]}
              >
                <FilmView
                  coverageSelections={coverageSelections}
                  filmTier={filmTier}
                  tintLevel={tintLevel}
                  prevTintRemoval={previousTintRemoval}
                  onSelectFilmTier={handleSelectFilmTier}
                  onSelectTintLevel={handleSelectTintLevel}
                  onToggleRemoval={handleToggleRemoval}
                  onBack={handleFilmToCoverage}
                  onContinue={onNext}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column - Static Visualization & Summary */}
        <div className="w-full lg:w-1/2 space-y-4">
          {/* Vehicle Visualization - Only show during coverage step */}
          {currentStage === "coverage" && (
            <VehicleSilhouette
              vehicleClass={vehicleClass}
              selectedRegions={getSelectedRegions()}
              hoveredRegion={hoveredRegion}
              currentStage={currentStage}
            />
          )}

          {/* Summary Card */}
          <SummaryCard
            vehicleClass={vehicleClass}
            coverageSelections={coverageSelections}
            filmTier={filmTier}
            tintLevel={tintLevel}
            prevTintRemoval={previousTintRemoval}
            currentStage={currentStage}
            onClearAll={handleClearAll}
            onToggleRemoval={handleToggleRemoval}
            onSelectTintLevel={handleSelectTintLevel}
          />
        </div>
      </div>
    </TooltipProvider>
  );
};