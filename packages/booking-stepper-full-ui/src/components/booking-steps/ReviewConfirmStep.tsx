import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Calendar, Clock, Car, Shield, Phone, Mail, MessageSquare, Edit3 } from 'lucide-react';
import { BookingData } from '../WindowTintingBookingStepper';


interface ReviewConfirmStepProps {
  bookingData: Partial<BookingData>;
  updateBookingData: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onConfirm: () => void;
}

export const ReviewConfirmStep: React.FC<ReviewConfirmStepProps> = ({
  bookingData,
  updateBookingData,
  onConfirm,
}) => {
  const attendee = bookingData.attendee || {};
  const responses = bookingData.responses || {};

  // Dialog states
  const [showContactEdit, setShowContactEdit] = useState(false);
  const [showVehicleEdit, setShowVehicleEdit] = useState(false);

  // Form states for editing
  const [contactForm, setContactForm] = useState({
    firstName: attendee.firstName || '',
    lastName: attendee.lastName || '',
    email: attendee.email || '',
    phone: responses['customer-phone'] || '',
  });

  const [vehicleForm, setVehicleForm] = useState({
    year: responses['vehicle-year'] || '',
    make: responses['vehicle-make'] || '',
    model: responses['vehicle-model'] || '',
    color: responses['vehicle-color'] || '',
  });

  // Vehicle options (simplified - could be moved to constants)
  const POPULAR_MAKES = [
    'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz',
    'Audi', 'Lexus', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Volkswagen', 'Jeep',
  ];

  const COLORS = [
    'Black', 'White', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Brown', 'Gold',
    'Orange', 'Yellow', 'Purple', 'Other',
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  // Save handlers
  const saveContactInfo = () => {
    updateBookingData({
      attendee: {
        ...attendee,
        firstName: contactForm.firstName,
        lastName: contactForm.lastName,
        email: contactForm.email,
      },
      responses: {
        ...responses,
        'customer-phone': contactForm.phone,
      },
    });
    setShowContactEdit(false);
  };

  const saveVehicleInfo = () => {
    updateBookingData({
      responses: {
        ...responses,
        'vehicle-year': vehicleForm.year,
        'vehicle-make': vehicleForm.make,
        'vehicle-model': vehicleForm.model,
        'vehicle-color': vehicleForm.color,
      },
    });
    setShowVehicleEdit(false);
  };

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
    const hasFactoryTint = responses['has-factory-tint'];

    const getLabel = (selection: string): string => {
      if (selection === 'SIDES_REAR') {
        return hasFactoryTint ? 'Factory Enhance - Sides and Rear' : 'Sides & Rear';
      }

      if (selection === 'FACTORY_MATCH_FRONT_DOORS') {
        return 'Factory Match - Front Doors';
      }


      const labels: Record<string, string> = {
        'FRONTS': 'Factory Match (Fronts)',
        'WINDSHIELD': 'Windshield',
        'SUN_STRIP': 'Sun Strip (Brow)',
      };

      return labels[selection] || selection;
    };

    return coverageSelections.map(getLabel).join(', ');
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
    const items = [];
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
        case 'FACTORY_MATCH_FRONT_DOORS':
          items.push({
            name: `Factory Match - Front Doors - ${getFilmTierLabel(filmTier)}`,
            price: 179,
          });
          break;
        case 'SIDES_REAR':
          const sidesRearLabel = responses['has-factory-tint']
            ? 'Factory Enhance - Sides and Rear'
            : 'Sides & Rear';
          items.push({
            name: `${sidesRearLabel} - ${getFilmTierLabel(filmTier)}`,
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
      <div className="text-center hidden lg:block">
        <h2 className="text-xl font-medium mb-2 text-gray-200">Review & Confirm</h2>
        <p className="text-gray-400">
          Please review your booking details before confirming
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Comprehensive Overview */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-4 lg:p-6">
              <div className="space-y-4 lg:space-y-6">
                {/* Appointment Details */}
                <div>
                  <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                    <Calendar className="h-4 w-4 lg:h-5 lg:w-5 text-[#f5c542]" />
                    <h3 className="text-base lg:text-lg font-medium text-white">Appointment</h3>
                  </div>
                  <div className="pl-6 lg:pl-8">
                    <p className="text-sm lg:text-base text-gray-300">
                      {bookingData.start ? (
                        <>
                          {formatDate(bookingData.start)} at {formatTime(bookingData.start)}
                        </>
                      ) : (
                        'Not scheduled'
                      )}
                    </p>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                {/* Contact Information */}
                <div>
                  <div className="flex items-center justify-between mb-2 lg:mb-3">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <Phone className="h-4 w-4 lg:h-5 lg:w-5 text-[#f5c542]" />
                      <h3 className="text-base lg:text-lg font-medium text-white">Contact Information</h3>
                    </div>
                    <Dialog open={showContactEdit} onOpenChange={setShowContactEdit}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-neutral-800/95 border-white/20 max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-white flex items-center gap-2">
                            <Phone className="h-5 w-5" />
                            Edit Contact Information
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor="edit-firstName">First Name</Label>
                              <Input
                                id="edit-firstName"
                                value={contactForm.firstName}
                                onChange={(e) => setContactForm(prev => ({ ...prev, firstName: e.target.value }))}
                                placeholder="First name"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-lastName">Last Name</Label>
                              <Input
                                id="edit-lastName"
                                value={contactForm.lastName}
                                onChange={(e) => setContactForm(prev => ({ ...prev, lastName: e.target.value }))}
                                placeholder="Last name"
                                className="mt-1"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="edit-email">Email Address</Label>
                            <Input
                              id="edit-email"
                              type="email"
                              value={contactForm.email}
                              onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="Enter your email"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-phone">Phone Number</Label>
                            <Input
                              id="edit-phone"
                              value={contactForm.phone}
                              onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                              placeholder="(555) 123-4567"
                              className="mt-1"
                            />
                          </div>
                          <div className="flex gap-2 pt-4">
                            <Button
                              onClick={saveContactInfo}
                              className="flex-1 bg-[#f5c542] hover:bg-[#f5c542]/90 text-black"
                            >
                              Save Changes
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setShowContactEdit(false)}
                              className="flex-1"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="pl-6 lg:pl-8 space-y-0.5 lg:space-y-1">
                    <p className="text-sm lg:text-base text-gray-300 font-medium">{attendee.firstName} {attendee.lastName}</p>
                    <p className="text-sm lg:text-base text-gray-300">{attendee.email}</p>
                    <p className="text-sm lg:text-base text-gray-300">{responses['customer-phone']}</p>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                {/* Vehicle Information */}
                <div>
                  <div className="flex items-center justify-between mb-2 lg:mb-3">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <Car className="h-4 w-4 lg:h-5 lg:w-5 text-[#f5c542]" />
                      <h3 className="text-base lg:text-lg font-medium text-white">Vehicle Information</h3>
                    </div>
                    <Dialog open={showVehicleEdit} onOpenChange={setShowVehicleEdit}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-neutral-800/95 border-white/20 max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-white flex items-center gap-2">
                            <Car className="h-5 w-5" />
                            Edit Vehicle Information
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor="edit-year">Year</Label>
                              <Select
                                value={vehicleForm.year?.toString() || ''}
                                onValueChange={(value) => setVehicleForm(prev => ({ ...prev, year: parseInt(value) }))}
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
                              <Label htmlFor="edit-make">Make</Label>
                              <Select
                                value={vehicleForm.make || ''}
                                onValueChange={(value) => setVehicleForm(prev => ({ ...prev, make: value }))}
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
                            <Label htmlFor="edit-model">Model</Label>
                            <Input
                              id="edit-model"
                              value={vehicleForm.model}
                              onChange={(e) => setVehicleForm(prev => ({ ...prev, model: e.target.value }))}
                              placeholder="Enter vehicle model"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-color">Color</Label>
                            <Select
                              value={vehicleForm.color || ''}
                              onValueChange={(value) => setVehicleForm(prev => ({ ...prev, color: value }))}
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
                          <div className="flex gap-2 pt-4">
                            <Button
                              onClick={saveVehicleInfo}
                              className="flex-1 bg-[#f5c542] hover:bg-[#f5c542]/90 text-black"
                            >
                              Save Changes
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setShowVehicleEdit(false)}
                              className="flex-1"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="pl-6 lg:pl-8">
                    <p className="text-sm lg:text-base text-gray-300">
                      {responses['vehicle-year']} {responses['vehicle-make']} {responses['vehicle-model']} - <span className="italic">{responses['vehicle-color']}</span>
                    </p>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                {/* Service Details */}
                <div>
                  <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                    <Shield className="h-4 w-4 lg:h-5 lg:w-5 text-[#f5c542]" />
                    <h3 className="text-base lg:text-lg font-medium text-white">Service Details</h3>
                  </div>
                  <div className="pl-6 lg:pl-8 space-y-2 lg:space-y-3">
                    <h4 className="text-sm lg:text-base font-medium text-gray-200">Window Tint</h4>
                    <div className="space-y-1 lg:space-y-2 pl-3">
                      <p className="text-sm lg:text-base text-gray-300">
                        <span className="font-medium">Coverage:</span>{' '}
                        {getCoverageDetails(responses['coverage-selections'] || [])}
                      </p>
                      <p className="text-sm lg:text-base text-gray-300">
                        <span className="font-medium">Film Type:</span>{' '}
                        {getFilmTierLabel(responses['film-tier'] || '')}
                        {responses['tint-level'] && (
                          <Badge variant="outline" className="ml-2 border-[#f5c542] text-[#f5c542] text-xs">
                            {responses['tint-level']} Tint
                          </Badge>
                        )}
                      </p>
                      {responses['estimated-price'] && (
                        <p className="text-sm lg:text-base text-gray-300">
                          <span className="font-medium">Project Price:</span>{' '}
                          <span className="text-green-400 font-semibold text-base lg:text-lg">
                            ${responses['estimated-price']}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Pricing & Actions */}
        <div className="space-y-4">
          {/* Confirm Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={onConfirm}
              className="w-full h-12 bg-[#f5c542] hover:bg-[#f5c542]/90 text-black border-[#f5c542] font-semibold"
              size="lg"
            >
              Confirm & Schedule Appointment
            </Button>
            
            <p className="text-xs text-gray-400 text-center mt-2">
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
                <p className="text-sm text-gray-400">
                  {responses['additional-notes']}
                </p>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

    </div>
  );
};
