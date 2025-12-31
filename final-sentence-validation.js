// Final validation test for sentence calculations
const { calculateGematriaWebCompatible, getAvailableCiphers } = require('./src/utils/webCompatibleCalculator.js');

// Test sentence with expected values (verified from web version)
const testSentence = "this is a test";

// Expected values from web version (manually verified)
const expectedValues = {
  "English Ordinal": 149,
  "Full Reduction": 41,
  "Single Reduction": 68,
  "Jewish": 602,
  "Jewish Reduction": 62,
  "Jewish Ordinal": 143,
  "Reverse Ordinal": 148,
  "Reverse Full Reduction": 76,
  "Extended English": 932,
  "Elizabethan 360": 350,
  "William G. Gray": 169,
  "Synx": 1102,
  "Beatus of Liebana": 602,
  "Prime Qabalah": 452,
  "False Kabbalah": 644
};

console.log("=== FINAL SENTENCE VALIDATION ===");
console.log(`Testing sentence: "${testSentence}"`);
console.log("=" + "=".repeat(testSentence.length + 18));

// Get all available ciphers
const availableCiphers = getAvailableCiphers();

// Enable all ciphers
const allSelectedCiphers = {};
Object.keys(availableCiphers).forEach(key => {
  allSelectedCiphers[key] = true;
  allSelectedCiphers[availableCiphers[key].name] = true;
});

// Calculate with web-compatible calculator
const results = calculateGematriaWebCompatible(testSentence, allSelectedCiphers);

let totalTests = 0;
let passedTests = 0;
let failedTests = [];

// Test each expected cipher
Object.entries(expectedValues).forEach(([cipherName, expectedValue]) => {
  totalTests++;
  
  const result = results.find(r => r.name === cipherName);
  const actualValue = result ? result.totalValue : null;
  
  if (actualValue === expectedValue) {
    console.log(`✓ ${cipherName}: ${actualValue}`);
    passedTests++;
  } else {
    console.log(`✗ ${cipherName}: Expected ${expectedValue}, Got ${actualValue}`);
    failedTests.push({
      cipher: cipherName,
      expected: expectedValue,
      actual: actualValue
    });
  }
});

// Summary
console.log("\n=== VALIDATION SUMMARY ===");
console.log(`Total tests: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${totalTests - passedTests}`);
console.log(`Success rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (failedTests.length > 0) {
  console.log("\n=== FAILED TESTS ===");
  failedTests.forEach(test => {
    console.log(`${test.cipher}: Expected ${test.expected}, Got ${test.actual}`);
  });
} else {
  console.log("\n🎉 ALL SENTENCE TESTS PASSED! Mobile app calculations match web version exactly.");
}

// Test word breakdown accuracy
console.log("\n=== WORD BREAKDOWN VALIDATION ===");
const englishOrdinalResult = results.find(r => r.name === "English Ordinal");
if (englishOrdinalResult) {
  console.log("English Ordinal word breakdown:");
  englishOrdinalResult.wordValues.forEach((wv, index) => {
    console.log(`  "${wv.word}" = ${wv.value}`);
    if (englishOrdinalResult.letterBreakdowns[index]) {
      console.log(`    Letters: ${englishOrdinalResult.letterBreakdowns[index]}`);
    }
  });
  
  // Verify total
  const wordSum = englishOrdinalResult.wordValues.reduce((sum, wv) => sum + wv.value, 0);
  console.log(`  Total from words: ${wordSum}`);
  console.log(`  Direct calculation: ${englishOrdinalResult.totalValue}`);
  console.log(`  Match: ${wordSum === englishOrdinalResult.totalValue ? "✓" : "✗"}`);
}

// Test new ciphers specifically
console.log("\n=== NEW CIPHERS VALIDATION ===");
const newCiphers = [
  "Elizabethan 360",
  "William G. Gray", 
  "Synx",
  "Beatus of Liebana",
  "Prime Qabalah",
  "False Kabbalah"
];

newCiphers.forEach(cipherName => {
  const result = results.find(r => r.name === cipherName);
  if (result) {
    console.log(`✓ ${cipherName}: ${result.totalValue} (Available and working)`);
  } else {
    console.log(`✗ ${cipherName}: Not found`);
  }
});

console.log("\n=== VALIDATION COMPLETE ===");
