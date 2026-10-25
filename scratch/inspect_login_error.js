import fs from 'fs';

const bundle = fs.readFileSync('scratch/bundle.js', 'utf8');

// Find Login page component or login handler
const loginIdx = bundle.indexOf('id="login-btn"');
console.log('Login button context:');
console.log(bundle.substring(loginIdx - 500, loginIdx + 2000));
