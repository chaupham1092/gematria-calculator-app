// Final validation test to ensure mobile app matches web version exactly
const { calculateGematriaWebCompatible, getAvailableCiphers } = require('./src/utils/webCompatibleCalculator.js');

// Test cases with expected values from web version
const testCases = [
  {
    word: "test",
    expected: {
      "English Ordinal": 64,
      "Full Reduction": 10,
      "Single Reduction": 19,
      "Full Reduction KV": 10,
      "Single Reduction KV": 19,
      "Extended English": 505,
      "Jewish": 295,
      "Jewish Reduction": 16,
      "Jewish Ordinal": 61,
      "Reverse Ordinal": 44,
      "Reverse Full Reduction": 26,
      "Elizabethan 360": 170,
      "William G. Gray": 77,
      "Synx": 521,
      "Beatus of Liebana": 295,
      "Prime Qabalah": 211,
      "False Kabbalah": 244
    }
  },
  {
    word: "hello",
    expected: {
      "English Ordinal": 52,
      "Full Reduction": 7,
      "Extended English": 395,
      "Jewish": 83,
      "Elizabethan 360": 68,
      "William G. Gray": 54,
      "Synx": 260,
      "Beatus of Liebana": 103,
      "Prime Qabalah": 118,
      "False Kabbalah": 277
    }
  }
];

console.log("=== FINAL VALIDATION TEST ===\n");

// Get all available ciphers
const availableCiphers = getAvailableCiphers();

// Enable all ciphers
const allSelectedCiphers = {};
Object.keys(availableCiphers).forEach(key => {
  allSelectedCiphers[key] = true;
  allSelectedCiphers[availableCiphers[key].name] = true;
});

let totalTests = 0;
let passedTests = 0;
let failedTests = [];

// Test each case
testCases.forEach(testCase => {
  console.log(`Testing word: "${testCase.word}"`);
  console.log("=" + "=".repeat(testCase.word.length + 15));
  
  // Calculate with web-compatible calculator
  const results = calculateGematriaWebCompatible(testCase.word, allSelectedCiphers);
  
  // Check each expected cipher
  Object.entries(testCase.expected).forEach(([cipherName, expectedValue]) => {
    totalTests++;
    
    const result = results.find(r => r.name === cipherName);
    const actualValue = result ? result.totalValue : null;
    
    if (actualValue === expectedValue) {
      console.log(`✓ ${cipherName}: ${actualValue}`);
      passedTests++;
    } else {
      console.log(`✗ ${cipherName}: Expected ${expectedValue}, Got ${actualValue}`);
      failedTests.push({
        word: testCase.word,
        cipher: cipherName,
        expected: expectedValue,
        actual: actualValue
      });
    }
  });
  
  console.log();
});

// Summary
console.log("=== VALIDATION SUMMARY ===");
console.log(`Total tests: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${totalTests - passedTests}`);
console.log(`Success rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (failedTests.length > 0) {
  console.log("\n=== FAILED TESTS ===");
  failedTests.forEach(test => {
    console.log(`${test.word} - ${test.cipher}: Expected ${test.expected}, Got ${test.actual}`);
  });
} else {
  console.log("\n🎉 ALL TESTS PASSED! Mobile app calculations match web version exactly.");
}

// Test cipher count
console.log("\n=== CIPHER COUNT ===");
const webCipherCount = Object.keys(availableCiphers).length;
console.log(`Total ciphers available: ${webCipherCount}`);

// List new ciphers
const newCiphers = [
  "Elizabethan 360",
  "William G. Gray", 
  "Synx",
  "Beatus of Liebana",
  "Prime Qabalah",
  "False Kabbalah"
];

console.log("\n=== NEW CIPHERS ADDED ===");
newCiphers.forEach(cipherName => {
  const cipherKey = Object.keys(availableCiphers).find(key => 
    availableCiphers[key].name === cipherName
  );
  
  if (cipherKey) {
    console.log(`✓ ${cipherName} - Available`);
  } else {
    console.log(`✗ ${cipherName} - Missing`);
  }
});

console.log("\n=== VALIDATION COMPLETE ===");
