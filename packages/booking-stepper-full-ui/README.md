# KWT Booking Stepper

Professional window tinting booking flow component for automotive businesses.

## Features

- 🚗 **Multi-vehicle Support** - Cars, SUVs, Trucks, Vans with subtypes
- 🎯 **Coverage Options** - Comprehensive window tinting packages including sunroof options
- 💎 **Film Grades** - Multiple tint levels (CS, XR, XR Plus)
- 📅 **Appointment Scheduling** - Integrated calendar booking
- 💰 **Real-time Pricing** - Dynamic pricing based on selections
- 📱 **Responsive Design** - Works on all devices
- ✨ **Smooth Animations** - Professional UI with Framer Motion
- 🎨 **Customizable** - Easy theming and branding

## Installation

```bash
npm install kwt-booking-stepper
```

## Usage

```tsx
import { WindowTintingBookingStepper } from 'kwt-booking-stepper';

function App() {
  return (
    <div>
      <WindowTintingBookingStepper />
    </div>
  );
}
```

## Components

### WindowTintingBookingStepper

Main booking flow component with 7 steps:

1. **Vehicle Selection** - Choose vehicle type and subtype
2. **Coverage Options** - Select areas to tint (including sunroof)
3. **Film Grade** - Choose tint level and quality
4. **Appointment** - Schedule date and time
5. **Customer Details** - Contact information
6. **Review & Confirm** - Final confirmation
7. **Success** - Booking confirmation

### Props

```tsx
interface BookingStepperProps {
  // Configuration options coming soon
  theme?: 'light' | 'dark';
  accentColor?: string;
  companyName?: string;
}
```

## Customization

The component uses CSS custom properties for easy theming:

```css
:root {
  --color-accent: #f5c542; /* Gold accent color */
  --color-primary: #c41e3a; /* Brand red */
  --color-background: #121212; /* Dark background */
}
```

## Coverage Options

- **Sides & Rear** - Complete package with fronts factory matched
- **Windshield** - Full windshield tinting
- **Sun Strip** - Narrow glare-reducing strip
- **Sunroof** - Single or dual panel options

## Pricing

Dynamic pricing based on:
- Vehicle type (Car/SUV/Truck)
- Coverage selections
- Film grade (CS/XR/XR Plus)
- Add-on options

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## License

MIT © Kings Window Tint

## Support

For business inquiries about licensing this component for your window tinting company, contact us at [your-email@domain.com]