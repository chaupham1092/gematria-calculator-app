// Test script to verify all new ciphers work correctly
const { calculateGematriaWebCompatible, getAvailableCiphers } = require('./src/utils/webCompatibleCalculator.js');

// Test words
const testWords = ["test", "hello", "world", "gematria"];

// New ciphers to test
const newCiphers = [
  "Elizabethan 360",
  "William G. Gray", 
  "Synx",
  "Beatus of Liebana",
  "Prime Qabalah",
  "False Kabbalah"
];

console.log("=== NEW CIPHERS TEST ===\n");

// Get all available ciphers
const availableCiphers = getAvailableCiphers();

// Test each new cipher
newCiphers.forEach(cipherName => {
  console.log(`Testing cipher: ${cipherName}`);
  console.log("=" + "=".repeat(cipherName.length + 15));
  
  // Find cipher info
  const cipherKey = Object.keys(availableCiphers).find(key => 
    availableCiphers[key].name === cipherName
  );
  
  if (!cipherKey) {
    console.log(`❌ Cipher not found: ${cipherName}\n`);
    return;
  }
  
  const cipherInfo = availableCiphers[cipherKey];
  console.log(`Description: ${cipherInfo.description}`);
  console.log(`Category: ${cipherInfo.category}`);
  console.log(`RGB: [${cipherInfo.rgb.join(', ')}]`);
  console.log();
  
  // Test with each word
  testWords.forEach(word => {
    // Create selected ciphers object with only this cipher enabled
    const selectedCiphers = {};
    selectedCiphers[cipherKey] = true;
    selectedCiphers[cipherName] = true;
    
    // Calculate result
    const results = calculateGematriaWebCompatible(word, selectedCiphers);
    const result = results.find(r => r.name === cipherName);
    
    if (result) {
      console.log(`"${word}" = ${result.totalValue}`);
      
      // Show word breakdown if multiple words
      if (result.wordValues.length > 1) {
        result.wordValues.forEach(wv => {
          console.log(`  "${wv.word}" = ${wv.value}`);
        });
      }
      
      // Show letter breakdown for first word
      if (result.letterBreakdowns.length > 0 && result.letterBreakdowns[0]) {
        console.log(`  Letters: ${result.letterBreakdowns[0]}`);
      }
    } else {
      console.log(`❌ No result for "${word}"`);
    }
  });
  
  console.log();
});

// Test all ciphers together with a single word
console.log("=== ALL CIPHERS TEST ===");
console.log(`Testing word "test" with all ciphers:\n`);

// Enable all ciphers
const allSelectedCiphers = {};
Object.keys(availableCiphers).forEach(key => {
  allSelectedCiphers[key] = true;
  allSelectedCiphers[availableCiphers[key].name] = true;
});

// Calculate with all ciphers
const allResults = calculateGematriaWebCompatible("test", allSelectedCiphers);

// Group by category
const resultsByCategory = {};
allResults.forEach(result => {
  if (!resultsByCategory[result.category]) {
    resultsByCategory[result.category] = [];
  }
  resultsByCategory[result.category].push(result);
});

// Display results by category
Object.keys(resultsByCategory).sort().forEach(category => {
  console.log(`${category}:`);
  resultsByCategory[category].forEach(result => {
    console.log(`  ${result.name}: ${result.totalValue}`);
  });
  console.log();
});

console.log("=== TEST COMPLETE ===");
