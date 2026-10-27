// @ts-check

/**
 * Page Object Model for the PMSS Student Dashboard
 */
export class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Header controls
    this.themeToggleBtn = page.getByRole('button', { name: /Dark|Light/i }).first();
    this.notificationBtn = page.locator('#header-notification-btn');
    this.profileMenuBtn = page.locator('#header-profile-menu-btn').or(page.getByText('Test Automation Student')).first();
    this.logoutBtn = page.locator('#pmss-logout-btn').or(page.getByRole('button', { name: 'Logout' })).or(page.getByText('Logout')).first();

    // Sidebar navigation links
    this.navDashboard = page.locator('aside a[href="/dashboard"]').or(page.getByRole('link', { name: 'Dashboard', exact: true }));
    this.navProfile = page.locator('aside a[href="/dashboard/profile"]').or(page.getByRole('link', { name: 'My Profile', exact: true }));
    this.navApplication = page.locator('aside a[href="/dashboard/application"]').or(page.getByRole('link', { name: 'My Application', exact: true }));
    this.navStatus = page.locator('aside a[href="/dashboard/status"]').or(page.getByRole('link', { name: 'Track Status', exact: true }));

    // Dashboard Overview Section Headings
    this.welcomeHeading = page.locator('h1, h2').filter({ hasText: /Dashboard|Test Automation Student/i }).first();
    this.progressSection = page.getByText('Application Progress');
    this.activitySection = page.getByText('Recent Activity');
    this.notificationsSection = page.getByText('Important Notifications');
    this.documentsSection = page.getByText('My Documents');
    this.quickActionsSection = page.getByText('Quick Actions');

    // Quick Action Card Links
    this.completeProfileCard = page.locator('main a[href="/dashboard/profile"]');
    this.uploadDocumentsCard = page.locator('main a[href="/dashboard/documents"]');
    this.viewApplicationCard = page.locator('main a[href="/dashboard/application"]');
    this.checkStatusCard = page.locator('main a[href="/dashboard/status"]');

    // Document Filter Buttons
    this.filterAllDocs = page.getByRole('button', { name: /All/i });
    this.filterUploadedDocs = page.getByRole('button', { name: /Uploaded/i });
    this.filterPendingDocs = page.getByRole('button', { name: /Pending/i });
    this.filterRejectedDocs = page.getByRole('button', { name: /Rejected/i });
    this.uploadFileBtn = page.getByRole('button', { name: 'Upload File' });
  }

  async navigate() {
    await this.page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
  }

  async logout() {
    await this.logoutBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.logoutBtn.click();
  }
}

