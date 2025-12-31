// Test script to validate sentence calculations match web version exactly
const { calculateGematriaWebCompatible, getAvailableCiphers } = require('./src/utils/webCompatibleCalculator.js');

// Test sentences
const testSentences = [
  "this is a test",
  "hello world",
  "gematria calculator",
  "the quick brown fox"
];

console.log("=== SENTENCE VALIDATION TEST ===\n");

// Get all available ciphers
const availableCiphers = getAvailableCiphers();

// Enable all ciphers
const allSelectedCiphers = {};
Object.keys(availableCiphers).forEach(key => {
  allSelectedCiphers[key] = true;
  allSelectedCiphers[availableCiphers[key].name] = true;
});

// Test each sentence
testSentences.forEach(sentence => {
  console.log(`Testing sentence: "${sentence}"`);
  console.log("=" + "=".repeat(sentence.length + 18));
  
  // Calculate with web-compatible calculator
  const results = calculateGematriaWebCompatible(sentence, allSelectedCiphers);
  
  // Group by category for better organization
  const resultsByCategory = {};
  results.forEach(result => {
    if (!resultsByCategory[result.category]) {
      resultsByCategory[result.category] = [];
    }
    resultsByCategory[result.category].push(result);
  });
  
  // Display results by category
  Object.keys(resultsByCategory).sort().forEach(category => {
    console.log(`\n${category}:`);
    resultsByCategory[category].forEach(result => {
      console.log(`  ${result.name}: ${result.totalValue}`);
      
      // Show word breakdown for sentences
      if (result.wordValues.length > 1) {
        const wordBreakdown = result.wordValues.map(wv => `"${wv.word}"=${wv.value}`).join(' + ');
        console.log(`    Words: ${wordBreakdown}`);
      }
      
      // Show letter breakdown for first word only (to avoid clutter)
      if (result.letterBreakdowns.length > 0 && result.letterBreakdowns[0]) {
        console.log(`    Letters: ${result.letterBreakdowns[0]}`);
      }
    });
  });
  
  console.log("\n" + "=".repeat(50) + "\n");
});

// Test specific ciphers that are most important
console.log("=== KEY CIPHER VALIDATION ===");
const keyCiphers = [
  "English Ordinal",
  "Full Reduction", 
  "Jewish",
  "Jewish Reduction",
  "Jewish Ordinal",
  "Reverse Ordinal",
  "Reverse Full Reduction",
  "Elizabethan 360",
  "William G. Gray",
  "Synx",
  "Beatus of Liebana",
  "Prime Qabalah",
  "False Kabbalah"
];

const testSentence = "this is a test";
console.log(`\nDetailed test for: "${testSentence}"`);
console.log("=" + "=".repeat(testSentence.length + 20));

const results = calculateGematriaWebCompatible(testSentence, allSelectedCiphers);

keyCiphers.forEach(cipherName => {
  const result = results.find(r => r.name === cipherName);
  if (result) {
    console.log(`\n${cipherName}: ${result.totalValue}`);
    
    // Show detailed breakdown
    if (result.wordValues.length > 1) {
      console.log("  Word breakdown:");
      result.wordValues.forEach((wv, index) => {
        console.log(`    "${wv.word}" = ${wv.value}`);
        if (result.letterBreakdowns[index]) {
          console.log(`      Letters: ${result.letterBreakdowns[index]}`);
        }
      });
    }
  } else {
    console.log(`\n${cipherName}: NOT FOUND`);
  }
});

console.log("\n=== TEST COMPLETE ===");
