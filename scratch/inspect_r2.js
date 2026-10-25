import fs from 'fs';

const bundle = fs.readFileSync('scratch/bundle.js', 'utf8');
const idx = bundle.indexOf('r2=()=>');
console.log('=== r2 Component ===');
console.log(bundle.substring(idx, idx + 15000));
