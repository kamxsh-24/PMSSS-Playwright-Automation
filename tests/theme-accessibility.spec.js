import { test, expect } from '@playwright/test';

test.describe('PMSS Theme, Accessibility & Responsive Viewport Suite', () => {
  test('TC01 — Theme Toggle Switches Between Light and Dark Mode', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const themeBtn = page.locator('#theme-toggle-btn');
    await expect(themeBtn).toBeVisible();

    // Verify initial theme state
    const initialText = await themeBtn.innerText();

    // Toggle theme
    await themeBtn.click();
    await page.waitForTimeout(500);

    const toggledText = await themeBtn.innerText();
    expect(toggledText).not.toBe(initialText);

    // Toggle back
    await themeBtn.click();
    await page.waitForTimeout(500);
    expect(await themeBtn.innerText()).toBe(initialText);
  });

  test('TC02 — Responsive Layout on Mobile Viewport', async ({ page }) => {
    // Emulate iPhone / Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Verify header logo and theme toggle remain accessible
    const logo = page.locator('header a[href="/"]').first();
    await expect(logo).toBeVisible();

    const themeBtn = page.locator('#theme-toggle-btn');
    await expect(themeBtn).toBeVisible();
  });

  test('TC03 — Keyboard Accessibility & Focus on Login Form', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });

    // Focus email input and type using keyboard
    await page.locator('#login-email').focus();
    await page.keyboard.type('test@example.com');
    await expect(page.locator('#login-email')).toHaveValue('test@example.com');

    // Tab to password field
    await page.keyboard.press('Tab');
    await page.keyboard.type('Password@123');
    await expect(page.locator('#login-password')).toHaveValue('Password@123');
  });
});

