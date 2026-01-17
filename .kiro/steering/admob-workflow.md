---
inclusion: manual
---

# AdMob Development Workflow

## CRITICAL: AdMob Incompatibility with Expo Go

**AdMob is NOT compatible with Expo Go.** This creates a specific workflow for development and testing.

## Development Workflow

### **For Expo Go Testing (Development)**
When you need to test the app in Expo Go:

1. **Comment out AdMob code** in these files:
   - `App.js` - AdMob initialization and ATT
   - `src/components/AdBanner.js` - Banner ad component
   
2. **AdBanner returns `null`** when commented out
3. **App runs in Expo Go** for rapid development

### **For Production/TestFlight (Deployment)**
When ready to deploy to TestFlight or App Store:

1. **Uncomment AdMob code** in:
   - `App.js` - Enable AdMob initialization
   - `src/components/AdBanner.js` - Enable banner ads
   
2. **Build with EAS Build** (not Expo Go)
3. **Ads will work** in TestFlight and App Store

## Trade-off

- **Expo Go enabled** = No ads, but fast development
- **AdMob enabled** = Ads work, but can't use Expo Go (must use EAS Build)

## AdMob Configuration

**Production Ad Unit ID:** `ca-app-pub-5199693306490546/6903737467`
**Test Ad Unit ID:** `ca-app-pub-3940256099942544/6300978111`

**Ad Placement:** Single sticky banner above bottom tab bar (in `TabBar.js`)

## App Tracking Transparency (ATT) - Why Our App Works

### Critical Implementation Order
Our app passes Apple review and doesn't crash because we follow this exact order:

1. **Request ATT permission FIRST** (iOS only)
2. **Wait for user response** (granted or denied)
3. **Initialize AdMob AFTER** ATT response
4. **Show ads** (personalized if granted, non-personalized if denied)

### Required Configuration

**app.json:**
```json
"ios": {
  "infoPlist": {
    "NSUserTrackingUsageDescription": "This identifier will be used to deliver personalized ads to you."
  }
}
```

**App.js initialization pattern:**
```javascript
useEffect(() => {
  const initializeApp = async () => {
    // STEP 1: ATT permission FIRST
    if (Platform.OS === 'ios') {
      try {
        const { status } = await TrackingTransparency.requestTrackingPermissionsAsync();
        console.log('ATT Status:', status);
      } catch (error) {
        console.error('ATT Error:', error);
      }
    }

    // STEP 2: AdMob AFTER ATT
    try {
      await mobileAds().initialize();
    } catch (error) {
      console.error('AdMob Error:', error);
    }
  };
  initializeApp();
}, []);
```

### Common Crash Causes (What NOT to Do)
- ❌ Initializing AdMob before ATT permission
- ❌ Missing `NSUserTrackingUsageDescription` in app.json
- ❌ Not doing a fresh EAS build after adding expo-tracking-transparency
- ❌ Not handling errors in try-catch blocks

### Why Fresh Build is Required
After adding `expo-tracking-transparency`, you MUST run `eas build` because ATT requires native code changes that can't be delivered via OTA updates.

## Quick Toggle Commands

**To disable AdMob for Expo Go:**
- Comment out imports and code in `App.js` and `src/components/AdBanner.js`
- AdBanner returns `null`

**To enable AdMob for production:**
- Uncomment all AdMob code
- Build with EAS Build
- Deploy to TestFlight/App Store