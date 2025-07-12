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

    @regression
    Scenario: Failed login with invalid email
        When A user enters the email "invalid@example.com"
        And Clicks on the next button
        Then An error message should be displayed
        And The user should remain on the login page

    @regression
    Scenario: Failed login with invalid OTP
        When A user enters the email "admin@example.com"
        And Clicks on the next button
        And Enters the OTP "000000"
        And Clicks on the verify OTP button
        Then An OTP error message should be displayed
        And The user should remain on the OTP verification page

    @regression
    Scenario Outline: Login with different user types
        When A user enters the email "<email>"
        And Clicks on the next button
        And Enters the OTP "<otp>"
        And Clicks on the verify OTP button
        Then The user should be redirected to the dashboard
        And The dashboard page should be displayed

        Examples:
            | email              | otp    |
            | admin@example.com  | 123456 |
            | user@example.com   | 654321 | 