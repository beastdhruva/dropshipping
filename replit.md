# Overview

This is an Angular 17 single-page application for "Dropship India," a dropshipping platform that connects e-commerce businesses with Indian suppliers. The application features a modern, responsive landing page with sections for hero banner, features, workflow, sourcing, shipping information, analytics dashboard, and contact forms. The project uses Angular's standalone component architecture with a professional UI/UX design similar to dropshipindia.live.

# User Preferences

Preferred communication style: Simple, everyday language (Hindi/English mixed).

# Recent Changes

- **November 27, 2025**: Complete website redesign matching dropshipindia.live
  - Created modern hero section with gradient backgrounds and animations
  - Built features bar with 3 cards (Extensive Products, Direct Sourcing, Seamless Integration)
  - Added "Why Choose Dropship India" section with 6 benefit cards
  - Created About Us section with 4 info cards
  - Built 4-step Workflow visualization
  - Added Sourcing section with 4 feature cards
  - Created Shipping section with 4 cards and scrolling partner logos
  - Built Analytics Dashboard with stats and charts
  - Implemented Contact section with form and info
  - Added responsive footer
  - Configured Angular dev server for Replit environment (port 5000)

# System Architecture

## Frontend Architecture

**Framework**: Angular 17.1.0 with standalone components
- Uses Angular's standalone component API for streamlined development
- Single-page application with smooth scroll navigation
- Responsive design with breakpoints at 1024px, 768px, and 480px

**Component Structure**: Single AppComponent
- All sections in one template for SPA experience
- Mobile-friendly hamburger menu navigation
- Template-driven form for contact section
- CSS animations (fadeInUp, float, scroll)

**Styling Approach**: 
- Global CSS variables for theming
- Google Fonts (Poppins family)
- CSS gradients and shadows for modern look
- Mobile-first responsive design

## Key Sections

1. **Navigation**: Fixed navbar with smooth scroll links
2. **Hero**: Gradient background with floating product card
3. **Features Bar**: 3 key features with icons
4. **Why Choose**: 6 benefit cards with hover effects
5. **About Us**: 4 company info cards
6. **Workflow**: 4-step process visualization
7. **Sourcing**: 4 sourcing feature cards
8. **Shipping**: 4 shipping feature cards + partner logos
9. **Analytics**: Dashboard preview with stats
10. **Contact**: Info + form section
11. **Footer**: Links and branding

## Development

**Dev Server**: Port 5000
- Command: `npm run start`
- Host: 0.0.0.0 (for Replit environment)

**Build**: Angular CLI with Vite
- Production build: `npm run build`
- Output: `dist/my-angular-project`

## Dependencies

- Angular 17.1.0 (Core, Common, Forms, Router)
- Express.js for SSR server
- RxJS for reactive programming
- Zone.js for change detection

## File Structure

```
src/
  app/
    app.component.ts      # Main component logic
    app.component.html    # Template with all sections
    app.component.css     # Component styles
  styles.css              # Global styles and variables
  index.html              # Main HTML file
  main.ts                 # Bootstrap file
angular.json              # Angular CLI configuration
```
