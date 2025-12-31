# Gematria Calculator

A comprehensive Gematria calculator available as both a mobile app (iOS/Android) and web application. Calculate numerical values of words and phrases using 25+ traditional and modern cipher systems.

## 🌟 Features

- **25+ Cipher Systems**: English, Hebrew, Reverse, Kabbalah, Mathematical, and more
- **Real-time Calculations**: See results as you type
- **Word Breakdown**: Detailed letter-by-letter value breakdown
- **Multi-platform**: iOS app, Android app (coming soon), and web version
- **Share Calculations**: Generate shareable links to your calculations
- **Responsive Design**: Optimized for both mobile and desktop

## 🚀 Live Demo

- **Web App**: [https://gematriacalculator.xyz](https://gematriacalculator.xyz)
- **iOS App**: [Download on App Store](https://apps.apple.com/us/app/gematria-calculator-decode/id6744337544)
- **Android App**: Coming soon

## 📱 Mobile App

Built with React Native and Expo.

### Development

```bash
# Install dependencies
npm install

# Start Expo development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 🌐 Web Version

The web version features a 3-column layout optimized for desktop:
- Left sidebar: Filter and select ciphers
- Center: Input text and view results
- Right sidebar: Summary of all calculations

### Local Development

```bash
# Start web development server
npm run web

# Build for production
npm run build:web
```

## 🔧 Tech Stack

- **Mobile**: React Native, Expo
- **Web**: React Native Web
- **Deployment**: Netlify (web), Expo EAS (mobile)
- **Forms**: Netlify Forms
- **Styling**: React Native StyleSheet

## 📦 Project Structure

```
├── app/                    # Expo Router screens (mobile)
├── src/
│   ├── components/        # Shared mobile components
│   ├── data/             # Cipher definitions and data
│   ├── navigation/       # Mobile navigation
│   ├── screens/          # Mobile screens
│   ├── utils/            # Utility functions
│   └── web/              # Web-specific code
│       ├── components/   # Web components
│       └── pages/        # Web pages
├── assets/               # Images and fonts
└── netlify/             # Netlify configuration
```

## 🚢 Deployment

### Web (Netlify)

1. Push to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build:web`
4. Publish directory: `dist`

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

### Mobile (Expo EAS)

```bash
# iOS
eas build --platform ios
eas submit --platform ios

# Android
eas build --platform android
eas submit --platform android
```

## 📝 Documentation

- [Contact Form Setup](CONTACT_FORM_SETUP.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)

## ⚠️ Development Guidelines

- **No Unnecessary Documentation**: Do not create any new documentation files (e.g., guidelines, references, summaries) unless explicitly requested. Keep the repository clean and focus on code changes.

## 🤝 Contributing

This is a private repository. For questions or suggestions, please use the contact form on the website.

## 📄 License

All rights reserved © 2025

## 🔗 Links

- Website: [gematriacalculator.xyz](https://gematriacalculator.xyz)
- iOS App: [App Store](https://apps.apple.com/us/app/gematria-calculator-decode/id6744337544)
- Privacy Policy: [Link](https://www.privacypolicies.com/live/e92dcb74-10a4-4ac8-9983-80caf5d96b32)
- Terms of Service: [Link](https://www.privacypolicies.com/live/37ea9a23-b763-496d-a552-702e87742679)
