/**
 * LoginPage - Page Object Model for Login functionality
 * This class encapsulates all login page elements and actions
 * Following the Page Object Model design pattern for maintainability
 */

const { By, until } = require('selenium-webdriver');

class LoginPage {
    get email() {
        return cy.get('input[id="email"]')
    }
    
    get nextButton() {
        return cy.get('[class="indicator-label"]').contains('Next')
    }
    
    get otpInput() {
        return cy.get('input[name="verify_otp_code"]')
    }
    
    get verifyOtpButton() {
        return cy.get('[class="indicator-label"]').contains('Verify OTP')
    }
    
    get errorMessage() {
        return cy.get('[data-cy="error-message"]')
    }
    
    get otpErrorMessage() {
        return cy.get('[data-cy="otp-error-message"]')
    }
    
    enterEmail(email) {
        this.email.type(email)
    }
    
    clickOnNextButton() {
        this.nextButton.click().wait(1000)
    }
    
    enterOTP(otp) {
        this.otpInput.type(otp)
    }
    
    clickOnVerifyOtpButton() {
        this.verifyOtpButton.click().wait(1000)
    }
    
    verifyDashboardPage() {
        cy.url().should("include", "/dashboard");
    }
    
    verifyErrorMessage() {
        this.errorMessage.should("be.visible")
    }
    
    verifyOtpErrorMessage() {
        this.otpErrorMessage.should("be.visible")
    }
    
    verifyLoginPage() {
        cy.url().should("include", "/login");
    }
}

export default LoginPage 