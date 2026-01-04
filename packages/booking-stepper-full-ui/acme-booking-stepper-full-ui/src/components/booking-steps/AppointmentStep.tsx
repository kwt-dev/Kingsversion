import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar } from '../ui/calendar';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Skeleton } from '../ui/skeleton';
import { Clock, MapPin } from 'lucide-react';
import { BookingData, BookingDataUpdate } from '../WindowTintingBookingStepper';

interface AppointmentStepProps {
  bookingData: Partial<BookingData>;
  updateBookingData: (updates: BookingDataUpdate) => void;
  onNext: () => void;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  duration: string;
}

const TIME_ZONES = [
  { id: 'America/New_York', label: 'Eastern Time (ET)' },
  { id: 'America/Chicago', label: 'Central Time (CT)' },
  { id: 'America/Denver', label: 'Mountain Time (MT)' },
  { id: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
];

const MOCK_TIME_SLOTS: TimeSlot[] = [
  { id: '09:00', time: '9:00 AM', available: true, duration: '2-3 hours' },
  { id: '10:00', time: '10:00 AM', available: false, duration: '2-3 hours' },
  { id: '11:00', time: '11:00 AM', available: true, duration: '2-3 hours' },
  { id: '13:00', time: '1:00 PM', available: true, duration: '2-3 hours' },
  { id: '14:00', time: '2:00 PM', available: true, duration: '2-3 hours' },
  { id: '15:00', time: '3:00 PM', available: false, duration: '2-3 hours' },
];

export const AppointmentStep: React.FC<AppointmentStepProps> = ({
  bookingData,
  updateBookingData,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    bookingData.start ? new Date(bookingData.start) : undefined
  );
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  
  const attendee: BookingData['attendee'] = {
    name: '',
    email: '',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: 'en',
    ...bookingData.attendee,
  };
  const currentTimeZone = attendee.timeZone;

  // Mock API call to fetch available time slots
  const fetchTimeSlots = async (date: Date) => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would make an API call to Cal.com or your backend
    setTimeSlots(MOCK_TIME_SLOTS);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedDate) {
      fetchTimeSlots(selectedDate);
      setSelectedTime('');
    }
  }, [selectedDate]);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
  };

  const handleTimeSelect = (timeId: string) => {
    if (!selectedDate) return;
    
    setSelectedTime(timeId);
    
    // Create ISO string for the selected date and time
    const [hours, minutes] = timeId.split(':').map(Number);
    const appointmentDate = new Date(selectedDate);
    appointmentDate.setHours(hours, minutes || 0, 0, 0);
    
    // Convert to UTC for Cal.com
    const utcDate = new Date(appointmentDate.getTime() - appointmentDate.getTimezoneOffset() * 60000);
    
    updateBookingData({
      start: utcDate.toISOString(),
    });
  };

  const handleTimeZoneChange = (timeZone: string) => {
    updateBookingData({
      attendee: {
        ...attendee,
        timeZone,
      },
    });
  };

  const formatSelectedDateTime = () => {
    if (!selectedDate || !selectedTime) return '';
    
    const timeSlot = timeSlots.find(slot => slot.id === selectedTime);
    if (!timeSlot) return '';
    
    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }) + ' at ' + timeSlot.time;
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30); // 30 days from today

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl mb-2">Set Your Appointment</h2>
        <p className="text-muted-foreground">
          Choose a convenient date and time for your window tinting service
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Select Date</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date: Date) => date < minDate || date > maxDate}
              className="rounded-md border"
            />
          </Card>
        </motion.div>

        {/* Time Slots */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Available Times</h3>
            
            {!selectedDate && (
              <div className="text-center text-muted-foreground py-8">
                <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Please select a date first</p>
              </div>
            )}
            
            {selectedDate && loading && (
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            )}
            
            {selectedDate && !loading && timeSlots.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No available times for this date</p>
                <p className="text-sm">Please select a different date</p>
              </div>
            )}
            
            {selectedDate && !loading && timeSlots.length > 0 && (
              <div className="space-y-2">
                {timeSlots.map((slot) => (
                  <motion.button
                    key={slot.id}
                    onClick={() => slot.available && handleTimeSelect(slot.id)}
                    disabled={!slot.available}
                    className={`w-full p-4 rounded-lg border text-left transition-all ${
                      selectedTime === slot.id
                        ? 'border-primary bg-primary/10'
                        : slot.available
                        ? 'border-border hover:border-muted-foreground hover:shadow-sm'
                        : 'border-muted bg-muted/50 cursor-not-allowed opacity-50'
                    }`}
                    whileTap={slot.available ? { scale: 0.98 } : {}}
                    whileHover={slot.available ? { scale: 1.01 } : {}}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{slot.time}</div>
                        <div className="text-sm text-muted-foreground">
                          Estimated duration: {slot.duration}
                        </div>
                      </div>
                      {!slot.available && (
                        <div className="text-sm text-muted-foreground">
                          Booked
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Settings & Confirmation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >

        {/* Selected Appointment Summary */}
        {selectedDate && selectedTime && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-primary">Appointment Confirmed</h4>
                  <p className="text-sm text-primary/80 mt-1">
                    {formatSelectedDateTime()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Location: 123 Main Street, Your City, ST 12345
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
