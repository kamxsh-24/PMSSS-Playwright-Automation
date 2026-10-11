// @ts-check

/**
 * Test data sets for the Student Login test suite
 */
export const loginTestData = {
  // Valid student credentials
  validStudent: {
    email: 'kamesh@gmail.com',
    password: 'Kamesh@123',
    expectedName: 'Kamesh',
  },

  // Invalid password scenario (user provided lowercase password)
  invalidPassword: {
    email: 'kamesh@gmail.com',
    password: 'kamesh@123',
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

