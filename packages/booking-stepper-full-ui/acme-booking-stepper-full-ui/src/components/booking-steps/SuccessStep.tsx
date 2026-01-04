import React from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle, Calendar, Phone, Mail, Download } from 'lucide-react';
import { BookingData } from '../WindowTintingBookingStepper';

interface SuccessStepProps {
  bookingData: Partial<BookingData>;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ bookingData }) => {
  const attendee = bookingData.attendee || {};
  const responses = bookingData.responses || {};

  const formatDateTime = (isoString?: string) => {
    if (!isoString) return 'Not scheduled';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleNewBooking = () => {
    window.location.reload();
  };

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    console.log('Download receipt for booking:', bookingData);
  };

  return (
    <div className="max-w-2xl mx-auto text-center space-y-6">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 15,
          delay: 0.2 
        }}
        className="relative"
      >
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        
        {/* Success Ripple Effect */}
        <motion.div
          className="absolute inset-0 w-24 h-24 mx-auto bg-green-400 rounded-full"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground text-lg">
          Your window tinting appointment has been successfully scheduled.
        </p>
      </motion.div>

      {/* Booking Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6 text-left">
          <h3 className="text-lg font-medium mb-4 text-center">Appointment Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Date & Time</p>
                <p className="text-muted-foreground">{formatDateTime(bookingData.start)}</p>
                <p className="text-sm text-muted-foreground">
                  Estimated duration: 2-3 hours
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Service</p>
                <p className="text-muted-foreground">
                  Window Tinting - {responses['service-subtype']?.replace('_', ' ')} ({responses['film-tier']})
                </p>
                <p className="text-sm text-muted-foreground">
                  {responses['vehicle-year']} {responses['vehicle-make']} {responses['vehicle-model']}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Contact Information</p>
                <p className="text-muted-foreground">{attendee.name}</p>
                <p className="text-muted-foreground">{responses['customer-phone']}</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount</span>
                <span className="text-xl font-semibold">
                  ${responses['estimated-price']?.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Payment will be collected at the time of service
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">What's Next?</h3>
          
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Confirmation Email</p>
                <p className="text-sm text-muted-foreground">
                  You'll receive a confirmation email at {attendee.email} within the next few minutes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Reminder Notifications</p>
                <p className="text-sm text-muted-foreground">
                  We'll send you a reminder 24 hours before your appointment.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Day of Service</p>
                <p className="text-sm text-muted-foreground">
                  Please arrive 10 minutes early and bring your vehicle keys and registration.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <Button
          onClick={handleDownloadReceipt}
          variant="outline"
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Download Receipt
        </Button>
        
        <Button
          onClick={handleNewBooking}
          className="gap-2"
        >
          Book Another Service
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center pt-6 border-t"
      >
        <p className="text-sm text-muted-foreground">
          Questions? Contact us at{' '}
          <a href="tel:+15555551234" className="text-primary hover:underline">
            (555) 555-1234
          </a>{' '}
          or{' '}
          <a href="mailto:info@windowtinting.com" className="text-primary hover:underline">
            info@windowtinting.com
          </a>
        </p>
      </motion.div>
    </div>
  );
};