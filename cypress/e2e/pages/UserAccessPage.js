/**
 * UserAccessPage - Page Object Model for User Access Control functionality
 * This class encapsulates all user management page elements and actions
 * Following the Page Object Model design pattern for maintainability
 */

const { By, until } = require('selenium-webdriver');

class UserAccessPage {
    constructor(driver) {
        this.driver = driver;
        
        // Page URL
        this.url = process.env.BASE_URL + '/user-management' || 'https://admin.aichatbot.com/user-management';
        
        // Element selectors - centralized for easy maintenance
        this.selectors = {
            // Page elements
            pageTitle: By.tagName('h1'),
            userList: By.className('user-list'),
            userItems: By.className('user-item'),
            addNewUserButton: By.id('add-new-user-btn'),
            
            // User Form
            fullNameField: By.id('full-name'),
            emailField: By.id('email'),
            roleDropdown: By.id('role-dropdown'),
            statusDropdown: By.id('status-dropdown'),
            createUserButton: By.id('create-user-btn'),
            updateUserButton: By.id('update-user-btn'),
            cancelButton: By.id('cancel-btn'),
            
            // User Actions
            editUserButton: By.className('edit-user-btn'),
            deleteUserButton: By.className('delete-user-btn'),
            activateUserButton: By.className('activate-user-btn'),
            deactivateUserButton: By.className('deactivate-user-btn'),
            reactivateUserButton: By.className('reactivate-user-btn'),
            resetPasswordButton: By.className('reset-password-btn'),
            viewActivityButton: By.className('view-activity-btn'),
            editPermissionsButton: By.className('edit-permissions-btn'),
            accessRestrictionsButton: By.className('access-restrictions-btn'),
            
            // Confirmation dialogs
            confirmDeleteButton: By.id('confirm-delete-btn'),
            cancelDeleteButton: By.id('cancel-delete-btn'),
            confirmDialog: By.className('confirm-dialog'),
            
            // Permissions
            permissionCheckboxes: By.className('permission-checkbox'),
            savePermissionsButton: By.id('save-permissions-btn'),
            
            // Access Restrictions
            ipAddressField: By.id('ip-address-field'),
            timeRangeField: By.id('time-range-field'),
            saveRestrictionsButton: By.id('save-restrictions-btn'),
            
            // Search and Filter
            searchField: By.id('search-users'),
            searchButton: By.id('search-btn'),
            roleFilter: By.id('role-filter'),
            statusFilter: By.id('status-filter'),
            applyFilterButton: By.id('apply-filter-btn'),
            clearFilterButton: By.id('clear-filter-btn'),
            
            // Bulk Operations
            selectAllCheckbox: By.id('select-all-users'),
            bulkActivateButton: By.id('bulk-activate-btn'),
            bulkDeactivateButton: By.id('bulk-deactivate-btn'),
            bulkDeleteButton: By.id('bulk-delete-btn'),
            
            // Export/Import
            exportUsersButton: By.id('export-users-btn'),
            importUsersButton: By.id('import-users-btn'),
            importFileInput: By.id('import-file'),
            
            // Activity Logs
            activityLogSection: By.className('activity-log-section'),
            loginHistory: By.className('login-history'),
            recentActions: By.className('recent-actions'),
            sessionInfo: By.className('session-info'),
            permissionChanges: By.className('permission-changes'),
            
            // Messages
            successMessage: By.className('success-message'),
            errorMessage: By.className('error-message'),
            validationMessage: By.className('validation-message'),
            
            // User Status
            userStatus: By.className('user-status'),
            userRole: By.className('user-role'),
            userEmail: By.className('user-email'),
            
            // Access Control Test
            accessDeniedMessage: By.className('access-denied-message'),
            sessionTimeoutMessage: By.className('session-timeout-message')
        };
    }

    /**
     * Navigate to the user management page
     * @returns {Promise<void>}
     */
    async navigateTo() {
        try {
            await this.driver.get(this.url);
            await this.waitForPageToLoad();
            console.log('Successfully navigated to user management page');
        } catch (error) {
            console.error('Failed to navigate to user management page:', error);
            throw error;
        }
    }

    /**
     * Wait for the user management page to fully load
     * @returns {Promise<void>}
     */
    async waitForPageToLoad() {
        try {
            await this.driver.wait(until.elementLocated(this.selectors.userList), 10000);
            await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.selectors.userList)), 5000);
        } catch (error) {
            console.error('User management page failed to load:', error);
            throw error;
        }
    }

    /**
     * Click Add New User button
     * @returns {Promise<void>}
     */
    async clickAddNewUserButton() {
        try {
            const addNewUserButton = await this.driver.findElement(this.selectors.addNewUserButton);
            await addNewUserButton.click();
            console.log('Add New User button clicked');
        } catch (error) {
            console.error('Failed to click Add New User button:', error);
            throw error;
        }
    }

    /**
     * Enter user's full name
     * @param {string} fullName - The user's full name
     * @returns {Promise<void>}
     */
    async enterFullName(fullName) {
        try {
            const fullNameField = await this.driver.findElement(this.selectors.fullNameField);
            await fullNameField.clear();
            await fullNameField.sendKeys(fullName);
            console.log(`Entered full name: ${fullName}`);
        } catch (error) {
            console.error('Failed to enter full name:', error);
            throw error;
        }
    }

    /**
     * Enter user's email
     * @param {string} email - The user's email
     * @returns {Promise<void>}
     */
    async enterEmail(email) {
        try {
            const emailField = await this.driver.findElement(this.selectors.emailField);
            await emailField.clear();
            await emailField.sendKeys(email);
            console.log(`Entered email: ${email}`);
        } catch (error) {
            console.error('Failed to enter email:', error);
            throw error;
        }
    }

    /**
     * Select user role
     * @param {string} role - The role to select
     * @returns {Promise<void>}
     */
    async selectRole(role) {
        try {
            const roleDropdown = await this.driver.findElement(this.selectors.roleDropdown);
            await roleDropdown.click();
            
            const option = await this.driver.findElement(By.xpath(`//option[text()='${role}']`));
            await option.click();
            console.log(`Selected role: ${role}`);
        } catch (error) {
            console.error('Failed to select role:', error);
            throw error;
        }
    }

    /**
     * Set user status
     * @param {string} status - The status to set (Active/Inactive)
     * @returns {Promise<void>}
     */
    async setUserStatus(status) {
        try {
            const statusDropdown = await this.driver.findElement(this.selectors.statusDropdown);
            await statusDropdown.click();
            
            const option = await this.driver.findElement(By.xpath(`//option[text()='${status}']`));
            await option.click();
            console.log(`Set user status: ${status}`);
        } catch (error) {
            console.error('Failed to set user status:', error);
            throw error;
        }
    }

    /**
     * Click Create User button
     * @returns {Promise<void>}
     */
    async clickCreateUserButton() {
        try {
            const createUserButton = await this.driver.findElement(this.selectors.createUserButton);
            await createUserButton.click();
            console.log('Create User button clicked');
        } catch (error) {
            console.error('Failed to click Create User button:', error);
            throw error;
        }
    }

    /**
     * Create a new user with basic information
     * @param {Object} userData - The user data
     * @returns {Promise<void>}
     */
    async createUser(userData) {
        try {
            await this.clickAddNewUserButton();
            await this.enterFullName(userData.fullName);
            await this.enterEmail(userData.email);
            await this.selectRole(userData.role);
            await this.setUserStatus(userData.status);
            await this.clickCreateUserButton();
            console.log(`User created successfully: ${userData.email}`);
        } catch (error) {
            console.error('Failed to create user:', error);
            throw error;
        }
    }

    /**
     * Click Edit button for a specific user
     * @param {string} userEmail - The email of the user to edit
     * @returns {Promise<void>}
     */
    async clickEditButtonForUser(userEmail) {
        try {
            const userRow = await this.findUserRow(userEmail);
            const editButton = await userRow.findElement(this.selectors.editUserButton);
            await editButton.click();
            console.log(`Edit button clicked for user: ${userEmail}`);
        } catch (error) {
            console.error(`Failed to click edit button for user ${userEmail}:`, error);
            throw error;
        }
    }

    /**
     * Click Delete button for a specific user
     * @param {string} userEmail - The email of the user to delete
     * @returns {Promise<void>}
     */
    async clickDeleteButtonForUser(userEmail) {
        try {
            const userRow = await this.findUserRow(userEmail);
            const deleteButton = await userRow.findElement(this.selectors.deleteUserButton);
            await deleteButton.click();
            console.log(`Delete button clicked for user: ${userEmail}`);
        } catch (error) {
            console.error(`Failed to click delete button for user ${userEmail}:`, error);
            throw error;
        }
    }

    /**
     * Confirm user deletion
     * @returns {Promise<void>}
     */
    async confirmUserDeletion() {
        try {
            const confirmDeleteButton = await this.driver.findElement(this.selectors.confirmDeleteButton);
            await confirmDeleteButton.click();
            console.log('User deletion confirmed');
        } catch (error) {
            console.error('Failed to confirm user deletion:', error);
            throw error;
        }
    }

    /**
     * Cancel user deletion
     * @returns {Promise<void>}
     */
    async cancelUserDeletion() {
        try {
            const cancelDeleteButton = await this.driver.findElement(this.selectors.cancelDeleteButton);
            await cancelDeleteButton.click();
            console.log('User deletion cancelled');
        } catch (error) {
            console.error('Failed to cancel user deletion:', error);
            throw error;
        }
    }

    /**
     * Click Deactivate button for a specific user
     * @param {string} userEmail - The email of the user to deactivate
     * @returns {Promise<void>}
     */
    async clickDeactivateButtonForUser(userEmail) {
        try {
            const userRow = await this.findUserRow(userEmail);
            const deactivateButton = await userRow.findElement(this.selectors.deactivateUserButton);
            await deactivateButton.click();
            console.log(`Deactivate button clicked for user: ${userEmail}`);
        } catch (error) {
            console.error(`Failed to click deactivate button for user ${userEmail}:`, error);
            throw error;
        }
    }

    /**
     * Click Reactivate button for a specific user
     * @param {string} userEmail - The email of the user to reactivate
     * @returns {Promise<void>}
     */
    async clickReactivateButtonForUser(userEmail) {
        try {
            const userRow = await this.findUserRow(userEmail);
            const reactivateButton = await userRow.findElement(this.selectors.reactivateUserButton);
            await reactivateButton.click();
            console.log(`Reactivate button clicked for user: ${userEmail}`);
        } catch (error) {
            console.error(`Failed to click reactivate button for user ${userEmail}:`, error);
            throw error;
        }
    }

    /**
     * Click Reset Password button for a specific user
     * @param {string} userEmail - The email of the user to reset password
     * @returns {Promise<void>}
     */
    async clickResetPasswordButtonForUser(userEmail) {
        try {
            const userRow = await this.findUserRow(userEmail);
            const resetPasswordButton = await userRow.findElement(this.selectors.resetPasswordButton);
            await resetPasswordButton.click();
            console.log(`Reset Password button clicked for user: ${userEmail}`);
        } catch (error) {
            console.error(`Failed to click reset password button for user ${userEmail}:`, error);
            throw error;
        }
    }

    /**
     * Click View Activity button for a specific user
     * @param {string} userEmail - The email of the user to view activity
     * @returns {Promise<void>}
     */
    async clickViewActivityButtonForUser(userEmail) {
        try {
            const userRow = await this.findUserRow(userEmail);
            const viewActivityButton = await userRow.findElement(this.selectors.viewActivityButton);
            await viewActivityButton.click();
            console.log(`View Activity button clicked for user: ${userEmail}`);
        } catch (error) {
            console.error(`Failed to click view activity button for user ${userEmail}:`, error);
            throw error;
        }
    }

    /**
     * Click Edit Permissions button for a specific user
     * @param {string} userEmail - The email of the user to edit permissions
     * @returns {Promise<void>}
     */
    async clickEditPermissionsButtonForUser(userEmail) {
        try {
            const userRow = await this.findUserRow(userEmail);
            const editPermissionsButton = await userRow.findElement(this.selectors.editPermissionsButton);
            await editPermissionsButton.click();
            console.log(`Edit Permissions button clicked for user: ${userEmail}`);
        } catch (error) {
            console.error(`Failed to click edit permissions button for user ${userEmail}:`, error);
            throw error;
        }
    }

    /**
     * Enable specific permission
     * @param {string} permission - The permission to enable
     * @returns {Promise<void>}
     */
    async enablePermission(permission) {
        try {
            const permissionCheckbox = await this.driver.findElement(By.xpath(`//input[@value='${permission}']`));
            if (!await permissionCheckbox.isSelected()) {
                await permissionCheckbox.click();
                console.log(`Enabled permission: ${permission}`);
            }
        } catch (error) {
            console.error(`Failed to enable permission ${permission}:`, error);
            throw error;
        }
    }

    /**
     * Disable specific permission
     * @param {string} permission - The permission to disable
     * @returns {Promise<void>}
     */
    async disablePermission(permission) {
        try {
            const permissionCheckbox = await this.driver.findElement(By.xpath(`//input[@value='${permission}']`));
            if (await permissionCheckbox.isSelected()) {
                await permissionCheckbox.click();
                console.log(`Disabled permission: ${permission}`);
            }
        } catch (error) {
            console.error(`Failed to disable permission ${permission}:`, error);
            throw error;
        }
    }

    /**
     * Save permissions
     * @returns {Promise<void>}
     */
    async savePermissions() {
        try {
            const savePermissionsButton = await this.driver.findElement(this.selectors.savePermissionsButton);
            await savePermissionsButton.click();
            console.log('Permissions saved');
        } catch (error) {
            console.error('Failed to save permissions:', error);
            throw error;
        }
    }

    /**
     * Click Access Restrictions button for a specific user
     * @param {string} userEmail - The email of the user to set restrictions
     * @returns {Promise<void>}
     */
    async clickAccessRestrictionsButtonForUser(userEmail) {
        try {
            const userRow = await this.findUserRow(userEmail);
            const accessRestrictionsButton = await userRow.findElement(this.selectors.accessRestrictionsButton);
            await accessRestrictionsButton.click();
            console.log(`Access Restrictions button clicked for user: ${userEmail}`);
        } catch (error) {
            console.error(`Failed to click access restrictions button for user ${userEmail}:`, error);
            throw error;
        }
    }

    /**
     * Set IP address restrictions
     * @param {string} ipAddresses - The allowed IP addresses
     * @returns {Promise<void>}
     */
    async setIPAddressRestrictions(ipAddresses) {
        try {
            const ipAddressField = await this.driver.findElement(this.selectors.ipAddressField);
            await ipAddressField.clear();
            await ipAddressField.sendKeys(ipAddresses);
            console.log(`Set IP address restrictions: ${ipAddresses}`);
        } catch (error) {
            console.error('Failed to set IP address restrictions:', error);
            throw error;
        }
    }

    /**
     * Set time range restrictions
     * @param {string} timeRange - The allowed time range
     * @returns {Promise<void>}
     */
    async setTimeRangeRestrictions(timeRange) {
        try {
            const timeRangeField = await this.driver.findElement(this.selectors.timeRangeField);
            await timeRangeField.clear();
            await timeRangeField.sendKeys(timeRange);
            console.log(`Set time range restrictions: ${timeRange}`);
        } catch (error) {
            console.error('Failed to set time range restrictions:', error);
            throw error;
        }
    }

    /**
     * Save access restrictions
     * @returns {Promise<void>}
     */
    async saveAccessRestrictions() {
        try {
            const saveRestrictionsButton = await this.driver.findElement(this.selectors.saveRestrictionsButton);
            await saveRestrictionsButton.click();
            console.log('Access restrictions saved');
        } catch (error) {
            console.error('Failed to save access restrictions:', error);
            throw error;
        }
    }

    /**
     * Find user row by email
     * @param {string} userEmail - The email of the user to find
     * @returns {Promise<WebElement>} The user row element
     */
    async findUserRow(userEmail) {
        try {
            const userItems = await this.driver.findElements(this.selectors.userItems);
            
            for (const userItem of userItems) {
                const emailElement = await userItem.findElement(this.selectors.userEmail);
                const email = await emailElement.getText();
                
                if (email === userEmail) {
                    return userItem;
                }
            }
            
            throw new Error(`User with email '${userEmail}' not found`);
        } catch (error) {
            console.error(`Failed to find user row for ${userEmail}:`, error);
            throw error;
        }
    }

    /**
     * Check if user exists in the list
     * @param {string} userEmail - The email of the user to check
     * @returns {Promise<boolean>}
     */
    async isUserInList(userEmail) {
        try {
            await this.findUserRow(userEmail);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get user status
     * @param {string} userEmail - The email of the user
     * @returns {Promise<string>}
     */
    async getUserStatus(userEmail) {
        try {
            const userRow = await this.findUserRow(userEmail);
            const statusElement = await userRow.findElement(this.selectors.userStatus);
            return await statusElement.getText();
        } catch (error) {
            console.error(`Failed to get status for user ${userEmail}:`, error);
            return '';
        }
    }

    /**
     * Get success message
     * @returns {Promise<string>}
     */
    async getSuccessMessage() {
        try {
            const successElement = await this.driver.findElement(this.selectors.successMessage);
            return await successElement.getText();
        } catch (error) {
            console.error('Failed to get success message:', error);
            return '';
        }
    }

    /**
     * Get error message
     * @returns {Promise<string>}
     */
    async getErrorMessage() {
        try {
            const errorElement = await this.driver.findElement(this.selectors.errorMessage);
            return await errorElement.getText();
        } catch (error) {
            console.error('Failed to get error message:', error);
            return '';
        }
    }

    /**
     * Search for users
     * @param {string} searchTerm - The search term
     * @returns {Promise<void>}
     */
    async searchUsers(searchTerm) {
        try {
            const searchField = await this.driver.findElement(this.selectors.searchField);
            await searchField.clear();
            await searchField.sendKeys(searchTerm);
            
            const searchButton = await this.driver.findElement(this.selectors.searchButton);
            await searchButton.click();
            console.log(`Searched for users: ${searchTerm}`);
        } catch (error) {
            console.error('Failed to search users:', error);
            throw error;
        }
    }

    /**
     * Filter users by role
     * @param {string} role - The role to filter by
     * @returns {Promise<void>}
     */
    async filterUsersByRole(role) {
        try {
            const roleFilter = await this.driver.findElement(this.selectors.roleFilter);
            await roleFilter.click();
            
            const option = await this.driver.findElement(By.xpath(`//option[text()='${role}']`));
            await option.click();
            
            const applyFilterButton = await this.driver.findElement(this.selectors.applyFilterButton);
            await applyFilterButton.click();
            console.log(`Filtered users by role: ${role}`);
        } catch (error) {
            console.error('Failed to filter users by role:', error);
            throw error;
        }
    }

    /**
     * Select multiple users for bulk operations
     * @param {Array<string>} userEmails - Array of user emails to select
     * @returns {Promise<void>}
     */
    async selectUsersForBulkOperation(userEmails) {
        try {
            for (const userEmail of userEmails) {
                const userRow = await this.findUserRow(userEmail);
                const checkbox = await userRow.findElement(By.className('user-checkbox'));
                await checkbox.click();
            }
            console.log(`Selected ${userEmails.length} users for bulk operation`);
        } catch (error) {
            console.error('Failed to select users for bulk operation:', error);
            throw error;
        }
    }

    /**
     * Click bulk activate button
     * @returns {Promise<void>}
     */
    async clickBulkActivateButton() {
        try {
            const bulkActivateButton = await this.driver.findElement(this.selectors.bulkActivateButton);
            await bulkActivateButton.click();
            console.log('Bulk activate button clicked');
        } catch (error) {
            console.error('Failed to click bulk activate button:', error);
            throw error;
        }
    }

    /**
     * Export user list
     * @param {string} format - The export format (CSV, PDF, etc.)
     * @returns {Promise<void>}
     */
    async exportUserList(format = 'CSV') {
        try {
            const exportUsersButton = await this.driver.findElement(this.selectors.exportUsersButton);
            await exportUsersButton.click();
            
            const formatOption = await this.driver.findElement(By.xpath(`//option[text()='${format}']`));
            await formatOption.click();
            
            console.log(`Exported user list in ${format} format`);
        } catch (error) {
            console.error('Failed to export user list:', error);
            throw error;
        }
    }

    /**
     * Import users from file
     * @param {string} filePath - The path to the import file
     * @returns {Promise<void>}
     */
    async importUsersFromFile(filePath) {
        try {
            const importUsersButton = await this.driver.findElement(this.selectors.importUsersButton);
            await importUsersButton.click();
            
            const importFileInput = await this.driver.findElement(this.selectors.importFileInput);
            await importFileInput.sendKeys(filePath);
            
            console.log(`Imported users from file: ${filePath}`);
        } catch (error) {
            console.error('Failed to import users from file:', error);
            throw error;
        }
    }

    /**
     * Get activity log data
     * @returns {Promise<Object>}
     */
    async getActivityLogData() {
        try {
            const data = {
                loginHistory: await this.getElementText(this.selectors.loginHistory),
                recentActions: await this.getElementText(this.selectors.recentActions),
                sessionInfo: await this.getElementText(this.selectors.sessionInfo),
                permissionChanges: await this.getElementText(this.selectors.permissionChanges)
            };
            console.log('Retrieved activity log data');
            return data;
        } catch (error) {
            console.error('Failed to get activity log data:', error);
            throw error;
        }
    }

    /**
     * Check if access denied message is displayed
     * @returns {Promise<boolean>}
     */
    async isAccessDeniedMessageDisplayed() {
        try {
            const accessDeniedElement = await this.driver.findElement(this.selectors.accessDeniedMessage);
            return await accessDeniedElement.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if session timeout message is displayed
     * @returns {Promise<boolean>}
     */
    async isSessionTimeoutMessageDisplayed() {
        try {
            const sessionTimeoutElement = await this.driver.findElement(this.selectors.sessionTimeoutMessage);
            return await sessionTimeoutElement.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Helper method to get element text
     * @param {By} selector - The element selector
     * @returns {Promise<string>}
     */
    async getElementText(selector) {
        try {
            const element = await this.driver.findElement(selector);
            return await element.getText();
        } catch (error) {
            console.error('Failed to get element text:', error);
            return '';
        }
    }
}

module.exports = UserAccessPage; 