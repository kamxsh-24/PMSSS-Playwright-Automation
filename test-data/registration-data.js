// @ts-check

/**
 * Generates fresh synthetic test data with unique timestamped email
 * to prevent duplicate account conflicts during test execution.
 */
export const generateUniqueStudent = () => {
  const timestamp = Date.now();
  return {
    fullName: `Test Student ${timestamp.toString().slice(-4)}`,
    email: `student.pmss.${timestamp}@example.com`,
    password: 'Password@123',
    confirmPassword: 'Password@123',
    phone: '9876543210',
    dob: '2002-05-15',
    state: 'Delhi',
    district: 'New Delhi',
    institution: 'Delhi Technological University',
    course: 'B.Tech Information Technology',
    yearOfStudy: '1st Year',
  };
};

/**
 * Standard test data sets for negative, boundary, and validation scenarios
 */
export const registrationTestData = {
  // Invalid email formats
  invalidEmails: [
    'plainaddress',
    'missingatsign.com',
    '@missingusername.com',
    'user@.com',
  ],

  // Invalid phone numbers
  invalidPhones: {
    shortPhone: '12345',
    letters: 'abcdefghij',
    nineDigits: '987654321',
  },

  // Password constraint boundary values
  passwords: {
    valid: 'SecurePass@123',
    tooShort: 'Pass1', // < 8 characters
    mismatch: 'DifferentPass@123',
  },

  // Dropdown options verified against actual application DOM
  dropdowns: {
    validState: 'Delhi',
    validDistrict: 'New Delhi',
    validYear: '1st Year',
  },

  // Existing user account for duplicate registration validation
  knownExistingEmail: 'aarav.test.1791615490593@example.com',
};

