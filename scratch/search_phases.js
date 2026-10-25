import fs from 'fs';

const bundle = fs.readFileSync('scratch/bundle.js', 'utf8');

// Find snippets around dashboard/application
function searchSnippet(term, maxLen = 300) {
  let idx = 0;
  while ((idx = bundle.indexOf(term, idx)) !== -1) {
    console.log(`=== FOUND "${term}" at ${idx} ===`);
    console.log(bundle.substring(Math.max(0, idx - 100), Math.min(bundle.length, idx + maxLen)));
    idx += term.length + 500;
  }
}

console.log('Searching application steps/phases...');
searchSnippet('/dashboard/application', 200);
searchSnippet('Phase', 100);
searchSnippet('phase', 100);
searchSnippet('Step', 100);
searchSnippet('/dashboard/status', 200);
