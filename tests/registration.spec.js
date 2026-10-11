import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage.js';
import {
  generateUniqueStudent,
  registrationTestData,
} from '../test-data/registration-data.js';

test.describe('PMSS Registration Page - End-to-End Suite', () => {
  /** @type {RegisterPage} */
  let registerPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.navigate();
  });

  test('TC01 — Open Registration Page', async ({ page }) => {
    // Verify relative URL routed through configured baseURL
    await expect(page).toHaveURL(/.*register/);

    // Verify page headings and initial Step 1 form visibility
    await expect(registerPage.stepOneHeading).toBeVisible();
    await expect(registerPage.fullNameInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.saveAndContinueButton).toBeVisible();
  });

  test('TC02 — Verify Required Fields', async ({ page }) => {
    // Attempt submitting Step 1 with empty fields
    await registerPage.clickSaveAndContinue();

    // Verify validation toast for missing full name
    await expect(registerPage.toastContainer).toContainText(
      'Full name is required.'
    );

    // Verify invalid submission is prevented and user stays on Step 1
    await expect(registerPage.stepOneHeading).toBeVisible();
    await expect(registerPage.stepTwoHeading).not.toBeVisible();
    await expect(page).toHaveURL(/.*register/);
  });

  test('TC03 — Valid Registration', async ({ page }) => {
    const student = generateUniqueStudent();

    // Step 1: Fill Account Credentials
    await registerPage.fillAccountCredentials(student);
    await registerPage.clickSaveAndContinue();

    // Verify successful progression to Step 2
    await expect(registerPage.stepTwoHeading).toBeVisible();

    // Step 2: Fill Personal Information
    await registerPage.fillPersonalInformation(student);
    await registerPage.clickCompleteRegistration();

    // Verify redirection to Student Dashboard
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 25000 });

    // Verify success toast notification
    await expect(registerPage.toastContainer).toContainText(
      'Registration successful! Welcome to PMSSS.'
    );
  });

  test('TC04 — Invalid Email', async ({ page }) => {
    // Fill valid name but invalid email format
    await registerPage.fillAccountCredentials({
      fullName: 'Aarav Test',
      email: registrationTestData.invalidEmails[0],
      password: registrationTestData.passwords.valid,
      confirmPassword: registrationTestData.passwords.valid,
    });
    await registerPage.clickSaveAndContinue();

    // Verify email format validation toast
    await expect(registerPage.toastContainer).toContainText(
      'Valid email address is required.'
    );

    // Verify user cannot proceed to Step 2
    await expect(registerPage.stepTwoHeading).not.toBeVisible();
  });

  test('TC05 — Invalid Phone Number', async ({ page }) => {
    const student = generateUniqueStudent();

    // Complete Step 1 with valid data
    await registerPage.fillAccountCredentials(student);
    await registerPage.clickSaveAndContinue();
    await expect(registerPage.stepTwoHeading).toBeVisible();

    // Fill Step 2 with short invalid phone number
    await registerPage.fillPersonalInformation({
      state: registrationTestData.dropdowns.validState,
      district: registrationTestData.dropdowns.validDistrict,
      phone: registrationTestData.invalidPhones.shortPhone,
    });
    await registerPage.clickCompleteRegistration();

    // Verify phone digit length validation toast
    await expect(registerPage.toastContainer).toContainText(
      'Phone number must be exactly 10 digits.'
    );

    // Verify submission is blocked
    await expect(page).toHaveURL(/.*register/);
  });

  test('TC06 — Invalid Date of Birth Field Constraints', async ({ page }) => {
    const student = generateUniqueStudent();

    // Navigate to Step 2
    await registerPage.fillAccountCredentials(student);
    await registerPage.clickSaveAndContinue();
    await expect(registerPage.stepTwoHeading).toBeVisible();

    // Verify HTML5 date picker input constraints
    await expect(registerPage.dobInput).toHaveAttribute('type', 'date');

    // Test filling valid formatted date
    await registerPage.dobInput.fill('2003-08-20');
    await expect(registerPage.dobInput).toHaveValue('2003-08-20');
  });

  test('TC07 — Missing Individual Required Fields', async ({ page }) => {
    // 7A: Missing email validation
    await registerPage.fillAccountCredentials({
      fullName: 'Student Name',
      email: '',
      password: registrationTestData.passwords.valid,
      confirmPassword: registrationTestData.passwords.valid,
    });
    await registerPage.clickSaveAndContinue();
    await expect(registerPage.toastContainer).toContainText(
      'Valid email address is required.'
    );

    // 7B: Password mismatch validation
    await registerPage.emailInput.fill(generateUniqueStudent().email);
    await registerPage.confirmPasswordInput.fill(
      registrationTestData.passwords.mismatch
    );
    await registerPage.clickSaveAndContinue();
    await expect(registerPage.toastContainer).toContainText(
      'Passwords do not match.'
    );

    // Advance to Step 2 with matching password
    await registerPage.confirmPasswordInput.fill(
      registrationTestData.passwords.valid
    );
    await registerPage.clickSaveAndContinue();
    await expect(registerPage.stepTwoHeading).toBeVisible();

    // 7C: Missing State validation in Step 2
    await registerPage.clickCompleteRegistration();
    await expect(registerPage.toastContainer).toContainText(
      'Please select your State.'
    );

    // 7D: Missing District validation in Step 2 (after selecting State)
    await registerPage.stateDropdown.selectOption(
      registrationTestData.dropdowns.validState
    );
    await registerPage.clickCompleteRegistration();
    await expect(registerPage.toastContainer).toContainText(
      'Please select your District.'
    );
  });

  test('TC08 — Invalid or Boundary Input Values', async ({ page }) => {
    // 8A: Password length boundary (< 8 characters)
    await registerPage.fillAccountCredentials({
      fullName: 'Boundary Student',
      email: generateUniqueStudent().email,
      password: registrationTestData.passwords.tooShort,
      confirmPassword: registrationTestData.passwords.tooShort,
    });
    await registerPage.clickSaveAndContinue();
    await expect(registerPage.toastContainer).toContainText(
      'Password must be at least 8 characters long.'
    );

    // 8B: Advance to Step 2 and test District dropdown dependency
    await registerPage.passwordInput.fill(registrationTestData.passwords.valid);
    await registerPage.confirmPasswordInput.fill(
      registrationTestData.passwords.valid
    );
    await registerPage.clickSaveAndContinue();
    await expect(registerPage.stepTwoHeading).toBeVisible();

    // Verify district is disabled until state is selected
    await expect(registerPage.districtDropdown).toBeDisabled();

    // Select state and verify district becomes enabled
    await registerPage.stateDropdown.selectOption(
      registrationTestData.dropdowns.validState
    );
    await expect(registerPage.districtDropdown).toBeEnabled();

    // 8C: Phone number boundary (maxlength="10")
    await expect(registerPage.phoneInput).toHaveAttribute('maxlength', '10');
  });

  test('TC09 — Duplicate Registration', async ({ page }) => {
    // Attempt registration with known existing email
    await registerPage.fillAccountCredentials({
      fullName: 'Duplicate User',
      email: registrationTestData.knownExistingEmail,
      password: registrationTestData.passwords.valid,
      confirmPassword: registrationTestData.passwords.valid,
    });
    await registerPage.clickSaveAndContinue();
    await expect(registerPage.stepTwoHeading).toBeVisible();

    await registerPage.fillPersonalInformation({
      state: registrationTestData.dropdowns.validState,
      district: registrationTestData.dropdowns.validDistrict,
      phone: '9876543210',
      dob: '2001-01-01',
      institution: 'Delhi Technological University',
      course: 'B.Tech IT',
      yearOfStudy: '2nd Year',
    });
    await registerPage.clickCompleteRegistration();

    // Verify duplicate registration error toast
    await expect(registerPage.toastContainer).toContainText(
      'An account with this email already exists.'
    );

    // Verify user is not redirected to dashboard
    await expect(page).toHaveURL(/.*register/);
  });
});

