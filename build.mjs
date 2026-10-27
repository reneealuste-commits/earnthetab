import fs from 'node:fs';
import path from 'node:path';

const outDir = 'dist';
fs.mkdirSync(path.join(outDir, 'covers'), { recursive: true });
fs.copyFileSync('index.html', path.join(outDir, 'index.html'));

const assets = JSON.parse(fs.readFileSync('assets.json', 'utf8'));
for (const [relPath, b64] of Object.entries(assets)) {
  const fullPath = path.join(outDir, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, Buffer.from(b64, 'base64'));
}
console.log('Built static site into dist/ with', Object.keys(assets).length, 'binary assets.');
