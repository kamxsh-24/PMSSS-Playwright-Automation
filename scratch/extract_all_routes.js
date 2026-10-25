import fs from 'fs';
const bundle = fs.readFileSync('scratch/bundle.js', 'utf8');

// Search for route definitions like path: "..."
const matches = bundle.matchAll(/path\s*:\s*["']([^"']+)["']/g);
const set = new Set();
for (const m of matches) {
  set.add(m[1]);
}
console.log('ALL ROUTES IN BUNDLE:');
console.log(Array.from(set).sort());
