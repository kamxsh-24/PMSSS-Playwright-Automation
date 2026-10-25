import { test, expect } from '../fixtures/test-fixtures.js';

test.describe('PMSS Notifications & Alerts - End-to-End Suite', () => {
  test('TC01 — Notifications Section Rendered in Dashboard', async ({ dashboardPage }) => {
    await expect(dashboardPage.notificationsSection).toBeVisible();
  });

  test('TC02 — Header Notification Bell Accessible', async ({ dashboardPage }) => {
    await expect(dashboardPage.notificationBtn).toBeVisible();
    await dashboardPage.notificationBtn.click();
  });
});

