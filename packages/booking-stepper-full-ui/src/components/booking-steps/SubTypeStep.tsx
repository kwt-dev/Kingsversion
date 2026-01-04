import React from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { BookingData, BookingDataUpdate } from '../WindowTintingBookingStepper';

interface SubTypeStepProps {
  bookingData: Partial<BookingData>;
  updateBookingData: (updates: BookingDataUpdate) => void;
  onNext: () => void;
}

const TRUCK_OPTIONS = [
  {
    id: 'STD_EXT_CAB',
    vehicleClass: 'STD_TRUCK',
    title: 'Standard / Extended Cab',
    description: 'Single or extended cab truck',
  },
  {
    id: 'CREW_CAB',
    vehicleClass: 'CREW_TRUCK',
    title: 'Crew Cab',
    description: 'Full four-door crew cab truck',
  },
];

const CAR_OPTIONS = [
  {
    id: 'SEDAN',
    title: 'Sedan',
    description: 'Four-door sedan',
  },
  {
    id: 'COUPE',
    title: 'Coupe',
    description: 'Two-door coupe',
  },
  {
    id: 'CONVERTIBLE',
    title: 'Convertible',
    description: 'Convertible / soft-top',
  },
];

export const SubTypeStep: React.FC<SubTypeStepProps> = ({
  bookingData,
  updateBookingData,
}) => {
  const vehicleClass = bookingData.responses?.['vehicle-class'];
  const selectedSubtype = bookingData.responses?.['vehicle-subtype'];
  const isTruck = vehicleClass === 'TRUCK';
  const isCar = vehicleClass === 'CAR';

  const handleSubtypeSelect = (
    subtypeId: string,
    newVehicleClass?: BookingData['responses']['vehicle-class']
  ) => {
    updateBookingData({
      responses: {
        ...bookingData.responses,
        'vehicle-subtype': subtypeId,
        'vehicle-class': newVehicleClass || vehicleClass,
      },
    });
  };

  const options = isTruck ? TRUCK_OPTIONS : isCar ? CAR_OPTIONS : [];
  const title = isTruck 
    ? 'Select Your Truck Type'
    : isCar 
    ? 'What type of car?' 
    : 'Vehicle Details';
  
  const description = isTruck 
    ? 'Choose your truck cab configuration for accurate pricing'
    : isCar 
    ? 'This helps us provide more accurate pricing (optional)'
    : 'Please specify your vehicle type';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {options.map((option) => {
          const isSelected = selectedSubtype === option.id;

          return (
            <motion.div
              key={option.id}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isSelected
                    ? 'ring-2 ring-primary shadow-md bg-primary/5'
                    : 'hover:shadow-sm'
                }`}
                onClick={() => handleSubtypeSelect(option.id, (option as any).vehicleClass)}
              >
                <div className="text-center">
                  <h3 className="font-medium mb-1">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                  
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mt-3"
                    >
                      <div className="w-5 h-5 mx-auto bg-primary rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-primary-foreground"
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
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {isCar && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground">
            You can skip this step if you're not sure - we'll finalize details later.
          </p>
        </motion.div>
      )}
    </div>
  );
};
