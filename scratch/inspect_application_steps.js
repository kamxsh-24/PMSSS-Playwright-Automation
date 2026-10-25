import fs from 'fs';

const bundle = fs.readFileSync('scratch/bundle.js', 'utf8');

// Find where Ml is used and the code around it
const idx = bundle.indexOf('Ml=[');
console.log('=== Chunk around Ml=[ ===');
console.log(bundle.substring(idx - 200, idx + 4000));
