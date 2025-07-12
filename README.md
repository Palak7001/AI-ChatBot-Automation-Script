# AI Chatbot Admin Panel - Cypress E2E Test Automation

A comprehensive test automation framework for the AI Chatbot Admin Panel using **Cypress** with **BDD (Behavior Driven Development)** and **Page Object Model** design pattern.

## 🏗️ Project Structure

```
├── cypress/
│   ├── e2e/
│   │   ├── features/           # Gherkin feature files
│   │   │   └── login.feature  # Login functionality scenarios
│   │   └── pages/             # Page Object Model classes
│   │       └── loginPage.js   # Login page object
│   ├── support/
│   │   ├── step_definitions/  # Step definition files
│   │   │   └── loginSteps.js # Login step definitions
│   │   ├── api/              # API helper classes
│   │   │   └── apiHelper.js  # API testing utilities
│   │   └── commands.js       # Custom Cypress commands
│   ├── fixtures/             # Test data files
│   │   └── loginData.json   # Login test data
│   └── reports/             # Test execution reports
├── cypress.config.js         # Cypress configuration
├── package.json             # Project dependencies
├── eslint.config.js         # ESLint configuration
└── README.md               # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd ai-chatbot-admin-panel-automation

# Install dependencies
npm install

# Install Cypress globally (optional)
npm install -g cypress
```

### Configuration
1. Copy the environment template:
```bash
cp env.example .env
```

2. Update the environment variables in `.env`:
```env
SECURITY_TOKEN=your-security-token
baseUrl=https://your-app-url.com/
```

### Running Tests

#### Run all tests
```bash
npm test
```

#### Run tests in headed mode
```bash
npm run test:headed
```

#### Open Cypress Test Runner
```bash
npm run test:open
```

#### Run specific test suites
```bash
# Run smoke tests only
npm test -- --env tags="@smoke"

# Run regression tests only
npm test -- --env tags="@regression"

# Run critical tests only
npm test -- --env tags="@critical"
```

#### Run tests in different browsers
```bash
# Firefox
npm run test:firefox

# Edge
npm run test:edge
```

## 📋 Test Execution Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests in headless Chrome |
| `npm run test:open` | Open Cypress Test Runner |
| `npm run test:headed` | Run tests in headed mode |
| `npm run test:firefox` | Run tests in Firefox |
| `npm run test:edge` | Run tests in Edge |
| `npm run lint` | Run ESLint on Cypress files |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run report` | Generate test reports |
| `npm run report:allure` | Generate and open Allure reports |

## 🏗️ Framework Architecture

### BDD with Gherkin
- **Feature Files**: Written in Gherkin syntax for business-readable scenarios
- **Step Definitions**: Map Gherkin steps to Cypress actions
- **Page Objects**: Encapsulate web elements and actions

### Page Object Model
- **Centralized Selectors**: All element selectors in page objects
- **Reusable Methods**: Common actions encapsulated in page objects
- **Maintainable Code**: Easy to update when UI changes

### Custom Commands
- **CommonLogin**: Automated login process
- **waitForSpinner**: Wait for loading spinners
- **waitForElement**: Wait for elements with timeout
- **clickWithRetry**: Click with retry mechanism

## 📊 Reporting

### Mochawesome Reports
- HTML reports with embedded screenshots
- Interactive charts and statistics
- Detailed test results and logs

### Allure Reports
- Comprehensive test reporting
- Historical data and trends
- Integration with CI/CD pipelines

## 🔧 Configuration

### Cypress Configuration (`cypress.config.js`)
- Cucumber preprocessor setup
- Retry configuration
- Viewport and timeout settings
- Environment variables

### ESLint Configuration (`eslint.config.js`)
- Cypress-specific rules
- Mocha and Chai support
- Code quality standards

## 📝 Writing Tests

### Feature Files
```gherkin
Feature: Admin Login Functionality
    As an admin user
    I want to be able to login to the admin panel
    So that I can access the dashboard and manage the system

    Background:
        Given A user lands on the admin login page

    @smoke @critical
    Scenario: Successful login with valid credentials
        When A user enters the email "admin@example.com"
        And Clicks on the next button
        And Enters the OTP "123456"
        And Clicks on the verify OTP button
        Then The user should be redirected to the dashboard
        And The dashboard page should be displayed
```

### Step Definitions
```javascript
import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from "../../../e2e/pages/loginPage";

const login = new LoginPage();

Given("A user lands on the admin login page", function () {
  cy.visit(Cypress.config("baseUrl"));
});

When(/^A user enters the email "(.*)"$/, function (email) {
  login.enterEmail(email);
});
```

### Page Objects
```javascript
class LoginPage {
    get email() {
        return cy.get('input[id="email"]')
    }
    
    enterEmail(email) {
        this.email.type(email)
    }
    
    clickOnNextButton() {
        this.nextButton.click().wait(1000)
    }
}

export default LoginPage
```

## 🛠️ Best Practices

### Test Design
- Write deterministic E2E tests
- Use `cy.fixture()` for test data management
- Use `cy.intercept()` for network mocking
- Use `data-cy` attributes for reliable element selection

### Element Selection
- Prefer `data-cy` attributes over CSS classes
- Centralize frequently used selectors
- Avoid brittle selectors that change frequently

### Error Handling
- Implement proper error handling in custom commands
- Use meaningful error messages
- Validate element states before interactions

## 🔒 Security

### Environment Variables
- Store sensitive data in environment variables
- Never commit credentials to version control
- Use `.env` files for local development

### Test Data
- Use test-specific data
- Never use production data in tests
- Clean up test data after execution

## 📈 Continuous Integration

### GitHub Actions Example
```yaml
name: Cypress Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - uses: actions/upload-artifact@v3
        with:
          name: cypress-screenshots
          path: cypress/screenshots
```

## 🤝 Contributing

1. Follow the established coding standards
2. Write tests for new features
3. Update documentation as needed
4. Run linting before committing
5. Ensure all tests pass

## 📚 Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [Page Object Model Pattern](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)

## 🆘 Support

For questions or issues:
1. Check the documentation
2. Review existing test examples
3. Create an issue with detailed information

---

**Built with ❤️ using Cypress, Cucumber.js, and Page Object Model** 