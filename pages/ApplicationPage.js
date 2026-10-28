// @ts-check

/**
 * Page Object Model for the PMSS Scholarship Application Page
 */
export class ApplicationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Header & Section Headings
    this.statusBannerHeading = page.locator('h1, h2').filter({ hasText: /Apply Now|Scholarship/i }).first();
    this.schemeSubtitle = page.getByText(/Prime Minister Special Scholarship Scheme/i).first();
    this.sectionOneHeading = page.getByText(/PERSONAL INFORMATION/i).first();

    // Step indicators — use the visible section headings (the compact step labels are clipped inside overflow:hidden stepper)
    this.stepOneIndicator = page.getByText(/01 PERSONAL INFORMATION/i).first();
    this.stepTwoIndicator = page.getByText(/02 ADDRESS/i).or(page.getByText(/PERSONAL INFORMATION/i)).first();

    // Form Action Controls
    this.saveAndContinueBtn = page.getByRole('button', { name: /Save & Continue|Continue/i }).first();
    this.dashboardLink = page.getByRole('link', { name: /Dashboard/i }).first();
  }

  async navigate() {
    await this.page.goto('/dashboard/application', { waitUntil: 'domcontentloaded' });
  }

  async clickSaveAndContinue() {
    await this.saveAndContinueBtn.click();
  }
}

