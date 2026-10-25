import fs from 'fs';

const bundle = fs.readFileSync('scratch/bundle.js', 'utf8');

// Find all routes definitions
const routerMatch = bundle.match(/children:\[(r\.jsx\(ce,\{[^}]+path:[^}]+)+/);
if (routerMatch) {
  console.log('Router chunk:\n', routerMatch[0].slice(0, 1500));
}

// Find all occurrences of path:"/dashboard..."
const routeDefs = [...bundle.matchAll(/path:\s*"([^"]+)",\s*element:\s*r\.jsx\([^,]+,\{[^}]*children:\s*r\.jsx\(([A-Za-z0-9_$]+)/g)];
console.log('Route definitions:');
for (const r of routeDefs) {
  console.log(`Path: ${r[1]} => Component: ${r[2]}`);
}

// Search for the definition of r2 (Application form)
const appCompMatch = bundle.match(/(?:const|function)\s+r2\s*=\s*(\([^)]*\)\s*=>|\bfunction\b)/);
console.log('r2 matched:', !!appCompMatch);

// Look for step names in application
const stepNames = bundle.match(/steps:\s*\[([^\]]+)\]/g);
console.log('stepNames occurrences:', stepNames);

// Let's search for Ml or steps array
const mlMatch = bundle.match(/Ml\s*=\s*\[([^\]]+)\]/);
if (mlMatch) {
  console.log('Ml steps:', mlMatch[0]);
}

// Look for verification phases
const statusPhases = bundle.match(/(?:phases|verificationPhases|STEPS|STAGES)\s*=\s*\[([^\]]+)\]/i);
console.log('statusPhases:', statusPhases ? statusPhases[0] : 'None');
