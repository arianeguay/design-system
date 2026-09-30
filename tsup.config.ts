import { defineConfig } from 'tsup';

const shared = {
  format: ['esm', 'cjs'] as ('esm' | 'cjs')[],
  dts: true,
  sourcemap: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options: { jsx?: string }) {
    options.jsx = 'automatic';
  },
};

export default defineConfig([
  {
    ...shared,
    entry: ['src/index.ts'],
    clean: true,
    // Preserve "use client" from src/index.ts in the bundle output
    banner: { js: '"use client";' },
  },
  {
    ...shared,
    entry: ['src/studio.ts'],
  },
]);
