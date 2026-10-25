import fs from 'fs';

const bundle = fs.readFileSync('scratch/bundle.js', 'utf8');
console.log('=== Status Page Component (around 464675) ===');
console.log(bundle.substring(464500, 471000));
