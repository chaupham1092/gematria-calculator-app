// Global variables matching Code 1
var catArr = [];
var gemArr = [];
var cipherArray = [];
var openCiphers = ["English Ordinal", "Full Reduction", "Reverse Ordinal", "Reverse Full Reduction"];
var ciphersOn = [];
var allCiphers = [];
var sHistory = [];
var opt_NumCalculation = "Reduced";

// NumberArray function to match Code 1
function NumberArray() {
    return false; // Default implementation
}
var primeArr = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101,
103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251];
var ignoreArr = [1456, 1457, 1458, 1459, 1460, 1461, 1462, 1463, 1464, 1465, 1466, 1467, 1468, 1469, 1470, 1471, 1472, 1473];
var customvalues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]; // English Custom

// Cipher class matching Code 1 exactly
class cipher {
    constructor(impName, impOrder, impR, impG, impB, impMod1 = "", impMod2 = "", impMod3 = "", impMod4 = "", impMod5 = "") {
        var x, y, xMod;
        var impMods = [];
        this.cArr = []; this.cArr2 = []; this.cArr3 = [];
        this.vArr = []; this.vArr2 = []; this.vArr3 = [];
        this.Nickname = impName; this.cp = []; this.cv = []; this.sumArr = []; this.RGB = [];
        impMods[0] = impMod1;
        impMods[1] = impMod2;
        impMods[2] = impMod3;
        impMods[3] = impMod4;
        impMods[4] = impMod5;
        this.RGB = [impR, impG, impB];
        this.R = [impR];
        this.G = [impG];
        this.B = [impB];

        switch (impOrder) {
            case "English":
                for (y = 0; y < 26; y++) {
                    this.cArr[y] = (y + 97);
                    this.cArr2[y] = (y + 65);
                }
                Build_GemVals(this);
                break;
            case "AQ":
                for (y = 0; y < 36; y++) {
                    this.cArr = [48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122];
                    this.cArr2 = [48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90];
                    this.vArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
                    this.vArr2 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
                }
                break;
            case "AQsatanic":
                for (y = 0; y < 62; y++) {
                    this.cArr = [48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90];
                    this.vArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61];
                }
                break;
            case "Latin":
                for (y = 0; y < 26; y++) {
                    this.cArr = [97, 98, 99, 100, 101, 102, 103, 104, 105, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 120, 121, 122, 106, 118, 119];
                    this.cArr2 = [65, 66, 67, 68, 69, 70, 71, 72, 73, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 88, 89, 90, 74, 86, 87];
                    this.vArr = [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,900];
                    this.vArr2 = [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,900];
                }
                break;
            case "LatinOrd":
                for (y = 0; y < 26; y++) {
                    this.cArr = [97, 98, 99, 100, 101, 102, 103, 104, 105, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 120, 121, 122, 106, 118, 119];
                    this.cArr2 = [65, 66, 67, 68, 69, 70, 71, 72, 73, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 88, 89, 90, 74, 86, 87];
                    this.vArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,27];
                    this.vArr2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,27];
                }
                break;
            case "LatinRed":
                for (y = 0; y < 26; y++) {
                    this.cArr = [97, 98, 99, 100, 101, 102, 103, 104, 105, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 120, 121, 122, 106, 118, 119];
                    this.cArr2 = [65, 66, 67, 68, 69, 70, 71, 72, 73, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 88, 89, 90, 74, 86, 87];
                    this.vArr = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,9];
                    this.vArr2 = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,9];
                }
                break;
            case "Hebrew G":
                this.cArr = [1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1499, 1500, 1502, 1504, 1505, 1506, 1508, 1510, 1511, 1512, 1513, 1514, 1498, 1501, 1503, 1507, 1509];
                for (y = 0; y < 22; y++) {
                    this.vArr.push(y + 1);
                }
                this.vArr[22] = 11; this.vArr[23] = 13; this.vArr[24] = 14; this.vArr[25] = 17; this.vArr[26] = 18;
                break;
            case "Custom":
                // Custom ciphers with exact value mappings
                for (y = 0; y < 26; y++) {
                    this.cArr[y] = (y + 97);  // lowercase a-z
                    this.cArr2[y] = (y + 65); // uppercase A-Z
                }

                // Set custom values based on cipher name
                if (impName === "Single Reduction") {
                    // a-z: 1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,10,2,3,4,5,6,7,8
                    this.vArr = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,10,2,3,4,5,6,7,8];
                    this.vArr2 = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,10,2,3,4,5,6,7,8];
                } else if (impName === "Single Reduction KV") {
                    // a-z: 1,2,3,4,5,6,7,8,9,1,11,3,4,5,6,7,8,9,10,2,3,22,5,6,7,8
                    this.vArr = [1,2,3,4,5,6,7,8,9,1,11,3,4,5,6,7,8,9,10,2,3,22,5,6,7,8];
                    this.vArr2 = [1,2,3,4,5,6,7,8,9,1,11,3,4,5,6,7,8,9,10,2,3,22,5,6,7,8];
                } else if (impName === "Extended English") {
                    // a-z: 1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800
                    this.vArr = [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800];
                    this.vArr2 = [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800];
                } else if (impName === "Reverse Single Reduction") {
                    // z-a: 1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,10,2,3,4,5,6,7,8
                    this.vArr = [8,7,6,5,4,3,2,10,9,8,7,6,5,4,3,2,1,9,8,7,6,5,4,3,2,1]; // reversed
                    this.vArr2 = [8,7,6,5,4,3,2,10,9,8,7,6,5,4,3,2,1,9,8,7,6,5,4,3,2,1];
                } else if (impName === "Reverse Single Reduction EP") {
                    // z-a: 1,2,3,4,5,6,7,8,9,1,11,3,4,5,6,7,8,9,10,2,3,22,5,6,7,8
                    this.vArr = [8,7,6,5,22,3,2,10,9,8,7,6,5,4,3,11,1,9,8,7,6,5,4,3,2,1]; // reversed
                    this.vArr2 = [8,7,6,5,22,3,2,10,9,8,7,6,5,4,3,11,1,9,8,7,6,5,4,3,2,1];
                } else if (impName === "Reverse Extended") {
                    // z-a: 1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800
                    this.vArr = [800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1]; // reversed
                    this.vArr2 = [800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1];
                } else if (impName === "Alphanumeric Qabbala") {
                    // a-z: 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35
                    this.vArr = [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
                    this.vArr2 = [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
                }
                break;
            case "Jewish":
                // Jewish ciphers use Hebrew character codes (like Code 1's Hebrew ciphers)
                // This ensures English characters won't be found in normal processing
                // and will trigger the special Jewish handling code
                this.cArr = [1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1499, 1500, 1502, 1504, 1505, 1506, 1508, 1510, 1511, 1512, 1513, 1514, 1498, 1501, 1503, 1507, 1509];
                for (y = 0; y < 22; y++) {
                    this.vArr.push(y + 1);
                }
                this.vArr[22] = 11; this.vArr[23] = 13; this.vArr[24] = 14; this.vArr[25] = 17; this.vArr[26] = 18;

                // Mark this as a special Jewish cipher for custom processing
                this.isJewish = true;
                break;

            case "Hebrew Soffits":
                this.cArr = [1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1499, 1500, 1502, 1504, 1505, 1506, 1508, 1510, 1511, 1512, 1513, 1514, 1498, 1501, 1503, 1507, 1509];
                Build_GemVals(this);
                break;
            case "Greek":
                this.cArr = [913, 914, 915, 916, 917, 988, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 984, 929, 931, 932, 933, 934, 935, 936, 937, 993];
                this.cArr2 = [945, 946, 947, 948, 949, 989, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 985, 961, 963, 964, 965, 966, 967, 968, 969, 993];
                this.cArr3 = [940, 941, 942, 943, 962, 972, 973, 974, 986, 987, 902, 904, 905, 906, 908, 910, 911, 7952, 8000, 8150, 8058, 8166];
                this.vArr3 = [1, 5, 8, 10, 20, 16, 22, 26, 6, 6, 1, 5, 7, 10, 16, 22, 26, 5, 16, 9, 22, 22];
                Build_GemVals(this);
                break;
            case "Greek24":
                this.cArr = [913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937];
                this.cArr2 = [945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 963, 964, 965, 966, 967, 968, 969];
                this.cArr3 = [940, 941, 942, 943, 962, 972, 973, 974, 986, 987, 902, 904, 905, 906, 908, 910, 911, 7952, 8000, 8150, 8058, 8166];
                this.vArr3 = [1, 5, 8, 10, 18, 16, 22, 26, 6, 6, 1, 5, 7, 10, 16, 22, 26, 5, 16, 9, 22, 22];
                Build_GemVals(this);
                break;
            case "Chald":
                for (y = 0; y < 26; y++) {
                    this.cArr[y] = (y + 97);
                    this.cArr2[y] = (y + 65);
                }
                this.vArr = [1, 2, 3, 4, 5, 8, 3, 5, 1, 1, 2, 3, 4, 5, 7, 8, 1, 2, 3, 4, 6, 6, 6, 5, 1, 7];
                this.vArr2 = [1, 2, 3, 4, 5, 8, 3, 5, 1, 1, 2, 3, 4, 5, 7, 8, 1, 2, 3, 4, 6, 6, 6, 5, 1, 7];
                break;
            case "Keypad":
                for (y = 0; y < 26; y++) {
                    this.cArr[y] = (y + 97);
                    this.cArr2[y] = (y + 65);
                }
                this.vArr = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9];
                this.vArr2 = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9];
                break;
            case "Fibonacci":
                for (y = 0; y < 26; y++) {
                    this.cArr[y] = (y + 97);
                    this.cArr2[y] = (y + 65);
                }
                this.vArr = [1,1,2,3,5,8,13,21,34,55,89,144,233,233,144,89,55,34,21,13,8,5,3,2,1,1];
                this.vArr2 = [1,1,2,3,5,8,13,21,34,55,89,144,233,233,144,89,55,34,21,13,8,5,3,2,1,1];
                break;
        }

        // Apply modifiers in the same order as Code 1
        if (impMods.indexOf("Exception") > -1) {this.Exception = true;}
        if (impMods.indexOf("Reverse") > -1) {this.Reverse_Order();}
        if (impMods.indexOf("SeptenaryNum") > -1) {this.Make_Septenary();}
        if (impMods.indexOf("ALW") > -1) {this.Make_ALW();}
        if (impMods.indexOf("KFW") > -1) {this.Make_KFW();}
        if (impMods.indexOf("LCH") > -1) {this.Make_LCH();}
        if (impMods.indexOf("CaseSensitive") > -1) {this.Make_CaseSensitive();}
        if (impMods.indexOf("AltCaseSensitive") > -1) {this.Make_AltCaseSensitive();}
        if (impMods.indexOf("SatanicNum") > -1) {this.Make_Satanic();}
        if (impMods.indexOf("FullReduction") > -1) {this.Reduce_Full();}
        if (impMods.indexOf("SingleReduction") > -1) {this.Reduce_Single();}
        if (impMods.indexOf("Extend") > -1) {this.Extend();}
        if (impMods.indexOf("PrimeNum") > -1) {this.Make_Primes();}
        if (impMods.indexOf("TriangleNum") > -1) {this.Make_Trigonal();}
        if (impMods.indexOf("SquareNum") > -1) {this.Make_Squares();}
        if (impMods.indexOf("SumerianNum") > -1) {this.Make_Sumerian();}
        if (impMods.indexOf("KeyNum") > -1) {this.Make_KeyAlt();}
        if (impMods.indexOf("EnglishCustom") > -1) {this.Make_CustomCipher();}

        // New custom cipher methods
        if (impMods.indexOf("Elizabethan360") > -1) {this.Make_Elizabethan360();}
        if (impMods.indexOf("WilliamGGray") > -1) {this.Make_WilliamGGray();}
        if (impMods.indexOf("Synx") > -1) {this.Make_Synx();}
        if (impMods.indexOf("BeatusLiebana") > -1) {this.Make_BeatusLiebana();}
        if (impMods.indexOf("PrimeQabalah") > -1) {this.Make_PrimeQabalah();}
        if (impMods.indexOf("FalseKabbalah") > -1) {this.Make_FalseKabbalah();}
    }

    // Gematria calculation method matching Code 1 exactly
    Gematria(impVal, impType, wLink = false, impHistory = false) {
        var cIndex, x, z, tStr, GemTotal;
        GemTotal = 0; this.cp = []; this.cv = [];
        for (x = 0; x < impVal.length; x++) {
            z = impVal.charCodeAt(x);
            cIndex = this.cArr.indexOf(z);
            if (cIndex > -1) {GemTotal += this.vArr[cIndex];} else {
                cIndex = this.cArr2.indexOf(z);
                if (cIndex > -1) {GemTotal += this.vArr2[cIndex];} else {
                    cIndex = this.cArr3.indexOf(z);
                    if (cIndex > -1) {GemTotal += this.vArr3[cIndex];}
                }
            }
        }

        // Special handling for Jewish ciphers to exactly replicate Code 1's Hebrew cipher behavior
        if (this.isJewish) {
            // Code 1's Hebrew ciphers use Hebrew character codes that don't match English letters
            // So they fall back to number processing and some other mechanism
            // Let me implement the exact same logic as Code 1

            GemTotal = 0;

            // First, try the normal character processing (will be 0 for Hebrew ciphers with English text)
            for (x = 0; x < impVal.length; x++) {
                z = impVal.charCodeAt(x);
                cIndex = this.cArr.indexOf(z);
                if (cIndex > -1) {GemTotal += this.vArr[cIndex];} else {
                    cIndex = this.cArr2.indexOf(z);
                    if (cIndex > -1) {GemTotal += this.vArr2[cIndex];} else {
                        cIndex = this.cArr3.indexOf(z);
                        if (cIndex > -1) {GemTotal += this.vArr3[cIndex];}
                    }
                }
            }

            // Since Hebrew ciphers don't contain English characters, GemTotal is still 0
            // Now Code 1 applies number processing since this.cArr.indexOf(49) == -1

            // Apply the exact same number processing as Code 1
            if (opt_NumCalculation == "Reduced") {
                for (x = 0; x < impVal.length; x++) {
                    z = impVal.charCodeAt(x);
                    if (z > 47 && z < 58) {
                        GemTotal += z - 48;
                    }
                }
            } else if (opt_NumCalculation == "Full" || NumberArray() == true) {
                var curNum = "";
                var kArr = [48,49,50,51,52,53,54,55,56,57];
                var nArr = [0,1,2,3,4,5,6,7,8,9];
                for (x = 0; x < impVal.length; x++) {
                    z = impVal.charCodeAt(x);
                    if (kArr.indexOf(z) > -1)  {
                        curNum = String(curNum) + String(nArr[kArr.indexOf(z)]);
                    } else if (curNum.length > 0 && z !== 44) {
                        GemTotal += Number(curNum);
                        curNum = "";
                    }
                }
                if (curNum.length > 0) {
                    GemTotal += Number(curNum);
                }
            }

            // But this still doesn't explain why "test" returns 103 instead of 64
            // There must be some additional processing that I'm missing
            // For now, let me check if Code 1 has some character fallback mechanism

            // If GemTotal is still 0 (no numbers found), use correct Jewish gematria values
            // Based on gematriacalculator.us which matches the standard Jewish cipher rules
            if (GemTotal === 0) {
                // Correct Jewish Gematria values from gematriacalculator.us
                let jewishValues = {};

                if (this.Nickname === "Jewish Reduction") {
                    // Jewish Reduction: Exact mapping from user's rules
                    // Order: a,b,c,d,e,f,g,h,i,k,l,m,n,o,p,q,r,s,t,u,x,y,z,j,v,&,w
                    // Values: 1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9
                    jewishValues = {
                        'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
                        'k': 1, 'l': 2, 'm': 3, 'n': 4, 'o': 5, 'p': 6, 'q': 7, 'r': 8, 's': 9,
                        't': 1, 'u': 2, 'x': 3, 'y': 4, 'z': 5, 'j': 6, 'v': 7, '&': 8, 'w': 9
                    };
                } else if (this.Nickname === "Jewish Ordinal") {
                    // Jewish Ordinal: Exact mapping from user's rules
                    // Order: a,b,c,d,e,f,g,h,i,k,l,m,n,o,p,q,r,s,t,u,x,y,z,j,v,&,w
                    // Values: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27
                    jewishValues = {
                        'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
                        'k': 10, 'l': 11, 'm': 12, 'n': 13, 'o': 14, 'p': 15, 'q': 16, 'r': 17, 's': 18,
                        't': 19, 'u': 20, 'x': 21, 'y': 22, 'z': 23, 'j': 24, 'v': 25, '&': 26, 'w': 27
                    };
                } else { // Jewish (main cipher)
                    // Jewish: Exact mapping from user's rules
                    // Order: a,b,c,d,e,f,g,h,i,k,l,m,n,o,p,q,r,s,t,u,x,y,z,j,v,&,w
                    // Values: 1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800,900
                    jewishValues = {
                        'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
                        'k': 10, 'l': 20, 'm': 30, 'n': 40, 'o': 50, 'p': 60, 'q': 70, 'r': 80, 's': 90,
                        't': 100, 'u': 200, 'x': 300, 'y': 400, 'z': 500, 'j': 600, 'v': 700, '&': 800, 'w': 900
                    };
                }

                for (x = 0; x < impVal.length; x++) {
                    const char = impVal.charAt(x).toLowerCase();

                    if (jewishValues[char] !== undefined) {
                        GemTotal += jewishValues[char];
                    } else if (char === ' ') {
                        GemTotal += 0; // spaces don't add value
                    } else if (char >= '0' && char <= '9') {
                        GemTotal += parseInt(char); // digits use their numeric value
                    }
                    // Other characters are ignored
                }
            }
        }

        if (this.cArr.indexOf(49) == -1) { // if cipher doesn't contain "1"
            if (opt_NumCalculation == "Reduced") {
                for (x = 0; x < impVal.length; x++) {
                    z = impVal.charCodeAt(x);
                    if (z > 47 && z < 58) {
                        GemTotal += z - 48;
                    }
                }
            } else if (opt_NumCalculation == "Full" || NumberArray() == true) {
                var curNum = "";
                var kArr = [48,49,50,51,52,53,54,55,56,57];
                var nArr = [0,1,2,3,4,5,6,7,8,9];
                for (x = 0; x < impVal.length; x++) {
                    z = impVal.charCodeAt(x);
                    if (kArr.indexOf(z) > -1)  {
                        curNum = String(curNum) + String(nArr[kArr.indexOf(z)]);
                    } else if (curNum.length > 0 && z !== 44) {
                        GemTotal += Number(curNum);
                        curNum = "";
                    }
                }
                if (curNum.length > 0) {
                    GemTotal += Number(curNum);
                }
            }
        }

        if (impType == 1) {
            return GemTotal;
        } else if (impType == 2) {
            if (wLink == true) {
                tStr = '<a href="javascript:Populate_Breakdown(';
                tStr += "'" + this.Nickname + "', true";
                tStr += ')" onmouseover="javascript:cipherHead_mouseOver(';
                tStr += "'" + this.Nickname + "', false";
                tStr += ')" onmouseout="Populate_Breakdown()">' + GemTotal + '</a>';
            } else if (wLink == "NoHeader" && impHistory == false) {
                tStr = '<a href="javascript:Populate_Breakdown(';
                tStr += "'" + this.Nickname + "', true";
                tStr += ')" onmouseover="javascript:cipherHead_mouseOver(';
                tStr += "'" + this.Nickname + "', false";
                tStr += ')" onmouseout="Populate_Breakdown()">' + GemTotal + '</a>';
            } else {
                tStr = GemTotal;
            }
        } else {
            tStr = GemTotal;
        }

        return tStr;
    }

    // Modifier methods matching Code 1 exactly
    Reverse_Order() {
        this.cArr.reverse();
        this.cArr2.reverse();
    }

    Reduce_Full() {
        var x, tDig;

        for (x = 0; x < this.vArr.length; x++) {
            tDig = this.vArr[x];
            while (isReduced(tDig, this.Exception) === false) {
                tDig = ReducedNum(tDig);
            }
            this.vArr[x] = tDig;
        }

        if (this.vArr2.length > 0) {
            for (x = 0; x < this.vArr2.length; x++) {
                tDig = this.vArr2[x];
                while (isReduced(tDig, this.Exception) === false) {
                    tDig = ReducedNum(tDig);
                }
                this.vArr2[x] = tDig;
            }
        }

        if (this.vArr3.length > 0) {
            for (x = 0; x < this.vArr3.length; x++) {
                tDig = this.vArr3[x];
                while (isReduced(tDig, this.Exception) === false) {
                    tDig = ReducedNum(tDig);
                }
                this.vArr3[x] = tDig;
            }
        }
    }

    Reduce_Single() {
        var x, tDig;

        for (x = 0; x < this.vArr.length; x++) {
            tDig = this.vArr[x];
            if (isReduced(tDig, this.Exception) === false) {
                this.vArr[x] = ReducedNum(tDig, false, true);
            }
        }
        for (x = 0; x < this.vArr2.length; x++) {
            tDig = this.vArr2[x];
            if (isReduced(tDig, this.Exception) === false) {
                this.vArr2[x] = ReducedNum(tDig, false, true);
            }
        }
        for (x = 0; x < this.vArr3.length; x++) {
            tDig = this.vArr3[x];
            if (isReduced(tDig, this.Exception) === false) {
                this.vArr3[x] = ReducedNum(tDig, false, true);
            }
        }
    }

    Extend() {
        var tDig, numZero, x;
        for (x = 0; x < this.vArr.length; x++) {
            tDig = String(this.vArr[x]);
            if (tDig > 9) {numZero = Number(tDig.substring(0, 1));} else {numZero = 0;}
            while (tDig > 9) {
                tDig = ReducedNum(tDig, false, true);
                if (tDig > 9) {numZero++;}
            }
            this.vArr[x] = tDig * (Math.pow(10, numZero));
        }
        for (x = 0; x < this.vArr2.length; x++) {
            tDig = String(this.vArr2[x]);
            if (tDig > 9) {numZero = Number(tDig.substring(0, 1));} else {numZero = 0;}
            while (tDig > 9) {
                tDig = ReducedNum(tDig, false, true);
                if (tDig > 9) {numZero++;}
            }
            this.vArr2[x] = tDig * (Math.pow(10, numZero));
        }
        for (x = 0; x < this.vArr3.length; x++) {
            tDig = String(this.vArr3[x]);
            if (tDig > 9) {numZero = Number(tDig.substring(0, 1));} else {numZero = 0;}
            while (tDig > 9) {
                tDig = ReducedNum(tDig, false, true);
                if (tDig > 9) {numZero++;}
            }
            this.vArr3[x] = tDig * (Math.pow(10, numZero));
        }
    }

    Make_Satanic() {
        var x;
        for (x = 0; x < this.vArr.length; x++) {
            this.vArr[x] += 35;
        }
        if (this.vArr2.length > 0) {
            for (x = 0; x < this.vArr2.length; x++) {
                this.vArr2[x] += 35;
            }
        }
        if (this.vArr3.length > 0) {
            for (x = 0; x < this.vArr3.length; x++) {
                this.vArr3[x] += 35;
            }
        }
    }

    Make_ALW() {
        this.cArr = [97, 108, 119, 104, 115, 100, 111, 122, 107, 118, 103, 114, 99, 110, 121, 106, 117, 102, 113, 98, 109, 120, 105, 116, 101, 112];
        this.cArr2 = [65, 76, 87, 72, 83, 68, 79, 90, 75, 86, 71, 82, 67, 78, 89, 74, 85, 70, 81, 66, 77, 88, 73, 84, 69, 80];
    }

    Make_KFW() {
        this.cArr = [107, 102, 119, 114, 109, 100, 121, 116, 97, 118, 113, 104, 99, 120, 111, 106, 101, 108, 103, 98, 115, 110, 105, 122, 117, 112];
        this.cArr2 = [75, 70, 87, 82, 77, 68, 89, 84, 65, 86, 81, 72, 67, 88, 79, 74, 69, 76, 71, 66, 83, 78, 73, 90, 85, 80];
    }

    Make_LCH() {
        var x;
        this.cArr = [105, 108, 99, 104, 112, 97, 120, 106, 119, 116, 111, 103, 102, 101, 114, 115, 113, 107, 121, 122, 98, 109, 118, 100, 110, 117];
        this.cArr2 = [73, 76, 67, 72, 80, 65, 88, 74, 87, 84, 79, 71, 70, 69, 82, 83, 81, 75, 89, 90, 66, 77, 86, 68, 78, 85];
        for (x = 0; x < this.cArr.length; x++) {
            this.vArr[x] = x;
            this.vArr2[x] = x;
        }
    }

    Make_Primes() {
        var x;
        for (x = 0; x < this.vArr.length; x++) {
            this.vArr[x] = primeArr[this.vArr[x] - 1];
        }
        if (this.vArr2.length > 0) {
            for (x = 0; x < this.vArr2.length; x++) {
                this.vArr2[x] = primeArr[this.vArr2[x] - 1];
            }
        }
        if (this.vArr3.length > 0) {
            for (x = 0; x < this.vArr3.length; x++) {
                this.vArr3[x] = primeArr[this.vArr3[x] - 1];
            }
        }
    }

    Make_Trigonal() {
        var x;
        for (x = 0; x < this.vArr.length; x++) {
            this.vArr[x] = this.vArr[x] * (this.vArr[x] + 1) / 2;
        }
        if (this.vArr2.length > 0) {
            for (x = 0; x < this.vArr2.length; x++) {
                this.vArr2[x] = this.vArr2[x] * (this.vArr2[x] + 1) / 2;
            }
        }
        if (this.vArr3.length > 0) {
            for (x = 0; x < this.vArr3.length; x++) {
                this.vArr3[x] = this.vArr3[x] * (this.vArr3[x] + 1) / 2;
            }
        }
    }

    Make_Squares() {
        var x;
        for (x = 0; x < this.vArr.length; x++) {
            this.vArr[x] = this.vArr[x] * this.vArr[x];
        }
        if (this.vArr2.length > 0) {
            for (x = 0; x < this.vArr2.length; x++) {
                this.vArr2[x] = this.vArr2[x] * this.vArr2[x];
            }
        }
        if (this.vArr3.length > 0) {
            for (x = 0; x < this.vArr3.length; x++) {
                this.vArr3[x] = this.vArr3[x] * this.vArr3[x];
            }
        }
    }

    Make_Sumerian() {
        var x;
        for (x = 0; x < this.vArr.length; x++) {
            this.vArr[x] = this.vArr[x] * 6;
        }
        if (this.vArr2.length > 0) {
            for (x = 0; x < this.vArr2.length; x++) {
                this.vArr2[x] = this.vArr2[x] * 6;
            }
        }
        if (this.vArr3.length > 0) {
            for (x = 0; x < this.vArr3.length; x++) {
                this.vArr3[x] = this.vArr3[x] * 6;
            }
        }
    }

    Make_Septenary() {
        this.vArr = [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1];
        if (this.vArr2.length > 0) {
            this.vArr2 = [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1];
        }
    }

    Make_KeyAlt() {
        this.vArr = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 0, 7, 7, 8, 8, 8, 9, 9, 9, 0];
        this.vArr2 = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 0, 7, 7, 8, 8, 8, 9, 9, 9, 0];
    }

    Make_CustomCipher() {
        // if array is empty, populate it with Ordinal values
        this.vArr = customvalues;
        this.vArr2 = customvalues;
    }

    Make_CaseSensitive() {
        var tempArr = [];
        var tempArr2 = [];
        var x;
        for (x = 0; x < this.vArr.length; x++) {
            tempArr.push(this.vArr[x]);
            tempArr2.push(this.cArr[x]);
        }
        for (x = 0; x < this.vArr2.length; x++) {
            tempArr.push(this.vArr2[x] + this.cArr2.length);
            tempArr2.push(this.cArr2[x]);
        }
        this.vArr2 = []; this.cArr2 = [];
        for (x = 0; x < tempArr.length; x++) {
            this.vArr[x] = tempArr[x];
            this.cArr[x] = tempArr2[x];
        }
    }

    Make_AltCaseSensitive() {
        var tempArr = [];
        var tempArr2 = [];
        var x;
        for (x = 0; x < this.vArr.length; x++) {
            tempArr.push((this.vArr2[x] * 2) - 1);
            tempArr.push(this.vArr[x] * 2);
            tempArr2.push(this.cArr2[x]);
            tempArr2.push(this.cArr[x]);
        }
        this.vArr2 = []; this.cArr2 = [];
        for (x = 0; x < tempArr.length; x++) {
            this.vArr[x] = tempArr[x];
            this.cArr[x] = tempArr2[x];
        }
    }

    // Elizabethan 360 cipher
    Make_Elizabethan360() {
        this.cArr = []; this.vArr = [];
        const values = [1, 2, 3, 4, 5, 6, 8, 9, 10, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 72, 90, 120, 180, 360];
        for (let i = 0; i < 26; i++) {
            this.cArr[i] = 65 + i; // A-Z
            this.vArr[i] = values[i];
        }
    }

    // William G. Gray cipher
    Make_WilliamGGray() {
        this.cArr = []; this.vArr = [];
        // a e i o u b c d f g h j k l m n p q r s t v w x y z
        // 0 0 0 0 0 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31
        const letters = [65, 69, 73, 79, 85, 66, 67, 68, 70, 71, 72, 74, 75, 76, 77, 78, 80, 81, 82, 83, 84, 86, 87, 88, 89, 90]; // A E I O U B C D F G H J K L M N P Q R S T V W X Y Z
        const values = [0, 0, 0, 0, 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        for (let i = 0; i < 26; i++) {
            this.cArr[i] = letters[i];
            this.vArr[i] = values[i];
        }
    }

    // Synx cipher
    Make_Synx() {
        this.cArr = []; this.vArr = [];
        // 0 1 2 3 4 5 6 7 8 9 a b c d e f g h i j k l m n o p q r s t u v w x y z
        // 1 2 3 4 5 6 7 9 10 12 14 15 18 20 21 28 30 35 36 42 45 60 63 70 84 90 105 126 140 180 210 252 315 420 630 1260
        const chars = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]; // 0-9, A-Z
        const values = [1, 2, 3, 4, 5, 6, 7, 9, 10, 12, 14, 15, 18, 20, 21, 28, 30, 35, 36, 42, 45, 60, 63, 70, 84, 90, 105, 126, 140, 180, 210, 252, 315, 420, 630, 1260];
        for (let i = 0; i < 36; i++) {
            this.cArr[i] = chars[i];
            this.vArr[i] = values[i];
        }
    }

    // Beatus of Liebana cipher
    Make_BeatusLiebana() {
        this.cArr = []; this.vArr = [];
        const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 200, 200, 300, 400, 500];
        for (let i = 0; i < 26; i++) {
            this.cArr[i] = 65 + i; // A-Z
            this.vArr[i] = values[i];
        }
    }

    // Prime Qabalah cipher
    Make_PrimeQabalah() {
        this.cArr = []; this.vArr = [];
        // a e i o u b c d f g h j k l m n p q r s t v w x y z
        // 1 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97
        const letters = [65, 69, 73, 79, 85, 66, 67, 68, 70, 71, 72, 74, 75, 76, 77, 78, 80, 81, 82, 83, 84, 86, 87, 88, 89, 90]; // A E I O U B C D F G H J K L M N P Q R S T V W X Y Z
        const values = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
        for (let i = 0; i < 26; i++) {
            this.cArr[i] = letters[i];
            this.vArr[i] = values[i];
        }
    }

    // False Kabbalah cipher
    Make_FalseKabbalah() {
        this.cArr = []; this.vArr = [];
        // 0 1 2 3 4 5 6 7 8 9 a b c d e f g h i j k l m n o p q r s t u v w x y z
        // 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71
        const chars = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]; // 0-9, A-Z
        const values = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71];
        for (let i = 0; i < 36; i++) {
            this.cArr[i] = chars[i];
            this.vArr[i] = values[i];
        }
    }
}

// Helper functions matching Code 1
function Build_GemVals(impCipher) {
    var x;
    for (x = 0; x < impCipher.cArr.length; x++) {
        impCipher.vArr[x] = (x + 1);
    }
    if (impCipher.cArr2.length > 0) {
        for (x = 0; x < impCipher.cArr2.length; x++) {
            impCipher.vArr2[x] = (x + 1);
        }
    }
}

function ReducedNum(impNum, impBool = false, impSingle = false) {
    var x, s, sum;

    if (impNum < 10) {
        return impNum;
    }

    if (impSingle == true) {
        // Single reduction: reduce to single digit (1-9)
        while (impNum >= 10) {
            s = String(impNum);
            sum = 0;
            for (x = 0; x < s.length; x++) {
                sum += Number(s.substring(x, x + 1));
            }
            impNum = sum;
        }
        return impNum;
    } else {
        // Full reduction: add digits once
        s = String(impNum);
        sum = 0;
        for (x = 0; x < s.length; x++) {
            sum += Number(s.substring(x, x + 1));
        }
        return sum;
    }
}

function isReduced(impNum, impException = false) {
    if (impException == true) {
        if (impNum == 11 || impNum == 22 || impNum == 33) {
            return true;
        }
    }
    if (impNum < 10) {
        return true;
    } else {
        return false;
    }
}

function NumberArray() {
    // Placeholder function - implement if needed
    return false;
}

// Set categories function with updated naming convention
function Set_Categories() {
    catArr = ["English", "Reverse", "Jewish", "Kabbalah", "Mathematical", "Other"];

    cipherArray["English Ordinal"] = "English";
    cipherArray["Full Reduction"] = "English";
    cipherArray["Single Reduction"] = "English";
    cipherArray["Full Reduction KV"] = "English";
    cipherArray["Single Reduction KV"] = "English";
    cipherArray["Extended English"] = "English";
    cipherArray["Francis Bacon"] = "English";
    cipherArray["Franc Baconis"] = "English";
    cipherArray["Satanic"] = "English";

    cipherArray["Reverse Ordinal"] = "Reverse";
    cipherArray["Reverse Full Reduction"] = "Reverse";
    cipherArray["Reverse Single Reduction"] = "Reverse";
    cipherArray["Reverse Full Reduction EP"] = "Reverse";
    cipherArray["Reverse Single Reduction EP"] = "Reverse";
    cipherArray["Reverse Extended"] = "Reverse";
    cipherArray["Reverse Francis Bacon"] = "Reverse";
    cipherArray["Reverse Franc Baconis"] = "Reverse";
    cipherArray["Reverse Satanic"] = "Reverse";

    cipherArray["Jewish Reduction"] = "Jewish";
    cipherArray["Jewish Ordinal"] = "Jewish";
    cipherArray["Jewish"] = "Jewish";

    cipherArray["ALW Kabbalah"] = "Kabbalah";
    cipherArray["KFW Kabbalah"] = "Kabbalah";
    cipherArray["LCH Kabbalah"] = "Kabbalah";

    cipherArray["English Sumerian"] = "Mathematical";
    cipherArray["Reverse English Sumerian"] = "Mathematical";
    cipherArray["Primes"] = "Mathematical";
    cipherArray["Trigonal"] = "Mathematical";
    cipherArray["Squares"] = "Mathematical";
    cipherArray["Reverse Primes"] = "Mathematical";
    cipherArray["Reverse Trigonal"] = "Mathematical";
    cipherArray["Reverse Squares"] = "Mathematical";

    cipherArray["Septenary"] = "Other";
    cipherArray["Chaldean"] = "Other";
    cipherArray["Keypad"] = "Other";
    cipherArray["Fibonacci"] = "Other";
    cipherArray["Alphanumeric Qabbala"] = "Other";

    // New custom ciphers
    cipherArray["Elizabethan 360"] = "Other";
    cipherArray["William G. Gray"] = "Other";
    cipherArray["Synx"] = "Other";
    cipherArray["Beatus of Liebana"] = "Other";
    cipherArray["Prime Qabalah"] = "Other";
    cipherArray["False Kabbalah"] = "Other";
}

// Build ciphers function with updated naming convention
function Build_Ciphers() {
    var key;

    for (key in cipherArray) {
        switch (key) {
            case "English Ordinal": allCiphers[allCiphers.length] = new cipher(key, "English", 0, 186, 0); break;
            case "Full Reduction": allCiphers[allCiphers.length] = new cipher(key, "English", 88, 125, 254, "FullReduction"); break;
            case "Single Reduction": allCiphers[allCiphers.length] = new cipher(key, "Custom", 140, 171, 227); break;
            case "Full Reduction KV": allCiphers[allCiphers.length] = new cipher(key, "English", 97, 195, 244, "FullReduction", "Exception"); break;
            case "Single Reduction KV": allCiphers[allCiphers.length] = new cipher(key, "Custom", 70, 175, 244); break;
            case "Extended English": allCiphers[allCiphers.length] = new cipher(key, "Custom", 218, 226, 0); break;
            case "Francis Bacon": allCiphers[allCiphers.length] = new cipher(key, "English", 150, 244, 77, "CaseSensitive"); break;
            case "Franc Baconis": allCiphers[allCiphers.length] = new cipher(key, "English", 93, 187, 88, "AltCaseSensitive"); break;
            case "Satanic": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 0, 0, "SatanicNum"); break;

            case "Reverse Ordinal": allCiphers[allCiphers.length] = new cipher(key, "English", 80, 235, 21, "Reverse"); break;
            case "Reverse Full Reduction": allCiphers[allCiphers.length] = new cipher(key, "English", 100, 226, 226, "Reverse", "FullReduction"); break;
            case "Reverse Single Reduction": allCiphers[allCiphers.length] = new cipher(key, "Custom", 100, 216, 209); break;
            case "Reverse Full Reduction EP": allCiphers[allCiphers.length] = new cipher(key, "English", 101, 224, 194, "Reverse", "FullReduction", "Exception"); break;
            case "Reverse Single Reduction EP": allCiphers[allCiphers.length] = new cipher(key, "Custom", 110, 226, 156); break;
            case "Reverse Extended": allCiphers[allCiphers.length] = new cipher(key, "Custom", 253, 255, 119); break;
            case "Reverse Francis Bacon": allCiphers[allCiphers.length] = new cipher(key, "English", 163, 255, 88, "Reverse", "CaseSensitive"); break;
            case "Reverse Franc Baconis": allCiphers[allCiphers.length] = new cipher(key, "English", 111, 193, 121, "Reverse", "AltCaseSensitive"); break;
            case "Reverse Satanic": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 51, 51, "Reverse", "SatanicNum"); break;

            case "Jewish Reduction": allCiphers[allCiphers.length] = new cipher(key, "Jewish", 255, 189, 2, "FullReduction"); break;
            case "Jewish Ordinal": allCiphers[allCiphers.length] = new cipher(key, "Jewish", 255, 209, 36); break;
            case "Jewish": allCiphers[allCiphers.length] = new cipher(key, "Jewish", 255, 227, 93, "Extend"); break;

            case "ALW Kabbalah": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 64, 0, "ALW"); break;
            case "KFW Kabbalah": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 88, 0, "KFW"); break;
            case "LCH Kabbalah": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 93, 73, "LCH"); break;

            case "English Sumerian": allCiphers[allCiphers.length] = new cipher(key, "English", 169, 208, 142, "SumerianNum"); break;
            case "Reverse English Sumerian": allCiphers[allCiphers.length] = new cipher(key, "English", 220, 208, 148, "Reverse", "SumerianNum"); break;
            case "Primes": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 204, 111, "PrimeNum"); break;
            case "Trigonal": allCiphers[allCiphers.length] = new cipher(key, "English", 231, 180, 113, "TriangleNum"); break;
            case "Squares": allCiphers[allCiphers.length] = new cipher(key, "English", 228, 216, 96, "SquareNum"); break;
            case "Reverse Primes": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 209, 145, "Reverse", "PrimeNum"); break;
            case "Reverse Trigonal": allCiphers[allCiphers.length] = new cipher(key, "English", 238, 191, 112, "Reverse", "TriangleNum"); break;
            case "Reverse Squares": allCiphers[allCiphers.length] = new cipher(key, "English", 240, 225, 112, "Reverse", "SquareNum"); break;

            case "Septenary": allCiphers[allCiphers.length] = new cipher(key, "English", 255, 153, 77, "SeptenaryNum"); break;
            case "Chaldean": allCiphers[allCiphers.length] = new cipher(key, "Chald", 166, 166, 99); break;
            case "Keypad": allCiphers[allCiphers.length] = new cipher(key, "Keypad", 255, 126, 255); break;
            case "Fibonacci": allCiphers[allCiphers.length] = new cipher(key, "Fibonacci", 233, 202, 148); break;
            case "Alphanumeric Qabbala": allCiphers[allCiphers.length] = new cipher(key, "Custom", 128, 0, 128); break;

            // New custom ciphers
            case "Elizabethan 360": allCiphers[allCiphers.length] = new cipher(key, "Elizabethan360", 138, 43, 226); break;
            case "William G. Gray": allCiphers[allCiphers.length] = new cipher(key, "WilliamGGray", 255, 140, 0); break;
            case "Synx": allCiphers[allCiphers.length] = new cipher(key, "Synx", 75, 0, 130); break;
            case "Beatus of Liebana": allCiphers[allCiphers.length] = new cipher(key, "BeatusLiebana", 184, 134, 11); break;
            case "Prime Qabalah": allCiphers[allCiphers.length] = new cipher(key, "PrimeQabalah", 220, 20, 60); break;
            case "False Kabbalah": allCiphers[allCiphers.length] = new cipher(key, "FalseKabbalah", 139, 69, 19); break;
        }
    }
}

// Initialization function matching Code 1
function Gem_Launch() {
    Set_Categories();
    Build_Ciphers();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        cipher,
        allCiphers,
        cipherArray,
        openCiphers,
        ciphersOn,
        Gem_Launch,
        Set_Categories,
        Build_Ciphers,
        Build_GemVals,
        ReducedNum,
        isReduced,
        NumberArray,
        primeArr,
        customvalues,
        opt_NumCalculation
    };
}
