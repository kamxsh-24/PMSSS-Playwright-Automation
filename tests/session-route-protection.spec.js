import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { loginTestData } from '../test-data/login-data.js';

test.describe('PMSS - Session & Route Protection Suite', () => {
  /** @type {LoginPage} */
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  // ==========================================
  // Group 1: Unauthenticated Route Protection
  // ==========================================

  test('TC01 — Unauthenticated Access to /dashboard Redirects to /login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*login/);
    await expect(loginPage.signInButton).toBeVisible();
  });

  test('TC02 — Unauthenticated Access to /dashboard/profile Redirects to /login', async ({ page }) => {
    await page.goto('/dashboard/profile');
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC03 — Unauthenticated Access to /dashboard/status Redirects to /login', async ({ page }) => {
    await page.goto('/dashboard/status');
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC04 — Unauthenticated Access to /dashboard/application Redirects to /login', async ({ page }) => {
    await page.goto('/dashboard/application');
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC05 — Unauthenticated Access to /dashboard/documents Redirects to /login', async ({ page }) => {
    await page.goto('/dashboard/documents');
    await expect(page).toHaveURL(/.*login/);
  });

  // ==========================================
  // Group 2: Session Token Storage & Verification
  // ==========================================

  test('TC06 — Login Stores pmss_token, pmss_refresh, and pmss_user in LocalStorage', async ({ page }) => {
    await loginPage.navigate();
    await loginPage.login(
      loginTestData.validStudent.email,
      loginTestData.validStudent.password
    );
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 25000 });

    // Retrieve storage items
    const authData = await loginPage.getAuthTokens();

    // Verify JWT token exists and has valid JWT format
    expect(authData.token).not.toBeNull();
    expect(authData.token).toMatch(/^eyJ/);

    // Verify Refresh token exists
    expect(authData.refreshToken).not.toBeNull();
    expect(authData.refreshToken).toMatch(/^eyJ/);

    // Verify user profile object
    expect(authData.user).not.toBeNull();
    const userObj = JSON.parse(authData.user || '{}');
    expect(userObj.email).toBe(loginTestData.validStudent.email);
    expect(userObj.fullName).toBe(loginTestData.validStudent.expectedName);
  });

  // ==========================================
  // Group 3: Logout Flow & Token Destruction
  // ==========================================

  test('TC07 — Clicking Logout Button Clears All Auth Tokens and Redirects to /login', async ({ page }) => {
    // Log in first
    await loginPage.navigate();
    await loginPage.login(
      loginTestData.validStudent.email,
      loginTestData.validStudent.password
    );
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 25000 });

    // Click Logout
    await loginPage.logout();

    // Verify redirection to login page
    await expect(page).toHaveURL(/.*login/);

    // Verify all auth tokens are purged from localStorage
    const authData = await loginPage.getAuthTokens();
    expect(authData.token).toBeNull();
    expect(authData.refreshToken).toBeNull();
    expect(authData.user).toBeNull();
  });

  test('TC08 — Browser Back Navigation After Logout Does Not Grant Access to Protected Dashboard', async ({ page }) => {
    // Log in
    await loginPage.navigate();
    await loginPage.login(
      loginTestData.validStudent.email,
      loginTestData.validStudent.password
    );
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 25000 });

    // Log out
    await loginPage.logout();
    await expect(page).toHaveURL(/.*login/);

    // Attempt navigating back via browser history
    await page.goBack();
    await page.waitForTimeout(1000);

    // Verify protected route guard kicks in and redirects back to login
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC09 — Manual Token Removal Triggers Automatic Session Expiry & Redirect', async ({ page }) => {
    // Log in
    await loginPage.navigate();
    await loginPage.login(
      loginTestData.validStudent.email,
      loginTestData.validStudent.password
    );
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 25000 });

    // Purge the access token from localStorage
    await loginPage.clearSession();

    // Reload dashboard to trigger auth guard verification
    await page.reload();

    // Verify user is forced back to login
    await expect(page).toHaveURL(/.*login/);
  });
});

