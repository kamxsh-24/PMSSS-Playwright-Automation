import fs from 'fs';

const bundle = fs.readFileSync('scratch/bundle.js', 'utf8');

function findRouteComponent(route) {
  const rIdx = bundle.indexOf(`path:"${route}"`);
  if (rIdx === -1) {
    console.log(`Route ${route} not found`);
    return;
  }
  const chunk = bundle.substring(rIdx, rIdx + 200);
  console.log(`=== Route: ${route} ===`);
  console.log(chunk);
}

['/dashboard', '/dashboard/application', '/dashboard/status', '/dashboard/profile', '/dashboard/documents', '/dashboard/messages', '/dashboard/support', '/transparency'].forEach(findRouteComponent);
