import fs from 'fs';

async function main() {
  const res = await fetch('https://prime-minister-special-scholarship-portal.onrender.com/assets/index-BSQjHCoQ.js');
  const text = await res.text();
  if (!fs.existsSync('scratch')) {
    fs.mkdirSync('scratch');
  }
  fs.writeFileSync('scratch/bundle.js', text);
  console.log('Bundle saved, size:', text.length);

  // Search for routes
  const routeRegex = /path:\s*["']([^"']+)["']/g;
  const routes = [];
  let m;
  while ((m = routeRegex.exec(text)) !== null) {
    routes.push(m[1]);
  }
  console.log('Routes found via regex:', [...new Set(routes)]);

  const slashRegex = /["'](\/[a-zA-Z0-9_\-\/:]+)["']/g;
  const paths = new Set();
  while ((m = slashRegex.exec(text)) !== null) {
    if (m[1].startsWith('/dashboard') || m[1].startsWith('/apply') || m[1].startsWith('/admin') || m[1].startsWith('/student') || m[1].startsWith('/login') || m[1].startsWith('/register')) {
      paths.add(m[1]);
    }
  }
  console.log('App Paths:', [...paths]);
}

main().catch(console.error);
