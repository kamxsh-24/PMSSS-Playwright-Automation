// @ts-check

/**
 * Test data sets for the Student Login test suite
 */
export const loginTestData = {
  // Valid student credentials (supports process.env with verified defaults)
  validStudent: {
    email: process.env.TEST_USER_EMAIL || 'pmss.test.student@example.com',
    password: process.env.TEST_USER_PASSWORD || 'Password@123',
    expectedName: 'Test Automation Student',
  },

  // Invalid password scenario with registered user
  invalidPassword: {
    email: process.env.TEST_USER_EMAIL || 'pmss.test.student@example.com',
    password: 'WrongPassword@123',
  },

  // Completely unregistered email
  unregisteredUser: {
    email: 'nonexistent.user.pmss@example.com',
    password: 'Password@123',
  },

  // Expected system toast messages
  messages: {
    missingFields: 'Please enter email and password.',
    invalidCredentials: 'Invalid email or password.',
  },
};

