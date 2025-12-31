import { Platform } from 'react-native';
import { registerRootComponent } from 'expo';

let App;

if (Platform.OS === 'web') {
  // Use the custom web app with 3-column layout
  App = require('./App.web.js').default;
} else {
  // Use the mobile app with navigation
  App = require('./App.js').default;
}

registerRootComponent(App);