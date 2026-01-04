import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Truck, CarIcon, Bus, Check, X } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { BookingData, BookingDataUpdate } from '../WindowTintingBookingStepper';

interface VehicleSelectionStepProps {
  bookingData: Partial<BookingData>;
  updateBookingData: (updates: BookingDataUpdate) => void;
  onNext: () => void;
}

const VEHICLE_OPTIONS = [
  {
    id: 'CAR',
    title: 'Car',
    description: 'Sedan, Coupe, Convertible',
    icon: Car,
    className: 'text-gray-400',
    subtypes: [
      { id: 'sedan', label: 'Sedan' },
      { id: 'coupe', label: 'Coupe' },
      { id: 'convertible', label: 'Convertible' },
    ]
  },
  {
    id: 'SUV',
    title: 'SUV',
    description: 'All SUVs',
    icon: CarIcon,
    className: 'text-gray-400',
    subtypes: []
  },
  {
    id: 'TRUCK',
    title: 'Truck',
    description: 'Pickup Truck',
    icon: Truck,
    className: 'text-gray-400',
    subtypes: [
      { id: 'standard cab', label: 'Standard Cab' },
      { id: 'extended cab', label: 'Extended Cab' },
      { id: 'crew cab', label: 'Crew Cab' },
    ]
  },
  {
    id: 'VAN',
    title: 'Van',
    description: 'Commercial Van, Minivan',
    icon: Bus,
    className: 'text-gray-400',
    subtypes: [
      { id: 'cargo van', label: 'Cargo Van' },
      { id: 'minivan', label: 'Minivan' },
    ]
  },
];

const POPULAR_MAKES = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz',
  'Audi', 'Lexus', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Volkswagen', 'Jeep',
];

const COLORS = [
  'Black', 'White', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Brown', 'Gold',
  'Orange', 'Yellow', 'Purple', 'Other',
];

export const VehicleSelectionStep: React.FC<VehicleSelectionStepProps> = ({
  bookingData,
  updateBookingData,
}) => {
  const selectedVehicle = bookingData.responses?.['vehicle-class'];
  const selectedSubtype = bookingData.responses?.['vehicle-subtype'];
  const responses: Partial<BookingData['responses']> = bookingData.responses || {};

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const handleVehicleSelect = (vehicleClass: string) => {
    const selectedOption = VEHICLE_OPTIONS.find(v => v.id === vehicleClass);

    updateBookingData({
      responses: {
        ...bookingData.responses,
        'vehicle-class': vehicleClass as 'CAR' | 'SUV' | 'TRUCK' | 'VAN',
        // If no subtypes, set a default subtype value so the form shows immediately
        'vehicle-subtype': selectedOption?.subtypes.length === 0 ? 'suv' : undefined,
        // Reset vehicle details when vehicle changes
        'vehicle-year': undefined,
        'vehicle-make': undefined,
        'vehicle-model': undefined,
        'vehicle-color': undefined,
        'has-factory-tint': undefined,
      },
    });
  };

  const handleSubtypeSelect = (subtype: string) => {
    updateBookingData({
      responses: {
        ...bookingData.responses,
        'vehicle-subtype': subtype,
      },
    });
  };

  const handleVehicleDetailChange = (field: string, value: any) => {
    updateBookingData({
      responses: {
        ...responses,
        [field]: value,
      },
    });
  };

  const isVehicleInfoComplete = () => {
    return !!(responses['vehicle-year'] && responses['vehicle-make'] && responses['vehicle-model']);
  };



  const handleBackNavigation = () => {
    console.log('Back navigation clicked');
    console.log('selectedSubtype:', selectedSubtype);
    console.log('vehicle details:', {
      year: responses['vehicle-year'],
      make: responses['vehicle-make'],
      model: responses['vehicle-model'],
      color: responses['vehicle-color']
    });
    const hasVehicleDetails = !!(
      responses['vehicle-year'] ||
      responses['vehicle-make'] ||
      responses['vehicle-model'] ||
      responses['vehicle-color']
    );

    console.log('hasVehicleDetails:', hasVehicleDetails);

    if (selectedSubtype && hasVehicleDetails) {
      console.log('Going back from vehicle details to subtype selection');
      // Clear vehicle details, return to subtype selection
      updateBookingData({
        responses: {
          ...responses,
          'vehicle-subtype': undefined,
          'vehicle-year': undefined,
          'vehicle-make': undefined,
          'vehicle-model': undefined,
          'vehicle-color': undefined,
        }
      });
    } else if (selectedSubtype) {
      console.log('Going back from subtype selection, clearing subtype');
      // No details yet, simply go back to subtype list
      updateBookingData({
        responses: {
          ...responses,
          'vehicle-subtype': undefined,
        }
      });
    } else {
      console.log('Going back to vehicle type selection');
      // Already at subtype list, return to vehicle type selection
      handleVehicleSelect('');
    }
  };

  const selectedOption = VEHICLE_OPTIONS.find(v => v.id === selectedVehicle) || VEHICLE_OPTIONS[0];

  return (
    <div className="space-y-3 lg:space-y-6 flex flex-col">
      <div className="text-center">
        <h2 className="text-lg lg:text-xl font-medium mb-1 lg:mb-2 text-gray-200">What are you driving?</h2>
      </div>

      <div
        className="max-w-5xl mx-auto w-full relative min-h-[200px] lg:min-h-[400px] flex items-center justify-center"
      >
        {!selectedVehicle ? (
          // Initial state - show all cards in grid
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 items-stretch w-full max-w-sm sm:max-w-none mx-auto">
            {VEHICLE_OPTIONS.map((option) => {
              const Icon = option.icon;

              return (
                <motion.div
                  key={option.id}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Card
                    className="p-3 lg:p-8 cursor-pointer transition-all duration-200 hover:shadow-lg aspect-square flex flex-col justify-center hover:border-[#f5c542]/40 group"
                    onClick={() => handleVehicleSelect(option.id)}
                  >
                    <div className="text-center">
                      <div className={`mx-auto mb-2 lg:mb-6 p-2 lg:p-6 rounded-full border-2 w-fit transition-colors ${option.className} group-hover:text-[#f5c542]/70`} style={{borderColor: 'currentColor'}}>
                        <Icon className="h-6 w-6 lg:h-12 lg:w-12" />
                      </div>
                      <h3 className="font-medium mb-1 lg:mb-3 text-white text-xs lg:text-lg leading-tight">{option.title}</h3>
                      <p className="text-xs lg:text-sm text-gray-400 leading-tight hidden lg:block">{option.description}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          // Selected state - show single large card with flip
          <motion.div
            key={`selected-${selectedVehicle}`}
            initial={{ scale: 0.8, rotateY: 0 }}
            animate={{
              scale: 1,
              rotateY: 180
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              rotateY: { duration: 0.6, ease: "easeInOut", delay: 0.3 }
            }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
            className="w-full max-w-[500px] h-[350px] lg:h-[400px] relative z-50"
            onClick={(e) => e.stopPropagation()}
          >
              {/* Front of card */}
              <motion.div
                className="absolute inset-0 backface-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <Card className="p-4 lg:p-8 h-full flex flex-col justify-center shadow-lg bg-neutral-800/60 border-[#f5c542] relative">
                  <motion.button
                    onClick={() => handleVehicleSelect('')}
                    className="absolute top-3 left-3 lg:top-4 lg:left-4 text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>

                  <div className="text-center">
                    <div className="mx-auto mb-4 lg:mb-6 p-4 lg:p-6 rounded-full border-2 w-fit text-[#f5c542]" style={{borderColor: 'currentColor'}}>
                      <selectedOption.icon className="h-10 w-10 lg:h-16 lg:w-16" />
                    </div>
                    <h3 className="font-medium mb-2 lg:mb-3 text-white text-xl lg:text-2xl">{selectedOption.title}</h3>
                    <p className="text-sm lg:text-base text-gray-400">{selectedOption.description}</p>

                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mt-6"
                    >
                      <div className="w-8 h-8 mx-auto bg-[#f5c542] rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-black"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <motion.path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>

              {/* Back of card - always show (subtypes OR vehicle details) */}
              <motion.div
                className="absolute inset-0 backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)"
                }}
              >
                  <Card className="p-4 lg:p-8 h-full flex flex-col justify-center shadow-lg bg-neutral-800/60 border-[#f5c542] relative overflow-hidden">

                    <motion.button
                      onClick={handleBackNavigation}
                      className="absolute top-3 left-3 lg:top-4 lg:left-4 text-gray-400 hover:text-white transition-colors z-10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </motion.button>

                    <div className="text-center relative z-10">
                      {!selectedSubtype && (selectedOption?.subtypes.length ?? 0) > 0 ? (
                        // Show subtype selection
                        <>
                          <h3 className="font-medium mb-3 lg:mb-6 text-white text-lg lg:text-xl">Select {selectedOption?.title} Type</h3>
                          <p className="text-xs lg:text-sm text-gray-400 mb-4 lg:mb-6">
                            Choose the specific type for accurate pricing
                          </p>

                          <div className="space-y-2 lg:space-y-3">
                            {selectedOption?.subtypes.map((subtype) => (
                              <motion.button
                                key={subtype.id}
                                onClick={() => handleSubtypeSelect(subtype.id)}
                                className="w-full px-4 lg:px-6 py-3 lg:py-4 rounded-xl border transition-all text-sm lg:text-base border-white/20 hover:border-white/40 bg-neutral-800/90 text-gray-300 hover:border-[#f5c542]/40"
                                whileTap={{ scale: 0.98 }}
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: subtype.id === selectedOption.subtypes[0].id ? 0.1 : 0.2 }}
                              >
                                {subtype.label}
                              </motion.button>
                            ))}
                          </div>
                        </>
                      ) : (
                        // Show vehicle details form
                        <>
                          <h3 className="font-medium mb-3 lg:mb-4 text-white text-lg lg:text-xl">
                            {selectedOption?.title} Details
                          </h3>
                          <p className="text-xs lg:text-sm text-gray-400 mb-4">
                            {(selectedOption?.subtypes.length ?? 0) > 0 ? `${selectedSubtype} • ` : ''}Enter your vehicle information
                          </p>

                          <div className="space-y-3 max-w-md mx-auto">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor="vehicle-year" className="text-left block text-sm text-gray-300">Year</Label>
                                <Select
                                  value={responses['vehicle-year']?.toString() || ''}
                                  onValueChange={(value) => handleVehicleDetailChange('vehicle-year', parseInt(value))}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Year" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {years.map((year) => (
                                      <SelectItem key={year} value={year.toString()}>
                                        {year}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label htmlFor="vehicle-make" className="text-left block text-sm text-gray-300">Make</Label>
                                <Select
                                  value={responses['vehicle-make'] || ''}
                                  onValueChange={(value) => handleVehicleDetailChange('vehicle-make', value)}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Make" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {POPULAR_MAKES.map((make) => (
                                      <SelectItem key={make} value={make}>
                                        {make}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="vehicle-model" className="text-left block text-sm text-gray-300">Model</Label>
                              <Input
                                id="vehicle-model"
                                value={responses['vehicle-model'] || ''}
                                onChange={(e) => handleVehicleDetailChange('vehicle-model', e.target.value)}
                                placeholder="Enter vehicle model"
                                className="mt-1"
                              />
                            </div>

                            <div>
                              <Label htmlFor="vehicle-color" className="text-left block text-sm text-gray-300">Color</Label>
                              <Select
                                value={responses['vehicle-color'] || ''}
                                onValueChange={(value) => handleVehicleDetailChange('vehicle-color', value)}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select color" />
                                </SelectTrigger>
                                <SelectContent>
                                  {COLORS.map((color) => (
                                    <SelectItem key={color} value={color}>
                                      {color}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {isVehicleInfoComplete() && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="pt-4"
                              >
                                <div className="flex items-center justify-center gap-2 text-[#f5c542] text-sm">
                                  <Check className="h-4 w-4" />
                                  <span>Vehicle information complete</span>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </Card>
                </motion.div>

            </motion.div>
        )}
      </div>


    </div>
  );
};
