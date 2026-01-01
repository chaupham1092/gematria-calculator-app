# Project Structure Guidelines

## Folder Structure - IMPORTANT

### Reference/Legacy Folders (DO NOT MODIFY)
- `Website/` - Old standalone HTML/CSS/JS version (reference only)
- `Web Calculator - With User Requests/` - Archived development version (reference only)  
- `web/` - Minimal Expo web entry point (auto-generated, don't touch)

### Active Development Folders
- `src/` - **THIS IS WHERE THE REAL WEB VERSION LIVES**
  - `src/web/WebCalculator.js` - Main web component with 3-column layout
  - `src/web/pages/` - Web-specific pages
  - `src/web/components/` - Web-specific components
  - `src/screens/` - Mobile screens
  - `src/utils/` - Shared logic between mobile and web
  - `src/data/` - Cipher definitions and data

### Entry Points
- `App.js` - Mobile entry point (iOS/Android)
- `App.web.js` - Web entry point (uses WebCalculator)
- `index.js` - Platform detection router

## Key Architecture Points
- React Native app with Expo
- Shared logic between mobile and web platforms
- Web version uses React Native Web with custom 3-column layout
- Mobile uses React Navigation with bottom tabs
- Deployed to Netlify (web) and App Store (mobile)