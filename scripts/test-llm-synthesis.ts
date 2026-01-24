/**
 * TEST LLM SYNTHESIS
 * ==================
 * 
 * Simple test of llm-offload integration.
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile } from 'fs/promises';

const execAsync = promisify(exec);

async function testLLMSynthesis() {
  console.log('🧪 Testing LLM Synthesis\n');
  console.log('='.repeat(80));

  const prompt = `You are a medical content synthesizer.

Generate a brief TypeScript object for diabetes screening with the following structure:

{
  id: 'diabetes-screening',
  titulo: 'Rastreamento de Diabetes Mellitus',
  categoria: 'adultos',
  descricao: 'Brief description here',
}

Generate ONLY the TypeScript object. Do NOT include explanations or markdown.`;

  console.log('\n📝 Prompt:\n');
  console.log(prompt);
  console.log('\n' + '='.repeat(80));

  console.log('\n🤖 Calling llm-offload (MiniMax 2.1)...\n');

  try {
    const startTime = Date.now();

    // Write prompt to temp file
    await writeFile('/tmp/llm-prompt.txt', prompt);

    // Call llm-offload with file input (using MiniMax for speed)
    const command = `cat /tmp/llm-prompt.txt | llm-offload --provider minimax --max-tokens 500 --temperature 0.3 --no-stream`;
    
    const { stdout, stderr } = await execAsync(command, {
      maxBuffer: 10 * 1024 * 1024,
      timeout: 60000, // 60 second timeout
    });

    const duration = Date.now() - startTime;

    if (stderr) {
      console.log('⚠️  stderr:', stderr);
    }

    console.log(`✅ Generated in ${(duration / 1000).toFixed(1)}s\n`);
    console.log('📄 Output:\n');
    console.log('─'.repeat(80));
    console.log(stdout);
    console.log('─'.repeat(80));

    // Save output
    await writeFile('lib/content-generation/output/test-synthesis.txt', stdout);
    console.log('\n✅ Saved to: lib/content-generation/output/test-synthesis.txt');

  } catch (error: any) {
    console.error('\n❌ LLM call failed:', error.message);
    if (error.stdout) console.log('stdout:', error.stdout);
    if (error.stderr) console.log('stderr:', error.stderr);
    throw error;
  }

  console.log('\n🎉 Test Complete!');
}

// Run
testLLMSynthesis().catch(error => {
  console.error('\n❌ Test failed:', error);
  process.exit(1);
});

