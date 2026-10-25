import { test, expect } from '../fixtures/test-fixtures.js';

test.describe('PMSS Help, Support & AI Chatbot - End-to-End Suite', () => {
  test('TC01 — Help & Support Route Loads', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/dashboard/support', { waitUntil: 'domcontentloaded' });
    await expect(authenticatedPage).toHaveURL(/.*dashboard\/support/);
  });

  test('TC02 — Portal Support Interface Displayed', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/dashboard/support', { waitUntil: 'domcontentloaded' });
    // Check main container
    await expect(authenticatedPage.locator('main')).toBeVisible();
  });
});

