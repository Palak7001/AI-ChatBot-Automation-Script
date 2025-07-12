import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from "../../../e2e/pages/loginPage";

const login = new LoginPage();

Given("A user lands on the admin login page", function () {
  cy.visit(Cypress.config("baseUrl"));
});

When(/^A user enters the email "(.*)"$/, function (email) {
  login.enterEmail(email);
});

When("Clicks on the next button", function () {
    login.clickOnNextButton();
});

When(/^Enters the OTP "(.*)"$/, function (otp) {
    login.enterOTP(otp);
});

When("Clicks on the verify OTP button", function () {
    login.clickOnVerifyOtpButton();
});

Then("The user should be redirected to the dashboard", function () {
    login.verifyDashboardPage();
});

Then("The dashboard page should be displayed", function () {
    cy.get('[data-cy="dashboard-container"]').should('be.visible');
});

Then("An error message should be displayed", function () {
    login.verifyErrorMessage();
});

Then("The user should remain on the login page", function () {
    login.verifyLoginPage();
});

Then("An OTP error message should be displayed", function () {
    login.verifyOtpErrorMessage();
});

Then("The user should remain on the OTP verification page", function () {
    cy.url().should("include", "/verify-otp");
}); 