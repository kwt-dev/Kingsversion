import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
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
    'vehicle-class': 'CAR' | 'SUV' | 'TRUCK';
    'vehicle-subtype'?: string;
    
    // Service
    'service-category': 'TINT';
    'coverage-selections': Array<'FRONTS' | 'SIDES_REAR' | 'WINDSHIELD' | 'SUN_STRIP'>;
    'service-subtype': string; // Computed from coverage-selections
    
    // Tint specifics
    'film-tier': string;
    'tint-level'?: string;
    'previous-tint-removal'?: boolean;
    
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

export type BookingDataUpdate = Omit<Partial<BookingData>, 'responses' | 'attendee'> & {
  responses?: Partial<BookingData['responses']>;
  attendee?: Partial<BookingData['attendee']>;
};

const STEPS = [
  { id: 'vehicle', title: 'Vehicle', description: 'Select your vehicle type' },
  { id: 'build-package', title: 'Build Your Package', description: 'Choose coverage and film grade' },
  { id: 'details', title: 'Your Details', description: 'Contact and vehicle information' },
  { id: 'appointment', title: 'Set Appointment', description: 'Choose date and time' },
  { id: 'review', title: 'Review & Confirm', description: 'Confirm your booking' },
  { id: 'success', title: 'Booking Confirmed', description: 'Your appointment is confirmed' },
];

export const WindowTintingBookingStepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
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
      'vehicle-class': 'CAR',
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

  const updateBookingData = (updates: BookingDataUpdate) => {
    setBookingData(prev => {
      const updatedAttendee: BookingData['attendee'] = {
        name: '',
        email: '',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: 'en',
        ...prev.attendee,
        ...updates.attendee,
      };

      const updatedResponses: BookingData['responses'] = {
        'service-category': 'TINT',
        'vehicle-year': new Date().getFullYear(),
        'vehicle-make': '',
        'vehicle-model': '',
        'vehicle-color': '',
        'vehicle-class': 'CAR',
        'coverage-selections': [],
        'service-subtype': '',
        'film-tier': '',
        'customer-phone': '',
        'preferred-contact': 'SMS',
        'variant-code': '',
        'estimated-price': 0,
        ...prev.responses,
        ...updates.responses,
      };

      const updated = {
        ...prev,
        ...updates,
        responses: updatedResponses,
        attendee: updatedAttendee,
      };
      
      // Recompute variant code and price when relevant fields change
      if (updates.responses) {
        const responses = updated.responses!;
        
        // Compute service-subtype from coverage-selections
        const coverageSelections = responses['coverage-selections'] || [];
        let serviceSubtype = '';
        
        if (coverageSelections.includes('FRONTS') && coverageSelections.includes('SIDES_REAR')) {
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

  const calculateEstimatedPrice = (responses: any): number => {
    const coverageSelections = responses['coverage-selections'] || [];
    const vehicleClass = responses['vehicle-class'] || 'CAR';
    const filmTier = responses['film-tier'] || 'CS';
    
    let total = 0;
    
    // Calculate base coverage prices
    coverageSelections.forEach((selection: string) => {
      switch (selection) {
        case 'FRONTS':
          total += getBasePrice('FRONTS', vehicleClass, filmTier);
          break;
        case 'SIDES_REAR':
          total += getBasePrice('SIDES_REAR', vehicleClass, filmTier);
          break;
        case 'WINDSHIELD':
          const windshieldTier = responses['windshield-tier'] || filmTier;
          total += getBasePrice('WINDSHIELD', vehicleClass, windshieldTier);
          break;
        case 'SUN_STRIP':
          total += 49;
          break;
      }
    });
    
    return total;
  };

  const getBasePrice = (coverage: string, vehicleClass: string, filmTier: string): number => {
    // Simplified pricing matrix - in real app this would be from API/config
    const pricing: Record<string, Record<string, Record<string, number>>> = {
      'FRONTS': {
        'CAR': { 'CS': 159, 'XR': 179, 'XR_PLUS': 199 },
        'SUV': { 'CS': 179, 'XR': 199, 'XR_PLUS': 219 },
        'TRUCK': { 'CS': 169, 'XR': 189, 'XR_PLUS': 209 },
      },
      'SIDES_REAR': {
        'CAR': { 'CS': 299, 'XR': 399, 'XR_PLUS': 499 },
        'SUV': { 'CS': 399, 'XR': 499, 'XR_PLUS': 549 },
        'TRUCK': { 'CS': 349, 'XR': 449, 'XR_PLUS': 519 },
      },
      'WINDSHIELD': {
        'CAR': { 'CS': 199, 'XR': 249, 'XR_PLUS': 349 },
        'SUV': { 'CS': 199, 'XR': 249, 'XR_PLUS': 349 },
        'TRUCK': { 'CS': 199, 'XR': 249, 'XR_PLUS': 349 },
      },
    };
    
    return pricing[coverage]?.[vehicleClass]?.[filmTier] || 0;
  };

  const canProceed = (): boolean => {
    const responses = bookingData.responses;
    if (!responses) return false;
    
    switch (currentStepData?.id) {
      case 'vehicle':
        return !!responses['vehicle-class'] && (responses['vehicle-class'] !== 'TRUCK' || !!responses['vehicle-subtype']);
      case 'build-package':
        const hasSelections = responses['coverage-selections']?.length > 0;
        const onlySunStrip = responses['coverage-selections']?.length === 1 && responses['coverage-selections'][0] === 'SUN_STRIP';
        const hasFilmTier = !!responses['film-tier'];
        const windshieldAddon = responses['addon-windshield'];
        const hasWindshieldTier = !windshieldAddon || !!responses['windshield-tier'];
        
        if (onlySunStrip) {
          return hasSelections; // No film tier needed for sun strip only
        }
        return hasSelections && hasFilmTier && hasWindshieldTier;
      case 'details':
        return !!(bookingData.attendee?.name && bookingData.attendee?.email && responses['customer-phone'] && responses['vehicle-make'] && responses['vehicle-model']);
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

  const goToStep = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setDirection(-1);
      setCurrentStep(stepIndex);
    } else if (stepIndex > currentStep && canProceed()) {
      setDirection(1);
      setCurrentStep(stepIndex);
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
      case 'build-package':
        return <BuildPackageStep {...stepProps} />;
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>


            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Step {currentStep + 1} of {visibleSteps.length}</p>
              <p className="text-lg font-medium">{currentStepData?.title}</p>
            </div>
          </div>
          
          <Progress value={progress} className="h-2 mb-4" />
          
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {visibleSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <motion.button
                  onClick={() => goToStep(index)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm transition-all ${
                    index === currentStep
                      ? 'bg-primary text-primary-foreground'
                      : index < currentStep
                      ? 'bg-muted text-muted-foreground hover:bg-accent'
                      : 'bg-muted/50 text-muted-foreground/50 cursor-not-allowed'
                  }`}
                  disabled={index > currentStep}
                  whileTap={index <= currentStep ? { scale: 0.98 } : {}}
                >
                  {step.title}
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
            className="flex items-center justify-between pt-6 border-t"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="flex items-center gap-4">
              {(() => {
                const estimatedPrice = bookingData.responses?.['estimated-price'] ?? 0;

                return estimatedPrice > 0 ? (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Estimated Total</p>
                  <p className="text-xl font-semibold text-green-400">
                    ${estimatedPrice.toFixed(2)}
                  </p>
                </div>
                ) : null;
              })()}
              
              {currentStepData?.id !== 'review' ? (
                <motion.div whileTap={{ scale: 1.02 }}>
                  <Button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="gap-2"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
