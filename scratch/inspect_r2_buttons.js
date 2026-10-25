import fs from 'fs';

const bundle = fs.readFileSync('scratch/bundle.js', 'utf8');
const idx = bundle.indexOf('r2=()=>');
console.log('=== r2 Buttons and actions ===');
console.log(bundle.substring(idx + 18000, idx + 26000));
