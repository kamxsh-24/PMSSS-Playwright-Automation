import fs from 'fs';

const bundle = fs.readFileSync('scratch/bundle.js', 'utf8');

// Find ud component or /dashboard/status elements
const statusIdx = bundle.indexOf('path:"/dashboard/status"');
console.log('Router status:', bundle.substring(statusIdx - 50, statusIdx + 200));

// Find definition of ud or where status is rendered
const regex = /Track Status|Application Status|Application Timeline|Verification Progress/g;
let match;
while ((match = regex.exec(bundle)) !== null) {
  console.log(`Matched "${match[0]}" at ${match.index}:`);
  console.log(bundle.substring(match.index - 50, match.index + 200));
}
