import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { loginTestData } from '../test-data/login-data.js';

test.describe('PMSS Student Login - End-to-End Suite', () => {
  /** @type {LoginPage} */
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC01 — Open Login Page & Elements Visibility', async ({ page }) => {
    // Verify route
    await expect(page).toHaveURL(/.*login/);

    // Verify all core form elements
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
    await expect(loginPage.registerNowLink).toBeVisible();
    await expect(loginPage.adminLoginLink).toBeVisible();
  });

  test('TC02 — Empty Credentials Submission', async ({ page }) => {
    // Submit empty form
    await loginPage.signInButton.click();

    // Verify validation message
    await expect(loginPage.toastContainer).toContainText(
      loginTestData.messages.missingFields
    );
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC03 — Missing Password Submission', async ({ page }) => {
    // Fill email only
    await loginPage.emailInput.fill(loginTestData.validStudent.email);
    await loginPage.signInButton.click();

    // Verify validation message
    await expect(loginPage.toastContainer).toContainText(
      loginTestData.messages.missingFields
    );
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC04 — Missing Email Submission', async ({ page }) => {
    // Fill password only
    await loginPage.passwordInput.fill(loginTestData.validStudent.password);
    await loginPage.signInButton.click();

    // Verify validation message
    await expect(loginPage.toastContainer).toContainText(
      loginTestData.messages.missingFields
    );
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC05 — Password Visibility Toggle (Show/Hide Password)', async () => {
    await loginPage.passwordInput.fill('SamplePassword@123');

    // Default state: type="password"
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');

    // Click eye toggle: changes to type="text"
    await loginPage.togglePasswordVisibility();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'text');

    // Click again: returns to type="password"
    await loginPage.togglePasswordVisibility();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('TC06 — Invalid Credentials (Incorrect Password)', async ({ page }) => {
    // Attempt login with incorrect password
    await loginPage.login(
      loginTestData.invalidPassword.email,
      loginTestData.invalidPassword.password
    );

    // Verify error notification
    await expect(loginPage.toastContainer).toContainText(
      loginTestData.messages.invalidCredentials
    );
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC07 — Unregistered Email Login', async ({ page }) => {
    // Attempt login with non-existent email
    await loginPage.login(
      loginTestData.unregisteredUser.email,
      loginTestData.unregisteredUser.password
    );

    // Verify rejection notification
    await expect(loginPage.toastContainer).toContainText(
      loginTestData.messages.invalidCredentials
    );
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC08 — Valid Student Login & Redirection to Dashboard', async ({ page }) => {
    // Submit valid credentials
    await loginPage.login(
      loginTestData.validStudent.email,
      loginTestData.validStudent.password
    );

    // Verify redirection to student dashboard
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 25000 });

    // Verify student identity badge renders on dashboard
    await expect(loginPage.userBadge).toBeVisible();
    await expect(loginPage.userBadge).toContainText(
      loginTestData.validStudent.expectedName
    );
  });

  test('TC09 — Navigation Links ("Register Now" and "Admin Login →")', async ({ page }) => {
    // Test navigation to Registration
    await loginPage.registerNowLink.click();
    await expect(page).toHaveURL(/.*register/);

    // Return to login and test Admin Login link
    await loginPage.navigate();
    await loginPage.adminLoginLink.click();
    await expect(page).toHaveURL(/.*admin\/login/);
  });

  test('TC10 — Student Logout and Session Termination', async ({ page }) => {
    // Log in first
    await loginPage.login(
      loginTestData.validStudent.email,
      loginTestData.validStudent.password
    );
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 25000 });

    // Click Logout
    await loginPage.logout();

    // Verify redirection back to login page
    await expect(page).toHaveURL(/.*login/);

    // Verify protected route: Attempt accessing dashboard after logout
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*login/);
  });
});

