# CLAUDE.md - Kings Window Tint Frontend

This file provides guidance to Claude Code when working with the Kings Window Tint frontend codebase.

## Project Overview

Kings Window Tint frontend is a modern Next.js application for an automotive window tinting business. The site showcases window tinting services, paint protection film, and ceramic coating services with a professional automotive focus.

## Tech Stack

- **Framework**: Next.js 15.1.6 with App Router
- **UI Library**: React 19.0.0
- **Language**: TypeScript 5.7.3
- **Styling**: Tailwind CSS 4.0.3
- **Animations**: AOS (Animate On Scroll) 3.0.0-beta.6
- **Icons**: Inline SVGs and HeadlessUI components
- **Content**: MDX integration for dynamic content
- **Package Manager**: pnpm 10.11.1

## Architecture

### Directory Structure
```
app/
├── (auth)/          # Authentication pages (signin, signup, reset-password)
├── (default)/       # Main site pages (home, about, pricing, etc.)
├── api/            # API routes
├── css/            # Global styles and Tailwind configuration
└── layout.tsx      # Root layout with font loading

components/
├── ui/             # Core UI components (header, footer, logo)
├── [feature].tsx   # Feature-specific components
└── utils/          # Utility components

content/            # MDX content files
public/images/      # Static assets and images
```

### Route Groups
- `(default)` - Main business pages: home, about, pricing, services
- `(auth)` - Authentication flow: signin, signup, password reset

## Design System

### Brand Colors (Tailwind v4 Configuration)
```css
/* Kings Window Tint Brand Colors - From Figma Design System */
--color-obsidian: #040707       /* Deep black backgrounds */
--color-king-red: #c41e3a       /* Primary brand red */
--color-dark-red: #672530       /* Dark red backgrounds/sections */
--color-dark-grey: #262626      /* Dark sections */
--color-med-grey: #6b7280       /* Medium grey text */
--color-light-brown: #8b7355    /* Accent brown */
--color-light-grey: #cccccc     /* Light grey text */
--color-gold-accent: #f5c542    /* Gold highlights/CTA */
```

**Tailwind Class Usage:**
- `obsidian` - Deep black backgrounds
- `king-red` - Primary brand red for headers and key elements
- `dark-red` - Dark red backgrounds and sections
- `dark-grey` - Dark section backgrounds
- `med-grey` - Medium grey for secondary text
- `light-brown` - Brown accent color
- `light-grey` - Light grey for tertiary text
- `gold-accent` - Gold for CTAs, highlights, and accents

### Typography
- **Display Font**: Montserrat (var(--font-montserrat)) - All headings and brand text
- **Body Font**: Poppins (var(--font-poppins)) - All body text, UI elements, forms, and buttons
- **Font Weights**: 
  - Poppins: 300 (light), 400 (regular), 500 (medium), 600 (semibold)
  - Montserrat: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
  
**Note**: Inter font has been completely removed. Poppins is used for all non-heading text.

### Custom Typography Classes
```css
.kings-hero          /* Main hero headings (34px, Montserrat semibold, text-shadow) */
.kings-section-title /* Section titles (responsive, Montserrat, uppercase) */
.kings-body          /* Body text (20px, Poppins light, 38px line-height) */
.h1, .h2, .h3, .h4  /* Standard headings with Montserrat */
```

### Usage Examples
```jsx
// Hero section
<h1 className="kings-hero">Experience the King's Difference</h1>

// Section titles
<h2 className="kings-section-title">Style & Protection That Truly Lasts</h2>

// Body text
<p className="kings-body">Choose your service, select your date, and we'll handle the rest.</p>

// Brand colors
<div className="bg-obsidian text-light-grey">Deep black background</div>
<button className="bg-king-red text-white">Primary red CTA button</button>
<section className="bg-dark-red text-gold-accent">Dark red section</section>
<div className="bg-dark-grey text-light-grey">Dark grey content area</div>
<p className="text-med-grey">Secondary text content</p>
<span className="text-light-brown">Brown accent text</span>
```

## Business Context

### Services Offered
1. **Paint Protection Film** - Premium vehicle protection
2. **Window Tint** - Professional automotive window tinting
3. **Ceramic Coating** - Advanced vehicle surface protection

### Key Business Stats
- 350+ completed projects
- 25+ years of experience
- 20,000+ satisfied customers
- 100% customer satisfaction guarantee

### Target Content Themes
- Automotive excellence and craftsmanship
- Premium protection and style
- Professional service quality
- Heat protection and UV blocking
- Luxury vehicle enhancement

## Critical Implementation Notes

### ⚠️ Content Transformation Status
**IMPORTANT**: This codebase started as a "Stellar" API security platform template. Most content still references:
- "API Security Framework"
- "Social Connections", "External Databases"
- Generic tech platform features

**Required Actions**:
1. Replace ALL template content with automotive/window tinting content
2. Update navigation from "Integrations, Changelog" to "Services, Gallery, Contact"
3. Replace pricing tables with service packages
4. Update all copy to reflect window tinting business

### High-Priority Content Files Needing Updates
```
components/hero.tsx           # Replace "API Security" hero
components/ui/header.tsx      # Update navigation links
components/pricing.tsx        # Replace with service packages
app/(default)/page.tsx        # Update homepage structure
app/layout.tsx               # Update metadata and titles
```

### Component Architecture Notes
- **Large Components**: `pricing.tsx` is 400+ lines and needs refactoring
- **Inline SVGs**: Many components have inline SVGs that could be componentized
- **Animation Heavy**: Uses AOS animations extensively - good for automotive showcasing
- **Responsive**: Mobile-first design with proper breakpoints

## Development Commands

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint checking

# Package management
pnpm install         # Install dependencies
pnpm add [package]   # Add new package
```

## Design Integration

### Figma Integration
- Figma MCP server available for design-to-code workflow
- Design system variables: Gold Accent (#f5c542), Dark Red (#672530)
- Montserrat SemiBold confirmed as primary heading font

### Animation Guidelines
- AOS animations configured for automotive elegance
- Custom keyframes for specialty effects (shine, float, endless scroll)
- Performance considerations for mobile devices

## Content Strategy

### Page Structure Priority
1. **Homepage**: Hero + Services + Process + Stats + Contact
2. **Services**: Individual pages for each service type
3. **Gallery**: Showcase completed work and transformations
4. **About**: Company story and expertise
5. **Contact**: Location, hours, quote request

### SEO Considerations
- Automotive industry keywords
- Location-based optimization
- Service-specific landing pages
- Customer testimonials and reviews

## Security & Performance

- TypeScript strict mode enabled
- Next.js 15 optimizations (Image component, App Router)
- Proper API route structure for contact forms
- No sensitive data exposure in frontend

## Known Issues & Technical Debt

1. **Content Mismatch**: Template content needs complete replacement
2. **Component Size**: Large components need refactoring for maintainability
3. **SVG Management**: Inline SVGs should be componentized
4. **Animation Performance**: Monitor on lower-end devices

## Booking Stepper System

### Active Packages
The site uses a **custom local workspace package** for booking functionality:

**Package**: `acme-booking-stepper-full-ui` (version 0.1.1)
- **Location**: `packages/booking-stepper-full-ui/`
- **Components**:
  - `WindowTintingBookingStepper` - Regular customer booking flow
  - `DealershipBookingStepper` - Dealer partner booking flow
- **Dependencies**: Radix UI components, Framer Motion, React Hook Form
- **Built with**: Vite build system

### Implementation Locations
1. **Home Page**:
   - Direct: `components/features.tsx:4` (renders `WindowTintingBookingStepper`)
   - Modal: `components/inline-booking-cta.tsx:5` (opens in overlay)
2. **Dealership Page**:
   - `components/dealership-portal.tsx:5` (renders `DealershipBookingStepper`)

### Legacy Code
⚠️ **Important**: There is a legacy folder `packages/booking-stepper-full-ui/Multi-Step Booking Stepper/` that contains old/experimental booking stepper code. This is **NOT USED** anywhere in the application and should be considered for removal during cleanup.

**Status**:
- ❌ Not imported in any components
- ❌ Not exported from main package
- ❌ Has separate isolated package.json (Vite app structure)
- ✅ Safe to remove after verification

## Best Practices

- Use Kings design system colors and typography
- Follow existing component patterns
- Maintain responsive design principles
- Test animations on various devices
- Keep automotive/luxury focus in all content
- Use proper semantic HTML for accessibility

## Future Considerations

- Gallery component for showcasing work
- Quote request system integration
- Customer portal for appointment scheduling
- Location/map integration
- Mobile app considerations
- Clean up legacy booking stepper code in `Multi-Step Booking Stepper/` folder