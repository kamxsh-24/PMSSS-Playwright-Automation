import { test, expect } from '../fixtures/test-fixtures.js';

test.describe('PMSS Application Status & Verification Tracking - End-to-End Suite', () => {
  test('TC01 - Status Page Loads with Title & Overview', async ({ statusPage, authenticatedPage }) => {
    await expect(authenticatedPage).toHaveURL(/.*dashboard\/status/);
    await expect(statusPage.statusHeading).toBeVisible();
    await expect(statusPage.subtitle).toBeVisible();
  });

  test('TC02 - Current Application Status Badge Rendered', async ({ statusPage }) => {
    await expect(statusPage.statusBadge).toBeVisible();
  });

  test('TC03 - Action Required Guidance Displayed', async ({ statusPage }) => {
    await expect(statusPage.actionRequiredNotice).toBeVisible();
  });

  test('TC04 - Continue Application Link Available', async ({ statusPage }) => {
    await expect(statusPage.continueApplicationBtn).toBeVisible();
  });
});

