// @ts-check

/**
 * Page Object Model for the PMSS Application Status Tracking Page
 */
export class ApplicationStatusPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Header & Main Title
    this.statusHeading = page.locator('h1, h2, h3').filter({ hasText: /Application Status/i }).first();
    this.subtitle = page.getByText(/Track your PMSSS scholarship application progress/i).first();

    // Status Cards & Badges
    this.statusBadge = page.getByText(/Application Incomplete|Submitted|Approved|Pending/i).first();
    this.actionRequiredNotice = page.getByText(/Action Required|Your application has not been submitted yet/i).first();

    // Navigation and Action Controls
    this.continueApplicationBtn = page.getByRole('link', { name: /Continue Application/i }).or(page.getByText('Continue Application')).first();
  }

  async navigate() {
    await this.page.goto('/dashboard/status', { waitUntil: 'domcontentloaded' });
  }

  async clickContinueApplication() {
    await this.continueApplicationBtn.click();
  }
}

