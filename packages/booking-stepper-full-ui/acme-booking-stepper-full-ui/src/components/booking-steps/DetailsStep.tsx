import React, { useState } from 'react';
  import { motion } from 'motion/react';
  import { Card } from '../ui/card';
  import { Input } from '../ui/input';
  import { Label } from '../ui/label';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
  import { Textarea } from '../ui/textarea';
  import { Checkbox } from '../ui/checkbox';
  import { BookingData } from '../WindowTintingBookingStepper';

  interface DetailsStepProps {
    bookingData: Partial<BookingData>;
    updateBookingData: (updates: Partial<BookingData>) => void;
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

  const POPULAR_MAKES = [
    'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz',
    'Audi', 'Lexus', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Volkswagen', 'Jeep',
  ];

  const COLORS = [
    'Black', 'White', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Brown', 'Gold',
    'Orange', 'Yellow', 'Purple', 'Other',
  ];

  export const DetailsStep: React.FC<DetailsStepProps> = ({
    bookingData,
    updateBookingData,
  }) => {
    const [phoneInput, setPhoneInput] = useState(bookingData.responses?.['customer-phone'] || '');

    const attendee = bookingData.attendee || {};
    const responses = bookingData.responses || {};

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

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl mb-2">Your Details</h2>
          <p className="text-muted-foreground">
            Please provide your contact information and vehicle details
          </p>
        </div>

        <div className="flex gap-5">
          {/* Left Side - Contact Information (50% width) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={attendee.name || ''}
                    onChange={(e) => handleInputChange('attendee.name', e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
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

                <div>
                  <Label>Preferred Contact Method *</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {CONTACT_PREFERENCES.map((pref) => (
                      <motion.button
                        key={pref.id}
                        onClick={() => handleInputChange('preferred-contact', pref.id)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          responses['preferred-contact'] === pref.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-medium text-sm">{pref.label}</div>
                        <div className="text-xs text-muted-foreground">{pref.description}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right Side - Vehicle & Additional Information (50% width) */}
          <div className="flex-1 space-y-5">
            {/* Vehicle Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Vehicle Information</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="year">Year *</Label>
                      <Select
                        value={responses['vehicle-year']?.toString() || ''}
                        onValueChange={(value) => handleInputChange('vehicle-year', parseInt(value))}
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
                      <Label htmlFor="make">Make *</Label>
                      <Select
                        value={responses['vehicle-make'] || ''}
                        onValueChange={(value) => handleInputChange('vehicle-make', value)}
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
                    <Label htmlFor="model">Model *</Label>
                    <Input
                      id="model"
                      value={responses['vehicle-model'] || ''}
                      onChange={(e) => handleInputChange('vehicle-model', e.target.value)}
                      placeholder="Enter vehicle model"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="color">Color *</Label>
                    <Select
                      value={responses['vehicle-color'] || ''}
                      onValueChange={(value) => handleInputChange('vehicle-color', value)}
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
                </div>
              </Card>
            </motion.div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Additional Information</h3>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="referral">How did you hear about us?</Label>
                    <Select
                      value={responses['referral-source'] || ''}
                      onValueChange={(value) => handleInputChange('referral-source', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        {REFERRAL_SOURCES.map((source) => (
                          <SelectItem key={source} value={source}>
                            {source.replace('_', ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={responses['additional-notes'] || ''}
                      onChange={(e) => handleInputChange('additional-notes', e.target.value)}
                      placeholder="Any special requests or additional information..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={responses['marketing-opt-in'] || false}
                      onCheckedChange={(checked) => handleInputChange('marketing-opt-in', checked)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="marketing"
                        className="text-sm font-normal leading-snug peer-disabled:cursor-not-allowed 
  peer-disabled:opacity-70"
                      >
                        I'd like to receive updates about promotions and services
                      </Label>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    );
  };