import { ciphers, processTextWithCipher } from '../data/ciphers';

// Calculate gematria values for input text using selected ciphers
export const calculateGematria = (text, selectedCiphers) => {
  const results = [];
  
  if (!text.trim()) {
    return results;
  }
  
  // Process each selected cipher
  for (const cipherKey in ciphers) {
    // Skip if cipher is not selected
    if (!selectedCiphers[cipherKey]) continue;
    
    const cipher = ciphers[cipherKey];
    const result = processTextWithCipher(text, cipher);
    
    results.push({
      key: cipherKey,
      name: cipher.name,
      description: cipher.description,
      totalValue: result.totalValue,
      wordValues: result.wordValues,
      letterBreakdowns: result.letterBreakdowns
    });
  }
  
  return results;
};

// Get all ciphers with initial selection state (all selected by default)
export const getInitialCipherSelections = () => {
  const selections = {};
  
  // Loop through all ciphers and set each to true (selecting all by default)
  for (const cipherKey in ciphers) {
    selections[cipherKey] = true; // Set all ciphers as selected
  }
  
  return selections;
};

// Filter ciphers by search term
export const filterCiphersBySearchTerm = (searchTerm) => {
  const filteredCiphers = {};
  
  for (const cipherKey in ciphers) {
    const cipher = ciphers[cipherKey];
    if (cipher.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      filteredCiphers[cipherKey] = cipher;
    }
  }
  
  return filteredCiphers;
};
