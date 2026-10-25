import fs from 'fs';

const bundle = fs.readFileSync('scratch/bundle.js', 'utf8');
const idx = bundle.indexOf('r2=()=>');
console.log('=== r2 Component Part 2 ===');
console.log(bundle.substring(idx + 10000, idx + 22000));
