import { test, expect } from '../fixtures/test-fixtures.js';

test.describe('PMSS Student Dashboard - End-to-End Suite', () => {
  test('TC01 — Dashboard Overview & Welcome Banner', async ({ dashboardPage }) => {
    await expect(dashboardPage.welcomeHeading).toBeVisible();
    await expect(dashboardPage.welcomeHeading).toContainText(/Dashboard|Test Automation Student/i);
    await expect(dashboardPage.profileMenuBtn).toBeVisible();
  });

  test('TC02 — Application Progress Widget', async ({ dashboardPage }) => {
    await expect(dashboardPage.progressSection).toBeVisible();
  });

  test('TC03 — Recent Activity and Notifications Sections', async ({ dashboardPage }) => {
    await expect(dashboardPage.activitySection).toBeVisible();
    await expect(dashboardPage.notificationsSection).toBeVisible();
  });

  test('TC04 — Quick Action Cards Navigation', async ({ dashboardPage }) => {
    await expect(dashboardPage.quickActionsSection).toBeVisible();

    // Check that all 4 quick action links exist and point to the right routes
    await expect(dashboardPage.completeProfileCard.first()).toHaveAttribute('href', '/dashboard/profile');
    await expect(dashboardPage.uploadDocumentsCard.first()).toHaveAttribute('href', '/dashboard/documents');
    await expect(dashboardPage.viewApplicationCard.first()).toHaveAttribute('href', '/dashboard/application');
    await expect(dashboardPage.checkStatusCard.first()).toHaveAttribute('href', '/dashboard/status');
  });

  test('TC05 — Document Filter Tabs Interaction', async ({ dashboardPage }) => {
    await expect(dashboardPage.documentsSection).toBeVisible();

    // Verify filter buttons are clickable
    await expect(dashboardPage.filterAllDocs.first()).toBeVisible();
    await dashboardPage.filterAllDocs.first().click();

    await dashboardPage.page.waitForTimeout(300);

    await expect(dashboardPage.filterPendingDocs.first()).toBeVisible();
    await dashboardPage.filterPendingDocs.first().click();
  });

  test('TC06 — Header Notification Bell & Profile Controls', async ({ dashboardPage }) => {
    await expect(dashboardPage.notificationBtn).toBeVisible();
    await dashboardPage.notificationBtn.click();

    await expect(dashboardPage.themeToggleBtn).toBeVisible();
    await expect(dashboardPage.logoutBtn).toBeVisible();
  });
});
