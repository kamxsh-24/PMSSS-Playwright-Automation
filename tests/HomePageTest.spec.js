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

test('TC07 - Verify FAQ Accordion functionality', async ({ page }) => {
    await page.goto(BaseURL, { waitUntil: 'domcontentloaded' });

    const faqQuestions = [
        'Who can apply for PMSSS Scholarship?',
        'What documents are required?',
        'How can I track my application status?',
        'How is eligibility determined?'
    ];

    for (const question of faqQuestions) {
        const faqButton = page.getByRole('button', { name: question });
        await expect(faqButton).toBeVisible();
        await faqButton.click();
    }
});

test('TC08 - Verify Footer Quick Links and Resources', async ({ page }) => {
    await page.goto(BaseURL, { waitUntil: 'domcontentloaded' });
    const footer = page.locator('footer');

    // Quick Links
    await expect(footer.getByRole('button', { name: 'Home' })).toBeVisible();
    await expect(footer.getByRole('button', { name: 'Eligibility' })).toBeVisible();
    await expect(footer.getByRole('button', { name: 'Application Process' })).toBeVisible();
    await expect(footer.getByRole('button', { name: 'Help' })).toBeVisible();
    await expect(footer.getByRole('button', { name: 'Contact' })).toBeVisible();

    // Resources
    await expect(footer.getByRole('button', { name: 'User Manual' })).toBeVisible();
    await expect(footer.getByRole('button', { name: 'Guidelines' })).toBeVisible();
    await expect(footer.getByRole('button', { name: 'FAQ' })).toBeVisible();
});

test('TC09 - Verify Footer Contact Info and Legal Links', async ({ page }) => {
    await page.goto(BaseURL, { waitUntil: 'domcontentloaded' });
    const footer = page.locator('footer');

    // Contact Information
    await expect(footer.getByText('help@pmsss.gov.in')).toBeVisible();
    await expect(footer.getByText('1800-123-4567')).toBeVisible();
    await expect(footer.getByText('Mon - Sat: 10:00 AM - 6:00 PM')).toBeVisible();

    // Legal Links
    await expect(footer.getByRole('button', { name: 'Privacy Policy' })).toBeVisible();
    await expect(footer.getByRole('button', { name: 'Terms & Conditions' })).toBeVisible();
});

