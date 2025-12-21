# AI Architecture for Health Equity

## Philosophy

Darwin-MFC is a **social project for underserved populations**. AI features must be:

1. **100% Optional** - Platform works fully without any AI
2. **Free at Point of Use** - Users never need to pay for AI
3. **Privacy-First** - No data leaves user's device unless explicitly chosen
4. **Citation-Backed** - AI never replaces evidence; it helps find it

## Architecture

### Tier 1: Pre-Generated Content (FREE for all users)
- Maintainers use AI (Claude API) to generate content drafts
- Human experts review and verify all content
- Users receive polished, verified content at no cost
- **This is the default experience**

### Tier 2: Client-Side AI (FREE, runs in browser)
- WebLLM / Transformers.js for local inference
- Runs entirely on user's device
- No API calls, no costs, no data collection
- Best for: search enhancement, Q&A, symptom checker

### Tier 3: Bring Your Own Key (OPTIONAL)
- Users can optionally provide their own API key
- Enables advanced features (content generation, deep analysis)
- Useful for contributors, institutions with API access
- **Never required for core functionality**

## Files

```
lib/ai/
├── README.md                 # This file
├── content-generator.ts      # Tier 3: API-based generation (maintainers)
├── citation-extractor.ts     # PubMed integration (free API)
├── client-inference.ts       # Tier 2: Browser-based LLM
└── config.ts                 # AI configuration and feature flags
```

## Free AI Options

### For Users (Tier 2)
- **WebLLM**: https://webllm.mlc.ai/ (runs Llama/Mistral in browser)
- **Transformers.js**: https://huggingface.co/docs/transformers.js

### For Contributors (Tier 3)
- **Ollama**: https://ollama.ai/ (free, runs locally)
- **Groq**: Free tier available
- **Google AI Studio**: Free tier for Gemini

### Always Free
- **PubMed E-utilities**: No API key required (rate-limited)
- **CrossRef API**: Free for metadata queries

## Implementation Priority

1. ✅ Citation extractor (PubMed - free)
2. ✅ Content generator (for maintainers - we pay)
3. 🔄 Client-side inference (WebLLM - free for users)
4. 📋 Pre-generated content library

## Guiding Principles

> "If a feature requires payment, it's a luxury, not a feature."

- Core clinical content: Always free, always accessible
- AI assistance: Nice to have, never required
- Offline-first: Works without internet after first load
- Low bandwidth: Optimized for 3G connections

## Usage Examples

### User in Rural Brazil (Tier 1 only)
```
- Opens Darwin-MFC on mobile
- All content pre-loaded, works offline
- Full access to diseases, medications, calculators
- Zero AI costs, zero internet after initial load
```

### User with Modern Device (Tier 2)
```
- Same as above, plus:
- Enables browser-based AI for smart search
- Runs Llama 3 locally via WebLLM
- Still free, still private
```

### Contributor with API Access (Tier 3)
```
- Uses CLI to generate new disease entries
- Provides own Anthropic/OpenAI key
- Drafts reviewed by medical team
- Content published for all users (free)
```

---

*Part of Darwin-MFC SOTA Strategic Plan*
*Health Equity Through Technology*
