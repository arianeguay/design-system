import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const src = join(process.cwd(), 'src/styles');
const dest = join(process.cwd(), 'dist/styles');

mkdirSync(dest, { recursive: true });

const files = ['tokens.css', 'typography.css', 'layout.css'];
for (const file of files) {
  copyFileSync(join(src, file), join(dest, file));
}

const imports = files.map(f => `@import './${f}';`);

// tsup emits the bundled CSS modules to dist/index.css. Include it so that
// `@arianeguay/design-system/styles` ships everything in a single import.
if (existsSync(join(process.cwd(), 'dist/index.css'))) {
  imports.push(`@import '../index.css';`);
}

writeFileSync(join(dest, 'index.css'), imports.join('\n') + '\n');

console.log('CSS copied to dist/styles/');
