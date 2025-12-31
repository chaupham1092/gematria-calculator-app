import { ciphers, processTextWithCipher } from '../data/ciphers';
import { calculateGematriaWebCompatible, getAvailableCiphers, getCipherCategories } from './webCompatibleCalculator';

// Calculate gematria values for input text using selected ciphers
// Now uses the web-compatible calculator for exact web version compatibility
export const calculateGematria = (text, selectedCiphers) => {
  // Use the web-compatible calculator for accurate results
  return calculateGematriaWebCompatible(text, selectedCiphers);
};

// Get all ciphers with initial selection state (all selected by default)
export const getInitialCipherSelections = () => {
  const selections = {};

  // Get ciphers from the web-compatible system
  const availableCiphers = getAvailableCiphers();

  // Loop through all ciphers and set each to true (selecting all by default)
  for (const cipherKey in availableCiphers) {
    selections[cipherKey] = true; // Set all ciphers as selected
    // Also enable by cipher name for compatibility
    selections[availableCiphers[cipherKey].name] = true;
  }

  return selections;
};

// Filter ciphers by search term
export const filterCiphersBySearchTerm = (searchTerm) => {
  const filteredCiphers = {};

  // Get ciphers from the web-compatible system
  const availableCiphers = getAvailableCiphers();

  for (const cipherKey in availableCiphers) {
    const cipher = availableCiphers[cipherKey];
    if (cipher.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      filteredCiphers[cipherKey] = cipher;
    }
  }

  return filteredCiphers;
};

// Export additional functions from web-compatible calculator
export { getAvailableCiphers, getCipherCategories };
