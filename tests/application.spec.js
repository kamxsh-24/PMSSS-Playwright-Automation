import { test, expect } from '../fixtures/test-fixtures.js';

test.describe('PMSS Scholarship Application - End-to-End Suite', () => {
  test('TC01 - Application Page Loads & Shows Scheme Information', async ({ applicationPage }) => {
    await expect(applicationPage.page).toHaveURL(/.*dashboard\/application/);
    await expect(applicationPage.statusBannerHeading).toBeVisible();
    await expect(applicationPage.schemeSubtitle).toBeVisible();
  });

  test('TC02 - Application Multi-Step Indicators Rendered', async ({ applicationPage }) => {
    // Verify step 1 section heading is rendered and visible on the form
    await expect(applicationPage.stepOneIndicator).toBeVisible();
    // Verify the Save & Continue button is rendered (indicates step 1 form is active)
    await expect(applicationPage.saveAndContinueBtn).toBeVisible();
  });

  test('TC03 - Dashboard Back-Link Available on Application Page', async ({ applicationPage }) => {
    await expect(applicationPage.dashboardLink).toBeVisible();
  });
});

