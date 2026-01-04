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
import { BookingData, BookingDataUpdate } from "../WindowTintingBookingStepper";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  HighlightRegion,
  VehicleCoverageIllustration,
  VehicleType,
} from "./SedanCoverageIllustration";
// Using public folder asset - no import needed

interface BuildPackageStepProps {
  bookingData: Partial<BookingData>;
  updateBookingData: (updates: BookingDataUpdate) => void;
  onNext: () => void;
  onPrev: () => void;
  stage?: "coverage" | "film";
}

type CoverageOption =
  | "SIDES_REAR"
  | "SIDE_WINDOWS"
  | "REAR_GLASS"
  | "WINDSHIELD"
  | "SUN_STRIP"
  | "FACTORY_MATCH_FRONT_DOORS"
  | "SINGLE_SUNROOF"
  | "DUAL_SUNROOF";
type FilmTier = "CS" | "XR" | "XR_PLUS";
type Stage = "coverage" | "film";

interface CoverageOptionVariant {
  id: string;
  label: string;
  description: string;
}

interface CoverageOptionConfig {
  id: CoverageOption;
  title: string | ((hasFactoryTint?: boolean) => string);
  helper: string | ((hasFactoryTint?: boolean) => string);
  regions: string[];
  tooltip: string;
  variants?: CoverageOptionVariant[];
}

const COVERAGE_OPTIONS: CoverageOptionConfig[] = [
  {
    id: "FACTORY_MATCH_FRONT_DOORS" as CoverageOption,
    title: "Factory Match",
    helper: "Includes Front Door Windows",
    regions: ["front_sides"],
    tooltip:
      "Match your existing factory tinted rear windows with professional film on your front doors for a seamless, uniform appearance.",
  },
  {
    id: "SIDES_REAR" as CoverageOption,
    title: (hasFactoryTint?: boolean) =>
      hasFactoryTint ? "Factory Enhance" : "Sides and Rear",
    helper: (hasFactoryTint?: boolean) =>
      hasFactoryTint
        ? "Side Windows and Rear Glass. Take your factory tint darker and reduce heat"
        : "Includes all Side Windows and Rear Glass",
    regions: ["front_sides", "rear_sides", "rear_glass"],
    tooltip:
      "Complete window tinting package including front windows (factory match) and all rear windows for full privacy and UV protection.",
  },
  {
    id: "SIDE_WINDOWS" as CoverageOption,
    title: "Side Windows",
    helper: "Includes Front Side Windows",
    regions: ["front_sides"],
    tooltip:
      "Tint for your front side windows, providing privacy, UV protection, and heat reduction.",
  },
  {
    id: "REAR_GLASS" as CoverageOption,
    title: "Rear Glass",
    helper: "Rear Window Only",
    regions: ["rear_glass"],
    tooltip:
      "Tint for your rear window, blocking heat and UV rays while maintaining rear visibility.",
  },
  {
    id: "WINDSHIELD" as CoverageOption,
    title: "Windshield",
    helper: "Full windshield tint for heat & glare reduction.",
    regions: ["windshield_full"],
    tooltip:
      "Specialized windshield film for heat rejection and glare reduction while maintaining visibility and legal compliance.",
  },
  {
    id: "SUN_STRIP" as CoverageOption,
    title: "Sun Strip (Brow)",
    helper: "Narrow strip at top of windshield to cut glare.",
    regions: ["sun_brow"],
    tooltip:
      "A 6-8 inch strip of tint applied to the top of your windshield to reduce glare from overhead sun.",
  },
  {
    id: "SINGLE_SUNROOF" as CoverageOption,
    title: "Single Panel Sunroof",
    helper: "Professional tint for your standard sunroof panel.",
    regions: ["sunroof"],
    tooltip:
      "High-quality film applied to single sunroof glass for heat reduction and UV protection while maintaining the open-air experience.",
  },
  {
    id: "DUAL_SUNROOF" as CoverageOption,
    title: "Dual Panel Sunroof",
    helper: "Professional tint for your panoramic sunroof panels.",
    regions: ["sunroof"],
    tooltip:
      "High-quality film applied to dual/panoramic sunroof glass panels for maximum heat reduction and UV protection.",
  },
];

// Comprehensive pricing map by vehicle type and subtype
const PRICING_MAP: Record<string, Record<string, { CS: number; XR: number; XR_PLUS: number } | number>> = {
  // CAR pricing
  'CAR': {
    SIDES_REAR: { CS: 299, XR: 399, XR_PLUS: 599 }, // Sedan/Coupe
    WINDSHIELD: { CS: 199, XR: 299, XR_PLUS: 349 },
    SUN_STRIP: { CS: 75, XR: 99, XR_PLUS: 149 },
    SINGLE_SUNROOF: { CS: 89, XR: 119, XR_PLUS: 149 },
    DUAL_SUNROOF: { CS: 149, XR: 199, XR_PLUS: 249 },
  },
  // CAR - Convertible (slightly different Sides & Rear pricing)
  'CAR_convertible': {
    SIDES_REAR: { CS: 299, XR: 399, XR_PLUS: 499 },
    WINDSHIELD: { CS: 199, XR: 299, XR_PLUS: 349 },
    SUN_STRIP: { CS: 75, XR: 99, XR_PLUS: 149 },
  },
  // SUV pricing ($100 more than sedan for Sides & Rear)
  'SUV': {
    SIDES_REAR: { CS: 399, XR: 499, XR_PLUS: 699 },
    FACTORY_MATCH_FRONT_DOORS: { CS: 149, XR: 199, XR_PLUS: 299 },
    WINDSHIELD: { CS: 199, XR: 299, XR_PLUS: 349 },
    SUN_STRIP: { CS: 75, XR: 99, XR_PLUS: 149 },
    SINGLE_SUNROOF: { CS: 89, XR: 119, XR_PLUS: 149 },
    DUAL_SUNROOF: { CS: 149, XR: 199, XR_PLUS: 249 },
  },
  // TRUCK - Standard Cab ($50 less than sedan for Sides & Rear, no factory tint options)
  'TRUCK_standard cab': {
    SIDES_REAR: { CS: 249, XR: 349, XR_PLUS: 549 },
    WINDSHIELD: { CS: 199, XR: 299, XR_PLUS: 349 },
    SUN_STRIP: { CS: 75, XR: 99, XR_PLUS: 149 },
  },
  // TRUCK - Extended Cab (same as sedan)
  'TRUCK_extended cab': {
    SIDES_REAR: { CS: 299, XR: 399, XR_PLUS: 599 },
    FACTORY_MATCH_FRONT_DOORS: { CS: 149, XR: 199, XR_PLUS: 299 },
    WINDSHIELD: { CS: 199, XR: 299, XR_PLUS: 349 },
    SUN_STRIP: { CS: 75, XR: 99, XR_PLUS: 149 },
  },
  // TRUCK - Crew Cab (same as sedan)
  'TRUCK_crew cab': {
    SIDES_REAR: { CS: 299, XR: 399, XR_PLUS: 599 },
    FACTORY_MATCH_FRONT_DOORS: { CS: 149, XR: 199, XR_PLUS: 299 },
    WINDSHIELD: { CS: 199, XR: 299, XR_PLUS: 349 },
    SUN_STRIP: { CS: 75, XR: 99, XR_PLUS: 149 },
  },
  // VAN pricing ($50 more than SUV for Sides & Rear)
  'VAN': {
    SIDES_REAR: { CS: 449, XR: 549, XR_PLUS: 749 },
    FACTORY_MATCH_FRONT_DOORS: { CS: 149, XR: 199, XR_PLUS: 299 },
    WINDSHIELD: { CS: 199, XR: 299, XR_PLUS: 349 },
    SUN_STRIP: { CS: 75, XR: 99, XR_PLUS: 149 },
  },
};

// Helper function to get pricing for a specific vehicle type/subtype and coverage option
const getPricing = (
  vehicleClass: string,
  vehicleSubtype: string | undefined,
  coverageOption: CoverageOption
): { CS: number; XR: number; XR_PLUS: number } | number | undefined => {
  // Try vehicle-specific pricing first (e.g., 'TRUCK_crew cab')
  const specificKey = vehicleSubtype ? `${vehicleClass}_${vehicleSubtype}` : vehicleClass;
  const specificPricing = PRICING_MAP[specificKey]?.[coverageOption];
  if (specificPricing) return specificPricing;

  // Fall back to general vehicle class pricing
  return PRICING_MAP[vehicleClass]?.[coverageOption];
};


const getWhyChooseContent = (tierId: FilmTier): string[] => {
  switch (tierId) {
    case "CS":
      return [
        "Perfect for first-time tinters who want quality performance at an accessible price point",
        "Blocks 99% of UV rays, protecting your skin and interior from harmful sun damage",
        "Reduces heat by up to 45%, keeping your car cooler and more comfortable",
        "Lifetime warranty against fading, bubbling, and peeling for peace of mind",
        "Professional installation ensures a clean, bubble-free finish that lasts"
      ];
    case "XR":
      return [
        "Industry-leading ceramic technology for superior heat rejection and clarity",
        "Blocks 99% of UV rays while rejecting up to 90% of infrared heat",
        "Crystal-clear visibility with no interference to radio or GPS signals",
        "Fade-resistant color stability maintains appearance for years to come",
        "Lifetime transferable warranty adds value when selling your vehicle"
      ];
    case "XR_PLUS":
      return [
        "The ultimate in window film technology with multi-layer ceramic construction",
        "Maximum heat rejection (95%+) for extreme climates and luxury vehicles",
        "Superior optical clarity that's virtually undetectable when applied",
        "Advanced nanoceramic particles provide unmatched durability and performance",
        "Premium warranty coverage with guaranteed satisfaction for discerning customers"
      ];
    default:
      return [];
  }
};

const FILM_TIERS = [
  {
    id: "CS" as FilmTier,
    title: "CS",
    description:
      "Standard Tint with a Lifetime Warranty",
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
    transition: { duration: 0.2 },
  },
  "Film→Coverage": {
    initial: { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 12 },
    transition: { duration: 0.2 },
  },
};

// Vehicle Silhouette Component
const VehicleSilhouette: React.FC<{
  vehicleClass: string;
  vehicleSubtype?: string;
  selectedRegions: string[];
  hoveredRegions?: string[];
  currentStage?: Stage;
}> = ({ vehicleClass, vehicleSubtype, selectedRegions, hoveredRegions, currentStage }) => {
  const getRegionStyle = (regionId: string) => {
    const isHovered = hoveredRegions?.includes(regionId) || false;
    const isSelected = selectedRegions.includes(regionId);

    if (isSelected) {
      if (
        regionId === "windshield_full" &&
        selectedRegions.includes("sun_brow")
      ) {
        return "fill-green-400/60 stroke-green-400 stroke-2";
      } else if (
        regionId === "sun_brow" &&
        selectedRegions.includes("windshield_full")
      ) {
        return "fill-green-400/80 stroke-green-400 stroke-2";
      } else {
        return "fill-green-400/60 stroke-green-400 stroke-2";
      }
    } else if (isHovered) {
      return "fill-yellow-400/40 stroke-yellow-400 stroke-1";
    } else {
      return "fill-transparent stroke-white/30 stroke-1";
    }
  };

  const renderCarSedanFrontQuarter = () => (
    <div className="relative w-full max-w-md mx-auto">
      {/* Base sedan image from Booking-Images */}
      <div
        className="w-full h-auto bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("/images/sedan-base.svg")`,
          aspectRatio: "4/3",
          minHeight: "200px"
        }}
      >
        {/* Interactive window overlays */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Front windshield */}
          <motion.path
            d="M 80 95 L 320 95 L 310 125 L 90 125 Z"
            className={getRegionStyle("windshield_full")}
            id="windshield_full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* Sun strip */}
          <motion.path
            d="M 80 95 L 320 95 L 320 105 L 80 105 Z"
            className={getRegionStyle("sun_brow")}
            id="sun_brow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* Front driver side window */}
          <motion.path
            d="M 75 130 L 125 130 L 130 165 L 85 165 Z"
            className={getRegionStyle("front_sides")}
            id="front_sides_left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* Front passenger side window */}
          <motion.path
            d="M 270 130 L 325 130 L 315 165 L 265 165 Z"
            className={getRegionStyle("front_sides")}
            id="front_sides_right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* Rear driver side window (partial) */}
          <motion.path
            d="M 135 130 L 175 130 L 175 165 L 135 165 Z"
            className={getRegionStyle("rear_sides")}
            id="rear_sides_left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </svg>
      </div>
    </div>
  );

  const renderCarSedanRearQuarter = () => (
    <div className="relative w-full max-w-md mx-auto">
      {/* Base sedan image from Booking-Images */}
      <div
        className="w-full h-auto bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("/images/sedan-base.svg")`,
          aspectRatio: "4/3",
          minHeight: "200px"
        }}
      >
        {/* Interactive window overlays */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Rear windshield */}
          <motion.path
            d="M 120 95 L 280 95 L 275 125 L 125 125 Z"
            className={getRegionStyle("rear_glass")}
            id="rear_glass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* Rear driver side window */}
          <motion.path
            d="M 115 130 L 165 130 L 165 165 L 115 165 Z"
            className={getRegionStyle("rear_sides")}
            id="rear_sides_left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* Rear passenger side window */}
          <motion.path
            d="M 235 130 L 285 130 L 280 165 L 230 165 Z"
            className={getRegionStyle("rear_sides")}
            id="rear_sides_right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* Front passenger side window (partially visible) */}
          <motion.path
            d="M 175 130 L 225 130 L 225 165 L 175 165 Z"
            className={getRegionStyle("front_sides")}
            id="front_sides_right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </svg>
      </div>
    </div>
  );

  const renderCarSedan = () => (
    <div className="w-full max-w-[300px] mx-auto">
      <Image
        src="/images/car-top-view.png"
        alt="Car top view"
        width={300}
        height={200}
        className="w-full h-auto rounded-lg"
      />
    </div>
  );

  const renderCarSedanOld = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-sm font-medium text-white mb-2">Your Sedan</h4>
        <div className="relative w-full max-w-lg mx-auto bg-gray-50 rounded-lg p-4 border border-gray-200">
          {/* Base sedan image with interactive SVG overlays */}
          <div className="relative">
            <img
              src="/images/base-optimized.svg"
              alt="Sedan vehicle illustration for window tinting coverage selection"
              className="w-full h-auto object-contain"
              style={{
                aspectRatio: "976/758",
                minHeight: "300px",
                maxHeight: "400px"
              }}
            />

            {/* Interactive SVG overlays using actual window shapes from sidesandrear.svg */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 976 758"
              preserveAspectRatio="xMidYMid meet"
              style={{
                aspectRatio: "976/758",
                minHeight: "300px",
                maxHeight: "400px"
              }}
            >
              {/* Simplified v1.0 - static image only, no interactive overlays */}

              <motion.path
                d="M187.035,169.048c0,-0.318 1.057,-1.688 3.623,-4.696c3.788,-4.441 11.53,-12.853 11.701,-12.686c0.037,0.037 -0.786,1.915 -1.08,2.964c-0.294,1.048 -1.125,4.431 -1.784,7.591c-0.659,3.16 -1.133,6.089 -1.192,6.276c-0.089,0.283 -0.962,0.235 -3.621,0.353c-1.758,0.078 -4.198,0.202 -5.422,0.276c-1.426,0.086 -2.225,0.058 -2.225,-0.078l0,0Z"
                className={getRegionStyle("rear_sides")}
                id="path127"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M263.154,162.211c0.275,-3.094 3.2,-21.42 3.46,-21.68c0.268,-0.268 19.649,0.923 19.954,1.227c0.037,0.038 -0.395,0.387 -0.96,0.776c-1.237,0.852 -2.908,1.81 -4.258,1.81l-0.991,-0l-2.469,2.329l-1.914,2.43l-1.757,6.852l-1.769,7.238l-2.766,0.124c-2.44,0.11 -5.132,0.554 -6.381,0.934c-0.344,0.104 -0.275,-0.618 -0.149,-2.04Z"
                className={getRegionStyle("rear_sides")}
                id="path128"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M317.401,155.142c-0.546,-0.694 -6.794,-12.991 -6.794,-13.366c-0,-0.166 4.658,-0.127 10.911,0.091c3.103,0.108 6.665,0.218 6.685,0.241c0.02,0.022 -0.096,1.894 -0.259,4.16l-0.295,4.119l-1.448,2.495l-1.435,2.251l-3.206,-0c-2.337,-0 -3.272,0.147 -3.409,-0.027l-0.75,0.036Z"
                className={getRegionStyle("rear_sides")}
                id="path129"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* Back View Dark Windows (Tinted) */}
              <motion.path
                d="M232.867,163.419c-1.614,-2.296 -1.874,-2.58 -2.372,-2.586c-0.308,-0.004 -0.696,-0.13 -0.862,-0.279c-0.235,-0.211 -2.677,-0.405 -10.936,-0.867c-5.848,-0.327 -11.078,-0.658 -11.622,-0.734l-0.989,-0.139l0.653,-2.151c0.359,-1.183 1.24,-3.812 1.959,-5.843l1.305,-3.693l4.683,-3.396l4.842,-3.675l11.735,-0.005c9.262,-0.004 13.297,-0.068 13.297,0.121c-0,0.132 0.092,1.361 0.205,2.73l0.045,2.77l-2.303,9.841c-1.267,5.413 -2.256,10.207 -2.29,10.241c-0.069,0.069 -4.709,0.428 -5.174,0.428c-0.168,0 -1.163,-1.321 -2.176,-2.763l-0,0Z"
                className={getRegionStyle("rear_sides")}
                id="path1261"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M187.035,169.048c0,-0.318 1.057,-1.688 3.623,-4.696c3.788,-4.441 11.53,-12.853 11.701,-12.686c0.037,0.037 -0.786,1.915 -1.08,2.964c-0.294,1.048 -1.125,4.431 -1.784,7.591c-0.659,3.16 -1.133,6.089 -1.192,6.276c-0.089,0.283 -0.962,0.235 -3.621,0.353c-1.758,0.078 -4.198,0.202 -5.422,0.276c-1.426,0.086 -2.225,0.058 -2.225,-0.078l0,0Z"
                className={getRegionStyle("rear_sides")}
                id="path1271"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M263.154,162.211c0.275,-3.094 3.2,-21.42 3.46,-21.68c0.268,-0.268 19.649,0.923 19.954,1.227c0.037,0.038 -0.395,0.387 -0.96,0.776c-1.237,0.852 -2.908,1.81 -4.258,1.81l-0.991,-0l-2.469,2.329l-1.914,2.43l-1.757,6.852l-1.769,7.238l-2.766,0.124c-2.44,0.11 -5.132,0.554 -6.381,0.934c-0.344,0.104 -0.275,-0.618 -0.149,-2.04Z"
                className={getRegionStyle("rear_sides")}
                id="path1281"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M317.401,155.142c-0.546,-0.694 -6.794,-12.991 -6.794,-13.366c-0,-0.166 4.658,-0.127 10.911,0.091c3.103,0.108 6.665,0.218 6.685,0.241c0.02,0.022 -0.096,1.894 -0.259,4.16l-0.295,4.119l-1.448,2.495l-1.435,2.251l-3.206,-0c-2.337,-0 -3.272,0.147 -3.409,-0.027l-0.75,0.036Z"
                className={getRegionStyle("rear_sides")}
                id="path1291"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* Additional Rear Windows */}
              <motion.path
                d="M403.693,155.776c-1.541,-0.335 -2.774,-0.668 -7.855,-2.514l-2.65,-0.906l-6.549,-0.181c-6.011,-0.005 -6.573,0.187 -7.939,-0.309c-0.797,-0.29 -1.701,-0.824 -1.701,-0.986c-0,-0.163 -0.486,-1.095 -0.939,-1.603c-1.276,-1.432 -1.09,-1.777 0.344,-4.664l1.332,-2.416l4.588,-3.107c2.408,-1.709 4.651,-3.162 4.984,-3.229c0.334,-0.068 2.275,-0.344 4.315,-0.615l3.798,-0.529l1.788,1.899c3.745,3.98 9.267,13.423 10.262,17.641c0.152,0.646 0.332,1.36 0.398,1.586c0.105,0.357 -0.041,0.409 -1.111,0.392c-0.678,-0.011 -2.181,-0.267 -3.065,-0.459l-0,-0Z"
                className={getRegionStyle("rear_sides")}
                id="path135"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M441.233,155.675c-4.462,-0.234 -8.687,-0.458 -9.389,-0.497l-1.275,-0.072l-1.573,-3.054c-4.408,-8.557 -8.552,-16.834 -8.469,-16.917c0.051,-0.052 3.739,0.377 8.197,0.954c6.512,0.841 8.287,1.146 9.032,1.552c4.876,2.657 13.761,14.101 13.788,17.759c0.007,0.911 1.178,0.879 -10.311,0.275l0,0Z"
                className={getRegionStyle("rear_sides")}
                id="path136"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* Rear Glass/Background Areas */}
              <motion.path
                d="M277.104,185.3c-30.08,-1.282 -135.457,-7.02 -136.948,-7.457c-0.46,-0.135 19.686,-16.376 28.973,-23.357c6.077,-4.569 15.147,-10.939 25.107,-17.635l7.281,-4.894l50.781,1.665c56.324,1.846 69.693,2.383 79.013,3.171c6.148,0.52 9.713,1.421 9.713,2.454c-0,0.277 -1.356,2.523 -3.014,4.991c-1.657,2.468 -6.722,10.561 -11.256,17.984c-9.543,15.628 -13.287,21.027 -15.552,22.427c-1.524,0.942 -2.492,0.996 -16.077,0.902c-7.95,-0.055 -16.06,-0.168 -18.021,-0.251Z"
                className={getRegionStyle("rear_glass")}
                id="BG"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M369.366,186.243c-0.941,-0.941 -3.036,-4.478 -4.655,-7.859l-2.945,-6.148l0.768,-4.427c1.33,-7.662 5.78,-19.093 7.669,-19.697c0.701,-0.224 9.534,20.253 14.405,33.394l1.166,3.146l-1.224,0.788c-1.806,1.163 -7.562,2.513 -10.717,2.513c-2.356,0 -3.006,-0.249 -4.467,-1.71Z"
                className={getRegionStyle("rear_glass")}
                id="RQ"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M382.113,168.137c-3.385,-8.703 -6.334,-16.719 -6.554,-17.814c-0.22,-1.094 -0.9,-2.521 -1.511,-3.172c-1.471,-1.566 -1.402,-3.143 0.287,-6.48c1.278,-2.526 1.985,-3.138 8.239,-7.134c7.309,-4.67 9.975,-5.648 17.324,-6.355l3.681,-0.354l3.989,5.942c9.531,14.196 20.297,36.505 20.297,42.057c-0,0.709 -0.383,1.329 -0.916,1.485c-1.574,0.461 -37.293,7.65 -38.006,7.65c-0.402,-0 -3.167,-6.405 -6.83,-15.825Z"
                className={getRegionStyle("rear_glass")}
                id="RR"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* FRONT WINDOWS - Light Glass */}
              <motion.path
                d="M530.555,417.756c0,-0.716 0.686,-1.532 3.664,-4.361c10.907,-10.363 38.437,-32.401 52.514,-41.909l3.59,-2.536l3.731,0.002c3.021,0.002 4.597,0.465 5.263,0.909l0.822,0.547l-2.472,4.54c-1.269,2.103 -4.303,7.686 -6.741,12.406c-6.032,11.675 -8.077,15.259 -9.556,16.743c-1.161,1.166 -1.579,1.342 -5.496,2.33c-7.901,1.991 -16.46,4.437 -24.498,7.001c-11.086,3.536 -15.895,4.93 -17.824,5.164c-1.645,0.201 -2.997,0.043 -2.997,-0.836l0,0Z"
                className={getRegionStyle("front_sides")}
                id="path130"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M609.761,394.585c1.592,-4.356 8.385,-22.455 8.461,-22.569c0.094,-0.141 27.059,2.393 28.753,2.694l1.256,0.223l-1.74,0.552c-2.501,0.794 -8.056,2.221 -14.71,3.174c-5.792,0.83 -5.814,0.836 -6.969,1.954c-1.288,1.247 -3.222,5.354 -5.773,12.261l-1.537,4.161l-4.781,-0.016l-3.85,-0l0.89,-2.434Z"
                className={getRegionStyle("front_sides")}
                id="path131"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M743.54,380.696c-0.806,-0.136 -2.259,-0.478 -3.228,-0.76l-1.761,-0.512l1.657,-2.39c0.912,-1.315 2.677,-3.479 3.923,-4.809l2.264,-2.419l1.359,0.206c1.807,0.275 1.986,0.411 3.389,2.582c1.253,1.938 2.335,4.79 2.69,7.088l0.205,1.335l-4.515,-0.037c-2.484,-0.02 -5.176,-0.148 -5.983,-0.284l0,-0Z"
                className={getRegionStyle("front_sides")}
                id="path132"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M789.606,381.917c-4.664,-0.148 -9.801,-0.447 -11.415,-0.664l-2.935,-0.393l-2.674,-6.517c-1.47,-3.584 -2.597,-6.715 -2.504,-6.957c0.12,-0.312 1.053,-0.507 3.203,-0.668c4.306,-0.323 20.898,-0.034 21.628,0.376c0.325,0.183 2.002,3.284 3.726,6.892c2.945,6.163 3.108,6.608 2.696,7.345c-0.535,0.959 -0.337,0.949 -11.725,0.586Z"
                className={getRegionStyle("front_sides")}
                id="path133"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* FRONT WINDOWS - Dark Glass (Tinted) */}
              <motion.path
                d="M530.555,417.756c0,-0.716 0.686,-1.532 3.664,-4.361c10.907,-10.363 38.437,-32.401 52.514,-41.909l3.59,-2.536l3.731,0.002c3.021,0.002 4.597,0.465 5.263,0.909l0.822,0.547l-2.472,4.54c-1.269,2.103 -4.303,7.686 -6.741,12.406c-6.032,11.675 -8.077,15.259 -9.556,16.743c-1.161,1.166 -1.579,1.342 -5.496,2.33c-7.901,1.991 -16.46,4.437 -24.498,7.001c-11.086,3.536 -15.895,4.93 -17.824,5.164c-1.645,0.201 -2.997,0.043 -2.997,-0.836l0,0Z"
                className={getRegionStyle("front_sides")}
                id="path1301"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M609.761,394.585c1.592,-4.356 8.385,-22.455 8.461,-22.569c0.094,-0.141 27.059,2.393 28.753,2.694l1.256,0.223l-1.74,0.552c-2.501,0.794 -8.056,2.221 -14.71,3.174c-5.792,0.83 -5.814,0.836 -6.969,1.954c-1.288,1.247 -3.222,5.354 -5.773,12.261l-1.537,4.161l-4.781,-0.016l-3.85,-0l0.89,-2.434Z"
                className={getRegionStyle("front_sides")}
                id="path1311"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M743.54,380.696c-0.806,-0.136 -2.259,-0.478 -3.228,-0.76l-1.761,-0.512l1.657,-2.39c0.912,-1.315 2.677,-3.479 3.923,-4.809l2.264,-2.419l1.359,0.206c1.807,0.275 1.986,0.411 3.389,2.582c1.253,1.938 2.335,4.79 2.69,7.088l0.205,1.335l-4.515,-0.037c-2.484,-0.02 -5.176,-0.148 -5.983,-0.284l0,-0Z"
                className={getRegionStyle("front_sides")}
                id="path1321"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M789.606,381.917c-4.664,-0.148 -9.801,-0.447 -11.415,-0.664l-2.935,-0.393l-2.674,-6.517c-1.47,-3.584 -2.597,-6.715 -2.504,-6.957c0.12,-0.312 1.053,-0.507 3.203,-0.668c4.306,-0.323 20.898,-0.034 21.628,0.376c0.325,0.183 2.002,3.284 3.726,6.892c2.945,6.163 3.108,6.608 2.696,7.345c-0.535,0.959 -0.337,0.949 -11.725,0.586Z"
                className={getRegionStyle("front_sides")}
                id="path1331"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* FRONT GLASS AREAS */}
              <motion.path
                d="M714.728,431.432c-0.021,-1.414 8.682,-27.895 13.333,-39.555c4.102,-10.282 11.199,-21.226 15.687,-24.189c3.718,-2.455 11.458,-5.831 12.48,-5.439c1.754,0.674 10.553,22.786 16.446,40.632c2.061,6.242 3.149,11.763 3.149,12.18c-0,1.135 -4.059,4.126 -5.599,4.126c-0.74,-0 -4.883,-1.198 -9.206,-2.662c-10.723,-3.63 -19.571,-4.918 -27.055,-3.939c-4.914,0.643 -5.605,1.328 -9.836,4.519c-2.726,2.056 -3.582,3.236 -5.049,7.077c-1.535,4.021 -4.335,8.234 -4.35,7.25Z"
                className={getRegionStyle("windshield_full")}
                id="FL"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M783.49,412.079c-0.147,-0.534 -0.431,-1.938 -0.632,-3.121c-0.827,-4.871 -9.876,-31.087 -14.563,-42.187c-1.37,-3.245 -2.491,-5.992 -2.491,-6.104c0,-0.525 3.404,-1.39 7.928,-2.016c4.109,-0.569 5.991,-0.558 10.839,0.06l5.866,0.748l3.523,2.759c2.241,2.189 3.533,4.455 5.848,9.404c5.104,10.913 10.931,27.095 10.931,30.038c0,1.247 -0.39,1.593 -2.842,2.517c-25.375,9.567 -24.065,9.143 -24.407,7.902l0,-0Z"
                className={getRegionStyle("windshield_full")}
                id="RL"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <motion.path
                d="M813.533,399.908c-0.627,-1.205 -8.723,-25.736 -9.264,-28.097l-0.378,-1.652l2.234,1.769c5.138,4.069 14.022,14.189 16.587,19.211c1.859,3.639 2.33,4.431 -1.872,6.602c-4.119,2.128 -6.55,3.62 -7.307,2.167Z"
                className={getRegionStyle("windshield_full")}
                id="RQ1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </svg>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Select coverage options to see highlighted areas</p>
      </div>
    </div>
  );

  const getVehicleTitle = () => {
    if (vehicleClass === "CAR" && vehicleSubtype === "sedan") {
      return "Your Sedan";
    }
    return `Your ${vehicleClass.toLowerCase()}`;
  };

  return (
    <div className="bg-gradient-to-b from-neutral-700/20 to-neutral-800/20 rounded-lg p-6 border border-white/20">
      <div className="space-y-4">
        <h3 className="font-medium text-center text-white">
          {getVehicleTitle()}
        </h3>

        <p className="text-center text-yellow-400 font-bold text-lg">
          🚗 TEST: Car image should appear below this text 🚗
        </p>

        {/* Show car image for all vehicle types */}
        {renderCarSedan()}

        {currentStage === "coverage" && (
          <div className="text-sm space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#f5c542]/60 border border-[#f5c542] rounded-sm"></div>
              <span className="text-xs text-gray-400">
                Selected for tinting
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#f5c542]/40 border border-[#f5c542] rounded-sm"></div>
              <span className="text-xs text-gray-400">
                Highlighted
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// Fixed Summary Card Component (never animates)
const SummaryCard: React.FC<{
  vehicleClass: string;
  vehicleSubtype: string | undefined;
  coverageSelections: CoverageOption[];
  filmTier: FilmTier | null;
  tintLevel: string | null;
  prevTintRemoval: boolean;
  currentStage: Stage;
  hasFactoryTint?: boolean;
  onClearAll: () => void;
}> = ({
  vehicleClass,
  vehicleSubtype,
  coverageSelections,
  filmTier,
  tintLevel,
  prevTintRemoval,
  currentStage,
  hasFactoryTint,
  onClearAll,
}) => {
  // Calculate price range for coverage stage
  const calculatePriceRange = () => {
    let rangeMin = 0;
    let rangeMax = 0;

    coverageSelections.forEach((selection) => {
      const pricing = getPricing(vehicleClass, vehicleSubtype, selection);
      if (pricing && typeof pricing === 'object') {
        rangeMin += pricing.CS;
        rangeMax += pricing.XR_PLUS;
      } else if (typeof pricing === 'number') {
        rangeMin += pricing;
        rangeMax += pricing;
      }
    });

    return { rangeMin, rangeMax };
  };

  // Calculate total for film stage
  const calculateTotal = () => {
    if (!filmTier) return 0;

    let total = 0;
    coverageSelections.forEach((selection) => {
      const pricing = getPricing(vehicleClass, vehicleSubtype, selection);
      if (pricing && typeof pricing === 'object') {
        total += pricing[filmTier];
      } else if (typeof pricing === 'number') {
        total += pricing;
      }
    });

    return total;
  };

  const getCoverageDisplayNames = (): string[] => {
    const getDisplayName = (selection: CoverageOption): string => {
      const option = COVERAGE_OPTIONS.find(opt => opt.id === selection);
      if (option && typeof option.title === 'function') {
        return option.title(hasFactoryTint);
      }

      const displayNames: { [key in CoverageOption]: string } = {
        SIDES_REAR: hasFactoryTint ? "Factory Enhance" : "Sides & Rear",
        FACTORY_MATCH_FRONT_DOORS: "Factory Match",
        SIDE_WINDOWS: "Side Windows",
        REAR_GLASS: "Rear Glass",
        WINDSHIELD: "Windshield",
        SUN_STRIP: "Sun Strip (Brow)",
        SINGLE_SUNROOF: "Single Panel Sunroof",
        DUAL_SUNROOF: "Dual Panel Sunroof",
      };


      return displayNames[selection];
    };

    return coverageSelections.map(getDisplayName);
  };

  const getCoverageDescriptions = (): { name: string; description: string }[] => {
    const getDescriptionData = (selection: CoverageOption): { name: string; description: string } => {
      const option = COVERAGE_OPTIONS.find(opt => opt.id === selection);

      let name: string;
      let description: string;

      if (option) {
        name = typeof option.title === 'function' ? option.title(hasFactoryTint) : option.title;
        description = typeof option.helper === 'function' ? option.helper(hasFactoryTint) : option.helper;

      } else {
        // Fallback for non-SIDES_REAR options
        const fallbackDescriptions: { [key in CoverageOption]: string } = {
          SIDES_REAR: "Side Windows and Rear Glass. Take your factory tint darker and reduce heat",
          FACTORY_MATCH_FRONT_DOORS: "Includes Front Door Windows",
          SIDE_WINDOWS: "Side windows coverage",
          REAR_GLASS: "Rear glass coverage",
          WINDSHIELD: "Full windshield tint for heat & glare reduction",
          SUN_STRIP: "6-8 inch strip at top of windshield to reduce glare",
          SINGLE_SUNROOF: "Professional tint for your standard sunroof panel",
          DUAL_SUNROOF: "Professional tint for your panoramic sunroof panels",
        };

        const fallbackDisplayNames: { [key in CoverageOption]: string } = {
          SIDES_REAR: hasFactoryTint ? "Factory Enhance" : "Sides & Rear",
          FACTORY_MATCH_FRONT_DOORS: "Factory Match",
          SIDE_WINDOWS: "Side Windows",
          REAR_GLASS: "Rear Glass",
          WINDSHIELD: "Windshield",
          SUN_STRIP: "Sun Strip (Brow)",
          SINGLE_SUNROOF: "Single Panel Sunroof",
          DUAL_SUNROOF: "Dual Panel Sunroof"
        };

        name = fallbackDisplayNames[selection];
        description = fallbackDescriptions[selection];
      }

      return { name, description };
    };

    return coverageSelections.map(getDescriptionData);
  };

  const { rangeMin, rangeMax } = calculatePriceRange();
  const total = calculateTotal();

  return (
    <Card className="p-4 border-2 border-[#f5c542]/30">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Your Project</h3>
          <p className="text-center text-yellow-400 font-bold text-lg">
            🚗 TEST: Car image should appear below this text 🚗
          </p>
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

        {/* Coverage Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Coverage</h4>
          <div className="space-y-2">
            {coverageSelections.length > 0 ? (
              getCoverageDescriptions().map((coverage) => (
                <div key={coverage.name} className="text-sm">
                  <div className="font-medium">{coverage.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{coverage.description}</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400">
                Select coverage options below to build your package
              </div>
            )}
          </div>
        </div>

        {/* Film Technology Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Film Technology</h4>
          <div className="text-sm">
            {filmTier ? (
              <div>
                <div className="font-medium">{FILM_TIERS.find(tier => tier.id === filmTier)?.title}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {FILM_TIERS.find(tier => tier.id === filmTier)?.description}
                </div>
              </div>
            ) : (
              <div className="text-gray-400">
                {currentStage === "coverage" ? "Select coverage first" : "Select film grade above"}
              </div>
            )}
          </div>
        </div>

        {/* Price Display */}
        <div className="pt-2 border-t border-white/20">
          {currentStage === "coverage" ? (
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium text-white">
                  Estimated Range
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-white">
                  {coverageSelections.length > 0 ? "Based on selections" : "$0"}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-white">
                Total Price
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-white">
                  ${total || 0}
                </div>
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
  hasFactoryTint?: boolean;
  vehicleSubtype?: string;
  vehicleClass?: string;
}> = ({
  coverageSelections,
  onToggleCoverage,
  onHoverCoverage,
  hasFactoryTint,
  vehicleSubtype,
  vehicleClass,
}) => {
  // Filter coverage options based on factory tint response and vehicle type
  const availableOptions = COVERAGE_OPTIONS.filter((option) => {
    // Only show Factory Match - Front Doors when user has factory tint AND not a standard cab truck
    // Standard cab trucks don't have rear doors/windows with factory tint to match
    if (option.id === "FACTORY_MATCH_FRONT_DOORS") {
      return hasFactoryTint === true && vehicleSubtype !== 'standard cab';
    }
    // Don't show sunroof options for convertibles or standard/extended cab trucks
    if ((option.id === "SINGLE_SUNROOF" || option.id === "DUAL_SUNROOF") &&
        (vehicleSubtype === 'convertible' || vehicleSubtype === 'standard cab' || vehicleSubtype === 'extended cab')) {
      return false;
    }
    // For standard cab trucks: show SIDE_WINDOWS and REAR_GLASS instead of SIDES_REAR
    if (vehicleSubtype === 'standard cab') {
      if (option.id === "SIDES_REAR") {
        return false; // Hide combined option
      }
      if (option.id === "SIDE_WINDOWS" || option.id === "REAR_GLASS") {
        return true; // Show separate options
      }
    } else {
      // For all other vehicles: hide SIDE_WINDOWS and REAR_GLASS
      if (option.id === "SIDE_WINDOWS" || option.id === "REAR_GLASS") {
        return false;
      }
    }
    return true; // Show all other options
  });

  // Note: Removed isOptionDisabled and getDisabledReason functions
  // Both factory options now remain clickable with radio-button behavior

  // Separate main options from secondary options
  const mainOptions = availableOptions.filter(option =>
    !['SUN_STRIP', 'SINGLE_SUNROOF', 'DUAL_SUNROOF'].includes(option.id)
  );
  const secondaryOptions = availableOptions.filter(option =>
    ['SUN_STRIP', 'SINGLE_SUNROOF', 'DUAL_SUNROOF'].includes(option.id)
  );


  return (
    <div className="space-y-3 lg:space-y-4">
      {/* Main Coverage Options */}
      <div className="space-y-2 lg:space-y-3">
        {mainOptions.map((option) => {
          const isSelected = coverageSelections.includes(option.id);

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
              <div className="relative">
                <Card
                  className={`p-3 lg:p-4 transition-all duration-150 ${
                    isSelected
                      ? "ring-2 ring-[#f5c542] bg-[#f5c542]/5 border border-[#f5c542] cursor-pointer hover:shadow-md"
                      : "cursor-pointer hover:shadow-lg"
                  }`}
                  onClick={() => onToggleCoverage(option.id)}
                >
                  <div className="flex items-start gap-2 lg:gap-3">
                    <div className="mt-0.5 lg:mt-1">
                      <Checkbox
                        checked={isSelected}
                        className="pointer-events-none scale-90 lg:scale-100"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 lg:gap-2">
                        <h4 className="font-medium text-sm lg:text-base truncate">
                          {typeof option.title === 'function' ? option.title(hasFactoryTint) : option.title}
                        </h4>
                        <Tooltip>
                          <TooltipTrigger onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                            <Info className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-gray-400 flex-shrink-0" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{option.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <p className="text-xs lg:text-sm mt-0.5 lg:mt-1 line-clamp-2 text-gray-400">
                        {typeof option.helper === 'function' ? option.helper(hasFactoryTint) : option.helper}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Secondary Options - Radio Button Style */}
      {secondaryOptions.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-gray-300 px-1">Add-Ons</h5>
          <div className="space-y-1">
            {secondaryOptions.map((option) => {
              const isSelected = coverageSelections.includes(option.id);
              return (
                <motion.div
                  key={option.id}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => onHoverCoverage(option.regions)}
                  onHoverEnd={() => onHoverCoverage([])}
                  className="flex items-center gap-2 cursor-pointer py-1 px-1 rounded hover:bg-white/5 transition-colors"
                  onClick={() => onToggleCoverage(option.id)}
                >
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-[#f5c542] bg-[#f5c542]'
                        : 'border-gray-500'
                    }`}>
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-white font-medium truncate">
                        {typeof option.title === 'function' ? option.title(hasFactoryTint) : option.title}
                      </span>
                      <Tooltip>
                        <TooltipTrigger onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                          <Info className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-xs">{option.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Film View Component (4B)
const FilmView: React.FC<{
  coverageSelections: CoverageOption[];
  filmTier: FilmTier | null;
  tintLevel: string | null;
  prevTintRemoval: boolean;
  vehicleClass: string;
  vehicleSubtype: string | undefined;
  onSelectFilmTier: (tier: FilmTier) => void;
  onSelectTintLevel: (level: string) => void;
  onToggleRemoval: (checked: boolean) => void;
  onBack: () => void;
}> = ({
  coverageSelections,
  filmTier,
  tintLevel,
  prevTintRemoval,
  vehicleClass,
  vehicleSubtype,
  onSelectFilmTier,
  onSelectTintLevel,
  onToggleRemoval,
  onBack,
}) => {
  const calculateTierTotal = (tier: FilmTier): number => {
    let total = 0;
    coverageSelections.forEach((selection) => {
      const pricing = getPricing(vehicleClass, vehicleSubtype, selection);
      if (pricing && typeof pricing === 'object') {
        total += pricing[tier];
      } else if (typeof pricing === 'number') {
        total += pricing;
      }
    });
    return total;
  };

  return (
    <div className="space-y-3 lg:space-y-6">


      {/* Film Grade Cards */}
      <div className="space-y-2 lg:space-y-4">
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
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isSelected
                    ? "ring-2 ring-[#f5c542] shadow-md bg-[#f5c542]/5 border border-[#f5c542]"
                    : "hover:shadow-sm"
                } ${isSelected ? "p-3 lg:p-6" : "p-3 lg:p-4"} relative overflow-hidden`}
                onClick={() => onSelectFilmTier(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute top-2 right-2 z-10">
                    <div className="bg-gradient-to-r from-[#f5c542] to-[#c41e3a] text-black text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="whitespace-nowrap">Most Popular</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 lg:gap-2 mb-1 lg:mb-2">
                      <h4 className="font-medium flex items-center gap-1 text-sm lg:text-base">
                        <span className="truncate">{tier.title}</span>
                        {tier.id === "CS" && (
                          <span className="text-white italic text-xs lg:text-sm">Classic</span>
                        )}
                        {tier.id === "XR" && (
                          <span className="text-[#f5c542] font-bold italic text-xs lg:text-sm">Ceramic</span>
                        )}
                        {tier.id === "XR_PLUS" && (
                          <span className="bg-gradient-to-r from-[#f5c542] to-[#c41e3a] bg-clip-text text-transparent font-bold italic text-xs lg:text-sm">Multi-Layer Ceramic</span>
                        )}
                      </h4>
                      <Popover>
                        <PopoverTrigger asChild>
                          <motion.button
                            className="p-1 text-gray-400 hover:text-[#f5c542] transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          >
                            <Info className="h-4 w-4" />
                          </motion.button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-4 bg-neutral-800/95 border-[#f5c542]/20 backdrop-blur-sm z-50">
                          <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-white">
                              Why choose {tier.title}{tier.id === "CS" ? " Classic" : tier.id === "XR" ? " Ceramic" : " Multi-Layer Ceramic"} for your vehicle tint?
                            </h3>
                            <div className="space-y-2">
                              {getWhyChooseContent(tier.id).map((point, index) => (
                                <div key={index} className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-[#f5c542] rounded-full mt-1.5 flex-shrink-0" />
                                  <p className="text-xs text-gray-300 leading-relaxed">{point}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <p className="text-xs lg:text-sm text-gray-400 mb-2 lg:mb-3 line-clamp-2">
                      {tier.description}
                    </p>

                    {/* Heat Rejection Bar for CS */}
                    {tier.id === "CS" && (
                      <div className="mb-2 lg:mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">IR Heat Rejection</span>
                          <span className="text-xs font-bold text-[#f5c542]">22%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1 lg:h-1.5">
                          <div
                            className="bg-gradient-to-r from-[#f5c542] to-[#c41e3a] h-1 lg:h-1.5 rounded-full"
                            style={{ width: "22%" }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Heat Rejection Bar for XR */}
                    {tier.id === "XR" && (
                      <div className="mb-2 lg:mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">IR Heat Rejection</span>
                          <span className="text-xs font-bold text-[#f5c542]">85%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1 lg:h-1.5">
                          <div
                            className="bg-gradient-to-r from-[#f5c542] to-[#c41e3a] h-1 lg:h-1.5 rounded-full"
                            style={{ width: "85%" }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Heat Rejection Bar for XR_PLUS */}
                    {tier.id === "XR_PLUS" && (
                      <div className="mb-2 lg:mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">IR Heat Rejection</span>
                          <span className="text-xs font-bold text-[#f5c542]">96%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1 lg:h-1.5">
                          <div
                            className="bg-gradient-to-r from-[#f5c542] to-[#c41e3a] h-1 lg:h-1.5 rounded-full"
                            style={{ width: "96%" }}
                          />
                        </div>
                      </div>
                    )}


                  </div>

                  <div className="flex items-center gap-2 lg:gap-3">


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





    </div>
  );
};

export const BuildPackageStep: React.FC<
  BuildPackageStepProps
> = ({ bookingData, updateBookingData, onNext, onPrev, stage = "coverage" }) => {
  const [currentStage, setCurrentStage] =
    useState<Stage>(stage);
  const [showFactoryTintPopup, setShowFactoryTintPopup] = useState(false);

  // Update currentStage when stage prop changes
  React.useEffect(() => {
    setCurrentStage(stage);
  }, [stage]);

  // Define variables first
  const responses: Partial<BookingData["responses"]> = bookingData.responses || {};
  const vehicleClass = responses["vehicle-class"] || "CAR";
  const vehicleSubtype = responses["vehicle-subtype"];
  const coverageSelections = (responses[
    "coverage-selections"
  ] || []) as CoverageOption[];

  // Show factory tint popup when reaching coverage stage for trucks/SUVs (not vans - they always have factory tint)
  React.useEffect(() => {
    if (stage === 'coverage') {
      // Standard cab trucks don't have rear windows with factory tint, so skip the question
      if (vehicleClass === 'TRUCK' && vehicleSubtype === 'standard cab' && responses['has-factory-tint'] === undefined) {
        updateBookingData({
          responses: {
            ...responses,
            'has-factory-tint': false,
          },
        });
      } else if (['TRUCK', 'SUV'].includes(vehicleClass) && responses['has-factory-tint'] === undefined) {
        setShowFactoryTintPopup(true);
      } else if (vehicleClass === 'VAN' && responses['has-factory-tint'] === undefined) {
        // Vans always have factory tint - set it automatically
        updateBookingData({
          responses: {
            ...responses,
            'has-factory-tint': true,
          },
        });
      }
    }
  }, [stage, vehicleClass, vehicleSubtype, responses['has-factory-tint']]);

  // Clear coverage selections when entering coverage stage to ensure clean slate
  React.useEffect(() => {
    if (stage === 'coverage' && coverageSelections.length > 0) {
      updateBookingData({
        responses: {
          ...responses,
          'coverage-selections': [],
        },
      });
    }
  }, [stage]);

  // Auto-select removed - user must manually select coverage options

  // Simplified v1.0 - removed hover functionality
  const filmTier = responses["film-tier"] as FilmTier | null;
  const tintLevel = responses["tint-level"] || null;
  const previousTintRemoval =
    responses["previous-tint-removal"] || false;

  // Handle factory tint response
  const handleFactoryTintResponse = (hasFactoryTint: boolean) => {
    setShowFactoryTintPopup(false);

    // Auto-select coverage after factory tint response
    // If user already has selections, check for mutual exclusivity conflicts
    let newCoverageSelections = [...coverageSelections];

    if (hasFactoryTint && coverageSelections.length === 0) {
      // Auto-select SIDES_REAR (Factory Enhance) for users with factory tint
      newCoverageSelections = ['SIDES_REAR'];
    } else if (!hasFactoryTint && coverageSelections.includes('FACTORY_MATCH_FRONT_DOORS')) {
      // If user doesn't have factory tint but somehow has FACTORY_MATCH_FRONT_DOORS selected,
      // remove it and default to SIDES_REAR
      newCoverageSelections = coverageSelections.filter(item => item !== 'FACTORY_MATCH_FRONT_DOORS');
      if (newCoverageSelections.length === 0) {
        newCoverageSelections = ['SIDES_REAR'];
      }
    } else if (coverageSelections.length === 0) {
      // Default auto-selection for users without factory tint
      newCoverageSelections = ['SIDES_REAR'];
    }

    updateBookingData({
      responses: {
        ...responses,
        'has-factory-tint': hasFactoryTint,
        'coverage-selections': newCoverageSelections,
      },
    });
  };

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

  // Simplified v1.0 - complex sedan visualization removed

  // Stage transition handlers (removed - now handled by separate steps)
  const handleFilmToCoverage = () => {
    setCurrentStage("coverage");
  };



  // Coverage selection handlers
  const handleToggleCoverage = (option: CoverageOption) => {
    const hasFactoryTint = responses['has-factory-tint'];
    let newSelections: CoverageOption[] = [...coverageSelections];

    if (coverageSelections.includes(option)) {
      // If option is already selected, remove it
      newSelections = coverageSelections.filter((item) => item !== option);
    } else {
      // If selecting a new option, handle mutual exclusivity
      if (hasFactoryTint && (option === "SIDES_REAR" || option === "FACTORY_MATCH_FRONT_DOORS")) {
        // When hasFactoryTint=true, SIDES_REAR and FACTORY_MATCH_FRONT_DOORS are mutually exclusive
        if (option === "SIDES_REAR") {
          // Remove FACTORY_MATCH_FRONT_DOORS if it exists, then add SIDES_REAR
          newSelections = coverageSelections.filter(item => item !== "FACTORY_MATCH_FRONT_DOORS");
          newSelections.push(option);
        } else if (option === "FACTORY_MATCH_FRONT_DOORS") {
          // Remove SIDES_REAR if it exists, then add FACTORY_MATCH_FRONT_DOORS
          newSelections = coverageSelections.filter(item => item !== "SIDES_REAR");
          newSelections.push(option);
        }
      } else if (option === "SINGLE_SUNROOF" || option === "DUAL_SUNROOF") {
        // SINGLE_SUNROOF and DUAL_SUNROOF are mutually exclusive
        if (option === "SINGLE_SUNROOF") {
          // Remove DUAL_SUNROOF if it exists, then add SINGLE_SUNROOF
          newSelections = coverageSelections.filter(item => item !== "DUAL_SUNROOF");
          newSelections.push(option);
        } else if (option === "DUAL_SUNROOF") {
          // Remove SINGLE_SUNROOF if it exists, then add DUAL_SUNROOF
          newSelections = coverageSelections.filter(item => item !== "SINGLE_SUNROOF");
          newSelections.push(option);
        }
      } else {
        // For all other options, simply add to existing selections
        newSelections = [...coverageSelections, option];
      }
    }

    updateBookingData({
      responses: {
        ...responses,
        "coverage-selections": newSelections,
        "estimated-price": calculateEstimatedPrice(
          newSelections,
          filmTier
        ),
      },
    });
  };


  const handleHoverCoverage = (regions: string[]) => {
    // Simplified v1.0 - hover functionality removed
  };

  const highlightedRegions = React.useMemo<HighlightRegion[]>(() => {
    const regions = new Set<HighlightRegion>();
    const hasFactoryTint = responses['has-factory-tint'] === true;

    coverageSelections.forEach(selection => {
      switch (selection) {
        case 'SIDES_REAR':
          regions.add('SIDES');
          regions.add('SIDES-NO-STROKE');
          regions.add('REAR');
          // Only add FACTORY-MATCH layers when vehicle has factory tint
          if (hasFactoryTint) {
            regions.add('FACTORY-MATCH');
            regions.add('FACTORY-MATCH-NO-STROKE');
          }
          break;
        case 'SIDE_WINDOWS':
          regions.add('SIDES');
          break;
        case 'REAR_GLASS':
          regions.add('REAR');
          break;
        case 'FACTORY_MATCH_FRONT_DOORS':
          regions.add('FACTORY-MATCH');
          regions.add('FACTORY-MATCH-NO-STROKE');
          break;
        case 'WINDSHIELD':
          regions.add('WINDSHIELD');
          regions.add('WINDSHIELD-NO-STROKE');
          break;
        case 'SUN_STRIP':
          regions.add('BROW');
          break;
        case 'SINGLE_SUNROOF':
          regions.add('SUNROOF1');
          break;
        case 'DUAL_SUNROOF':
          regions.add('SUNROOF1');
          regions.add('SUNROOF2');
          break;
        default:
          break;
      }
    });

    return Array.from(regions);
  }, [coverageSelections, responses['has-factory-tint']]);

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
  const calculateEstimatedPrice = (
    selections: CoverageOption[],
    tier: FilmTier | null
  ): number => {
    if (!tier) return 0;
    let total = 0;

    selections.forEach(selection => {
      const pricing = getPricing(vehicleClass, vehicleSubtype, selection);
      if (pricing && typeof pricing === 'object') {
        total += pricing[tier];
      } else if (typeof pricing === 'number') {
        total += pricing;
      }
    });

    return total;
  };

  return (
    <TooltipProvider>

      {/* Two-Column Layout */}
      <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-6">
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
                  hasFactoryTint={responses['has-factory-tint']}
                  vehicleSubtype={vehicleSubtype}
                  vehicleClass={vehicleClass}
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
                  vehicleClass={vehicleClass}
                  vehicleSubtype={vehicleSubtype}
                  onSelectFilmTier={handleSelectFilmTier}
                  onSelectTintLevel={handleSelectTintLevel}
                  onToggleRemoval={handleToggleRemoval}
                  onBack={handleFilmToCoverage}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column - Visual / Enhancements */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:items-end">
          {currentStage === "coverage" && (
            <Card className="w-full lg:max-w-lg xl:max-w-xl bg-neutral-800/40 border border-white/20 backdrop-blur-sm p-3 lg:p-4">
              <div className="flex flex-col gap-3">
                <div className="text-center hidden lg:block">
                  <h3 className="text-base font-semibold text-white mb-1">Coverage Preview</h3>
                  <p className="text-xs text-gray-400">
                    Highlighted zones update as you build your package
                  </p>
                </div>
                <VehicleCoverageIllustration
                  vehicleType={
                    (bookingData.responses?.['vehicle-class'] === 'SUV' ? 'SUV' :
                     bookingData.responses?.['vehicle-class'] === 'VAN' ? 'VAN' :
                     bookingData.responses?.['vehicle-subtype'] === 'convertible' ? 'CONVERTIBLE' :
                     bookingData.responses?.['vehicle-subtype'] === 'coupe' ? 'COUPE' :
                     bookingData.responses?.['vehicle-subtype'] === 'crew cab' ? 'CREW_CAB_TRUCK' :
                     bookingData.responses?.['vehicle-subtype'] === 'standard cab' ? 'STANDARD_CAB_TRUCK' :
                     bookingData.responses?.['vehicle-subtype'] === 'extended cab' ? 'EXTENDED_CAB_TRUCK' :
                     'SEDAN') as VehicleType
                  }
                  highlightedRegions={highlightedRegions}
                  hasFactoryTint={responses['has-factory-tint'] === true}
                  className="drop-shadow-xl"
                />
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Factory Tint Popup */}
      <AnimatePresence>
        {showFactoryTintPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-neutral-800/95 backdrop-blur-md rounded-2xl border border-[#f5c542]/20 p-6 lg:p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto bg-[#f5c542]/10 rounded-full flex items-center justify-center border border-[#f5c542]/30">
                  <svg className="w-8 h-8 text-[#f5c542]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl lg:text-2xl font-semibold text-white">
                    Factory Tinted Glass
                  </h3>
                  <p className="text-center text-yellow-400 font-bold text-lg">
                    🚗 TEST: Car image should appear below this text 🚗
                  </p>
                  <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                    Does your {vehicleClass?.toLowerCase()} have factory tinted glass in the rear windows?
                  </p>
                  <p className="text-xs text-gray-500">
                    This helps us determine the best coverage options for your vehicle
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    className="bg-[#f5c542] hover:bg-[#f5c542]/90 text-black font-semibold h-10 px-6 text-sm transition-all duration-200"
                    onClick={() => handleFactoryTintResponse(true)}
                  >
                    Yes, it has factory tint
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 text-[#374151] hover:bg-gray-700/50 hover:border-gray-500 h-10 px-6 text-sm transition-all duration-200"
                    onClick={() => handleFactoryTintResponse(false)}
                  >
                    No factory tint
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TooltipProvider>
  );
};
