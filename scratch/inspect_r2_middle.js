import fs from 'fs';

const bundle = fs.readFileSync('scratch/bundle.js', 'utf8');
const idx = bundle.indexOf('r2=()=>');
const snippet = bundle.substring(idx + 2000, idx + 8000);
console.log('=== r2 middle section ===');
console.log(snippet);
