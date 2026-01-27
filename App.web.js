import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import WebCalculator from './src/web/WebCalculator';

export default function App() {
  return (
    <HelmetProvider>
      <WebCalculator />
    </HelmetProvider>
  );
}
