import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/diseases.ts',
    'src/medications.ts',
    'src/protocols.ts',
    'src/types.ts',
  ],
  format: ['cjs', 'esm'],
  // Disable DTS for now - types are bundled into the JS
  // Consumers can use inferred types from the bundled code
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  outDir: 'dist',
  // Externalize React Flow to avoid bundling UI dependencies
  external: ['@xyflow/react', 'react', 'react-dom'],
});
