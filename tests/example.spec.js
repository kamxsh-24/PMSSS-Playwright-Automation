// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('https://prime-minister-special-scholarship-portal.onrender.com/', {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
    });
    await expect(page).toHaveTitle(/PMSS/i);
});

//King in the north
