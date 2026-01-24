# Debug llm-offload Integration 🔧

**Issue:** Synthesizer hangs when calling llm-offload via child process
**Status:** Needs debugging
**Priority:** HIGH - Blocking module generation
**Available Providers:** MiniMax 2.1, Grok4-fast (recommended alternative)

---

## 🔍 Problem Description

The `AISynthesizer.generateModule()` method hangs when calling llm-offload:

```typescript
// lib/content-generation/synthesizer/index.ts:47
async generateModule(data: AggregatedData): Promise<string> {
  // ... prepare prompt ...
  const result = await this.callLLM(prompt);  // ← HANGS HERE
  return result;
}
```

**Symptoms:**
- Script starts, fetches data, aggregates successfully
- Hangs at "Generating module for: diabetes-mellitus-2"
- No output, no error, no timeout
- Process must be killed manually

---

## 🧪 Debugging Steps

### **Step 1: Test llm-offload CLI Directly**

```bash
# Test if llm-offload is installed and working
llm-offload --version

# Test Grok4-fast provider (RECOMMENDED - faster and more reliable)
echo "Hello, world!" | llm-offload --provider grok4-fast --max-tokens 100

# Test MiniMax provider
echo "Hello, world!" | llm-offload --provider minimax --max-tokens 100

# Test with longer prompt (Grok4-fast)
cat lib/content-generation/output/diabetes-prompt.txt | llm-offload --provider grok4-fast --max-tokens 8000
```

**Expected:** Should return generated text within 5-20 seconds
**If fails:** Check API key configuration (GROK_API_KEY or MINIMAX_API_KEY)

### **Step 2: Check API Keys**

```bash
# Check if API keys are set
echo $GROK_API_KEY      # For Grok4-fast (recommended)
echo $MINIMAX_API_KEY   # For MiniMax 2.1

# Or check llm-offload config
llm-offload --list-providers
```

**If missing:** Set API key:

```bash
# For Grok4-fast (recommended)
export GROK_API_KEY="your-grok-api-key-here"

# Or for MiniMax
export MINIMAX_API_KEY="your-minimax-api-key-here"
```

### **Step 3: Test Synthesizer in Isolation**

```bash
# Run single module test
npx tsx scripts/generate-single-module-test.ts

# Add debug logging to synthesizer
# Edit lib/content-generation/synthesizer/index.ts and add console.log statements
```

### **Step 4: Check Process Communication**

The issue might be with stdin/stdout buffering. Check:

```typescript
// lib/content-generation/synthesizer/index.ts:110
private async callLLM(prompt: string): Promise<string> {
  const command = `echo "${prompt.replace(/"/g, '\\"')}" | llm-offload --provider ${this.config.provider} --max-tokens ${this.config.maxTokens}`;
  
  console.log('🔧 DEBUG: Command:', command.substring(0, 100) + '...');
  
  const { stdout, stderr } = await execAsync(command, {
    maxBuffer: 10 * 1024 * 1024, // 10MB buffer
  });
  
  console.log('🔧 DEBUG: stdout length:', stdout.length);
  console.log('🔧 DEBUG: stderr:', stderr);
  
  return stdout.trim();
}
```

---

## 🔧 Potential Fixes

### **Fix 1: Use File-Based Communication**

Instead of piping via stdin, write prompt to file:

```typescript
private async callLLM(prompt: string): Promise<string> {
  // Write prompt to temp file
  const tempFile = `/tmp/llm-prompt-${Date.now()}.txt`;
  await writeFile(tempFile, prompt);
  
  // Call llm-offload with file input
  const command = `cat ${tempFile} | llm-offload --provider ${this.config.provider} --max-tokens ${this.config.maxTokens}`;
  
  const { stdout } = await execAsync(command, {
    maxBuffer: 10 * 1024 * 1024,
  });
  
  // Cleanup
  await unlink(tempFile);
  
  return stdout.trim();
}
```

### **Fix 2: Use Direct HTTP API**

Skip llm-offload CLI and call MiniMax API directly:

```typescript
private async callLLM(prompt: string): Promise<string> {
  const response = await fetch('https://api.minimax.chat/v1/text/chatcompletion_v2', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.MINIMAX_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'abab6.5s-chat',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: this.config.maxTokens,
      temperature: this.config.temperature,
    }),
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
}
```

### **Fix 3: Use Grok4-fast Provider (RECOMMENDED)**

Grok4-fast is faster and more reliable than MiniMax:

```typescript
const synthesizer = new AISynthesizer({
  provider: 'grok4-fast',  // Recommended: faster and more reliable
  maxTokens: 8000
});
```

Or try local provider as fallback:

```typescript
const synthesizer = new AISynthesizer({
  provider: 'local',  // Use local Mistral (slower but free)
  maxTokens: 8000
});
```

---

## 🎯 Recommended Approach

**Priority Order:**

1. **Test llm-offload CLI directly** (Step 1) - 5 minutes
   - If works: Problem is in synthesizer code
   - If fails: Problem is with llm-offload or API key

2. **Check API key** (Step 2) - 2 minutes
   - If missing: Set it and retry
   - If present: Continue to Step 3

3. **Add debug logging** (Step 3) - 10 minutes
   - Identify exact point of failure
   - Check if command is being executed

4. **Try Fix 1 (file-based)** (Fix 1) - 15 minutes
   - Avoids stdin/stdout buffering issues
   - More reliable for large prompts

5. **Try Fix 2 (direct API)** (Fix 2) - 30 minutes
   - Most reliable approach
   - No dependency on llm-offload CLI
   - Better error handling

6. **Try Fix 3 (alternative provider)** (Fix 3) - 5 minutes
   - Quick workaround if MiniMax is problematic
   - May be slower but should work

---

## 📝 Testing Checklist

After implementing fix:

- [ ] Test single module generation: `npx tsx scripts/generate-single-module-test.ts`
- [ ] Verify module quality (citations, ontology codes, structure)
- [ ] Test batch generation: `npx tsx scripts/generate-all-modules.ts`
- [ ] Verify all 18 modules generated successfully
- [ ] Check generation time (should be ~15s per module)
- [ ] Validate all modules with validator
- [ ] Ensure Grade A quality (≥90/100)

---

## 🚀 Once Fixed

Run batch generation:

```bash
# Generate all 18 modules
npx tsx scripts/generate-all-modules.ts

# Expected output:
# ✅ Successful: 18
# ❌ Failed: 0
# ⏱️  Total Duration: ~4.5 minutes
# 📊 Average Grade: A (95/100)
```

Then proceed to Task D (Multilingual Support)!

---

## 📚 References

- llm-offload docs: https://github.com/your-repo/llm-offload
- MiniMax API docs: https://api.minimax.chat/document/guides/chat-model/V2
- Darwin-MFC synthesizer: `lib/content-generation/synthesizer/index.ts`
- Batch generation script: `scripts/generate-all-modules.ts`

---

**Good luck debugging!** 🔧🚀

