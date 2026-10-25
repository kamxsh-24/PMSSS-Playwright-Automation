# PMSS Portal - Playwright End-to-End Automation Suite

A robust, enterprise-grade test automation suite for the **Prime Minister Special Scholarship Scheme (PMSS) Portal** built using **Playwright Test**, **JavaScript (ES Modules)**, and the **Page Object Model (POM)** design pattern.

---

## 🎯 Scope & Objectives

This automation framework validates the complete student-facing application lifecycle:
- **Homepage & Public Navigation**: Hero banners, quick links, theme switcher, FAQs, contact details.
- **Student Registration**: 2-step registration workflow, dynamic async dropdowns (States/Districts), input constraints, and duplicate account prevention.
- **Authentication & Security**: Student login, validation toasts, password toggle, token storage verification (`localStorage`), and protected route guards.
- **Session & Route Protection**: Automatic client-side redirects from `/dashboard/*` to `/login` for unauthenticated sessions, logout session invalidation, and history back-button containment.
- **Student Dashboard**: Welcome banner, application progress trackers, recent activity logs, document filter tabs, and quick navigation cards.
- **Scholarship Application**: Multi-step application view, section indicators, form accessibility.
- **Application Status & Verification**: Status timeline, remarks, pending/approved status badges.
- **Document Management**: Document listing (Aadhaar, Income Certificate, Marksheet, Passbook, etc.), category filters (`All`, `Pending`, `Uploaded`), upload action triggers.
- **Profile Management**: Profile identity verification, personal and address tabs, edit and save capabilities.
- **Notifications & Support**: Dashboard alerts, support portal navigation, and responsive accessibility checks.

> **Note**: In compliance with testing requirements, all administrative portals (`/admin` and `/admin/*`) are strictly excluded from this student-facing suite.

---

## 🏗️ Project Architecture & Folder Structure

```text
PMSS-Playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml              # CI/CD execution workflow
├── fixtures/
│   └── test-fixtures.js                # Custom Playwright test fixture with session injection
├── pages/
│   ├── ApplicationPage.js              # Page Object for Multi-Step Application
│   ├── ApplicationStatusPage.js        # Page Object for Application Tracking & Timeline
│   ├── DashboardPage.js                # Page Object for Student Dashboard & Navigation
│   ├── DocumentsPage.js                # Page Object for Documents Management
│   ├── LoginPage.js                    # Page Object for Student Login & Auth Checks
│   ├── ProfilePage.js                  # Page Object for Student Profile Management
│   └── RegisterPage.js                 # Page Object for 2-Step Registration Flow
├── test-data/
│   ├── application-data.js             # Expected student profile & application datasets
│   ├── login-data.js                   # Positive & negative credential fixtures
│   └── registration-data.js            # Synthetic dynamic student generators & boundary values
├── tests/
│   ├── application-status.spec.js      # Status tracking & verification tests (4 TCs)
│   ├── application.spec.js             # Scholarship application form tests (3 TCs)
│   ├── dashboard.spec.js               # Student dashboard & widgets tests (6 TCs)
│   ├── document-upload.spec.js         # Document management & filters tests (4 TCs)
│   ├── forgot-password.spec.js         # Account recovery verification tests (1 TC)
│   ├── HomePageTest.spec.js            # Homepage regression tests (9 TCs)
│   ├── login.spec.js                   # Student login & form validation tests (10 TCs)
│   ├── notifications.spec.js           # Notifications & alerts tests (2 TCs)
│   ├── profile.spec.js                 # Profile details & tabs tests (4 TCs)
│   ├── registration.spec.js            # End-to-end registration flow tests (9 TCs)
│   ├── session-route-protection.spec.js# Route protection & JWT security tests (9 TCs)
│   ├── support-faq.spec.js             # Support & help center tests (2 TCs)
│   └── theme-accessibility.spec.js     # Light/Dark mode & responsive viewports (3 TCs)
├── utils/
│   └── test-helpers.js                 # Session token caching & authentication utilities
├── .env.example                        # Environment variables template
├── package.json                        # Project dependencies and test scripts
└── playwright.config.js                # Global Playwright configuration
```

---

## 🛠️ Technology Stack

- **Testing Engine**: [Playwright Test](https://playwright.dev/) (`@playwright/test`)
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules `"type": "module"`)
- **Pattern**: Page Object Model (POM) separating locators and interactions from assertions
- **Browsers**: WebKit (Safari), Microsoft Edge (Chromium engine)
- **Target Application**: [PMSS Portal Live Deployment](https://prime-minister-special-scholarship-portal.onrender.com/)

---

## ⚙️ Configuration & Environment Setup

### 1. Prerequisites
- Node.js version 18.0.0 or higher.
- npm version 9.0.0 or higher.

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/kamesh/PMSS-Playwright.git
cd PMSS-Playwright
npm install
```

Install the required browser binaries:
```bash
npx playwright install webkit
```

### 3. Environment Variables
Copy `.env.example` to `.env` and configure your credentials if desired:
```bash
cp .env.example .env
```

Default configurable variables:
```ini
BASE_URL=https://prime-minister-special-scholarship-portal.onrender.com
TEST_USER_EMAIL=pmss.test.student@example.com
TEST_USER_PASSWORD=Password@123
CI=false
```

---

## 🚀 Test Execution Commands

### Run Full Test Suite
Execute all test suites across the application:
```bash
npx playwright test --project=webkit
```

### Run Specific Test Suite
Execute tests for an individual module:
```bash
# Student Dashboard
npx playwright test tests/dashboard.spec.js --project=webkit

# Registration Flow
npx playwright test tests/registration.spec.js --project=webkit

# Login & Credentials
npx playwright test tests/login.spec.js --project=webkit

# Session & Route Protection
npx playwright test tests/session-route-protection.spec.js --project=webkit

# Profile Management
npx playwright test tests/profile.spec.js --project=webkit

# Application Status Tracking
npx playwright test tests/application-status.spec.js --project=webkit
```

### Run in Headed Mode
Watch tests execute inside a live browser window:
```bash
npx playwright test tests/dashboard.spec.js --project=webkit --headed
```

### Interactive UI Mode
Launch Playwright's interactive debugging and test runner GUI:
```bash
npx playwright test --ui
```

### Run with Microsoft Edge
```bash
npx playwright test tests/HomePageTest.spec.js --project="Microsoft Edge"
```

### View HTML Test Report
Open the automatically generated interactive HTML report:
```bash
npx playwright show-report
```

---

## 📊 Test Suite Coverage Matrix

| Test Suite File | Module Description | Test Cases |
| :--- | :--- | :---: |
| `tests/HomePageTest.spec.js` | Public landing page, navigation links, theme toggle, FAQ accordion, footer links | 9 |
| `tests/registration.spec.js` | 2-step registration, field validation, password matching, dynamic dropdowns, duplicate accounts | 9 |
| `tests/login.spec.js` | Empty inputs, invalid credentials, password reveal toggle, dashboard redirect, logout | 10 |
| `tests/session-route-protection.spec.js` | Route protection for `/dashboard/*`, token verification, back navigation lock | 9 |
| `tests/dashboard.spec.js` | Overview banner, application progress, activity feed, quick action links, document tabs | 6 |
| `tests/profile.spec.js` | Personal details display, verification badge, personal & address tabs, save actions | 4 |
| `tests/application.spec.js` | Multi-step scholarship application view, section headers, navigation controls | 3 |
| `tests/application-status.spec.js` | Status tracking, application incomplete warning, progression timeline | 4 |
| `tests/document-upload.spec.js` | Document requirements list, tab filtering (All/Pending), upload triggers | 4 |
| `tests/notifications.spec.js` | Dashboard notifications section, header bell trigger | 2 |
| `tests/support-faq.spec.js` | Support portal routing and container visibility | 2 |
| `tests/theme-accessibility.spec.js` | Dark/Light theme switching, responsive viewport verification, keyboard tabbing | 3 |
| `tests/forgot-password.spec.js` | Verification of login recovery options & absence of unhandled reset links | 1 |
| **Total** | **Comprehensive User-Facing Coverage** | **66** |

---

## 💡 Key Architectural Solutions & Technical Highlights

1. **High-Speed Authenticated Session Injection (`injectStudentSession`)**:
   Instead of performing a redundant 20-second UI login form fill before every single test, authenticated test fixtures retrieve and cache a verified JWT token directly from the backend API. The session is injected into `localStorage` (`pmss_token`, `pmss_refresh`, `pmss_user`), allowing tests to navigate to protected routes instantly while maintaining 100% backend signature validity.

2. **Render Cold-Start & Network Resilience**:
   Free-tier hosted instances on Render experience spin-down latency. The test suite is hardened with dedicated action (`30s`) and navigation (`45s`) timeouts, along with sequential execution (`workers: 1`) to prevent connection dropping and rate limiting.

3. **Dynamic Asynchronous Dropdowns**:
   In Step 2 of the student registration workflow, selecting a state asynchronously fetches and attaches child district options. Locators explicitly synchronize with `option:not([value=""])` before selecting, eliminating race conditions.

4. **Self-Service Forgot Password Documentation**:
   The live portal build does not currently provide a self-service password reset form on `/login`. In accordance with testing specifications, this behavior is verified and documented as non-applicable rather than relying on guessed or non-existent selectors.

---

## 📄 License
ISC License. Built for PMSS Scholarship Portal Quality Assurance.
