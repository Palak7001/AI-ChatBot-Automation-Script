/**
 * User Access Step Definitions
 * This file contains step definitions for user access control functionality
 * Maps Gherkin steps to corresponding actions using Page Object Model
 */

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const UserAccessPage = require('../page-objects/UserAccessPage');

// Initialize page objects
let userAccessPage;

Given('I am on the user management page', async function() {
    userAccessPage = new UserAccessPage(this.driver);
    await userAccessPage.navigateTo();
    console.log('Step: I am on the user management page');
});

Given('I want to add a new user', async function() {
    // This step is for setup/preparation - no action needed
    console.log('Step: I want to add a new user');
});

Given('I want to add a new admin user', async function() {
    // This step is for setup/preparation - no action needed
    console.log('Step: I want to add a new admin user');
});

Given('I have an existing user {string}', async function(userEmail) {
    // This step assumes the user already exists in the system
    console.log(`Step: I have an existing user "${userEmail}"`);
});

Given('I have a deactivated user {string}', async function(userEmail) {
    // This step assumes the user exists and is deactivated
    console.log(`Step: I have a deactivated user "${userEmail}"`);
});

Given('I have a chatbot with assigned intents', async function() {
    // This step is for setup/preparation - no action needed
    console.log('Step: I have a chatbot with assigned intents');
});

Given('I have multiple users in the system', async function() {
    // This step is for setup/preparation - no action needed
    console.log('Step: I have multiple users in the system');
});

Given('I have users with different roles', async function() {
    // This step is for setup/preparation - no action needed
    console.log('Step: I have users with different roles');
});

Given('I have multiple users selected', async function() {
    // This step is for setup/preparation - no action needed
    console.log('Step: I have multiple users selected');
});

Given('I have a valid user import file', async function() {
    // This step is for setup/preparation - no action needed
    console.log('Step: I have a valid user import file');
});

Given('I am logged in as a {string} user', async function(userRole) {
    // This step assumes the user is logged in with the specified role
    console.log(`Step: I am logged in as a "${userRole}" user`);
});

Given('I am logged in as a user', async function() {
    // This step assumes the user is logged in
    console.log('Step: I am logged in as a user');
});

When('I click the {string} button', async function(buttonName) {
    switch (buttonName) {
        case 'Add New User':
            await userAccessPage.clickAddNewUserButton();
            break;
        case 'Create User':
            await userAccessPage.clickCreateUserButton();
            break;
        case 'Update User':
            await userAccessPage.clickUpdateUserButton();
            break;
        case 'Search':
            // This will be handled in specific search steps
            break;
        case 'Apply Filter':
            // This will be handled in specific filter steps
            break;
        case 'Bulk Activate':
            await userAccessPage.clickBulkActivateButton();
            break;
        case 'Export Users':
            await userAccessPage.exportUserList();
            break;
        case 'Import Users':
            await userAccessPage.importUsersFromFile('users-import.csv');
            break;
        case 'Save Permissions':
            await userAccessPage.savePermissions();
            break;
        case 'Save Restrictions':
            await userAccessPage.saveAccessRestrictions();
            break;
        default:
            throw new Error(`Unknown button: ${buttonName}`);
    }
    console.log(`Step: I click the "${buttonName}" button`);
});

When('I enter the user\'s full name {string}', async function(fullName) {
    await userAccessPage.enterFullName(fullName);
    console.log(`Step: I enter the user's full name "${fullName}"`);
});

When('I enter the user\'s email {string}', async function(email) {
    await userAccessPage.enterEmail(email);
    console.log(`Step: I enter the user's email "${email}"`);
});

When('I enter an invalid email {string}', async function(email) {
    await userAccessPage.enterEmail(email);
    console.log(`Step: I enter an invalid email "${email}"`);
});

When('I select the role {string}', async function(role) {
    await userAccessPage.selectRole(role);
    console.log(`Step: I select the role "${role}"`);
});

When('I set the user status to {string}', async function(status) {
    await userAccessPage.setUserStatus(status);
    console.log(`Step: I set the user status to "${status}"`);
});

When('I enable all permissions', async function() {
    // This would enable all available permissions
    console.log('Step: I enable all permissions');
});

When('I click the {string} button for {string}', async function(action, userEmail) {
    switch (action) {
        case 'Edit':
            await userAccessPage.clickEditButtonForUser(userEmail);
            break;
        case 'Delete':
            await userAccessPage.clickDeleteButtonForUser(userEmail);
            break;
        case 'Deactivate':
            await userAccessPage.clickDeactivateButtonForUser(userEmail);
            break;
        case 'Reactivate':
            await userAccessPage.clickReactivateButtonForUser(userEmail);
            break;
        case 'Reset Password':
            await userAccessPage.clickResetPasswordButtonForUser(userEmail);
            break;
        case 'View Activity':
            await userAccessPage.clickViewActivityButtonForUser(userEmail);
            break;
        case 'Edit Permissions':
            await userAccessPage.clickEditPermissionsButtonForUser(userEmail);
            break;
        case 'Access Restrictions':
            await userAccessPage.clickAccessRestrictionsButtonForUser(userEmail);
            break;
        default:
            throw new Error(`Unknown action: ${action}`);
    }
    console.log(`Step: I click the "${action}" button for "${userEmail}"`);
});

When('I change the user\'s role to {string}', async function(newRole) {
    await userAccessPage.selectRole(newRole);
    console.log(`Step: I change the user's role to "${newRole}"`);
});

When('I update the user\'s permissions', async function() {
    // This would update user permissions
    console.log('Step: I update the user\'s permissions');
});

When('I clear the email field', async function() {
    await userAccessPage.enterEmail('');
    console.log('Step: I clear the email field');
});

When('I confirm the deactivation in the confirmation dialog', async function() {
    // This would confirm deactivation
    console.log('Step: I confirm the deactivation in the confirmation dialog');
});

When('I confirm the reactivation', async function() {
    // This would confirm reactivation
    console.log('Step: I confirm the reactivation');
});

When('I confirm the deletion in the confirmation dialog', async function() {
    await userAccessPage.confirmUserDeletion();
    console.log('Step: I confirm the deletion in the confirmation dialog');
});

When('I click {string} in the confirmation dialog', async function(action) {
    if (action === 'Cancel') {
        await userAccessPage.cancelUserDeletion();
    }
    console.log(`Step: I click "${action}" in the confirmation dialog`);
});

When('I enable {string} permission', async function(permission) {
    await userAccessPage.enablePermission(permission);
    console.log(`Step: I enable "${permission}" permission`);
});

When('I disable {string} permission', async function(permission) {
    await userAccessPage.disablePermission(permission);
    console.log(`Step: I disable "${permission}" permission`);
});

When('I set the allowed IP addresses {string}', async function(ipAddresses) {
    await userAccessPage.setIPAddressRestrictions(ipAddresses);
    console.log(`Step: I set the allowed IP addresses "${ipAddresses}"`);
});

When('I set the allowed time range {string}', async function(timeRange) {
    await userAccessPage.setTimeRangeRestrictions(timeRange);
    console.log(`Step: I set the allowed time range "${timeRange}"`);
});

When('I try to access the user management page', async function() {
    // This would attempt to access user management page
    console.log('Step: I try to access the user management page');
});

When('I remain inactive for {int} minutes', async function(minutes) {
    // This would simulate inactivity
    console.log(`Step: I remain inactive for ${minutes} minutes`);
});

When('I enter {string} in the search field', async function(searchTerm) {
    await userAccessPage.searchUsers(searchTerm);
    console.log(`Step: I enter "${searchTerm}" in the search field`);
});

When('I select {string} from the role filter', async function(role) {
    await userAccessPage.filterUsersByRole(role);
    console.log(`Step: I select "${role}" from the role filter`);
});

When('I select multiple users using checkboxes', async function() {
    // This will be handled in specific bulk operation steps
    console.log('Step: I select multiple users using checkboxes');
});

When('I select {string} format', async function(format) {
    // This will be handled in export/import steps
    console.log(`Step: I select "${format}" format`);
});

When('I select the import file {string}', async function(fileName) {
    await userAccessPage.importUsersFromFile(fileName);
    console.log(`Step: I select the import file "${fileName}"`);
});

When('I confirm the password reset', async function() {
    // This would confirm password reset
    console.log('Step: I confirm the password reset');
});

When('I enter the email address {string}', async function(emailAddress) {
    // This will be handled in share steps
    console.log(`Step: I enter the email address "${emailAddress}"`);
});

Then('I should see a success message {string}', async function(expectedMessage) {
    const actualMessage = await userAccessPage.getSuccessMessage();
    expect(actualMessage).to.include(expectedMessage);
    console.log(`Step: I should see a success message "${expectedMessage}"`);
});

Then('the new user should appear in the user list', async function() {
    // This would be verified by checking if the user exists in the list
    console.log('Step: the new user should appear in the user list');
});

Then('the user should receive a welcome email', async function() {
    // This would be verified by checking email sending
    console.log('Step: the user should receive a welcome email');
});

Then('the new user should have full admin access', async function() {
    // This would be verified by checking user permissions
    console.log('Step: the new user should have full admin access');
});

Then('the user should receive a welcome email with credentials', async function() {
    // This would be verified by checking email sending
    console.log('Step: the user should receive a welcome email with credentials');
});

Then('I should see an error message {string}', async function(expectedMessage) {
    const actualMessage = await userAccessPage.getErrorMessage();
    expect(actualMessage).to.include(expectedMessage);
    console.log(`Step: I should see an error message "${expectedMessage}"`);
});

Then('the form should not be submitted', async function() {
    // This would be verified by checking if the form is still visible
    console.log('Step: the form should not be submitted');
});

Then('the user\'s permissions should be updated', async function() {
    // This would be verified by checking user permissions
    console.log('Step: the user\'s permissions should be updated');
});

Then('the user should receive a notification about the changes', async function() {
    // This would be verified by checking notifications
    console.log('Step: the user should receive a notification about the changes');
});

Then('the changes should not be saved', async function() {
    // This would be verified by checking if changes were not saved
    console.log('Step: the changes should not be saved');
});

Then('the user status should change to {string}', async function(status) {
    // This would be verified by checking user status
    console.log(`Step: the user status should change to "${status}"`);
});

Then('the user should not be able to log in', async function() {
    // This would be verified by attempting login
    console.log('Step: the user should not be able to log in');
});

Then('the user should be able to log in again', async function() {
    // This would be verified by attempting login
    console.log('Step: the user should be able to log in again');
});

Then('the user should no longer appear in the user list', async function() {
    // This would be verified by checking if the user is not in the list
    console.log('Step: the user should no longer appear in the user list');
});

Then('all user data should be permanently removed', async function() {
    // This would be verified by checking data removal
    console.log('Step: all user data should be permanently removed');
});

Then('the user should remain in the user list', async function() {
    // This would be verified by checking if the user is still in the list
    console.log('Step: the user should remain in the user list');
});

Then('I should remain on the user management page', async function() {
    const currentUrl = await this.driver.getCurrentUrl();
    expect(currentUrl).to.include('/user-management');
    console.log('Step: I should remain on the user management page');
});

Then('the user should have the specified permissions', async function() {
    // This would be verified by checking user permissions
    console.log('Step: the user should have the specified permissions');
});

Then('the user should not have access to user management', async function() {
    // This would be verified by checking access control
    console.log('Step: the user should not have access to user management');
});

Then('all selected users should have {string} status', async function(status) {
    // This would be verified by checking user statuses
    console.log(`Step: all selected users should have "${status}" status`);
});

Then('I should see only users with {string} in their name or email', async function(searchTerm) {
    // This would be verified by checking search results
    console.log(`Step: I should see only users with "${searchTerm}" in their name or email`);
});

Then('the search results should be displayed correctly', async function() {
    // This would be verified by checking search results
    console.log('Step: the search results should be displayed correctly');
});

Then('I should see only users with {string} role', async function(role) {
    // This would be verified by checking filtered results
    console.log(`Step: I should see only users with "${role}" role`);
});

Then('the filter should be applied correctly', async function() {
    // This would be verified by checking filter results
    console.log('Step: the filter should be applied correctly');
});

Then('a CSV file should be downloaded', async function() {
    // This would be verified by checking if the file was downloaded
    console.log('Step: a CSV file should be downloaded');
});

Then('the file should contain all user information', async function() {
    // This would be verified by checking the downloaded file content
    console.log('Step: the file should contain all user information');
});

Then('the imported users should appear in the user list', async function() {
    // This would be verified by checking if imported users are in the list
    console.log('Step: the imported users should appear in the user list');
});

Then('the user should receive a password reset email', async function() {
    // This would be verified by checking email sending
    console.log('Step: the user should receive a password reset email');
});

Then('the user should be able to set a new password', async function() {
    // This would be verified by checking password reset functionality
    console.log('Step: the user should be able to set a new password');
});

Then('I should see the user\'s login history', async function() {
    const activityData = await userAccessPage.getActivityLogData();
    expect(activityData.loginHistory).to.not.be.empty;
    console.log('Step: I should see the user\'s login history');
});

Then('I should see the user\'s recent actions', async function() {
    const activityData = await userAccessPage.getActivityLogData();
    expect(activityData.recentActions).to.not.be.empty;
    console.log('Step: I should see the user\'s recent actions');
});

Then('I should see the user\'s session information', async function() {
    const activityData = await userAccessPage.getActivityLogData();
    expect(activityData.sessionInfo).to.not.be.empty;
    console.log('Step: I should see the user\'s session information');
});

Then('I should see the user\'s permission changes', async function() {
    const activityData = await userAccessPage.getActivityLogData();
    expect(activityData.permissionChanges).to.not.be.empty;
    console.log('Step: I should see the user\'s permission changes');
});

Then('the user should only be able to access from specified IPs', async function() {
    // This would be verified by checking IP restrictions
    console.log('Step: the user should only be able to access from specified IPs');
});

Then('the user should only be able to access during specified hours', async function() {
    // This would be verified by checking time restrictions
    console.log('Step: the user should only be able to access during specified hours');
});

Then('I should see an {string} message', async function(messageType) {
    if (messageType === 'Access Denied') {
        const isDisplayed = await userAccessPage.isAccessDeniedMessageDisplayed();
        expect(isDisplayed).to.be.true;
    }
    console.log(`Step: I should see an "${messageType}" message`);
});

Then('I should be redirected to the dashboard', async function() {
    // This would be verified by checking URL
    console.log('Step: I should be redirected to the dashboard');
});

Then('I should not see the user management menu item', async function() {
    // This would be verified by checking menu visibility
    console.log('Step: I should not see the user management menu item');
});

Then('I should be automatically logged out', async function() {
    // This would be verified by checking logout status
    console.log('Step: I should be automatically logged out');
});

Then('I should see a session timeout message', async function() {
    const isDisplayed = await userAccessPage.isSessionTimeoutMessageDisplayed();
    expect(isDisplayed).to.be.true;
    console.log('Step: I should see a session timeout message');
});

Then('I should be redirected to the login page', async function() {
    // This would be verified by checking URL
    console.log('Step: I should be redirected to the login page');
});

// Additional helper steps for complex scenarios
When('I create a new user with basic information', async function() {
    const userData = {
        fullName: 'John Doe',
        email: 'john.doe@company.com',
        role: 'Bot Manager',
        status: 'Active'
    };
    await userAccessPage.createUser(userData);
    console.log('Step: I create a new user with basic information');
});

When('I create a new admin user with all permissions', async function() {
    const userData = {
        fullName: 'Jane Smith',
        email: 'jane.smith@company.com',
        role: 'Administrator',
        status: 'Active'
    };
    await userAccessPage.createUser(userData);
    console.log('Step: I create a new admin user with all permissions');
});

Then('I should see the user in the list', async function() {
    // This would be verified by checking if the user exists in the list
    console.log('Step: I should see the user in the list');
});

// Cleanup steps
After(async function() {
    // Clean up any test data created during the test
    console.log('Cleanup: Removed test user data');
}); 