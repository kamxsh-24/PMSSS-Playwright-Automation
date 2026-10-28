// @ts-check

/**
 * Global setup: wake up the Render free-tier instances before tests run.
 * Render spins down services after 15 minutes of inactivity.
 * This pings both the frontend and backend until they respond (up to 120s).
 */

const FRONTEND_URL = process.env.BASE_URL || 'https://prime-minister-special-scholarship-portal.onrender.com';
const BACKEND_URL = 'https://pmsss-t2og.onrender.com/api/auth/login';

async function waitForUrl(url, label, method = 'GET', body = null) {
  const MAX_WAIT_MS = 120000;
  const RETRY_INTERVAL_MS = 5000;
  const start = Date.now();

  const options = { method };
  if (body) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(body);
  }

  console.log(`[global-setup] Warming up ${label}...`);

  while (Date.now() - start < MAX_WAIT_MS) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeout);

      if (res.status < 500) {
        const elapsed = ((Date.now() - start) / 1000).toFixed(1);
        console.log(`[global-setup] ${label} responded (${res.status}) after ${elapsed}s`);
        return;
      }
    } catch {
      // timeout or connection error — server still spinning up
    }

    console.log(`[global-setup] ${label} not ready yet, retrying in ${RETRY_INTERVAL_MS / 1000}s...`);
    await new Promise((r) => setTimeout(r, RETRY_INTERVAL_MS));
  }

  console.warn(`[global-setup] WARNING: ${label} did not warm up within ${MAX_WAIT_MS / 1000}s — tests may be slower`);
}

export default async function globalSetup() {
  // Warm up both services in parallel
  await Promise.all([
    waitForUrl(FRONTEND_URL, 'Frontend (React App)'),
    waitForUrl(
      BACKEND_URL,
      'Backend API (Node.js)',
      'POST',
      { email: 'noop@warmup.test', password: 'WarmUp@000' }
    ),
  ]);
  console.log('[global-setup] Both services are warm. Starting tests.\n');
}

