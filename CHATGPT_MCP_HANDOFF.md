# ChatGPT MCP App Handoff Document
## Gematria Calculator - ChatGPT Apps SDK Version

---

## CRITICAL: READ THIS FIRST

This document provides everything needed to build a **ChatGPT MCP App** for the Gematria Calculator. This is a **COMPLETELY SEPARATE PROJECT** from the original React Native app.

### What This Project IS:
- ✅ Node.js backend server (MCP protocol)
- ✅ Netlify Functions for hosting
- ✅ React widget for ChatGPT UI (NOT React Native)
- ✅ Conversational interface inside ChatGPT
- ✅ No authentication required (public calculator)

### What This Project IS NOT:
- ❌ NOT a React Native app
- ❌ NOT using Expo
- ❌ NOT for mobile app stores
- ❌ NOT using AdMob
- ❌ DO NOT copy mobile app architecture patterns

---

## 1. PROJECT OVERVIEW

### What We're Building
A ChatGPT App that lets users calculate gematria values directly in ChatGPT conversations. Users can say things like:
- "Calculate gematria for 'Jesus Christ'"
- "What phrases equal 666 in English Ordinal?"
- "Compare 'love' and 'hate' across all ciphers"
- "Calculate date numerology for 9/11/2001"

### Architecture
```
┌─────────────────────────────────────────────────────────┐
│                      ChatGPT                            │
│  ┌─────────────────────────────────────────────────┐   │
│  │              User Conversation                   │   │
│  │  "Calculate gematria for 'hello world'"         │   │
│  └─────────────────────────────────────────────────┘   │
│                         │                               │
│                         ▼                               │
│  ┌─────────────────────────────────────────────────┐   │
│  │           MCP Tool Call                          │   │
│  │  calculate_gematria({ text: "hello world" })    │   │
│  └─────────────────────────────────────────────────┘   │
│                         │                               │
└─────────────────────────│───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Your MCP Server (Netlify Functions)        │
│  ┌─────────────────────────────────────────────────┐   │
│  │  /mcp endpoint                                   │   │
│  │  - Receives tool calls                          │   │
│  │  - Executes gematria calculations               │   │
│  │  - Returns structured data + widget HTML        │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Widget (iframe in ChatGPT)                 │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Interactive results table                       │   │
│  │  - Shows all cipher values                      │   │
│  │  - Filterable by category                       │   │
│  │  - Expandable letter breakdowns                 │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 2. TECH STACK

### Required
- **Runtime**: Node.js 18+
- **Hosting**: Netlify Functions (serverless)
- **MCP SDK**: `@modelcontextprotocol/sdk`
- **Schema Validation**: `zod`
- **Widget**: React (bundled with esbuild/Vite) - NOT React Native

### Project Structure
```
gematria-mcp-server/
├── netlify/
│   └── functions/
│       └── mcp.js              # MCP server endpoint
├── src/
│   ├── ciphers.js              # Cipher definitions (from original app)
│   ├── calculations.js         # Gematria calculation logic
│   ├── dateNumerology.js       # Date calculation logic
│   └── widget/
│       ├── index.html          # Widget entry point
│       ├── App.jsx             # React widget component
│       └── styles.css          # Widget styles
├── public/
│   └── widget.html             # Bundled widget (build output)
├── package.json
├── netlify.toml
└── README.md
```

---

## 3. MCP TOOLS TO IMPLEMENT

### Tool 1: calculate_gematria
```javascript
{
  name: "calculate_gematria",
  description: "Calculate gematria values for text across multiple cipher systems",
  inputSchema: {
    text: z.string().describe("The text to calculate gematria for"),
    ciphers: z.array(z.string()).optional().describe("Specific ciphers to use (default: all)")
  },
  annotations: {
    title: "Calculate Gematria",
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: false
  }
}
```

### Tool 2: compare_phrases
```javascript
{
  name: "compare_phrases",
  description: "Compare gematria values of two phrases to find matching ciphers",
  inputSchema: {
    phrase1: z.string().describe("First phrase to compare"),
    phrase2: z.string().describe("Second phrase to compare"),
    ciphers: z.array(z.string()).optional().describe("Specific ciphers to use")
  },
  annotations: {
    title: "Compare Phrases",
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: false
  }
}
```

### Tool 3: date_numerology
```javascript
{
  name: "date_numerology",
  description: "Calculate numerology values for a date",
  inputSchema: {
    month: z.number().min(1).max(12).describe("Month (1-12)"),
    day: z.number().min(1).max(31).describe("Day (1-31)"),
    year: z.number().describe("Year (e.g., 2024)")
  },
  annotations: {
    title: "Date Numerology",
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: false
  }
}
```

### Tool 4: find_matches
```javascript
{
  name: "find_matches",
  description: "Find which ciphers produce a specific value for given text",
  inputSchema: {
    text: z.string().describe("The text to analyze"),
    targetValue: z.number().describe("The target gematria value to find")
  },
  annotations: {
    title: "Find Matches",
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: false
  }
}
```

---

## 4. CIPHER DEFINITIONS

### All 44 Ciphers (Copy this exactly)
```javascript
export const ciphers = {
  englishOrdinal: {
    name: "English Ordinal",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'j': 10, 'k': 11, 'l': 12, 'm': 13, 'n': 14, 'o': 15, 'p': 16, 'q': 17,
      'r': 18, 's': 19, 't': 20, 'u': 21, 'v': 22, 'w': 23, 'x': 24, 'y': 25, 'z': 26
    }
  },
  fullReduction: {
    name: "Full Reduction",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
      's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    }
  },
  reverseOrdinal: {
    name: "Reverse Ordinal",
    values: {
      'a': 26, 'b': 25, 'c': 24, 'd': 23, 'e': 22, 'f': 21, 'g': 20, 'h': 19, 'i': 18,
      'j': 17, 'k': 16, 'l': 15, 'm': 14, 'n': 13, 'o': 12, 'p': 11, 'q': 10,
      'r': 9, 's': 8, 't': 7, 'u': 6, 'v': 5, 'w': 4, 'x': 3, 'y': 2, 'z': 1
    }
  },
  jewish: {
    name: "Jewish",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'k': 10, 'l': 20, 'm': 30, 'n': 40, 'o': 50, 'p': 60, 'q': 70, 'r': 80, 's': 90,
      't': 100, 'u': 200, 'x': 300, 'y': 400, 'z': 500, 'j': 600, 'v': 700, 'w': 900
    }
  },
  englishSumerian: {
    name: "English Sumerian",
    values: {
      'a': 6, 'b': 12, 'c': 18, 'd': 24, 'e': 30, 'f': 36, 'g': 42, 'h': 48, 'i': 54,
      'j': 60, 'k': 66, 'l': 72, 'm': 78, 'n': 84, 'o': 90, 'p': 96, 'q': 102,
      'r': 108, 's': 114, 't': 120, 'u': 126, 'v': 132, 'w': 138, 'x': 144, 'y': 150, 'z': 156
    }
  },
  satanic: {
    name: "Satanic",
    values: {
      'a': 36, 'b': 37, 'c': 38, 'd': 39, 'e': 40, 'f': 41, 'g': 42, 'h': 43, 'i': 44,
      'j': 45, 'k': 46, 'l': 47, 'm': 48, 'n': 49, 'o': 50, 'p': 51, 'q': 52,
      'r': 53, 's': 54, 't': 55, 'u': 56, 'v': 57, 'w': 58, 'x': 59, 'y': 60, 'z': 61
    }
  },
  primes: {
    name: "Primes",
    values: {
      'a': 2, 'b': 3, 'c': 5, 'd': 7, 'e': 11, 'f': 13, 'g': 17, 'h': 19, 'i': 23,
      'j': 29, 'k': 31, 'l': 37, 'm': 41, 'n': 43, 'o': 47, 'p': 53, 'q': 59,
      'r': 61, 's': 67, 't': 71, 'u': 73, 'v': 79, 'w': 83, 'x': 89, 'y': 97, 'z': 101
    }
  },
  fibonacci: {
    name: "Fibonacci",
    values: {
      'a': 1, 'b': 1, 'c': 2, 'd': 3, 'e': 5, 'f': 8, 'g': 13, 'h': 21, 'i': 34,
      'j': 55, 'k': 89, 'l': 144, 'm': 233, 'n': 377, 'o': 610, 'p': 987, 'q': 1597,
      'r': 2584, 's': 4181, 't': 6765, 'u': 10946, 'v': 17711, 'w': 28657, 'x': 46368, 'y': 75025, 'z': 121393
    }
  },
  chaldean: {
    name: "Chaldean",
    values: {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 8, 'g': 3, 'h': 5, 'i': 1,
      'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 7, 'p': 8, 'q': 1, 'r': 2,
      's': 3, 't': 4, 'u': 6, 'v': 6, 'w': 6, 'x': 5, 'y': 1, 'z': 7
    }
  }
  // ... (see full list in src/data/ciphers.js in the GitHub repo)
};
```

**IMPORTANT**: The GitHub repo contains ALL 44 ciphers. Use `src/data/ciphers.js` as the source of truth.

---

## 5. CALCULATION LOGIC

### Core Gematria Calculation
```javascript
export function calculateGematria(text, cipher) {
  const lowerText = text.toLowerCase();
  let total = 0;
  const letterBreakdown = [];
  
  for (const char of lowerText) {
    if (cipher.values[char] !== undefined) {
      const value = cipher.values[char];
      total += value;
      letterBreakdown.push({ char, value });
    }
    // Non-letter characters are ignored
  }
  
  return {
    total,
    letterBreakdown,
    text: text
  };
}

// Calculate across all ciphers
export function calculateAllCiphers(text, selectedCiphers = null) {
  const results = [];
  
  for (const [key, cipher] of Object.entries(ciphers)) {
    if (selectedCiphers && !selectedCiphers.includes(key)) continue;
    
    const result = calculateGematria(text, cipher);
    results.push({
      cipherKey: key,
      cipherName: cipher.name,
      value: result.total,
      breakdown: result.letterBreakdown
    });
  }
  
  return results;
}
```

### Date Numerology Calculation
```javascript
export function calculateDateNumerology(month, day, year) {
  const m = parseInt(month) || 0;
  const d = parseInt(day) || 0;
  const y = parseInt(year) || 0;
  
  const yearStr = String(y).padStart(4, '0');
  const firstTwoYear = parseInt(yearStr.substring(0, 2)) || 0;
  const lastTwoYear = parseInt(yearStr.substring(2, 4)) || 0;
  
  const sumDigits = (num) => String(num).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  
  return [
    { label: `(${m}) + (${d}) + (${firstTwoYear}) + (${lastTwoYear})`, value: m + d + firstTwoYear + lastTwoYear },
    { label: `(${m}) + (${d}) + ${yearStr.split('').join('+')}`, value: m + d + sumDigits(y) },
    { label: `${String(m).split('').join('+')} + ${String(d).split('').join('+')} + ${yearStr.split('').join('+')}`, value: sumDigits(m) + sumDigits(d) + sumDigits(y) },
    { label: `(${m}) + (${d}) + (${lastTwoYear})`, value: m + d + lastTwoYear },
    { label: `(${m}) + (${d})`, value: m + d }
  ];
}

export function getDayOfYear(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  if (isLeapYear) daysInMonth[1] = 29;
  
  let dayOfYear = day;
  for (let i = 0; i < month; i++) {
    dayOfYear += daysInMonth[i];
  }
  return dayOfYear;
}

export function getDaysLeftInYear(date) {
  const year = date.getFullYear();
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const totalDaysInYear = isLeapYear ? 366 : 365;
  return totalDaysInYear - getDayOfYear(date);
}
```

---

## 6. MCP SERVER IMPLEMENTATION

### Basic Structure (Netlify Function)
```javascript
// netlify/functions/mcp.js
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import { calculateAllCiphers, calculateDateNumerology } from "../../src/calculations.js";

// Read widget HTML (bundled at build time)
const widgetHtml = `<!-- Your bundled widget HTML -->`;

function createGematriaServer() {
  const server = new McpServer({ name: "gematria-calculator", version: "1.0.0" });

  // Register widget resource
  server.registerResource(
    "gematria-widget",
    "ui://widget/gematria.html",
    {},
    async () => ({
      contents: [{
        uri: "ui://widget/gematria.html",
        mimeType: "text/html+skybridge",
        text: widgetHtml,
      }]
    })
  );

  // Register calculate_gematria tool
  server.registerTool(
    "calculate_gematria",
    {
      title: "Calculate Gematria",
      description: "Calculate gematria values for text across multiple cipher systems",
      inputSchema: { text: z.string() },
      _meta: {
        "openai/outputTemplate": "ui://widget/gematria.html",
      },
      securitySchemes: [{ type: "noauth" }]
    },
    async (args) => {
      const results = calculateAllCiphers(args.text);
      return {
        content: [{ type: "text", text: `Calculated gematria for "${args.text}"` }],
        structuredContent: { text: args.text, results }
      };
    }
  );

  // ... register other tools

  return server;
}

// Netlify function handler
export default async (req) => {
  if (req.method === "POST") {
    const server = createGematriaServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    
    // Handle CORS
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "content-type, mcp-session-id",
    };
    
    await server.connect(transport);
    const body = await req.json();
    // ... handle request
  }
  
  return new Response("Method not allowed", { status: 405 });
};

export const config = { path: "/mcp" };
```

---

## 7. WIDGET IMPLEMENTATION

### Widget HTML Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Gematria Calculator</title>
  <style>
    :root { --primary: #3498db; --dark: #2c3e50; --bg: #f5f5f5; }
    body { font-family: system-ui, sans-serif; margin: 0; padding: 16px; background: var(--bg); }
    .results-table { width: 100%; border-collapse: collapse; }
    .results-table th, .results-table td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
    .cipher-name { font-weight: 500; color: var(--dark); }
    .cipher-value { font-weight: bold; color: var(--primary); }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="module">
    // Read data from window.openai.toolOutput
    const data = window.openai?.toolOutput;
    
    if (data?.results) {
      const root = document.getElementById('root');
      root.innerHTML = `
        <h2>Gematria: "${data.text}"</h2>
        <table class="results-table">
          <thead><tr><th>Cipher</th><th>Value</th></tr></thead>
          <tbody>
            ${data.results.map(r => `
              <tr>
                <td class="cipher-name">${r.cipherName}</td>
                <td class="cipher-value">${r.value.toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }
  </script>
</body>
</html>
```

---

## 8. DEPLOYMENT & SUBMISSION

### Netlify Configuration
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "public"
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"

[[headers]]
  for = "/mcp"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "POST, GET, OPTIONS"
    Access-Control-Allow-Headers = "content-type, mcp-session-id"
```

### Domain Verification Endpoint
```javascript
// netlify/functions/openai-challenge.js
export default async (req) => {
  return new Response("YOUR_VERIFICATION_TOKEN", {
    headers: { "Content-Type": "text/plain" }
  });
};

export const config = { path: "/.well-known/openai-apps-challenge" };
```

### Submission Checklist
- [ ] Two app icons (light/dark mode, square, high-res)
- [ ] App name: "Gematria Calculator"
- [ ] Description: "Calculate gematria values across 44+ cipher systems"
- [ ] Privacy policy URL
- [ ] MCP server URL: `https://your-domain.netlify.app/mcp`
- [ ] Domain verification endpoint working
- [ ] 5+ positive test cases
- [ ] 3+ negative test cases
- [ ] Tool annotations (readOnlyHint: true for all tools)

---

## 9. WORKING STYLE PREFERENCES

### DO:
- ✅ Write minimal, focused code
- ✅ Fix issues in code, never suggest "clear cache" or "restart"
- ✅ Ask clarifying questions if requirements are unclear
- ✅ Show the plan before building
- ✅ Test with MCP Inspector before ChatGPT

### DON'T:
- ❌ Create unnecessary documentation files
- ❌ Use React Native patterns (this is NOT React Native)
- ❌ Over-engineer solutions
- ❌ Add features not requested

---

## 10. TEST CASES FOR SUBMISSION

### Positive Test Cases
1. **Basic Calculation**: "Calculate gematria for 'hello world'" → Should trigger calculate_gematria
2. **Famous Phrase**: "What is the gematria of 'Jesus Christ'?" → Should show all cipher values
3. **Number Search**: "What phrases equal 666?" → Should trigger find_matches
4. **Comparison**: "Compare 'love' and 'hate' in gematria" → Should trigger compare_phrases
5. **Date Calculation**: "Calculate numerology for September 11, 2001" → Should trigger date_numerology

### Negative Test Cases
1. "What's the weather today?" → Should NOT trigger (unrelated)
2. "Tell me a joke" → Should NOT trigger (unrelated)
3. "Calculate 2 + 2" → Should NOT trigger (math, not gematria)

---

## 11. RESOURCES

- OpenAI Apps SDK Docs: https://developers.openai.com/apps-sdk/quickstart
- MCP Protocol: https://modelcontextprotocol.io/
- Netlify Functions: https://docs.netlify.com/functions/overview/
- Original App GitHub: https://github.com/chaupham1092/gematria-calculator-app

---

## END OF HANDOFF DOCUMENT
