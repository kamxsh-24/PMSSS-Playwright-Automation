// @ts-check
import { loginTestData } from '../test-data/login-data.js';

/**
 * Authentication and test execution helpers for the PMSS portal
 */

let cachedSession = null;

/**
 * Fetch and cache verified student session tokens from backend
 */
export async function getVerifiedStudentSession(
  email = loginTestData.validStudent.email,
  password = loginTestData.validStudent.password
) {
  if (cachedSession) return cachedSession;

  try {
    const res = await fetch('https://pmsss-t2og.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success && data.data) {
      cachedSession = data.data;
      return cachedSession;
    }
  } catch {
    // API request failed or timed out
  }
  return null;
}

/**
 * Perform standard UI login
 * @param {import('@playwright/test').Page} page
 * @param {string} [email]
 * @param {string} [password]
 */
export async function loginViaUI(
  page,
  email = loginTestData.validStudent.email,
  password = loginTestData.validStudent.password
) {
  await page.goto('/login', { waitUntil: 'domcontentloaded' });
  await page.fill('#login-email', email);
  await page.fill('#login-password', password);
  await page.click('#login-btn');
  await page.waitForURL('**/dashboard', { timeout: 35000 });
}

/**
 * Inject authenticated session directly into localStorage for fast and stable testing
 * @param {import('@playwright/test').Page} page
 */
export async function injectStudentSession(page) {
  const session = await getVerifiedStudentSession();

  // Navigate to login page first to establish origin context
  await page.goto('/login', { waitUntil: 'domcontentloaded' });

  if (session && session.token) {
    await page.evaluate(({ t, r, u }) => {
      localStorage.setItem('pmss_token', t);
      localStorage.setItem('pmss_refresh', r);
      localStorage.setItem('pmss_user', JSON.stringify(u));
    }, { t: session.token, r: session.refreshToken, u: session.user });
  } else {
    // Fallback: standard UI login if API fetch is unavailable
    await loginViaUI(page);
  }
}

/**
 * Purge authentication session from localStorage
 * @param {import('@playwright/test').Page} page
 */
export async function clearAuthSession(page) {
  await page.evaluate(() => {
    localStorage.removeItem('pmss_token');
    localStorage.removeItem('pmss_refresh');
    localStorage.removeItem('pmss_user');
  });
}
