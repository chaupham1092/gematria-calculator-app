# Gematria Calculator - Web Version

This is the Expo web version of the Gematria Calculator, built alongside the mobile app in the same repository.

## Project Structure

```
├── web/                      # Web-specific code
│   ├── components/          # Web UI components
│   │   ├── WebHeader.js
│   │   └── WebFooter.js
│   ├── screens/             # Web screens
│   │   ├── WebCalculatorScreen.js
│   │   ├── WebAboutScreen.js
│   │   ├── WebContactScreen.js
│   │   ├── WebPrivacyScreen.js
│   │   └── WebTermsScreen.js
│   └── navigation/          # Web navigation
│       └── WebNavigator.js
├── App.web.js               # Web entry point
├── netlify.toml             # Netlify deployment config
└── src/                     # Shared calculation logic
    ├── data/webCipherSystem.js
    └── utils/calculator.js
```

## Key Features

- **Desktop-optimized layout** with sidebar filters and summary panel
- **40+ cipher systems** for gematria calculations
- **Real-time calculations** with debouncing
- **Expandable results** showing word and letter breakdowns
- **Responsive design** that works on all screen sizes
- **Privacy Policy & Terms** moved to footer navigation

## Development

### Install Dependencies

```bash
npm install
```

### Run Web Version Locally

```bash
npm run web
```

This will start the Expo development server and open the web version in your browser at `http://localhost:8081`.

### Build for Production

```bash
npm run build:web
```

This creates a production build in the `dist/` folder.

## Deployment to Netlify

### Option 1: Connect GitHub Repository

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Netlify will automatically detect `netlify.toml` and use the correct build settings
6. Deploy!

### Option 2: Manual Deploy

```bash
npm run build:web
# Then drag the dist/ folder to Netlify's deploy interface
```

## Build Configuration

The `netlify.toml` file contains:

```toml
[build]
  command = "npx expo export:web"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures:
- Expo builds the web version correctly
- All routes redirect to index.html (for client-side routing)
- The `dist` folder is served as the website

## Differences from Mobile App

### Layout
- **Web**: Three-column layout (filters, calculator, summary)
- **Mobile**: Tab-based navigation

### Navigation
- **Web**: Stack navigator with header/footer
- **Mobile**: Bottom tab navigator

### Shared Logic
Both versions use the same:
- Cipher calculation engine (`src/data/webCipherSystem.js`)
- Calculator utilities (`src/utils/calculator.js`)
- This ensures identical calculation results across platforms

## Testing

### Test Web Version
```bash
npm run web
```

### Test Mobile Version (unchanged)
```bash
npm start
```

## Notes

- The web version is completely separate from the mobile app code
- Changes to `web/` folder won't affect mobile app
- Changes to `src/data/` and `src/utils/` affect both platforms
- Blog section has been removed from web version
- Privacy Policy and Terms moved to footer
