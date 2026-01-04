import React from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Calendar, Clock, Car, Shield, Phone, Mail, MessageSquare } from 'lucide-react';
import { BookingData, BookingDataUpdate } from '../WindowTintingBookingStepper';

interface ReviewConfirmStepProps {
  bookingData: Partial<BookingData>;
  updateBookingData: (updates: BookingDataUpdate) => void;
  onNext: () => void;
  onConfirm: () => void;
}

export const ReviewConfirmStep: React.FC<ReviewConfirmStepProps> = ({
  bookingData,
  onConfirm,
}) => {
  const attendee: BookingData['attendee'] = {
    name: '',
    email: '',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: 'en',
    ...bookingData.attendee,
  };
  const responses: Partial<BookingData['responses']> = bookingData.responses || {};

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getCoverageLabel = (serviceSubtype: string) => {
    const labels: Record<string, string> = {
      'PARTIAL_TINT': 'Partial Tint',
      'FULL_TINT': 'Full Vehicle Tint', 
      'WINDSHIELD_ONLY': 'Windshield Only',
    };
    return labels[serviceSubtype] || serviceSubtype;
  };

  const getCoverageDetails = (coverageSelections: string[]): string => {
    const labels: Record<string, string> = {
      'FRONTS': 'Factory Match (Fronts)',
      'SIDES_REAR': 'Sides & Rear',
      'WINDSHIELD': 'Windshield',
      'SUN_STRIP': 'Sun Strip (Brow)',
    };
    
    return coverageSelections.map(selection => labels[selection] || selection).join(', ');
  };

  const getFilmTierLabel = (tier: string) => {
    const labels: Record<string, string> = {
      'CS': 'CS (Ceramic Series)',
      'XR': 'XR (Xtreme)',
      'XR_PLUS': 'XR Plus (Premium)',
    };
    return labels[tier] || tier;
  };

  const getContactMethodIcon = (method: string) => {
    switch (method) {
      case 'SMS':
        return MessageSquare;
      case 'PHONE':
        return Phone;
      case 'EMAIL':
        return Mail;
      default:
        return Phone;
    }
  };

  const calculateLineItems = () => {
    const items: Array<{ name: string; price: number }> = [];
    const coverageSelections = responses['coverage-selections'] || [];
    const filmTier = responses['film-tier'] || '';
    const windshieldTier = responses['windshield-tier'] || filmTier;
    
    // Add each coverage selection as a separate line item
    coverageSelections.forEach((selection) => {
      switch (selection) {
        case 'FRONTS':
          items.push({
            name: `Factory Match (Fronts) - ${getFilmTierLabel(filmTier)}`,
            price: 179, // Placeholder - would come from actual pricing
          });
          break;
        case 'SIDES_REAR':
          items.push({
            name: `Sides & Rear - ${getFilmTierLabel(filmTier)}`,
            price: 449, // Placeholder
          });
          break;
        case 'WINDSHIELD':
          items.push({
            name: `Windshield - ${getFilmTierLabel(windshieldTier)}`,
            price: 249, // Placeholder
          });
          break;
        case 'SUN_STRIP':
          items.push({
            name: 'Sun Strip (Brow)',
            price: 49,
          });
          break;
      }
    });
    
    return items;
  };

  const lineItems = calculateLineItems();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl mb-2">Review & Confirm</h2>
        <p className="text-muted-foreground">
          Please review your booking details before confirming
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Service Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Vehicle Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Car className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Vehicle Information</h3>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Vehicle:</span>{' '}
                  {responses['vehicle-year']} {responses['vehicle-make']} {responses['vehicle-model']}
                </p>
                <p>
                  <span className="font-medium">Color:</span> {responses['vehicle-color']}
                </p>
                <p>
                  <span className="font-medium">Type:</span>{' '}
                  {responses['vehicle-class']?.replace('_', ' ').toLowerCase()}
                  {responses['vehicle-subtype'] && responses['vehicle-subtype'] !== 'NONE' && (
                    <span> ({responses['vehicle-subtype'].replace('_', ' ').toLowerCase()})</span>
                  )}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Service Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Service Details</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Coverage:</span>{' '}
                  {getCoverageDetails(responses['coverage-selections'] || [])}
                </div>
                <div>
                  <span className="font-medium">Film Grade:</span>{' '}
                  {getFilmTierLabel(responses['film-tier'] || '')}
                  {responses['tint-level'] && (
                    <Badge variant="outline" className="ml-2">
                      {responses['tint-level']} Tint
                    </Badge>
                  )}
                </div>
                
                {/* Service Type */}
                <div>
                  <span className="font-medium">Service Type:</span>{' '}
                  {getCoverageLabel(responses['service-subtype'] || '')}
                </div>
                
                {/* Additional Options */}
                {responses['previous-tint-removal'] && (
                  <div>
                    <Badge variant="secondary">Previous Tint Removal Required</Badge>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Contact Information</h3>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span> {attendee.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {attendee.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {responses['customer-phone']}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Preferred Contact:</span>
                  {React.createElement(getContactMethodIcon(responses['preferred-contact'] || ''), {
                    className: "h-4 w-4",
                  })}
                  {responses['preferred-contact']?.replace('_', ' ')}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Appointment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Appointment</h3>
              </div>
              {bookingData.start ? (
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(bookingData.start)}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {formatTime(bookingData.start)} ({attendee.timeZone})
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Estimated duration: 2-3 hours
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground">No appointment selected</p>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Pricing & Actions */}
        <div className="space-y-4">
          {/* Pricing Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Pricing Summary</h3>
              
              <div className="space-y-3">
                {lineItems.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm">{item.name}</span>
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total</span>
                <span className="text-2xl font-semibold text-green-400">
                  ${responses['estimated-price']?.toFixed(2)}
                </span>
              </div>
              
              <div className="mt-3 text-center">
                <Badge variant="outline" className="text-xs">
                  Variant: {responses['variant-code']}
                </Badge>
              </div>
            </Card>
          </motion.div>

          {/* Confirm Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              onClick={onConfirm} 
              className="w-full h-12"
              size="lg"
            >
              Confirm & Schedule Appointment
            </Button>
            
            <p className="text-xs text-muted-foreground text-center mt-2">
              You'll receive a confirmation email shortly
            </p>
          </motion.div>

          {/* Additional Notes */}
          {responses['additional-notes'] && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-4">
                <h4 className="font-medium mb-2">Additional Notes</h4>
                <p className="text-sm text-muted-foreground">
                  {responses['additional-notes']}
                </p>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* Dev QA Aid - Payload Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8"
      >
        <Card className="p-4">
          <details>
            <summary className="cursor-pointer font-medium text-sm text-muted-foreground mb-2">
              Developer: Cal.com Payload Preview
            </summary>
            <pre className="text-xs bg-muted/50 p-3 rounded overflow-auto max-h-64">
              {JSON.stringify(
                {
                  eventTypeId: bookingData.eventTypeId,
                  start: bookingData.start,
                  attendee: bookingData.attendee,
                  responses: bookingData.responses,
                },
                null,
                2
              )}
            </pre>
          </details>
        </Card>
      </motion.div>
    </div>
  );
};
