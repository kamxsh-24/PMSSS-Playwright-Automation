import fs from 'fs';

const bundle = fs.readFileSync('scratch/bundle.js', 'utf8');

const regexes = [/id:\s*["']login-btn["']/, /["']login-email["']/, /login-password/, /\/auth\/login/];
for (const r of regexes) {
  const m = bundle.match(r);
  console.log(r, '=>', m ? m.index : 'NOT FOUND');
  if (m) {
    console.log(bundle.substring(m.index - 200, m.index + 500));
  }
}
