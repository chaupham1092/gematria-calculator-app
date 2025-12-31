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

  // Reverse Ordinal - Fixed to match web version exactly
  reverseOrdinal: {
    name: "Reverse Ordinal",
    description: "Z = 1, Y = 2, X = 3, ..., A = 26 (web version compatible)",
    values: {
      'a': 26, 'b': 25, 'c': 24, 'd': 23, 'e': 22, 'f': 21, 'g': 20, 'h': 19, 'i': 18,
      'j': 17, 'k': 16, 'l': 15, 'm': 14, 'n': 13, 'o': 12, 'p': 11, 'q': 10,
      'r': 9, 's': 8, 't': 7, 'u': 6, 'v': 5, 'w': 4, 'x': 3, 'y': 2, 'z': 1
    }
  },

  // Jewish/Hebrew Gematria - Correct Hebrew character order and values
  jewish: {
    name: "Jewish",
    description: "Hebrew gematria with correct character order: a,b,c,d,e,f,g,h,i,k,l,m,n,o,p,q,r,s,t,u,x,y,z,j,v,&,w",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'k': 10, 'l': 20, 'm': 30, 'n': 40, 'o': 50, 'p': 60, 'q': 70, 'r': 80, 's': 90,
      't': 100, 'u': 200, 'x': 300, 'y': 400, 'z': 500, 'j': 600, 'v': 700, '&': 800, 'w': 900
    }
  },

  // Single Reduction - Correct implementation from web version
  singleReduction: {
    name: "Single Reduction",
    description: "A=1, B=2, ..., I=9, J=1, K=2, ..., S=10, T=2, ...",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
      's': 10, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    }
  },

  // Full Reduction KV - Correct implementation from web version
  fullReductionKV: {
    name: "Full Reduction KV",
    description: "A=1, B=2, ..., I=9, J=1, K=11, L=3, ..., V=22, W=5, ...",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'j': 1, 'k': 11, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
      's': 1, 't': 2, 'u': 3, 'v': 22, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    }
  },

  // Single Reduction KV - Correct implementation from web version
  singleReductionKV: {
    name: "Single Reduction KV",
    description: "A=1, B=2, ..., I=9, J=1, K=11, L=3, ..., V=22, W=5, ...",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'j': 1, 'k': 11, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
      's': 10, 't': 2, 'u': 3, 'v': 22, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    }
  },

  // Extended English - Correct implementation from web version
  extendedEnglish: {
    name: "Extended English",
    description: "A=1, B=2, ..., J=10, K=20, L=30, ..., Z=800",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'j': 10, 'k': 20, 'l': 30, 'm': 40, 'n': 50, 'o': 60, 'p': 70, 'q': 80, 'r': 90,
      's': 100, 't': 200, 'u': 300, 'v': 400, 'w': 500, 'x': 600, 'y': 700, 'z': 800
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

  // Reverse Single Reduction - Correct implementation from web version
  reverseSingleReduction: {
    name: "Reverse Single Reduction",
    description: "Z = 1, Y = 2, ..., R = 9, Q = 1, P = 2, ...",
    values: {
      'a': 8, 'b': 7, 'c': 6, 'd': 5, 'e': 4, 'f': 3, 'g': 2, 'h': 10, 'i': 9,
      'j': 8, 'k': 7, 'l': 6, 'm': 5, 'n': 4, 'o': 3, 'p': 2, 'q': 1, 'r': 9,
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

  // Reverse Single Reduction EP - Correct implementation from web version
  reverseSingleReductionEP: {
    name: "Reverse Single Reduction EP",
    description: "Z = 1, Y = 2, ..., V = 22, U = 6, ..., K = 11, ... (Exception Patterns)",
    values: {
      'a': 8, 'b': 7, 'c': 6, 'd': 5, 'e': 22, 'f': 3, 'g': 2, 'h': 10, 'i': 9,
      'j': 8, 'k': 7, 'l': 6, 'm': 5, 'n': 4, 'o': 3, 'p': 11, 'q': 1, 'r': 9,
      's': 8, 't': 7, 'u': 6, 'v': 5, 'w': 4, 'x': 3, 'y': 2, 'z': 1
    }
  },

  // Reverse Extended - Correct implementation from web version
  reverseExtended: {
    name: "Reverse Extended",
    description: "Z = 1, Y = 2, ..., S = 100, R = 90, ..., A = 800",
    values: {
      'a': 800, 'b': 700, 'c': 600, 'd': 500, 'e': 400, 'f': 300, 'g': 200, 'h': 100, 'i': 90,
      'j': 80, 'k': 70, 'l': 60, 'm': 50, 'n': 40, 'o': 30, 'p': 20, 'q': 10,
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

  // Jewish Reduction - Correct Hebrew character order and reduction values
  jewishReduction: {
    name: "Jewish Reduction",
    description: "Hebrew reduction with correct character order: a,b,c,d,e,f,g,h,i,k,l,m,n,o,p,q,r,s,t,u,x,y,z,j,v,&,w",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'k': 1, 'l': 2, 'm': 3, 'n': 4, 'o': 5, 'p': 6, 'q': 7, 'r': 8, 's': 9,
      't': 1, 'u': 2, 'x': 3, 'y': 4, 'z': 5, 'j': 6, 'v': 7, '&': 8, 'w': 9
    }
  },

  // Jewish Ordinal - Correct Hebrew character order and ordinal values
  jewishOrdinal: {
    name: "Jewish Ordinal",
    description: "Hebrew ordinal with correct character order: a,b,c,d,e,f,g,h,i,k,l,m,n,o,p,q,r,s,t,u,x,y,z,j,v,&,w",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'k': 10, 'l': 11, 'm': 12, 'n': 13, 'o': 14, 'p': 15, 'q': 16, 'r': 17, 's': 18,
      't': 19, 'u': 20, 'x': 21, 'y': 22, 'z': 23, 'j': 24, 'v': 25, '&': 26, 'w': 27
    }
  },

  // ALW Kabbalah - Correct implementation from web version
  alwKabbalah: {
    name: "ALW Kabbalah",
    description: "A=1, L=2, W=3, H=4, S=5, D=6, O=7, Z=8, K=9, V=10, G=11, R=12, C=13, N=14, Y=15, J=16, U=17, F=18, Q=19, B=20, M=21, X=22, I=23, T=24, E=25, P=26",
    values: {
      'a': 1, 'l': 2, 'w': 3, 'h': 4, 's': 5, 'd': 6, 'o': 7, 'z': 8, 'k': 9,
      'v': 10, 'g': 11, 'r': 12, 'c': 13, 'n': 14, 'y': 15, 'j': 16, 'u': 17, 'f': 18,
      'q': 19, 'b': 20, 'm': 21, 'x': 22, 'i': 23, 't': 24, 'e': 25, 'p': 26
    }
  },

  // KFW Kabbalah - Correct implementation from web version
  kfwKabbalah: {
    name: "KFW Kabbalah",
    description: "K=1, F=2, W=3, R=4, M=5, D=6, Y=7, T=8, A=9, V=10, Q=11, H=12, C=13, X=14, O=15, J=16, E=17, L=18, G=19, B=20, S=21, N=22, I=23, Z=24, U=25, P=26",
    values: {
      'k': 1, 'f': 2, 'w': 3, 'r': 4, 'm': 5, 'd': 6, 'y': 7, 't': 8, 'a': 9,
      'v': 10, 'q': 11, 'h': 12, 'c': 13, 'x': 14, 'o': 15, 'j': 16, 'e': 17, 'l': 18,
      'g': 19, 'b': 20, 's': 21, 'n': 22, 'i': 23, 'z': 24, 'u': 25, 'p': 26
    }
  },

  // LCH Kabbalah - Correct implementation from web version
  lchKabbalah: {
    name: "LCH Kabbalah",
    description: "I=1, L=2, C=3, H=4, P=5, A=6, X=7, J=8, W=9, T=10, O=11, G=12, F=13, E=14, R=15, S=16, Q=17, K=18, Y=19, Z=20, B=21, M=22, V=23, D=24, N=25, U=26",
    values: {
      'i': 1, 'l': 2, 'c': 3, 'h': 4, 'p': 5, 'a': 6, 'x': 7, 'j': 8, 'w': 9,
      't': 10, 'o': 11, 'g': 12, 'f': 13, 'e': 14, 'r': 15, 's': 16, 'q': 17, 'k': 18,
      'y': 19, 'z': 20, 'b': 21, 'm': 22, 'v': 23, 'd': 24, 'n': 25, 'u': 26
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

  // Septenary - Correct implementation from web version
  septenary: {
    name: "Septenary",
    description: "A = 1, B = 2, ..., G = 7, H = 6, I = 5, ..., N = 1, O = 1, ...",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 6, 'i': 5,
      'j': 4, 'k': 3, 'l': 2, 'm': 1, 'n': 1, 'o': 2, 'p': 3, 'q': 4, 'r': 5,
      's': 6, 't': 7, 'u': 6, 'v': 5, 'w': 4, 'x': 3, 'y': 2, 'z': 1
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
  },

  // Alphanumeric Qabbala - Correct implementation from web version
  alphanumericQabbala: {
    name: "Alphanumeric Qabbala",
    description: "A=10, B=11, ..., Z=35 (letters only, matching web version)",
    values: {
      'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15, 'g': 16, 'h': 17, 'i': 18,
      'j': 19, 'k': 20, 'l': 21, 'm': 22, 'n': 23, 'o': 24, 'p': 25, 'q': 26, 'r': 27,
      's': 28, 't': 29, 'u': 30, 'v': 31, 'w': 32, 'x': 33, 'y': 34, 'z': 35
    }
  },

  // New ciphers from web version
  elizabethan360: {
    name: "Elizabethan 360",
    description: "A=1, B=2, C=3, D=4, E=5, F=6, G=8, H=9, I=10, J=10, K=12, L=15, M=18, N=20, O=24, P=30, Q=36, R=40, S=45, T=60, U=72, V=72, W=90, X=120, Y=180, Z=360",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 8, 'h': 9, 'i': 10,
      'j': 10, 'k': 12, 'l': 15, 'm': 18, 'n': 20, 'o': 24, 'p': 30, 'q': 36, 'r': 40,
      's': 45, 't': 60, 'u': 72, 'v': 72, 'w': 90, 'x': 120, 'y': 180, 'z': 360
    }
  },

  williamGGray: {
    name: "William G. Gray",
    description: "A=0, E=0, I=0, O=0, U=0, B=11, C=12, D=13, F=14, G=15, H=16, J=17, K=18, L=19, M=20, N=21, P=22, Q=23, R=24, S=25, T=26, V=27, W=28, X=29, Y=30, Z=31",
    values: {
      'a': 0, 'e': 0, 'i': 0, 'o': 0, 'u': 0, 'b': 11, 'c': 12, 'd': 13, 'f': 14,
      'g': 15, 'h': 16, 'j': 17, 'k': 18, 'l': 19, 'm': 20, 'n': 21, 'p': 22, 'q': 23,
      'r': 24, 's': 25, 't': 26, 'v': 27, 'w': 28, 'x': 29, 'y': 30, 'z': 31
    }
  },

  synx: {
    name: "Synx",
    description: "0=1, 1=2, 2=3, 3=4, 4=5, 5=6, 6=7, 7=9, 8=10, 9=12, A=14, B=15, C=18, D=20, E=21, F=28, G=30, H=35, I=36, J=42, K=45, L=60, M=63, N=70, O=84, P=90, Q=105, R=126, S=140, T=180, U=210, V=252, W=315, X=420, Y=630, Z=1260",
    values: {
      '0': 1, '1': 2, '2': 3, '3': 4, '4': 5, '5': 6, '6': 7, '7': 9, '8': 10, '9': 12,
      'a': 14, 'b': 15, 'c': 18, 'd': 20, 'e': 21, 'f': 28, 'g': 30, 'h': 35, 'i': 36,
      'j': 42, 'k': 45, 'l': 60, 'm': 63, 'n': 70, 'o': 84, 'p': 90, 'q': 105, 'r': 126,
      's': 140, 't': 180, 'u': 210, 'v': 252, 'w': 315, 'x': 420, 'y': 630, 'z': 1260
    }
  },

  beatusLiebana: {
    name: "Beatus of Liebana",
    description: "A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9, J=9, K=10, L=20, M=30, N=40, O=50, P=60, Q=70, R=80, S=90, T=100, U=200, V=200, W=200, X=300, Y=400, Z=500",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'j': 9, 'k': 10, 'l': 20, 'm': 30, 'n': 40, 'o': 50, 'p': 60, 'q': 70, 'r': 80,
      's': 90, 't': 100, 'u': 200, 'v': 200, 'w': 200, 'x': 300, 'y': 400, 'z': 500
    }
  },

  primeQabalah: {
    name: "Prime Qabalah",
    description: "A=1, E=2, I=3, O=5, U=7, B=11, C=13, D=17, F=19, G=23, H=29, J=31, K=37, L=41, M=43, N=47, P=53, Q=59, R=61, S=67, T=71, V=73, W=79, X=83, Y=89, Z=97",
    values: {
      'a': 1, 'e': 2, 'i': 3, 'o': 5, 'u': 7, 'b': 11, 'c': 13, 'd': 17, 'f': 19,
      'g': 23, 'h': 29, 'j': 31, 'k': 37, 'l': 41, 'm': 43, 'n': 47, 'p': 53, 'q': 59,
      'r': 61, 's': 67, 't': 71, 'v': 73, 'w': 79, 'x': 83, 'y': 89, 'z': 97
    }
  },

  falseKabbalah: {
    name: "False Kabbalah",
    description: "0=36, 1=37, 2=38, 3=39, 4=40, 5=41, 6=42, 7=43, 8=44, 9=45, A=46, B=47, C=48, D=49, E=50, F=51, G=52, H=53, I=54, J=55, K=56, L=57, M=58, N=59, O=60, P=61, Q=62, R=63, S=64, T=65, U=66, V=67, W=68, X=69, Y=70, Z=71",
    values: {
      '0': 36, '1': 37, '2': 38, '3': 39, '4': 40, '5': 41, '6': 42, '7': 43, '8': 44, '9': 45,
      'a': 46, 'b': 47, 'c': 48, 'd': 49, 'e': 50, 'f': 51, 'g': 52, 'h': 53, 'i': 54,
      'j': 55, 'k': 56, 'l': 57, 'm': 58, 'n': 59, 'o': 60, 'p': 61, 'q': 62, 'r': 63,
      's': 64, 't': 65, 'u': 66, 'v': 67, 'w': 68, 'x': 69, 'y': 70, 'z': 71
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
    'reverseSatanic',
    'alphanumericQabbala',
    'elizabethan360',
    'williamGGray',
    'synx',
    'beatusLiebana',
    'primeQabalah',
    'falseKabbalah'
  ]
};

// Helper function for number processing (matching web version logic)
const processNumbers = (text, calculationType = "Reduced") => {
  let total = 0;

  if (calculationType === "Reduced") {
    // Process each digit individually
    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      if (char >= '0' && char <= '9') {
        total += parseInt(char);
      }
    }
  } else if (calculationType === "Full") {
    // Process full numbers
    let currentNumber = "";
    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      if (char >= '0' && char <= '9') {
        currentNumber += char;
      } else if (currentNumber.length > 0 && char !== ',') {
        total += parseInt(currentNumber);
        currentNumber = "";
      }
    }
    if (currentNumber.length > 0) {
      total += parseInt(currentNumber);
    }
  }

  return total;
};

// Enhanced process text with cipher (matching web version logic)
export const processTextWithCipher = (text, cipher) => {
  const words = text.toLowerCase().split(/\s+/);
  let totalValue = 0;
  const wordValues = [];
  const letterBreakdowns = [];

  // Process each word
  words.forEach(word => {
    let wordValue = 0;
    let letterBreakdown = '';

    // Process each character in the word
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      let value = 0;

      // Check if character exists in cipher values
      if (cipher.values[char] !== undefined) {
        value = cipher.values[char];
        wordValue += value;
        letterBreakdown += char + "=" + value + ' ';
      } else if (char >= '0' && char <= '9') {
        // Handle numbers - for most ciphers, add number processing
        // This matches the web version's number handling
        const numValue = parseInt(char);
        wordValue += numValue;
        letterBreakdown += char + "=" + numValue + ' ';
      } else if (char === '&') {
        // Handle ampersand for Jewish ciphers
        if (cipher.values['&'] !== undefined) {
          value = cipher.values['&'];
          wordValue += value;
          letterBreakdown += char + "=" + value + ' ';
        }
      }
      // Other characters (spaces, punctuation) are ignored
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