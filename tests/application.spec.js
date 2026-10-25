import { test, expect } from '../fixtures/test-fixtures.js';

test.describe('PMSS Scholarship Application - End-to-End Suite', () => {
  test('TC01 - Application Page Loads & Shows Scheme Information', async ({ applicationPage, authenticatedPage }) => {
    await expect(authenticatedPage).toHaveURL(/.*dashboard\/application/);
    await expect(applicationPage.statusBannerHeading).toBeVisible();
    await expect(applicationPage.schemeSubtitle).toBeVisible();
  });

  test('TC02 - Application Multi-Step Indicators Rendered', async ({ applicationPage }) => {
    await expect(applicationPage.stepOneIndicator).toBeVisible();
    await expect(applicationPage.stepTwoIndicator).toBeVisible();
    await expect(applicationPage.sectionOneHeading).toBeVisible();
  });

  test('TC03 - Save & Continue Button Available in Form', async ({ applicationPage }) => {
    await expect(applicationPage.saveAndContinueBtn).toBeVisible();
  });
});
