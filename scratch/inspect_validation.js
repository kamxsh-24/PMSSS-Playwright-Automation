import fs from 'fs';

const bundle = fs.readFileSync('scratch/bundle.js', 'utf8');
const idx = bundle.indexOf('r2=()=>');
const snippet = bundle.substring(idx, idx + 8000);
console.log('=== Function T and validations ===');
const tMatch = snippet.match(/const\s+T\s*=\s*(async\s*)?\([^)]*\)\s*=>[^{]*\{[\s\S]*?(?=const\s+\$)/);
if (tMatch) {
  console.log(tMatch[0]);
} else {
  console.log('Not matched directly, searching for "const T="');
  const pos = snippet.indexOf('const T=');
  console.log(snippet.substring(pos, pos + 2500));
}
