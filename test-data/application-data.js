// @ts-check

/**
 * Expected profile and application data for the active test student
 */
export const studentApplicationData = {
  personalDetails: {
    fullName: 'Test Automation Student',
    email: 'pmss.test.student@example.com',
    phone: '9876543210',
    gender: 'Male',
    category: 'General',
    state: 'Delhi',
    district: 'New Delhi',
    institution: 'Delhi Technological University',
    course: 'B.Tech IT',
    yearOfStudy: '1st Year',
    verificationStatus: 'PENDING VERIFY',
  },

  dashboardSections: {
    heading: 'Dashboard',
    welcomeName: 'Test Automation Student',
    progress: 'Application Progress',
    activity: 'Recent Activity',
    notifications: 'Important Notifications',
    documents: 'My Documents',
    quickActions: 'Quick Actions',
  },

  application: {
    heading: 'Apply Now',
    schemeText: 'Prime Minister Special Scholarship Scheme',
    totalSections: 6,
    sections: [
      '01 Personal',
      '02 Address',
      '03 Academic',
      '04 Family & Income',
      '05 Bank Details',
      '06 Documents',
    ],
  },

  applicationStatus: {
    heading: 'Application Status',
    statusBadge: 'Application Incomplete',
    continueBtnText: 'Continue Application',
  },

  documents: [
    'Aadhaar Card',
    'Income Certificate',
    '10th / 12th Marksheet',
    'Bank Passbook',
    'Domicile / Caste Certificate',
    'Admission Proof / Photo',
  ],
};
