import { test, expect } from '../fixtures/test-fixtures.js';

test.describe('PMSS Student Profile - End-to-End Suite', () => {
  test('TC01 - Profile Page Loads & Personal Details Rendered', async ({ profilePage, authenticatedPage }) => {
    await expect(authenticatedPage).toHaveURL(/.*dashboard\/profile/);
    await expect(profilePage.fullNameText).toBeVisible();
    await expect(profilePage.emailText).toBeVisible();
  });

  test('TC02 - Profile Verification Badge Displayed', async ({ profilePage }) => {
    await expect(profilePage.verificationBadge).toBeVisible();
  });

  test('TC03 - Profile Navigation Tabs Interactive', async ({ profilePage }) => {
    await expect(profilePage.personalDetailsTab).toBeVisible();
    await expect(profilePage.addressInfoTab).toBeVisible();
    await profilePage.addressInfoTab.click();
    await profilePage.personalDetailsTab.click();
  });

  test('TC04 - Profile Save Changes Action Available', async ({ profilePage }) => {
    await expect(profilePage.saveProfileBtn).toBeVisible();
  });
});
