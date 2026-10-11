// @ts-check

/**
 * Page Object Model for the PMSS Registration Page
 */
export class RegisterPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Form Container & Stepper
    this.form = page.locator('form');
    this.stepOneHeading = page.getByText('01 Account Credentials');
    this.stepTwoHeading = page.getByText('02 Personal Information');

    // Step 1: Account Credentials Locators
    this.fullNameInput = page.locator('#reg-fullname');
    this.emailInput = page.locator('#reg-email');
    this.passwordInput = page.locator('#reg-password');
    this.confirmPasswordInput = page.locator('#reg-confirm');
    this.saveAndContinueButton = page.locator('#reg-button');

    // Step 2: Personal Information Locators
    this.phoneInput = page.locator('#reg-phone');
    this.dobInput = page.locator('#reg-dob');
    this.stateDropdown = page.locator('#reg-state');
    this.districtDropdown = page.locator('#reg-district');
    this.institutionInput = page.locator('#reg-institution');
    this.courseInput = page.locator('#reg-course');
    this.yearDropdown = page.locator('#reg-year');
    this.backButton = page.getByRole('button', { name: 'Back' });
    this.completeRegistrationButton = page.locator('#register-btn');

    // Toast Notification Locators
    this.toastContainer = page.locator('#toast-container');
    this.toastMessages = page.locator('#toast-container p');
  }

  /**
   * Navigate to the registration page using configured baseURL
   */
  async navigate() {
    await this.page.goto('/register', { waitUntil: 'domcontentloaded' });
  }

  /**
   * Fill Step 1 Account Credentials
   * @param {{ fullName?: string, email?: string, password?: string, confirmPassword?: string }} data
   */
  async fillAccountCredentials({ fullName, email, password, confirmPassword }) {
    if (fullName !== undefined) await this.fullNameInput.fill(fullName);
    if (email !== undefined) await this.emailInput.fill(email);
    if (password !== undefined) await this.passwordInput.fill(password);
    if (confirmPassword !== undefined) await this.confirmPasswordInput.fill(confirmPassword);
  }

  /**
   * Click 'Save & Continue' to advance to Step 2
   */
  async clickSaveAndContinue() {
    await this.saveAndContinueButton.waitFor({ state: 'visible' });
    await this.saveAndContinueButton.click();
  }

  /**
   * Fill Step 2 Personal Information
   * @param {{ state?: string, district?: string, phone?: string, dob?: string, institution?: string, course?: string, yearOfStudy?: string }} data
   */
  async fillPersonalInformation({
    state,
    district,
    phone,
    dob,
    institution,
    course,
    yearOfStudy,
  }) {
    if (state !== undefined) {
      await this.stateDropdown.selectOption(state);
      // Wait for dynamic district options to populate
      await this.districtDropdown.locator('option:not([value=""])').first().waitFor({ state: 'attached', timeout: 5000 });
    }
    if (district !== undefined) {
      await this.districtDropdown.selectOption(district);
    }
    if (phone !== undefined) await this.phoneInput.fill(phone);
    if (dob !== undefined) await this.dobInput.fill(dob);
    if (institution !== undefined) await this.institutionInput.fill(institution);
    if (course !== undefined) await this.courseInput.fill(course);
    if (yearOfStudy !== undefined) await this.yearDropdown.selectOption(yearOfStudy);
  }

  /**
   * Submit Step 2 Complete Registration
   */
  async clickCompleteRegistration() {
    await this.completeRegistrationButton.waitFor({ state: 'visible' });
    await this.completeRegistrationButton.click();
  }

  /**
   * Click Back button in Step 2 to return to Step 1
   */
  async clickBack() {
    await this.backButton.click();
  }

  /**
   * Complete full registration workflow across both steps
   * @param {any} userData
   */
  async completeFullRegistration(userData) {
    await this.fillAccountCredentials(userData);
    await this.clickSaveAndContinue();
    await this.fillPersonalInformation(userData);
    await this.clickCompleteRegistration();
  }

  /**
   * Get the latest toast notification message
   * @returns {Promise<string>}
   */
  async getLatestToastText() {
    await this.toastMessages.last().waitFor({ state: 'visible', timeout: 5000 });
    return await this.toastMessages.last().innerText();
  }
}

