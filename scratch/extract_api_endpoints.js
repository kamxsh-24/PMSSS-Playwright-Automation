import fs from 'fs';
const bundle = fs.readFileSync('scratch/bundle.js', 'utf8');

const matches = bundle.matchAll(/\/api\/[a-zA-Z0-9_\-\/]+/g);
const set = new Set();
for (const m of matches) {
  set.add(m[0]);
}
console.log('ALL API ENDPOINTS:');
console.log(Array.from(set).sort());
