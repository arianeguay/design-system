import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const src = join(process.cwd(), 'src/styles');
const dest = join(process.cwd(), 'dist/styles');

mkdirSync(dest, { recursive: true });

const files = ['tokens.css', 'typography.css', 'layout.css'];
for (const file of files) {
  copyFileSync(join(src, file), join(dest, file));
}

const index = files.map(f => `@import './${f}';`).join('\n') + '\n';
writeFileSync(join(dest, 'index.css'), index);

console.log('CSS copied to dist/styles/');
