import {test, expect} from '@playwright/test'

const BaseURL = 'https://prime-minister-special-scholarship-portal.onrender.com/'

test('TC01 - Homepage loads', async ({page}) => {
    await page.goto(BaseURL, {waitUntil: 'domcontentloaded'})
    await expect(page).toHaveTitle('PMSS – Prime Minister Special Scholarship Scheme')
})

test('TC02 - Login button-1 works', async ({page}) => {
    await page.goto(BaseURL, {waitUntil: 'domcontentloaded'})
    await page.locator('#nav-login-btn').click()
    await expect(page).toHaveURL(/.*login/)
    // await expect(page.locator('#login-email')).toBeVisible()
    // await expect(page.locator('#login-btn')).toBeVisible()
})

test('TC03 - Register button-1 works', async ({page}) => {
    await page.goto(BaseURL, {waitUntil: 'domcontentloaded'})
    await page.locator('#nav-register-btn').click()
    await expect(page).toHaveURL(/.*register/)
})

test('TC04 - Login button-2 works', async ({page}) => {
    await page.goto(BaseURL, {waitUntil: 'domcontentloaded'})
    await page.locator('#hero-status-btn').click()
    await expect(page).toHaveURL(/.*login/)
})

test('TC05 - Register button-2 works', async ({page}) => {
    await page.goto(BaseURL, {waitUntil: 'domcontentloaded'})
    await page.locator('#hero-start-btn').click()
    await expect(page).toHaveURL(/.*register/)
})


test('TC06 - Verify Light and Dark Theme', async ({ page }) => {
    await page.goto(BaseURL, { waitUntil: 'domcontentloaded' });

    const themeButton = page.locator('#theme-toggle-btn');

    // Verify the initial Light theme
    await expect(themeButton).toHaveAttribute(
        'title', 'Switch to Dark Theme'
    );
    await expect(themeButton).toContainText('Dark');

    // Switch from Light to Dark
    await themeButton.click();

    await expect(themeButton).toHaveAttribute(
        'title', 'Switch to Light Theme'
    );
    await expect(themeButton).toContainText('Light');

    // Switch from Dark back to Light
    await themeButton.click();

    await expect(themeButton).toHaveAttribute(
        'title', 'Switch to Dark Theme'
    );
    await expect(themeButton).toContainText('Dark');
});





// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://prime-minister-special-scholarship-portal.onrender.com/');
//   await page.locator('#nav-register-btn').click();
//   await page.locator('#nav-login-btn').click();
//   await page.locator('#hero-status-btn').click();
//   await page.locator('#hero-start-btn').click();
//   await page.getByRole('button', { name: 'Dark' }).click();
//   await page.getByRole('button', { name: 'Dark' }).click();
// });

