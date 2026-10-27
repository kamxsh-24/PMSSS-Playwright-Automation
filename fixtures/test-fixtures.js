// @ts-check
import { test as baseTest } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';
import { ApplicationPage } from '../pages/ApplicationPage.js';
import { ApplicationStatusPage } from '../pages/ApplicationStatusPage.js';
import { DocumentsPage } from '../pages/DocumentsPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { injectStudentSession } from '../utils/test-helpers.js';

export const test = baseTest.extend({
  // Authenticated page fixture: injects verified student auth session via addInitScript
  authenticatedPage: async ({ page }, use) => {
    await injectStudentSession(page);
    await use(page);
  },

  dashboardPage: async ({ authenticatedPage }, use) => {
    const dash = new DashboardPage(authenticatedPage);
    await dash.navigate();
    await use(dash);
  },

  profilePage: async ({ authenticatedPage }, use) => {
    const profile = new ProfilePage(authenticatedPage);
    await profile.navigate();
    await use(profile);
  },

  applicationPage: async ({ authenticatedPage }, use) => {
    const app = new ApplicationPage(authenticatedPage);
    await app.navigate();
    await use(app);
  },

  statusPage: async ({ authenticatedPage }, use) => {
    const status = new ApplicationStatusPage(authenticatedPage);
    await status.navigate();
    await use(status);
  },

  documentsPage: async ({ authenticatedPage }, use) => {
    const docs = new DocumentsPage(authenticatedPage);
    await docs.navigate();
    await use(docs);
  },
});

export { expect } from '@playwright/test';
