import fs from 'fs';

const bundle = fs.readFileSync('scratch/bundle.js', 'utf8');

const regex = /baseURL:\s*["']([^"']+)["']/g;
let m;
while ((m = regex.exec(bundle)) !== null) {
  console.log('baseURL:', m[1]);
}

// Also check VITE_API_URL or similar
const apiRegex = /https?:\/\/[a-zA-Z0-9.\-_:]+\/api/g;
while ((m = apiRegex.exec(bundle)) !== null) {
  console.log('API url found:', m[0]);
}

const mtMatch = bundle.match(/mt\s*=\s*["']([^"']+)["']/);
if (mtMatch) {
  console.log('mt =', mtMatch[1]);
}
