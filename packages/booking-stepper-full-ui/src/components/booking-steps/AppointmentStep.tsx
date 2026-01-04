import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar } from '../ui/calendar';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Skeleton } from '../ui/skeleton';
import { Clock, MapPin, Calendar as CalendarIcon, ChevronRight, ChevronLeft } from 'lucide-react';
import { BookingData } from '../WindowTintingBookingStepper';

interface AppointmentStepProps {
  bookingData: Partial<BookingData>;
  updateBookingData: (updates: Partial<BookingData>) => void;
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

// Mock soonest available appointments
const SOONEST_AVAILABLE = [
  {
    id: 'next-1',
    dateLabel: 'Tomorrow',
    fullDate: 'Thu, Jan 25',
    time: '10:00 AM',
    timeId: '10:00',
    available: true
  },
  {
    id: 'next-2',
    dateLabel: 'Friday',
    fullDate: 'Fri, Jan 26',
    time: '2:00 PM',
    timeId: '14:00',
    available: true
  },
  {
    id: 'next-3',
    dateLabel: 'Monday',
    fullDate: 'Mon, Jan 29',
    time: '9:00 AM',
    timeId: '09:00',
    available: true
  }
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
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  
  const attendee = bookingData.attendee || {};
  const currentTimeZone = attendee.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;

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
    setSelectedSlotId(null); // Clear quick selection when manually selecting date
  };

  const handleTimeSelect = (timeId: string) => {
    if (!selectedDate) return;

    setSelectedTime(timeId);
    setSelectedSlotId(null); // Clear quick selection when manually selecting time

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

  const handleSoonestSlotSelect = (slot: typeof SOONEST_AVAILABLE[0]) => {
    // Create date from slot data (mock implementation)
    const today = new Date();
    const appointmentDate = new Date(today);

    // Simple date calculation (in real app, this would use actual dates from API)
    if (slot.dateLabel === 'Tomorrow') {
      appointmentDate.setDate(today.getDate() + 1);
    } else if (slot.dateLabel === 'Friday') {
      appointmentDate.setDate(today.getDate() + 2);
    } else if (slot.dateLabel === 'Monday') {
      appointmentDate.setDate(today.getDate() + 5);
    }

    const [hours, minutes] = slot.timeId.split(':').map(Number);
    appointmentDate.setHours(hours, minutes || 0, 0, 0);

    const utcDate = new Date(appointmentDate.getTime() - appointmentDate.getTimezoneOffset() * 60000);

    setSelectedDate(appointmentDate);
    setSelectedTime(slot.timeId);
    setSelectedSlotId(slot.id);

    updateBookingData({
      start: utcDate.toISOString(),
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

  // Generate week view dates based on offset, starting on Sunday
  const generateWeekDates = (offset: number = 0) => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Calculate the Sunday of the current week
    const currentSunday = new Date(today);
    currentSunday.setDate(today.getDate() - currentDay);

    // Add the week offset
    const startDate = new Date(currentSunday);
    startDate.setDate(currentSunday.getDate() + (offset * 7));

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const weekDates = generateWeekDates(weekOffset);

  const goToPreviousWeek = () => {
    if (weekOffset > 0) {
      setWeekOffset(prev => prev - 1);
      setHasAnimated(false); // Reset animation flag to trigger animation
    }
  };

  const goToNextWeek = () => {
    if (weekOffset < 4) { // Limit to 4 weeks ahead
      setWeekOffset(prev => prev + 1);
      setHasAnimated(false); // Reset animation flag to trigger animation
    }
  };

  const getWeekDisplayText = () => {
    const startDate = weekDates[0];
    const endDate = weekDates[6];

    if (weekOffset === 0) {
      return "This Week";
    } else if (weekOffset === 1) {
      return "Next Week";
    } else {
      return `${startDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })} - ${endDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center hidden lg:block">
        <h2 className="text-lg lg:text-xl font-medium text-gray-200 mb-1 lg:mb-2">Set Your Appointment</h2>
        <p className="text-sm lg:text-base text-gray-400">
          Choose a convenient date and time for your window tinting service
        </p>
      </div>

      {!showFullCalendar ? (
        /* Soonest Available Options */
        <div className="space-y-4 lg:space-y-6">
          <div className="grid gap-3 lg:gap-4">
            {SOONEST_AVAILABLE.map((slot, index) => (
              <motion.button
                key={slot.id}
                onClick={() => handleSoonestSlotSelect(slot)}
                className={`p-3 lg:p-6 rounded-lg border text-left transition-all hover:shadow-md ${
                  selectedSlotId === slot.id
                    ? 'border-[#f5c542] bg-[#f5c542]/5 shadow-md'
                    : 'border-white/20 hover:border-white/40 bg-neutral-800/40'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#f5c542] font-medium text-sm lg:text-base">
                        {slot.dateLabel}
                      </span>
                      <span className="text-gray-400 text-xs lg:text-sm">
                        {slot.fullDate}
                      </span>
                    </div>
                    <div className="font-medium text-base lg:text-lg text-white">
                      {slot.time}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-400 mt-0.5 lg:mt-1">
                      2-3 hours estimated duration
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {selectedSlotId === slot.id ? (
                      <div className="w-6 h-6 bg-[#f5c542] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setShowFullCalendar(true)}
              className="gap-2"
            >
              <CalendarIcon className="h-4 w-4" />
              Browse Availability
            </Button>
          </div>
        </div>
      ) : (
        /* Full Calendar View */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center"
          >
            {/* Custom Week View */}
            <div className="w-full max-w-md">
              {/* Week Navigation */}
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <motion.button
                  onClick={goToPreviousWeek}
                  disabled={weekOffset === 0}
                  className={`p-2 rounded-lg border transition-all ${
                    weekOffset === 0
                      ? 'border-white/10 text-gray-500 cursor-not-allowed'
                      : 'border-white/20 text-gray-400 hover:border-white/40 hover:text-white'
                  }`}
                  whileHover={weekOffset > 0 ? { scale: 1.05 } : {}}
                  whileTap={weekOffset > 0 ? { scale: 0.95 } : {}}
                >
                  <ChevronLeft className="h-4 w-4" />
                </motion.button>

                <div className="text-center">
                  <p className="text-sm lg:text-base font-medium text-white">
                    {getWeekDisplayText()}
                  </p>
                </div>

                <motion.button
                  onClick={goToNextWeek}
                  disabled={weekOffset >= 4}
                  className={`p-2 rounded-lg border transition-all ${
                    weekOffset >= 4
                      ? 'border-white/10 text-gray-500 cursor-not-allowed'
                      : 'border-white/20 text-gray-400 hover:border-white/40 hover:text-white'
                  }`}
                  whileHover={weekOffset < 4 ? { scale: 1.05 } : {}}
                  whileTap={weekOffset < 4 ? { scale: 0.95 } : {}}
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </div>

              <motion.div
                key={`week-${weekOffset}`}
                className="grid grid-cols-7 gap-1 lg:gap-2"
                initial={!hasAnimated ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onAnimationComplete={() => setHasAnimated(true)}
              >
                {weekDates.map((date, index) => {
                  const isSelected = selectedDate &&
                    date.toDateString() === selectedDate.toDateString();
                  const isToday = date.toDateString() === new Date().toDateString();
                  const isPast = date < minDate;

                  return (
                    <motion.button
                      key={date.toISOString()}
                      onClick={() => !isPast && handleDateSelect(date)}
                      disabled={isPast}
                      className={`p-2 lg:p-3 rounded-lg text-center transition-all ${
                        isSelected
                          ? 'bg-[#f5c542] text-black border border-[#f5c542]'
                          : isToday
                          ? 'bg-neutral-700 text-white border border-white/20'
                          : isPast
                          ? 'bg-neutral-800 text-gray-500 cursor-not-allowed border border-white/10'
                          : 'bg-neutral-800/40 text-white border border-white/20 hover:border-white/40 hover:bg-neutral-700'
                      }`}
                      whileHover={!isPast ? { scale: 1.05 } : {}}
                      whileTap={!isPast ? { scale: 0.95 } : {}}
                      initial={!hasAnimated ? { opacity: 0, y: 10 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      transition={!hasAnimated ? { delay: index * 0.05 } : {}}
                    >
                      <div className="text-xs lg:text-sm text-gray-400 mb-1">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="font-medium text-sm lg:text-base">
                        {date.getDate()}
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          {/* Time Slots */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-4 lg:p-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium text-white">Available Times</h3>
              </div>

              {!selectedDate && (
                <div className="text-center text-gray-400 py-8">
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
                <div className="text-center text-gray-400 py-8">
                  <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No available times for this date</p>
                  <p className="text-sm">Please select a different date</p>
                </div>
              )}

              {selectedDate && !loading && timeSlots.filter(slot => slot.available).length > 0 && (
                <div className="max-h-64 lg:max-h-80 overflow-y-auto space-y-3 pr-2">
                  {timeSlots.filter(slot => slot.available).map((slot, index) => (
                    <motion.button
                      key={slot.id}
                      onClick={() => handleTimeSelect(slot.id)}
                      className={`w-full p-3 lg:p-4 rounded-lg border text-left transition-all hover:shadow-md ${
                        selectedTime === slot.id
                          ? 'border-[#f5c542] bg-[#f5c542]/5 shadow-md'
                          : 'border-white/20 hover:border-white/40 bg-neutral-800/40'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-base lg:text-lg text-white mb-0.5">
                            {slot.time}
                          </div>
                          <div className="text-xs lg:text-sm text-gray-400">
                            {slot.duration} estimated duration
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {selectedTime === slot.id ? (
                            <div className="w-6 h-6 bg-[#f5c542] rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          ) : (
                            <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {selectedDate && !loading && timeSlots.filter(slot => slot.available).length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No available times for this date</p>
                  <p className="text-sm">Please select a different date</p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      )}

    </div>
  );
};