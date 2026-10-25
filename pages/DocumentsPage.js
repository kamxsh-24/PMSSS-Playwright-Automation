// @ts-check

/**
 * Page Object Model for PMSS Document Management
 */
export class DocumentsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Headings
    this.documentsHeading = page.locator('h1, h2, h3').filter({ hasText: /My Documents|Documents/i }).first();

    // Document Filter Buttons
    this.filterAll = page.getByRole('button', { name: /All/i }).first();
    this.filterUploaded = page.getByRole('button', { name: /Uploaded/i }).first();
    this.filterPending = page.getByRole('button', { name: /Pending/i }).first();
    this.filterRejected = page.getByRole('button', { name: /Rejected/i }).first();

    // Document Items in View
    this.aadhaarItem = page.getByText(/Aadhaar Card/i).first();
    this.incomeCertItem = page.getByText(/Income Certificate/i).first();
    this.marksheetItem = page.getByText(/Marksheet/i).first();
    this.bankPassbookItem = page.getByText(/Bank Passbook/i).first();

    // Upload Trigger Action
    this.uploadBtn = page.getByRole('button', { name: /Upload File|Upload/i }).first();
  }

  async navigate() {
    await this.page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
  }
}
