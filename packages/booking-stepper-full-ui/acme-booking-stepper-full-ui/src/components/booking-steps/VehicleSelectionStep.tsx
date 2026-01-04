import React from 'react';
import { motion } from 'motion/react';
import { Car, Truck, CarIcon } from 'lucide-react';
import { Card } from '../ui/card';
import { BookingData } from '../WindowTintingBookingStepper';

interface VehicleSelectionStepProps {
  bookingData: Partial<BookingData>;
  updateBookingData: (updates: Partial<BookingData>) => void;
  onNext: () => void;
}

const VEHICLE_OPTIONS = [
  {
    id: 'CAR',
    title: 'Car',
    description: 'Sedan, Coupe, Convertible',
    icon: Car,
    className: 'text-blue-600',
    subtypes: [
      { id: 'sedan', label: 'Sedan' },
      { id: 'coupe', label: 'Coupe' },
      { id: 'convertible', label: 'Convertible' },
    ]
  },
  {
    id: 'SUV',
    title: 'SUV',
    description: "We'll confirm exact model next",
    icon: CarIcon,
    className: 'text-green-600',
    subtypes: []
  },
  {
    id: 'TRUCK',
    title: 'Truck',
    description: 'Pickup Truck',
    icon: Truck,
    className: 'text-orange-600',
    subtypes: [
      { id: 'std/ext cab', label: 'Std/Ext Cab' },
      { id: 'crew cab', label: 'Crew Cab' },
    ]
  },
];

export const VehicleSelectionStep: React.FC<VehicleSelectionStepProps> = ({
  bookingData,
  updateBookingData,
}) => {
  const selectedVehicle = bookingData.responses?.['vehicle-class'];
  const selectedSubtype = bookingData.responses?.['vehicle-subtype'];

  const handleVehicleSelect = (vehicleClass: string) => {
    updateBookingData({
      responses: {
        ...bookingData.responses,
        'vehicle-class': vehicleClass as 'CAR' | 'SUV' | 'TRUCK',
        // Reset subtype when vehicle changes
        'vehicle-subtype': undefined,
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

  const selectedOption = VEHICLE_OPTIONS.find(v => v.id === selectedVehicle);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl mb-2">Choose your vehicle</h2>
        <p className="text-muted-foreground">
          We'll tailor the options for the best fit.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {VEHICLE_OPTIONS.map((option) => {
          const isSelected = selectedVehicle === option.id;
          const Icon = option.icon;

          return (
            <motion.div
              key={option.id}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isSelected
                    ? 'ring-2 ring-primary shadow-lg bg-primary/5'
                    : 'hover:shadow-md'
                }`}
                onClick={() => handleVehicleSelect(option.id)}
              >
                <motion.div
                  className="text-center"
                  animate={isSelected ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`mx-auto mb-4 p-4 rounded-full bg-muted/50 w-fit ${option.className}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-medium mb-2">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                  
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mt-3"
                    >
                      <div className="w-6 h-6 mx-auto bg-primary rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-primary-foreground"
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
                  )}
                </motion.div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Inline Sub-type Selection */}
      {selectedOption && selectedOption.subtypes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-4">
            <h3 className="font-medium mb-1">Select {selectedOption.title} Type</h3>
            <p className="text-sm text-muted-foreground">
              Choose the specific type for accurate pricing
            </p>
          </div>
          
          <div className="flex justify-center gap-3">
            {selectedOption.subtypes.map((subtype) => {
              const isSelected = selectedSubtype === subtype.id;
              
              return (
                <motion.button
                  key={subtype.id}
                  onClick={() => handleSubtypeSelect(subtype.id)}
                  className={`px-6 py-3 rounded-full border transition-all ${
                    isSelected
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-muted-foreground bg-background'
                  }`}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {subtype.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {selectedVehicle && (!selectedOption?.subtypes.length || selectedSubtype) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-muted-foreground">
            Perfect! Let's build your tinting package.
          </p>
        </motion.div>
      )}
    </div>
  );
};