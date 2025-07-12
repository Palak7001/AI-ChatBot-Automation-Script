// Custom login command
Cypress.Commands.add("CommonLogin", (email, OTP) => {
  cy.get('input[id="email"]').type(email);
  cy.get('[class="indicator-label"]').contains("Next").click();
  cy.get('input[name="verify_otp_code"]').type(OTP);
  cy.get('[class="indicator-label"]').contains("Verify OTP").click();
  cy.url("baseUrl").should("include", "/dashboard");
});

// Utility commands
Cypress.Commands.add('waitForSpinner', () => {
  cy.get('[class="spinner-border"]').should("be.visible");
  cy.get('[class="spinner-border"]').should("not.exist");
});

// Override existing commands
Cypress.Commands.overwrite("type", (originalFn, subject, text, options) => {
  if (!subject || !subject.offsetParent) {
    throw new Error("Element is not visible or does not exist");
  }
  if (subject.disabled) {
    throw new Error("Element is disabled");
  }
  subject.value = ""; // Clear the input field
  return originalFn(subject, text, options);
});

// Custom command for waiting for elements
Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
});

// Custom command for clicking with retry
Cypress.Commands.add('clickWithRetry', (selector, maxAttempts = 3) => {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      cy.get(selector).click();
      break;
    } catch (error) {
      if (i === maxAttempts - 1) throw error;
      cy.wait(1000);
    }
  }
}); 