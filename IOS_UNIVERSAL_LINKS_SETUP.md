# iOS Universal Links Setup

This guide explains how to set up Universal Links so shared calculations open in the iOS app if installed, otherwise in the browser.

## What Are Universal Links?

Universal Links allow your iOS app to handle links to your website. When a user clicks a link to `gematriacalculator.xyz`, iOS will:
1. Open the link in your app if it's installed
2. Open the link in Safari if the app is not installed

## Step 1: Update apple-app-site-association File

The file is already created at `public/.well-known/apple-app-site-association`

**You need to update it with your actual Team ID and Bundle ID:**

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "YOUR_TEAM_ID.com.gematriacalculator.app",
        "paths": [
          "*"
        ]
      }
    ]
  }
}
```

Replace:
- `YOUR_TEAM_ID` with your Apple Developer Team ID (found in Apple Developer account)
- `com.gematriacalculator.app` with your actual Bundle ID

## Step 2: Configure iOS App (Expo)

Add to your `app.json`:

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.gematriacalculator.app",
      "associatedDomains": [
        "applinks:gematriacalculator.xyz",
        "applinks:www.gematriacalculator.xyz"
      ]
    }
  }
}
```

## Step 3: Handle Deep Links in iOS App

Create a new file `app/+html.tsx` (if not exists) or update your root layout:

```typescript
import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // Handle incoming deep links
    const handleDeepLink = (event: { url: string }) => {
      const { path, queryParams } = Linking.parse(event.url);
      
      if (queryParams?.calc) {
        // Navigate to calculator with shared calculation
        router.push({
          pathname: '/(tabs)',
          params: { calc: queryParams.calc }
        });
      }
    };

    // Listen for deep links
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Check if app was opened with a deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // ... rest of your layout
}
```

## Step 4: Update Calculator Screen to Handle Shared Links

In your `CalculatorScreen.js`, add:

```javascript
import { useLocalSearchParams } from 'expo-router';
import { decodeCalculation } from '../utils/shareUtils';

const CalculatorScreen = ({ selectedCiphers }) => {
  const params = useLocalSearchParams();
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // Handle shared calculation
    if (params.calc) {
      const decoded = decodeCalculation(params.calc);
      if (decoded && decoded.text) {
        setInputText(decoded.text);
        // Update selected ciphers if needed
      }
    }
  }, [params.calc]);

  // ... rest of your component
};
```

## Step 5: Verify apple-app-site-association is Accessible

After deploying to Netlify, verify the file is accessible:

```bash
curl https://gematriacalculator.xyz/.well-known/apple-app-site-association
```

Should return JSON without any HTML wrapper.

## Step 6: Test Universal Links

### On Device:
1. Send yourself a link via Messages or Email: `https://gematriacalculator.xyz?calc=...`
2. Long press the link
3. You should see "Open in Gematria Calculator" option
4. Tap to open in app

### Using Safari:
1. Open Safari on your iOS device
2. Navigate to: `https://gematriacalculator.xyz?calc=...`
3. Should automatically open in app if installed

## Troubleshooting

### Link doesn't open in app

1. **Check Team ID and Bundle ID** in apple-app-site-association
2. **Verify file is accessible** at the URL above
3. **Check Associated Domains** in Xcode:
   - Open project in Xcode
   - Select target > Signing & Capabilities
   - Verify "Associated Domains" capability is added
   - Verify domains are listed: `applinks:gematriacalculator.xyz`

4. **Clear iOS cache**:
   - Delete and reinstall the app
   - Restart device

5. **Check Apple's CDN**:
   - Apple caches the file, may take time to update
   - Use Apple's validator: https://search.developer.apple.com/appsearch-validation-tool/

### File returns 404

- Make sure `public/.well-known/` folder is included in build
- Check Netlify deploy logs
- Verify the file is in the `dist` folder after build

### Link opens in Safari instead of app

- Make sure you're not testing in Safari directly (use Messages/Email)
- Verify Associated Domains are configured correctly
- Check that the app is installed and signed with the correct Team ID

## Testing Locally

Universal Links only work with HTTPS and real domains. For local testing:

1. Use the web version with `?calc=` parameter
2. Test the decoding logic separately
3. Deploy to TestFlight for real device testing

## Additional Resources

- [Apple Universal Links Documentation](https://developer.apple.com/ios/universal-links/)
- [Expo Linking Documentation](https://docs.expo.dev/guides/linking/)
- [Apple App Site Association Validator](https://search.developer.apple.com/appsearch-validation-tool/)
