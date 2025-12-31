// Web-compatible calculator using the exact web version cipher system
const { Gem_Launch, allCiphers, cipherArray } = require('../data/webCipherSystem.js');

// Initialize the cipher system
Gem_Launch();

// Calculate gematria values using the web version cipher system
const calculateGematriaWebCompatible = (text, selectedCiphers) => {
  const results = [];
  
  if (!text.trim()) {
    return results;
  }
  
  // Process each cipher using the web version system
  for (let i = 0; i < allCiphers.length; i++) {
    const cipher = allCiphers[i];
    const cipherName = cipher.Nickname;
    
    // Skip if cipher is not selected (check both cipher name and key)
    let isSelected = false;
    
    // Check if selected by cipher name
    if (selectedCiphers[cipherName]) {
      isSelected = true;
    }
    
    // Also check by cipher key (for compatibility with existing mobile app)
    const cipherKey = getCipherKeyFromName(cipherName);
    if (cipherKey && selectedCiphers[cipherKey]) {
      isSelected = true;
    }
    
    if (!isSelected) continue;
    
    // Calculate using web version's Gematria method
    const totalValue = cipher.Gematria(text, 1);
    const category = cipherArray[cipherName] || "Other";
    
    // Calculate word breakdown
    const words = text.toLowerCase().split(/\s+/);
    const wordValues = [];
    const letterBreakdowns = [];
    
    words.forEach(word => {
      const wordValue = cipher.Gematria(word, 1);
      wordValues.push({
        word: word,
        value: wordValue
      });
      
      // Calculate letter breakdown
      let letterBreakdown = '';
      for (let j = 0; j < word.length; j++) {
        const char = word[j];
        const charValue = cipher.Gematria(char, 1);
        if (charValue > 0) {
          letterBreakdown += char + "=" + charValue + ' ';
        }
      }
      letterBreakdowns.push(letterBreakdown.trim());
    });
    
    results.push({
      key: cipherKey || cipherName.toLowerCase().replace(/\s+/g, ''),
      name: cipher.Nickname,
      description: getCipherDescription(cipher),
      totalValue: totalValue,
      wordValues: wordValues,
      letterBreakdowns: letterBreakdowns,
      category: category,
      rgb: cipher.RGB
    });
  }
  
  return results;
};

// Helper function to get cipher key from name for compatibility
function getCipherKeyFromName(cipherName) {
  const nameToKeyMap = {
    "English Ordinal": "englishOrdinal",
    "Full Reduction": "fullReduction",
    "Single Reduction": "singleReduction",
    "Full Reduction KV": "fullReductionKV",
    "Single Reduction KV": "singleReductionKV",
    "Extended English": "extendedEnglish",
    "Francis Bacon": "francisBacon",
    "Franc Baconis": "francBaconis",
    "Satanic": "satanic",
    "Reverse Ordinal": "reverseOrdinal",
    "Reverse Full Reduction": "reverseFullReduction",
    "Reverse Single Reduction": "reverseSingleReduction",
    "Reverse Full Reduction EP": "reverseFullReductionEP",
    "Reverse Single Reduction EP": "reverseSingleReductionEP",
    "Reverse Extended": "reverseExtended",
    "Reverse Francis Bacon": "reverseFrancisBacon",
    "Reverse Franc Baconis": "reverseFrancBaconis",
    "Reverse Satanic": "reverseSatanic",
    "Jewish": "jewish",
    "Jewish Reduction": "jewishReduction",
    "Jewish Ordinal": "jewishOrdinal",
    "ALW Kabbalah": "alwKabbalah",
    "KFW Kabbalah": "kfwKabbalah",
    "LCH Kabbalah": "lchKabbalah",
    "English Sumerian": "englishSumerian",
    "Reverse English Sumerian": "reverseEnglishSumerian",
    "Primes": "primes",
    "Trigonal": "trigonal",
    "Squares": "squares",
    "Reverse Primes": "reversePrimes",
    "Reverse Trigonal": "reverseTrigonal",
    "Reverse Squares": "reverseSquares",
    "Septenary": "septenary",
    "Chaldean": "chaldean",
    "Keypad": "keypad",
    "Fibonacci": "fibonacci",
    "Alphanumeric Qabbala": "alphanumericQabbala",
    "Elizabethan 360": "elizabethan360",
    "William G. Gray": "williamGGray",
    "Synx": "synx",
    "Beatus of Liebana": "beatusLiebana",
    "Prime Qabalah": "primeQabalah",
    "False Kabbalah": "falseKabbalah"
  };
  
  return nameToKeyMap[cipherName];
}

// Helper function to get cipher description
function getCipherDescription(cipher) {
  const name = cipher.Nickname;
  
  // Handle specific new ciphers with predefined mappings
  if (name === 'Elizabethan 360') {
    return 'A=1, B=2, C=3, D=4, E=5, F=6, G=8, H=9, I=10, J=10, K=12, L=15, M=18, N=20, O=24, P=30, Q=36, R=40, S=45, T=60, U=72, V=72, W=90, X=120, Y=180, Z=360';
  }
  
  if (name === 'William G. Gray') {
    return 'A=0, E=0, I=0, O=0, U=0, B=11, C=12, D=13, F=14, G=15, H=16, J=17, K=18, L=19, M=20, N=21, P=22, Q=23, R=24, S=25, T=26, V=27, W=28, X=29, Y=30, Z=31';
  }
  
  if (name === 'Synx') {
    return '0=1, 1=2, 2=3, 3=4, 4=5, 5=6, 6=7, 7=9, 8=10, 9=12, A=14, B=15, C=18, D=20, E=21, F=28, G=30, H=35, I=36, J=42, K=45, L=60, M=63, N=70, O=84, P=90, Q=105, R=126, S=140, T=180, U=210, V=252, W=315, X=420, Y=630, Z=1260';
  }
  
  if (name === 'Beatus of Liebana') {
    return 'A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9, J=9, K=10, L=20, M=30, N=40, O=50, P=60, Q=70, R=80, S=90, T=100, U=200, V=200, W=200, X=300, Y=400, Z=500';
  }
  
  if (name === 'Prime Qabalah') {
    return 'A=1, E=2, I=3, O=5, U=7, B=11, C=13, D=17, F=19, G=23, H=29, J=31, K=37, L=41, M=43, N=47, P=53, Q=59, R=61, S=67, T=71, V=73, W=79, X=83, Y=89, Z=97';
  }
  
  if (name === 'False Kabbalah') {
    return '0=36, 1=37, 2=38, 3=39, 4=40, 5=41, 6=42, 7=43, 8=44, 9=45, A=46, B=47, C=48, D=49, E=50, F=51, G=52, H=53, I=54, J=55, K=56, L=57, M=58, N=59, O=60, P=61, Q=62, R=63, S=64, T=65, U=66, V=67, W=68, X=69, Y=70, Z=71';
  }
  
  // For other ciphers, generate mapping dynamically
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const mappings = [];
  
  // Generate complete alphabet mapping by calculating each letter's value
  for (let i = 0; i < alphabet.length; i++) {
    const letter = alphabet[i];
    const value = cipher.Gematria(letter, 1);
    if (value > 0) {
      mappings.push(`${letter} = ${value}`);
    }
  }
  
  // If we have mappings, return them, otherwise return a default description
  if (mappings.length > 0) {
    return mappings.join(', ');
  }
  
  // Fallback for special ciphers that might not work with single letters
  const lowerName = name.toLowerCase();
  if (lowerName.includes('jewish') && lowerName.includes('reduction')) {
    return 'Reduce Jewish Gematria values to single digits';
  }
  if (lowerName.includes('alphanumeric') || lowerName.includes('qabbala')) {
    return 'Base-36 notation: 0=0, 1=1, 2=2, 3=3, 4=4, 5=5, 6=6, 7=7, 8=8, 9=9, A=10, B=11, C=12, D=13, E=14, F=15, G=16, H=17, I=18, J=19, K=20, L=21, M=22, N=23, O=24, P=25, Q=26, R=27, S=28, T=29, U=30, V=31, W=32, X=33, Y=34, Z=35';
  }
  
  return 'Custom cipher mapping';
}

// Get all available ciphers with web version compatibility
const getAvailableCiphers = () => {
  const ciphers = {};
  
  for (let i = 0; i < allCiphers.length; i++) {
    const cipher = allCiphers[i];
    const cipherKey = getCipherKeyFromName(cipher.Nickname) || cipher.Nickname.toLowerCase().replace(/\s+/g, '');
    
    ciphers[cipherKey] = {
      name: cipher.Nickname,
      description: getCipherDescription(cipher),
      category: cipherArray[cipher.Nickname] || "Other",
      rgb: cipher.RGB
    };
  }
  
  return ciphers;
};

// Get cipher categories with web version compatibility
const getCipherCategories = () => {
  const categories = {
    English: [],
    Reverse: [],
    Jewish: [],
    Kabbalah: [],
    Mathematical: [],
    Other: []
  };
  
  for (let i = 0; i < allCiphers.length; i++) {
    const cipher = allCiphers[i];
    const cipherKey = getCipherKeyFromName(cipher.Nickname) || cipher.Nickname.toLowerCase().replace(/\s+/g, '');
    const category = cipherArray[cipher.Nickname] || "Other";
    
    if (categories[category]) {
      categories[category].push(cipherKey);
    }
  }
  
  return categories;
};

// Export for CommonJS
module.exports = {
  calculateGematriaWebCompatible,
  getAvailableCiphers,
  getCipherCategories
};
