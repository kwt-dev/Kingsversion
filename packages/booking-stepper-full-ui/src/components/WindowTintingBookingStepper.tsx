import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Phone, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Card } from './ui/card';
import { VehicleSelectionStep } from './booking-steps/VehicleSelectionStep';
import { BuildPackageStep } from './booking-steps/BuildPackageStep';
import { DetailsStep } from './booking-steps/DetailsStep';
import { AppointmentStep } from './booking-steps/AppointmentStep';
import { ReviewConfirmStep } from './booking-steps/ReviewConfirmStep';
import { SuccessStep } from './booking-steps/SuccessStep';

export interface BookingData {
  // Core Cal.com fields
  eventTypeId: number;
  start: string;
  attendee: {
    name: string;
    firstName?: string;
    lastName?: string;
    email: string;
    timeZone: string;
    language: string;
  };
  responses: {
    // Vehicle
    'vehicle-year': number;
    'vehicle-make': string;
    'vehicle-model': string;
    'vehicle-color': string;
    'vehicle-class': 'CAR' | 'SUV' | 'TRUCK' | 'VAN';
    'vehicle-subtype'?: string;
    
    // Service
    'service-category': 'TINT';
    'coverage-selections': Array<'SIDES_REAR' | 'WINDSHIELD' | 'SUN_STRIP' | 'FACTORY_MATCH_FRONT_DOORS'>;
    'service-subtype': string; // Computed from coverage-selections

    // Tint specifics
    'film-tier': string;
    'tint-level'?: string;
    'previous-tint-removal'?: boolean;
    'has-factory-tint'?: boolean;

    // Add-ons (computed from coverage-selections)
    'addon-sun-strip'?: boolean;
    'addon-windshield'?: boolean;
    'windshield-tier'?: string;

    // Contact
    'customer-phone': string;
    'preferred-contact': 'SMS' | 'PHONE' | 'EMAIL';

    // Additional
    'referral-source'?: string;
    'marketing-opt-in'?: boolean;
    'additional-notes'?: string;

    // Computed
    'variant-code': string;
    'estimated-price': number;
  };
}


const STEPS = [
  { id: 'vehicle', title: 'Vehicle', description: 'Select your vehicle type' },
  { id: 'coverage', title: 'Coverage', description: 'Choose your coverage options' },
  { id: 'film', title: 'Film Grade', description: 'Select your film type' },
  { id: 'appointment', title: 'Availability', description: 'Choose date and time' },
  { id: 'details', title: 'Your Details', description: 'Contact and vehicle information' },
  { id: 'review', title: 'Review & Confirm', description: 'Confirm your booking' },
  { id: 'success', title: 'Booking Confirmed', description: 'Your appointment is confirmed' },
];

export const WindowTintingBookingStepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({
    eventTypeId: 6,
    attendee: {
      name: '',
      email: '',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: 'en',
    },
    responses: {
      'service-category': 'TINT',
      'vehicle-year': new Date().getFullYear(),
      'vehicle-make': '',
      'vehicle-model': '',
      'vehicle-color': '',
      'vehicle-class': undefined,
      'coverage-selections': [],
      'service-subtype': '',
      'film-tier': '',
      'customer-phone': '',
      'preferred-contact': 'SMS',
      'variant-code': '',
      'estimated-price': 0,
    },
  });

  const visibleSteps = STEPS;
  const currentStepData = visibleSteps[currentStep];
  const progress = ((currentStep + 1) / visibleSteps.length) * 100;

  // Center the active step when currentStep changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      centerActiveStep();
    }, 100); // Small delay to ensure DOM is updated

    return () => clearTimeout(timeout);
  }, [currentStep]);

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData(prev => {
      const updatedAttendee = {
        ...prev.attendee,
        ...updates.attendee,
      };

      // Compose name from firstName and lastName if they exist
      if (updatedAttendee.firstName || updatedAttendee.lastName) {
        updatedAttendee.name = `${updatedAttendee.firstName || ''} ${updatedAttendee.lastName || ''}`.trim();
      }

      const updated = {
        ...prev,
        ...updates,
        responses: {
          ...prev.responses,
          ...updates.responses,
        },
        attendee: updatedAttendee,
      };
      
      // Recompute variant code and price when relevant fields change
      if (updates.responses) {
        const responses = updated.responses!;
        
        // Compute service-subtype from coverage-selections
        const coverageSelections = responses['coverage-selections'] || [];
        let serviceSubtype = '';
        
        const hasFrontCoverage =
          coverageSelections.includes('FACTORY_MATCH_FRONT_DOORS');

        if (hasFrontCoverage && coverageSelections.includes('SIDES_REAR')) {
          serviceSubtype = 'FULL_TINT';
        } else if (coverageSelections.length === 1 && coverageSelections[0] === 'WINDSHIELD') {
          serviceSubtype = 'WINDSHIELD_ONLY';
        } else if (coverageSelections.length > 0) {
          serviceSubtype = 'PARTIAL_TINT';
        }
        
        responses['service-subtype'] = serviceSubtype;
        
        // Compute add-on booleans
        responses['addon-sun-strip'] = coverageSelections.includes('SUN_STRIP');
        responses['addon-windshield'] = coverageSelections.includes('WINDSHIELD');
        
        if (serviceSubtype && responses['vehicle-class'] && responses['film-tier']) {
          responses['variant-code'] = `${serviceSubtype}__${responses['vehicle-class']}__${responses['film-tier']}`;
          responses['estimated-price'] = calculateEstimatedPrice(responses);
        }
      }
      
      return updated;
    });
  };

  const calculateStartingPrice = (responses: any): string => {
    const coverageSelections = responses?.['coverage-selections'] || [];
    const vehicleClass = responses?.['vehicle-class'] || 'CAR';

    if (coverageSelections.length === 0) return '';

    let minTotal = 0;

    coverageSelections.forEach((selection: string) => {
      switch (selection) {
        case 'FACTORY_MATCH_FRONT_DOORS':
          const frontPrices = Object.values(getBasePriceRange('FACTORY_MATCH_FRONT_DOORS', vehicleClass));
          minTotal += Math.min(...frontPrices);
          break;
        case 'SIDES_REAR':
          const sidesPrices = Object.values(getBasePriceRange('SIDES_REAR', vehicleClass));
          minTotal += Math.min(...sidesPrices);
          break;
        case 'WINDSHIELD':
          const windshieldPrices = Object.values(getBasePriceRange('WINDSHIELD', vehicleClass));
          minTotal += Math.min(...windshieldPrices);
          break;
        case 'SUN_STRIP':
          minTotal += 49;
          break;
      }
    });

    return `$${minTotal}`;
  };

  const getBasePriceRange = (coverage: string, vehicleClass: string, vehicleSubtype?: string): Record<string, number> => {
    // Build key for lookup: try specific subtype first, then fall back to general class
    const specificKey = vehicleSubtype ? `${vehicleClass}_${vehicleSubtype}` : vehicleClass;

    const pricing: Record<string, Record<string, Record<string, number>>> = {
      // SIDES_REAR pricing by vehicle type/subtype
      'SIDES_REAR': {
        'CAR': { 'CS': 299, 'XR': 399, 'XR_PLUS': 599 }, // Sedan/Coupe
        'CAR_convertible': { 'CS': 299, 'XR': 399, 'XR_PLUS': 499 }, // Convertible
        'SUV': { 'CS': 399, 'XR': 499, 'XR_PLUS': 699 },
        'TRUCK_standard cab': { 'CS': 249, 'XR': 349, 'XR_PLUS': 549 },
        'TRUCK_extended cab': { 'CS': 299, 'XR': 399, 'XR_PLUS': 599 },
        'TRUCK_crew cab': { 'CS': 299, 'XR': 399, 'XR_PLUS': 599 },
        'VAN': { 'CS': 449, 'XR': 549, 'XR_PLUS': 749 },
      },
      // FACTORY_MATCH_FRONT_DOORS pricing
      'FACTORY_MATCH_FRONT_DOORS': {
        'SUV': { 'CS': 149, 'XR': 199, 'XR_PLUS': 299 },
        'TRUCK_extended cab': { 'CS': 149, 'XR': 199, 'XR_PLUS': 299 },
        'TRUCK_crew cab': { 'CS': 149, 'XR': 199, 'XR_PLUS': 299 },
        'VAN': { 'CS': 149, 'XR': 199, 'XR_PLUS': 299 },
      },
      // WINDSHIELD pricing (same for all)
      'WINDSHIELD': {
        'CAR': { 'CS': 199, 'XR': 299, 'XR_PLUS': 349 },
        'SUV': { 'CS': 199, 'XR': 299, 'XR_PLUS': 349 },
        'TRUCK': { 'CS': 199, 'XR': 299, 'XR_PLUS': 349 },
        'VAN': { 'CS': 199, 'XR': 299, 'XR_PLUS': 349 },
      },
      // SUN_STRIP pricing (same for all)
      'SUN_STRIP': {
        'CAR': { 'CS': 75, 'XR': 99, 'XR_PLUS': 149 },
        'SUV': { 'CS': 75, 'XR': 99, 'XR_PLUS': 149 },
        'TRUCK': { 'CS': 75, 'XR': 99, 'XR_PLUS': 149 },
        'VAN': { 'CS': 75, 'XR': 99, 'XR_PLUS': 149 },
      },
    };

    // Try specific key first (e.g., 'TRUCK_crew cab'), then fall back to general class
    return pricing[coverage]?.[specificKey] || pricing[coverage]?.[vehicleClass] || {};
  };

  const calculateEstimatedPrice = (responses: any): number => {
    const coverageSelections = responses['coverage-selections'] || [];
    const vehicleClass = responses['vehicle-class'] || 'CAR';
    const vehicleSubtype = responses['vehicle-subtype'];
    const filmTier = responses['film-tier'] || 'CS';

    let total = 0;

    // Calculate base coverage prices
    coverageSelections.forEach((selection: string) => {
      switch (selection) {
        case 'FACTORY_MATCH_FRONT_DOORS':
          total += getBasePrice('FACTORY_MATCH_FRONT_DOORS', vehicleClass, vehicleSubtype, filmTier);
          break;
        case 'SIDES_REAR':
          total += getBasePrice('SIDES_REAR', vehicleClass, vehicleSubtype, filmTier);
          break;
        case 'WINDSHIELD':
          const windshieldTier = responses['windshield-tier'] || filmTier;
          total += getBasePrice('WINDSHIELD', vehicleClass, vehicleSubtype, windshieldTier);
          break;
        case 'SUN_STRIP':
          total += getBasePrice('SUN_STRIP', vehicleClass, vehicleSubtype, filmTier);
          break;
        case 'SINGLE_SUNROOF':
          total += getBaseSunroofPrice(vehicleClass, filmTier, 'single');
          break;
        case 'DUAL_SUNROOF':
          total += getBaseSunroofPrice(vehicleClass, filmTier, 'dual');
          break;
      }
    });

    return total;
  };

  const getBasePrice = (coverage: string, vehicleClass: string, vehicleSubtype: string | undefined, filmTier: string): number => {
    const specificKey = vehicleSubtype ? `${vehicleClass}_${vehicleSubtype}` : vehicleClass;

    const pricing: Record<string, Record<string, Record<string, number>>> = {
      'SIDES_REAR': {
        'CAR': { 'CS': 299, 'XR': 399, 'XR_PLUS': 599 },
        'CAR_convertible': { 'CS': 299, 'XR': 399, 'XR_PLUS': 499 },
        'SUV': { 'CS': 399, 'XR': 499, 'XR_PLUS': 699 },
        'TRUCK_standard cab': { 'CS': 249, 'XR': 349, 'XR_PLUS': 549 },
        'TRUCK_extended cab': { 'CS': 299, 'XR': 399, 'XR_PLUS': 599 },
        'TRUCK_crew cab': { 'CS': 299, 'XR': 399, 'XR_PLUS': 599 },
        'VAN': { 'CS': 449, 'XR': 549, 'XR_PLUS': 749 },
      },
      'FACTORY_MATCH_FRONT_DOORS': {
        'SUV': { 'CS': 149, 'XR': 199, 'XR_PLUS': 299 },
        'TRUCK_extended cab': { 'CS': 149, 'XR': 199, 'XR_PLUS': 299 },
        'TRUCK_crew cab': { 'CS': 149, 'XR': 199, 'XR_PLUS': 299 },
        'VAN': { 'CS': 149, 'XR': 199, 'XR_PLUS': 299 },
      },
      'WINDSHIELD': {
        'CAR': { 'CS': 199, 'XR': 299, 'XR_PLUS': 349 },
        'SUV': { 'CS': 199, 'XR': 299, 'XR_PLUS': 349 },
        'TRUCK': { 'CS': 199, 'XR': 299, 'XR_PLUS': 349 },
        'VAN': { 'CS': 199, 'XR': 299, 'XR_PLUS': 349 },
      },
      'SUN_STRIP': {
        'CAR': { 'CS': 75, 'XR': 99, 'XR_PLUS': 149 },
        'SUV': { 'CS': 75, 'XR': 99, 'XR_PLUS': 149 },
        'TRUCK': { 'CS': 75, 'XR': 99, 'XR_PLUS': 149 },
        'VAN': { 'CS': 75, 'XR': 99, 'XR_PLUS': 149 },
      },
    };

    // Try specific key first, then fall back to general class
    return pricing[coverage]?.[specificKey]?.[filmTier] || pricing[coverage]?.[vehicleClass]?.[filmTier] || 0;
  };

  const getBaseSunroofPrice = (vehicleClass: string, filmTier: string, type: 'single' | 'dual'): number => {
    const pricing = {
      'single': { 'CS': 89, 'XR': 119, 'XR_PLUS': 149 },
      'dual': { 'CS': 149, 'XR': 199, 'XR_PLUS': 249 },
    };
    return pricing[type]?.[filmTier as 'CS' | 'XR' | 'XR_PLUS'] || 0;
  };

  const canProceed = (): boolean => {
    const responses = bookingData.responses;
    if (!responses) return false;
    
    switch (currentStepData?.id) {
      case 'vehicle':
        const vehicleClass = responses['vehicle-class'];
        if (!vehicleClass) return false;

        // Require subtype selection for TRUCK and SUV
        const requiresSubtype = vehicleClass === 'TRUCK' || vehicleClass === 'SUV';
        return requiresSubtype ? !!responses['vehicle-subtype'] : true;
      case 'coverage':
        const hasSelections = responses['coverage-selections']?.length > 0;
        return hasSelections;
      case 'film':
        const hasFilmTier = !!responses['film-tier'];
        const onlySunStrip = responses['coverage-selections']?.length === 1 && responses['coverage-selections'][0] === 'SUN_STRIP';

        if (onlySunStrip) {
          return true; // No film tier needed for sun strip only
        }
        return hasFilmTier;
      case 'details':
        return !!(bookingData.attendee?.firstName && bookingData.attendee?.lastName && bookingData.attendee?.email && responses['customer-phone']);
      case 'appointment':
        return !!bookingData.start;
      case 'review':
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < visibleSteps.length - 1 && canProceed()) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const centerActiveStep = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const activeButton = container.querySelector(`[data-step="${currentStep}"]`) as HTMLElement;

    if (activeButton) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      // Calculate the scroll position to center the button
      const containerCenter = containerRect.width / 2;
      const buttonCenter = buttonRect.left - containerRect.left + buttonRect.width / 2;
      const scrollOffset = buttonCenter - containerCenter;

      container.scrollTo({
        left: container.scrollLeft + scrollOffset,
        behavior: 'smooth'
      });
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setDirection(-1);
      setCurrentStep(stepIndex);
    } else if (stepIndex > currentStep && canProceed()) {
      setDirection(1);
      setCurrentStep(stepIndex);
    }
  };

  const getContextualTitle = (): string => {
    const responses = bookingData.responses;

    switch (currentStepData?.id) {
      case 'vehicle':
        return "What are you driving?";
      case 'coverage':
        const vehicleType = responses?.['vehicle-class'] || 'Vehicle';
        return `Perfect! Let's configure your ${vehicleType.toLowerCase()}`;
      case 'film':
        return "Choose your film";
      case 'appointment':
        const filmTier = responses?.['film-tier'];
        return filmTier
          ? `Great choice! When works best for you?`
          : "When works best for you?";
      case 'details':
        return "Almost there! Just a few details";
      case 'review':
        return "Ready to book your appointment?";
      case 'success':
        return "You're all set!";
      default:
        return currentStepData?.title || '';
    }
  };

  const getContextualDescription = (): string => {
    const responses = bookingData.responses;

    switch (currentStepData?.id) {
      case 'vehicle':
        return "We'll customize everything based on your vehicle type";
      case 'coverage':
        return "Select which areas you'd like tinted for optimal results";
      case 'film':
        return "Each film grade offers different benefits and performance levels";
      case 'appointment':
        const estimatedPrice = responses?.['estimated-price'];
        return estimatedPrice > 0
          ? `Your service starts at $${estimatedPrice} - let's find the perfect time`
          : "Select a date and time that works with your schedule";
      case 'details':
        return "We'll need some information to complete your booking";
      case 'review':
        return "Review your selections and confirm your appointment";
      case 'success':
        return "Your appointment has been confirmed - we'll see you soon!";
      default:
        return currentStepData?.description || '';
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      bookingData,
      updateBookingData,
      onNext: nextStep,
      onPrev: prevStep,
    };

    switch (currentStepData?.id) {
      case 'vehicle':
        return <VehicleSelectionStep {...stepProps} />;
      case 'coverage':
        return <BuildPackageStep {...stepProps} stage="coverage" />;
      case 'film':
        return <BuildPackageStep {...stepProps} stage="film" />;
      case 'details':
        return <DetailsStep {...stepProps} />;
      case 'appointment':
        return <AppointmentStep {...stepProps} />;
      case 'review':
        return <ReviewConfirmStep {...stepProps} onConfirm={nextStep} />;
      case 'success':
        return <SuccessStep bookingData={bookingData} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20 p-8 relative overflow-hidden">
        {/* Header with Progress */}
        <div className="mb-4 lg:mb-8">
          <div className="text-center mb-3 lg:mb-6">
            {/* Hide title on mobile after vehicle selection is complete */}
            <h1 className="hidden lg:block text-xl lg:text-4xl font-bold text-white mb-1 lg:mb-2 tracking-tight">Your Window Tint Experience Starts Here</h1>
            {currentStepData?.id === 'vehicle' && (
              <h1 className="block lg:hidden text-xl font-bold text-white mb-1 tracking-tight">Your Window Tint Experience Starts Here</h1>
            )}
            {currentStepData?.id === 'vehicle' && (
              <>
                <p className="text-sm lg:text-base text-gray-400 mb-0.5 lg:mb-1">Explore options, pricing, and availability instantly, and book when you are ready.</p>
                <p className="text-sm lg:text-base text-gray-400">This is the <span className="italic text-[#f5c542]">King's Difference</span>.</p>
              </>
            )}
          </div>

          {(bookingData.responses?.['estimated-price'] > 0 || (bookingData.responses?.['coverage-selections']?.length > 0 && !bookingData.responses?.['film-tier'])) && (
            <div className="mb-2 lg:mb-4">
              <div className="text-center p-2 lg:p-3 bg-neutral-800/40 rounded-lg border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-400 font-medium text-xs lg:text-sm mb-1">Estimated Total:</div>
                    <div className="text-green-400 font-semibold text-sm lg:text-base">
                      {bookingData.responses?.['estimated-price'] > 0
                        ? `$${bookingData.responses['estimated-price']}`
                        : `Starts at ${calculateStartingPrice(bookingData.responses)}`
                      }
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 font-medium text-xs lg:text-sm mb-1">Estimated Duration:</div>
                    <div className="text-green-400 font-semibold text-sm lg:text-base">
                      {(() => {
                        const selections = bookingData.responses?.['coverage-selections'] || [];
                        let duration = 0;
                        if (selections.includes('SIDES_REAR')) duration += 90;
                        if (selections.includes('WINDSHIELD')) duration += 60;
                        if (selections.includes('SUN_STRIP')) duration += 15;
                        return duration > 0 ? `${Math.round(duration / 60 * 10) / 10}hr${duration >= 120 ? 's' : ''}` : '1-2hrs';
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Progress value={progress} className="h-2 mb-3 lg:mb-4" />

          {/* Breadcrumb */}
          <div
            ref={scrollContainerRef}
            className="flex items-center space-x-1 lg:space-x-2 overflow-x-auto pb-2 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {visibleSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <motion.button
                  data-step={index}
                  onClick={() => goToStep(index)}
                  className={`flex-shrink-0 px-2 lg:px-3 py-1 lg:py-1.5 rounded-full text-xs lg:text-sm transition-all ${
                    index === currentStep
                      ? 'bg-[#f5c542] text-black border border-[#f5c542]'
                      : index < currentStep
                      ? 'bg-neutral-700 text-gray-300 hover:bg-neutral-600 border border-white/20 hover:border-white/30'
                      : 'bg-neutral-800 text-gray-500 cursor-not-allowed border border-white/10'
                  }`}
                  disabled={index > currentStep}
                  whileTap={index <= currentStep ? { scale: 0.98 } : {}}
                >
                  {index === currentStep ? getContextualTitle() : step.title}
                </motion.button>
                {index < visibleSteps.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: 0.225
            }}
            className="mb-8"
          >
            {renderCurrentStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Footer */}
        {currentStepData?.id !== 'success' && (
          <motion.div
            className="flex items-center justify-between pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="p-3 bg-neutral-800 hover:bg-neutral-700 border border-white/20 hover:border-white/40 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
              whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </motion.button>

            {/* Contact Icons */}
            <div className="flex items-center gap-2">
              <motion.a
                href="tel:+1234567890"
                className="p-3 bg-neutral-800 hover:bg-neutral-700 border border-white/20 hover:border-[#f5c542]/40 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="h-4 w-4 text-[#f5c542]" />
              </motion.a>
              <motion.a
                href="sms:+1234567890"
                className="p-3 bg-neutral-800 hover:bg-neutral-700 border border-white/20 hover:border-[#f5c542]/40 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="h-4 w-4 text-[#f5c542]" />
              </motion.a>
            </div>

            {currentStepData?.id !== 'review' ? (
              <motion.div whileTap={{ scale: 1.02 }}>
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="gap-2 bg-[#f5c542] hover:bg-[#f5c542]/90 text-black border-[#f5c542]"
                >
                  Continue
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            ) : null}
          </motion.div>
        )}
      </div>
    </div>
  );
};
