# FIRST PROMPT FOR NEW CHAT

Copy everything below the line and paste it as your first message in the new chat. Make sure to attach the `CHATGPT_MCP_HANDOFF.md` file when sending this message.

---

I need you to build a ChatGPT MCP App for my gematria calculator.

## RESOURCES PROVIDED

1. **📄 CHATGPT_MCP_HANDOFF.md** (attached) - READ THIS FIRST
   - Contains all cipher definitions and calculation logic
   - MCP architecture requirements
   - Tech stack and project structure
   - What NOT to carry over from the original app

2. **🔗 GitHub Repo**: https://github.com/chaupham1092/gematria-calculator-app
   - Reference for complete cipher definitions: `src/data/ciphers.js`
   - Date numerology logic: `src/utils/dateNumerology.js`
   - NOTE: This is a React Native app - DO NOT copy its architecture

## CRITICAL CONTEXT

**This is a NEW, SEPARATE project.** The GitHub repo is a React Native mobile app. We are building something completely different:

| Original App | New MCP App |
|--------------|-------------|
| React Native + Expo | Node.js backend |
| Mobile app stores | ChatGPT App Directory |
| AdMob ads | No ads (not allowed) |
| React Navigation | MCP protocol |
| React Native components | HTML/React widget in iframe |

## WHAT I NEED YOU TO BUILD

1. **MCP Server** on Netlify Functions exposing these tools:
   - `calculate_gematria` - Calculate values across all 44 ciphers
   - `compare_phrases` - Compare two phrases to find matching ciphers
   - `date_numerology` - Calculate date numerology values
   - `find_matches` - Find ciphers that produce a specific value

2. **Interactive Widget** - HTML/React component that displays results in a table inside ChatGPT

3. **No Authentication** - This is a public calculator, use `securitySchemes: [{ type: "noauth" }]`

## MY WORKING STYLE

- **No unnecessary documentation** - Don't create summary files or progress reports
- **Fix code, not environment** - Never suggest "clear cache" or "restart" as solutions
- **Minimal implementations** - Write only what's needed
- **Ask before building** - Clarify requirements if unclear
- **Show the plan first** - Propose structure before coding

## DELIVERABLES

1. Project structure proposal
2. MCP server implementation (Netlify Functions)
3. Widget implementation (React bundled to HTML)
4. Netlify configuration
5. Testing instructions
6. Submission checklist

## YOUR FIRST TASK

1. Confirm you've read the CHATGPT_MCP_HANDOFF.md file
2. Confirm you understand this is NOT a React Native project
3. Review the cipher definitions in the GitHub repo's `src/data/ciphers.js`
4. Propose the project structure and implementation plan

**Do NOT start coding until I approve the plan.**
