import React, { useState, useEffect } from 'react';
  import { motion } from 'motion/react';
  import { Card } from '../ui/card';
  import { Input } from '../ui/input';
  import { Label } from '../ui/label';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
  import { Button } from '../ui/button';
import { BookingData, BookingDataUpdate } from '../WindowTintingBookingStepper';

  interface DetailsStepProps {
  bookingData: Partial<BookingData>;
  updateBookingData: (updates: BookingDataUpdate) => void;
    onNext: () => void;
  }

  const CONTACT_PREFERENCES = [
    { id: 'SMS', label: 'Text Message', description: 'SMS notifications' },
    { id: 'PHONE', label: 'Phone Call', description: 'Voice calls' },
    { id: 'EMAIL', label: 'Email', description: 'Email updates' },
  ];

  const REFERRAL_SOURCES = [
    'GOOGLE',
    'FACEBOOK',
    'INSTAGRAM',
    'FRIEND_REFERRAL',
    'YELP',
    'RETURNING_CUSTOMER',
    'OTHER',
  ];


  export const DetailsStep: React.FC<DetailsStepProps> = ({
    bookingData,
    updateBookingData,
  }) => {
    const [phoneInput, setPhoneInput] = useState(bookingData.responses?.['customer-phone'] || '');

    const attendee: BookingData['attendee'] = {
      name: '',
      email: '',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: 'en',
      ...bookingData.attendee,
    };
    const responses: Partial<BookingData['responses']> = bookingData.responses || {};

    const formatPhone = (value: string): string => {
      const numbers = value.replace(/\D/g, '');
      if (numbers.length <= 3) return numbers;
      if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    };

    const handleInputChange = (field: string, value: any) => {
      if (field.startsWith('attendee.')) {
        const attendeeField = field.replace('attendee.', '');
        updateBookingData({
          attendee: {
            ...attendee,
            [attendeeField]: value,
          },
        });
      } else {
        updateBookingData({
          responses: {
            ...responses,
            [field]: value,
          },
        });
      }
    };

    const handlePhoneChange = (value: string) => {
      setPhoneInput(formatPhone(value));
      const numbers = value.replace(/\D/g, '');
      if (numbers.length === 10) {
        handleInputChange('customer-phone', `+1${numbers}`);
      }
    };


    return (
      <div className="space-y-4 lg:space-y-6">

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Left Side - Contact Information (50% width) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <Card className="p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-medium mb-3 lg:mb-4 text-white">Contact Information</h3>

              <div className="space-y-3 lg:space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={attendee.firstName || ''}
                      onChange={(e) => handleInputChange('attendee.firstName', e.target.value)}
                      placeholder="First name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={attendee.lastName || ''}
                      onChange={(e) => handleInputChange('attendee.lastName', e.target.value)}
                      placeholder="Last name"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={attendee.email || ''}
                    onChange={(e) => handleInputChange('attendee.email', e.target.value)}
                    placeholder="Enter your email"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={phoneInput}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="(555) 123-4567"
                    maxLength={14}
                    className="mt-1"
                  />
                </div>


              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    );
  };
