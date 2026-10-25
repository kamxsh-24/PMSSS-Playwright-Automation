import fs from 'fs';

const bundle = fs.readFileSync('scratch/bundle.js', 'utf8');
const idx = bundle.indexOf('$=async()=>{');
console.log('=== Function $ (Submit) ===');
console.log(bundle.substring(idx, idx + 3000));
