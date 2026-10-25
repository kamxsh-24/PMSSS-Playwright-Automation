// @ts-check

/**
 * Page Object Model for the PMSS Student Profile Page
 */
export class ProfilePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Header & Identity Details
    this.pageTitle = page.locator('h1, h2, h3').filter({ hasText: /Profile|My Profile/i }).first();
    this.fullNameText = page.locator('text=Test Automation Student').first();
    this.emailText = page.locator('text=pmss.test.student@example.com').first();
    this.verificationBadge = page.locator('text=/PENDING VERIFY|Verified|Approved/i').first();

    // Profile Tabs
    this.personalDetailsTab = page.getByRole('button', { name: 'Personal Details' }).or(page.getByText('Personal Details')).first();
    this.addressInfoTab = page.getByRole('button', { name: 'Address Info' }).or(page.getByText('Address Info')).first();

    // Form Action Controls
    this.saveProfileBtn = page.getByRole('button', { name: /Save Profile Changes|Save/i });
    this.requestDeleteBtn = page.getByRole('button', { name: /Request Profile Delete/i });
  }

  async navigate() {
    await this.page.goto('/dashboard/profile', { waitUntil: 'domcontentloaded' });
  }
}
