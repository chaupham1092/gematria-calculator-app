// Define the gematria ciphers
export const ciphers = {
  // English Ordinal (a=1, b=2, c=3, etc.)
  englishOrdinal: {
    name: "English Ordinal",
    description: "A = 1, B = 2, C = 3, ..., Z = 26",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 
      'j': 10, 'k': 11, 'l': 12, 'm': 13, 'n': 14, 'o': 15, 'p': 16, 'q': 17, 
      'r': 18, 's': 19, 't': 20, 'u': 21, 'v': 22, 'w': 23, 'x': 24, 'y': 25, 'z': 26
    }
  },
  
  // Full Reduction (reduces all letters to 1-9)
  fullReduction: {
    name: "Full Reduction",
    description: "A = 1, B = 2, ..., I = 9, J = 1, K = 2, ...",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 
      'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9, 
      's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    }
  },
  
  // Reverse Ordinal
  reverseOrdinal: {
    name: "Reverse Ordinal",
    description: "Z = 1, Y = 2, X = 3, ..., A = 26",
    values: {
      'a': 26, 'b': 25, 'c': 24, 'd': 23, 'e': 22, 'f': 21, 'g': 20, 'h': 19, 'i': 18, 
      'j': 17, 'k': 16, 'l': 15, 'm': 14, 'n': 13, 'o': 12, 'p': 11, 'q': 10, 
      'r': 9, 's': 8, 't': 7, 'u': 6, 'v': 5, 'w': 4, 'x': 3, 'y': 2, 'z': 1
    }
  },
  
  // Jewish/Hebrew Gematria
  jewish: {
    name: "Jewish Gematria",
    description: "Based on the Hebrew system with exponential values.",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 
      'j': 10, 'k': 20, 'l': 30, 'm': 40, 'n': 50, 'o': 60, 'p': 70, 'q': 80, 'r': 90, 
      's': 100, 't': 200, 'u': 300, 'v': 400, 'w': 500, 'x': 600, 'y': 700, 'z': 800
    }
  },
  
  // Single Reduction
  singleReduction: {
    name: "Single Reduction",
    description: "A=1, B=2, ..., I=9, J=1, K=11, ...",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 
      'j': 1, 'k': 11, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9, 
      's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    }
  },
  
  // Full Reduction KV
  fullReductionKV: {
    name: "Full Reduction KV",
    description: "A=1, B=2, ..., I=9, J=1, K=11, V=22, ...",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 
      'j': 1, 'k': 11, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9, 
      's': 1, 't': 2, 'u': 3, 'v': 22, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    }
  },
  
  // Single Reduction KV
  singleReductionKV: {
    name: "Single Reduction KV",
    description: "A=1, B=2, ..., I=9, J=1, K=11, S=10, T=20, V=22, ...",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 
      'j': 1, 'k': 11, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9, 
      's': 10, 't': 20, 'u': 3, 'v': 22, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    }
  },
  
  // Extended English
  extendedEnglish: {
    name: "Extended English",
    description: "A=1, B=2, ..., Z=26, a=27, b=28, ..., z=52",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 
      'j': 10, 'k': 11, 'l': 12, 'm': 13, 'n': 14, 'o': 15, 'p': 16, 'q': 17, 
      'r': 18, 's': 19, 't': 20, 'u': 21, 'v': 22, 'w': 23, 'x': 24, 'y': 25, 'z': 26
    }
  },

  // Francis Bacon
  francisBacon: {
    name: "Francis Bacon",
    description: "A = 1, B = 2, ..., Z = 26 (uppercase); a = 27, b = 28, ..., z = 52 (lowercase)",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 
      'j': 10, 'k': 11, 'l': 12, 'm': 13, 'n': 14, 'o': 15, 'p': 16, 'q': 17, 
      'r': 18, 's': 19, 't': 20, 'u': 21, 'v': 22, 'w': 23, 'x': 24, 'y': 25, 'z': 26
    }
  },
  
  // Franc Baconis
  francBaconis: {
    name: "Franc Baconis",
    description: "A = 1, B = 2, ..., Z = 26 (uppercase); a = 1, b = 2, ..., z = 26 (lowercase)",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 
      'j': 10, 'k': 11, 'l': 12, 'm': 13, 'n': 14, 'o': 15, 'p': 16, 'q': 17, 
      'r': 18, 's': 19, 't': 20, 'u': 21, 'v': 22, 'w': 23, 'x': 24, 'y': 25, 'z': 26
    }
  },
  
  // Satanic
  satanic: {
    name: "Satanic",
    description: "A = 36, B = 37, ..., Z = 61",
    values: {
      'a': 36, 'b': 37, 'c': 38, 'd': 39, 'e': 40, 'f': 41, 'g': 42, 'h': 43, 'i': 44, 
      'j': 45, 'k': 46, 'l': 47, 'm': 48, 'n': 49, 'o': 50, 'p': 51, 'q': 52, 
      'r': 53, 's': 54, 't': 55, 'u': 56, 'v': 57, 'w': 58, 'x': 59, 'y': 60, 'z': 61
    }
  },
  
  // Reverse Full Reduction
  reverseFullReduction: {
    name: "Reverse Full Reduction",
    description: "Z = 1, Y = 2, ..., R = 9, Q = 1, P = 2, ...",
    values: {
      'a': 8, 'b': 7, 'c': 6, 'd': 5, 'e': 4, 'f': 3, 'g': 2, 'h': 1, 'i': 9, 
      'j': 8, 'k': 7, 'l': 6, 'm': 5, 'n': 4, 'o': 3, 'p': 2, 'q': 1, 'r': 9, 
      's': 8, 't': 7, 'u': 6, 'v': 5, 'w': 4, 'x': 3, 'y': 2, 'z': 1
    }
  },
  
  // Reverse Single Reduction
  reverseSingleReduction: {
    name: "Reverse Single Reduction",
    description: "Z = 1, Y = 2, ..., R = 9, Q = 10, ...",
    values: {
      'a': 8, 'b': 7, 'c': 6, 'd': 5, 'e': 4, 'f': 3, 'g': 2, 'h': 1, 'i': 9, 
      'j': 8, 'k': 7, 'l': 6, 'm': 5, 'n': 4, 'o': 3, 'p': 2, 'q': 10, 'r': 9, 
      's': 8, 't': 7, 'u': 6, 'v': 5, 'w': 4, 'x': 3, 'y': 2, 'z': 1
    }
  },
  
  // Reverse Full Reduction EP
  reverseFullReductionEP: {
    name: "Reverse Full Reduction EP",
    description: "Z = 1, Y = 2, ..., R = 9, Q = 1, P = 2, ... (Exception Patterns)",
    values: {
      'a': 8, 'b': 7, 'c': 6, 'd': 5, 'e': 4, 'f': 3, 'g': 2, 'h': 1, 'i': 9, 
      'j': 8, 'k': 7, 'l': 6, 'm': 5, 'n': 4, 'o': 3, 'p': 2, 'q': 1, 'r': 9, 
      's': 8, 't': 7, 'u': 6, 'v': 5, 'w': 4, 'x': 3, 'y': 2, 'z': 1
    }
  },
  
  // Reverse Single Reduction EP
  reverseSingleReductionEP: {
    name: "Reverse Single Reduction EP",
    description: "Z = 1, Y = 2, ..., R = 9, Q = 10, ... (Exception Patterns)",
    values: {
      'a': 8, 'b': 7, 'c': 6, 'd': 5, 'e': 4, 'f': 3, 'g': 2, 'h': 1, 'i': 9, 
      'j': 8, 'k': 7, 'l': 6, 'm': 5, 'n': 4, 'o': 3, 'p': 2, 'q': 10, 'r': 9, 
      's': 8, 't': 7, 'u': 6, 'v': 5, 'w': 4, 'x': 3, 'y': 2, 'z': 1
    }
  },
  
  // Reverse Extended
  reverseExtended: {
    name: "Reverse Extended",
    description: "Z = 1, Y = 2, ..., A = 26, z = 27, y = 28, ..., a = 52",
    values: {
      'a': 26, 'b': 25, 'c': 24, 'd': 23, 'e': 22, 'f': 21, 'g': 20, 'h': 19, 'i': 18, 
      'j': 17, 'k': 16, 'l': 15, 'm': 14, 'n': 13, 'o': 12, 'p': 11, 'q': 10, 
      'r': 9, 's': 8, 't': 7, 'u': 6, 'v': 5, 'w': 4, 'x': 3, 'y': 2, 'z': 1
    }
  },
  
  // Reverse Francis Bacon
  reverseFrancisBacon: {
    name: "Reverse Francis Bacon",
    description: "Z = 1, Y = 2, ..., A = 26 (uppercase); z = 27, y = 28, ..., a = 52 (lowercase)",
    values: {
      'a': 26, 'b': 25, 'c': 24, 'd': 23, 'e': 22, 'f': 21, 'g': 20, 'h': 19, 'i': 18, 
      'j': 17, 'k': 16, 'l': 15, 'm': 14, 'n': 13, 'o': 12, 'p': 11, 'q': 10, 
      'r': 9, 's': 8, 't': 7, 'u': 6, 'v': 5, 'w': 4, 'x': 3, 'y': 2, 'z': 1
    }
  },
  
  // Reverse Franc Baconis
  reverseFrancBaconis: {
    name: "Reverse Franc Baconis",
    description: "Z = 1, Y = 2, ..., A = 26 (uppercase); z = 1, y = 2, ..., a = 26 (lowercase)",
    values: {
      'a': 26, 'b': 25, 'c': 24, 'd': 23, 'e': 22, 'f': 21, 'g': 20, 'h': 19, 'i': 18, 
      'j': 17, 'k': 16, 'l': 15, 'm': 14, 'n': 13, 'o': 12, 'p': 11, 'q': 10, 
      'r': 9, 's': 8, 't': 7, 'u': 6, 'v': 5, 'w': 4, 'x': 3, 'y': 2, 'z': 1
    }
  },
  
  // Reverse Satanic
  reverseSatanic: {
    name: "Reverse Satanic",
    description: "Z = 36, Y = 37, ..., A = 61",
    values: {
      'a': 61, 'b': 60, 'c': 59, 'd': 58, 'e': 57, 'f': 56, 'g': 55, 'h': 54, 'i': 53, 
      'j': 52, 'k': 51, 'l': 50, 'm': 49, 'n': 48, 'o': 47, 'p': 46, 'q': 45, 
      'r': 44, 's': 43, 't': 42, 'u': 41, 'v': 40, 'w': 39, 'x': 38, 'y': 37, 'z': 36
    }
  },
  
  // Jewish Reduction
  jewishReduction: {
    name: "Jewish Reduction",
    description: "A = 1, B = 2, ..., I = 9, J = 1, K = 2, ... (Jewish pattern)",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 
      'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9, 
      's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    }
  },
  
  // Jewish Ordinal
  jewishOrdinal: {
    name: "Jewish Ordinal",
    description: "A = 1, B = 2, C = 3, ..., Z = 26 (Jewish pattern)",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 
      'j': 10, 'k': 11, 'l': 12, 'm': 13, 'n': 14, 'o': 15, 'p': 16, 'q': 17, 
      'r': 18, 's': 19, 't': 20, 'u': 21, 'v': 22, 'w': 23, 'x': 24, 'y': 25, 'z': 26
    }
  },
  
  // ALW Kabbalah
  alwKabbalah: {
    name: "ALW Kabbalah",
    description: "A = 1, L = 2, W = 3, H = 4, S = 5, D = 6, O = 7, Z = 8, K = 9, ...",
    values: {
      'a': 1, 'l': 2, 'w': 3, 'h': 4, 's': 5, 'd': 6, 'o': 7, 'z': 8, 'k': 9, 
      'v': 10, 'g': 20, 'r': 30, 'c': 40, 'n': 50, 'y': 60, 'j': 70, 'u': 80, 'f': 90, 
      'q': 100, 'b': 200, 'm': 300, 'x': 400, 'i': 500, 't': 600, 'e': 700, 'p': 800
    }
  },
  
  // KFW Kabbalah
  kfwKabbalah: {
    name: "KFW Kabbalah",
    description: "K = 1, F = 2, W = 3, R = 4, H = 5, N = 6, Y = 7, L = 8, P = 9, ...",
    values: {
      'k': 1, 'f': 2, 'w': 3, 'r': 4, 'h': 5, 'n': 6, 'y': 7, 'l': 8, 'p': 9, 
      'x': 10, 's': 20, 'i': 30, 'b': 40, 'g': 50, 'm': 60, 'j': 70, 'v': 80, 'a': 90, 
      'z': 100, 'c': 200, 'q': 300, 'd': 400, 't': 500, 'o': 600, 'e': 700, 'u': 800
    }
  },
  
  // LCH Kabbalah
  lchKabbalah: {
    name: "LCH Kabbalah",
    description: "L = 1, C = 2, H = 3, Q = 4, Z = 5, V = 6, P = 7, S = 8, D = 9, ...",
    values: {
      'l': 1, 'c': 2, 'h': 3, 'q': 4, 'z': 5, 'v': 6, 'p': 7, 's': 8, 'd': 9, 
      'g': 10, 'j': 20, 'a': 30, 'o': 40, 'u': 50, 'i': 60, 'n': 70, 'r': 80, 'e': 90, 
      'k': 100, 'f': 200, 'w': 300, 'b': 400, 'x': 500, 'm': 600, 't': 700, 'y': 800
    }
  },
  
  // English Sumerian
  englishSumerian: {
    name: "English Sumerian",
    description: "A = 6, B = 12, C = 18, ..., Z = 156",
    values: {
      'a': 6, 'b': 12, 'c': 18, 'd': 24, 'e': 30, 'f': 36, 'g': 42, 'h': 48, 'i': 54, 
      'j': 60, 'k': 66, 'l': 72, 'm': 78, 'n': 84, 'o': 90, 'p': 96, 'q': 102, 
      'r': 108, 's': 114, 't': 120, 'u': 126, 'v': 132, 'w': 138, 'x': 144, 'y': 150, 'z': 156
    }
  },
  
  // Reverse English Sumerian
  reverseEnglishSumerian: {
    name: "Reverse English Sumerian",
    description: "Z = 6, Y = 12, X = 18, ..., A = 156",
    values: {
      'z': 6, 'y': 12, 'x': 18, 'w': 24, 'v': 30, 'u': 36, 't': 42, 's': 48, 'r': 54, 
      'q': 60, 'p': 66, 'o': 72, 'n': 78, 'm': 84, 'l': 90, 'k': 96, 'j': 102, 
      'i': 108, 'h': 114, 'g': 120, 'f': 126, 'e': 132, 'd': 138, 'c': 144, 'b': 150, 'a': 156
    }
  },
  
  // Primes
  primes: {
    name: "Primes",
    description: "A = 2, B = 3, C = 5, D = 7, ...",
    values: {
      'a': 2, 'b': 3, 'c': 5, 'd': 7, 'e': 11, 'f': 13, 'g': 17, 'h': 19, 'i': 23, 
      'j': 29, 'k': 31, 'l': 37, 'm': 41, 'n': 43, 'o': 47, 'p': 53, 'q': 59, 
      'r': 61, 's': 67, 't': 71, 'u': 73, 'v': 79, 'w': 83, 'x': 89, 'y': 97, 'z': 101
    }
  },
  
  // Trigonal
  trigonal: {
    name: "Trigonal",
    description: "A = 1, B = 3, C = 6, D = 10, ...",
    values: {
      'a': 1, 'b': 3, 'c': 6, 'd': 10, 'e': 15, 'f': 21, 'g': 28, 'h': 36, 'i': 45, 
      'j': 55, 'k': 66, 'l': 78, 'm': 91, 'n': 105, 'o': 120, 'p': 136, 'q': 153, 
      'r': 171, 's': 190, 't': 210, 'u': 231, 'v': 253, 'w': 276, 'x': 300, 'y': 325, 'z': 351
    }
  },
  
  // Squares
  squares: {
    name: "Squares",
    description: "A = 1, B = 4, C = 9, D = 16, ...",
    values: {
      'a': 1, 'b': 4, 'c': 9, 'd': 16, 'e': 25, 'f': 36, 'g': 49, 'h': 64, 'i': 81, 
      'j': 100, 'k': 121, 'l': 144, 'm': 169, 'n': 196, 'o': 225, 'p': 256, 'q': 289, 
      'r': 324, 's': 361, 't': 400, 'u': 441, 'v': 484, 'w': 529, 'x': 576, 'y': 625, 'z': 676
    }
  },
  
  // Reverse Primes
  reversePrimes: {
    name: "Reverse Primes",
    description: "Z = 2, Y = 3, X = 5, W = 7, ...",
    values: {
      'z': 2, 'y': 3, 'x': 5, 'w': 7, 'v': 11, 'u': 13, 't': 17, 's': 19, 'r': 23, 
      'q': 29, 'p': 31, 'o': 37, 'n': 41, 'm': 43, 'l': 47, 'k': 53, 'j': 59, 
      'i': 61, 'h': 67, 'g': 71, 'f': 73, 'e': 79, 'd': 83, 'c': 89, 'b': 97, 'a': 101
    }
  },
  
  // Reverse Trigonal
  reverseTrigonal: {
    name: "Reverse Trigonal",
    description: "Z = 1, Y = 3, X = 6, W = 10, ...",
    values: {
      'z': 1, 'y': 3, 'x': 6, 'w': 10, 'v': 15, 'u': 21, 't': 28, 's': 36, 'r': 45, 
      'q': 55, 'p': 66, 'o': 78, 'n': 91, 'm': 105, 'l': 120, 'k': 136, 'j': 153, 
      'i': 171, 'h': 190, 'g': 210, 'f': 231, 'e': 253, 'd': 276, 'c': 300, 'b': 325, 'a': 351
    }
  },
  
  // Reverse Squares
  reverseSquares: {
    name: "Reverse Squares",
    description: "Z = 1, Y = 4, X = 9, W = 16, ...",
    values: {
      'z': 1, 'y': 4, 'x': 9, 'w': 16, 'v': 25, 'u': 36, 't': 49, 's': 64, 'r': 81, 
      'q': 100, 'p': 121, 'o': 144, 'n': 169, 'm': 196, 'l': 225, 'k': 256, 'j': 289, 
      'i': 324, 'h': 361, 'g': 400, 'f': 441, 'e': 484, 'd': 529, 'c': 576, 'b': 625, 'a': 676
    }
  },
  
  // Septenary
  septenary: {
    name: "Septenary",
    description: "A = 1, B = 2, C = 3, D = 4, E = 5, F = 6, G = 7, H = 1, ...",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 
      'h': 1, 'i': 2, 'j': 3, 'k': 4, 'l': 5, 'm': 6, 'n': 7, 
      'o': 1, 'p': 2, 'q': 3, 'r': 4, 's': 5, 't': 6, 'u': 7, 
      'v': 1, 'w': 2, 'x': 3, 'y': 4, 'z': 5
    }
  },
  
  // Chaldean
  chaldean: {
    name: "Chaldean",
    description: "A = 1, B = 2, C = 3, D = 4, E = 5, F = 8, G = 3, H = 5, ...",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 8, 'g': 3, 'h': 5, 'i': 1, 
      'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 7, 'p': 8, 'q': 1, 'r': 2, 
      's': 3, 't': 4, 'u': 6, 'v': 6, 'w': 6, 'x': 5, 'y': 1, 'z': 7
    }
  },
  
  // Keypad
  keypad: {
    name: "Keypad",
    description: "Based on telephone keypad: ABC=2, DEF=3, GHI=4, ...",
    values: {
      'a': 2, 'b': 2, 'c': 2, 'd': 3, 'e': 3, 'f': 3, 'g': 4, 'h': 4, 'i': 4, 
      'j': 5, 'k': 5, 'l': 5, 'm': 6, 'n': 6, 'o': 6, 'p': 7, 'q': 7, 'r': 7, 's': 7, 
      't': 8, 'u': 8, 'v': 8, 'w': 9, 'x': 9, 'y': 9, 'z': 9
    }
  },
  
  // Fibonacci
  fibonacci: {
    name: "Fibonacci",
    description: "A = 1, B = 1, C = 2, D = 3, E = 5, ...",
    values: {
      'a': 1, 'b': 1, 'c': 2, 'd': 3, 'e': 5, 'f': 8, 'g': 13, 'h': 21, 'i': 34, 
      'j': 55, 'k': 89, 'l': 144, 'm': 233, 'n': 377, 'o': 610, 'p': 987, 'q': 1597, 
      'r': 2584, 's': 4181, 't': 6765, 'u': 10946, 'v': 17711, 'w': 28657, 'x': 46368, 'y': 75025, 'z': 121393
    }
  }
};

// Group ciphers by category for the UI
export const cipherCategories = {
  English: [
    'englishOrdinal',
    'fullReduction',
    'singleReduction',
    'fullReductionKV',
    'singleReductionKV',
    'extendedEnglish',
    'francisBacon',
    'francBaconis',
    'englishSumerian',
    'septenary',
    'chaldean',
    'keypad',
    'fibonacci'
  ],
  Reverse: [
    'reverseOrdinal',
    'reverseFullReduction',
    'reverseSingleReduction',
    'reverseFullReductionEP',
    'reverseSingleReductionEP',
    'reverseExtended',
    'reverseFrancisBacon',
    'reverseFrancBaconis',
    'reverseEnglishSumerian',
    'reversePrimes',
    'reverseTrigonal',
    'reverseSquares'
  ],
  Jewish: [
    'jewish',
    'jewishReduction',
    'jewishOrdinal',
    'alwKabbalah',
    'kfwKabbalah',
    'lchKabbalah'
  ],
  Mathematical: [
    'primes',
    'trigonal',
    'squares'
  ],
  Other: [
    'satanic',
    'reverseSatanic'
  ]
};

// Process text with a specific cipher
export const processTextWithCipher = (text, cipher) => {
  const words = text.toLowerCase().split(/\s+/);
  let totalValue = 0;
  const wordValues = [];
  const letterBreakdowns = [];
  
  // Process each word
  words.forEach(word => {
    let wordValue = 0;
    let letterBreakdown = '';
    
    // Process each letter in the word
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      const value = cipher.values[letter] || 0;
      
      if (value) {
        wordValue += value;
        letterBreakdown += letter + "=" + value + ' ';
      }
    }
    
    totalValue += wordValue;
    wordValues.push({
      word: word,
      value: wordValue
    });
    letterBreakdowns.push(letterBreakdown.trim());
  });
  
  return {
    totalValue,
    wordValues,
    letterBreakdowns
  };
};