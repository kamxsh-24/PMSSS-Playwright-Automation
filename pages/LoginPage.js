// @ts-check

/**
 * Page Object Model for the PMSS Student Login Page
 */
export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Login Form Elements
    this.emailInput = page.locator('#login-email');
    this.passwordInput = page.locator('#login-password');
    this.passwordToggleBtn = page.locator('form button[type="button"]');
    this.signInButton = page.locator('#login-btn');

    // Navigation & Redirection Links
    this.registerNowLink = page.getByRole('link', { name: 'Register Now' });
    this.adminLoginLink = page.getByRole('link', { name: 'Admin Login →' });
    this.homeLogoLink = page.locator('header a[href="/"]');

    // Toast Container
    this.toastContainer = page.locator('#toast-container');
    this.toastMessages = page.locator('#toast-container p');

    // Logged-in Dashboard Locators
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.userBadge = page.locator('#header-profile-menu-btn');
  }

  /**
   * Navigate to the login page using configured baseURL
   */
  async navigate() {
    await this.page.goto('/login', { waitUntil: 'domcontentloaded' });
  }

  /**
   * Fill credentials and submit the login form
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    if (email !== undefined) await this.emailInput.fill(email);
    if (password !== undefined) await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  /**
   * Toggle the password visibility (eye icon)
   */
  async togglePasswordVisibility() {
    await this.passwordToggleBtn.click();
  }

  /**
   * Perform logout from the student dashboard
   */
  async logout() {
    await this.logoutButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.logoutButton.click();
  }
}

