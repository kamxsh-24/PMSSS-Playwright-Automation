import { test, expect } from '../fixtures/test-fixtures.js';

test.describe('PMSS Document Upload & Management - End-to-End Suite', () => {
  test('TC01 — Documents Overview Section Available', async ({ documentsPage, authenticatedPage }) => {
    await expect(authenticatedPage).toHaveURL(/.*dashboard/);
    await expect(documentsPage.documentsHeading).toBeVisible();
  });

  test('TC02 — Essential Documents Listed in Dashboard', async ({ documentsPage }) => {
    await expect(documentsPage.aadhaarItem).toBeVisible();
    await expect(documentsPage.incomeCertItem).toBeVisible();
    await expect(documentsPage.bankPassbookItem).toBeVisible();
  });

  test('TC03 — Document Filter Buttons Interactive', async ({ documentsPage }) => {
    await expect(documentsPage.filterAll).toBeVisible();
    await documentsPage.filterAll.click();

    await documentsPage.page.waitForTimeout(300);

    await expect(documentsPage.filterPending).toBeVisible();
    await documentsPage.filterPending.click();
  });

  test('TC04 — Upload Trigger Action Available', async ({ documentsPage }) => {
    await expect(documentsPage.uploadBtn).toBeVisible();
  });
});
