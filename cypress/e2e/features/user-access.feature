# AI Chatbot Admin Panel - User Access Control Functionality
# This feature file covers all user management and access control scenarios

Feature: User Access Control
  As an admin user
  I want to manage user access and permissions
  So that I can control who can access the admin panel and what they can do

  Background:
    Given I am logged in as an admin user
    And I am on the user management page

  @smoke @critical
  Scenario: Add a new user with basic permissions
    Given I want to add a new user
    When I click the "Add New User" button
    And I enter the user's full name "John Doe"
    And I enter the user's email "john.doe@company.com"
    And I select the role "Bot Manager"
    And I set the user status to "Active"
    And I click the "Create User" button
    Then I should see a success message "User created successfully"
    And the new user should appear in the user list
    And the user should receive a welcome email

  @regression
  Scenario: Add user with all permissions
    Given I want to add a new admin user
    When I click the "Add New User" button
    And I enter the user's full name "Jane Smith"
    And I enter the user's email "jane.smith@company.com"
    And I select the role "Administrator"
    And I enable all permissions
    And I set the user status to "Active"
    And I click the "Create User" button
    Then I should see a success message "User created successfully"
    And the new user should have full admin access
    And the user should receive a welcome email with credentials

  @regression
  Scenario: Add user with invalid data
    Given I want to add a new user
    When I click the "Add New User" button
    And I enter an invalid email "invalid-email"
    And I click the "Create User" button
    Then I should see an error message "Please enter a valid email address"
    And the form should not be submitted

  @smoke @critical
  Scenario: Edit existing user
    Given I have an existing user "john.doe@company.com"
    When I click the "Edit" button for "john.doe@company.com"
    And I change the user's role to "Analytics Viewer"
    And I update the user's permissions
    And I click the "Update User" button
    Then I should see a success message "User updated successfully"
    And the user's permissions should be updated
    And the user should receive a notification about the changes

  @regression
  Scenario: Edit user with invalid data
    Given I have an existing user "test@company.com"
    When I click the "Edit" button for "test@company.com"
    And I clear the email field
    And I click the "Update User" button
    Then I should see an error message "Email is required"
    And the changes should not be saved

  @smoke @critical
  Scenario: Deactivate user account
    Given I have an existing user "inactive@company.com"
    When I click the "Deactivate" button for "inactive@company.com"
    And I confirm the deactivation in the confirmation dialog
    Then I should see a success message "User deactivated successfully"
    And the user status should change to "Inactive"
    And the user should not be able to log in

  @regression
  Scenario: Reactivate user account
    Given I have a deactivated user "reactivate@company.com"
    When I click the "Reactivate" button for "reactivate@company.com"
    And I confirm the reactivation
    Then I should see a success message "User reactivated successfully"
    And the user status should change to "Active"
    And the user should be able to log in again

  @smoke @critical
  Scenario: Delete user account
    Given I have an existing user "delete@company.com"
    When I click the "Delete" button for "delete@company.com"
    And I confirm the deletion in the confirmation dialog
    Then I should see a success message "User deleted successfully"
    And the user should no longer appear in the user list
    And all user data should be permanently removed

  @regression
  Scenario: Cancel user deletion
    Given I have an existing user "cancel@company.com"
    When I click the "Delete" button for "cancel@company.com"
    And I click "Cancel" in the confirmation dialog
    Then the user should remain in the user list
    And I should remain on the user management page

  @smoke @critical
  Scenario: Assign specific permissions to user
    Given I have an existing user "permissions@company.com"
    When I click the "Edit Permissions" button for "permissions@company.com"
    And I enable "Bot Management" permission
    And I enable "Analytics View" permission
    And I disable "User Management" permission
    And I click the "Save Permissions" button
    Then I should see a success message "Permissions updated successfully"
    And the user should have the specified permissions
    And the user should not have access to user management

  @regression
  Scenario: Bulk user operations
    Given I have multiple users selected
    When I select multiple users using checkboxes
    And I click the "Bulk Activate" button
    Then I should see a success message "Selected users activated successfully"
    And all selected users should have "Active" status

  @regression
  Scenario: Search and filter users
    Given I have multiple users in the system
    When I enter "john" in the search field
    And I click the "Search" button
    Then I should see only users with "john" in their name or email
    And the search results should be displayed correctly

  @regression
  Scenario: Filter users by role
    Given I have users with different roles
    When I select "Bot Manager" from the role filter
    And I click the "Apply Filter" button
    Then I should see only users with "Bot Manager" role
    And the filter should be applied correctly

  @regression
  Scenario: Export user list
    Given I am on the user management page
    When I click the "Export Users" button
    And I select "CSV" format
    Then a CSV file should be downloaded
    And the file should contain all user information

  @regression
  Scenario: Import users from file
    Given I have a valid user import file
    When I click the "Import Users" button
    And I select the import file "users-import.csv"
    And I click the "Import" button
    Then I should see a success message "Users imported successfully"
    And the imported users should appear in the user list

  @regression
  Scenario: Reset user password
    Given I have an existing user "reset@company.com"
    When I click the "Reset Password" button for "reset@company.com"
    And I confirm the password reset
    Then I should see a success message "Password reset email sent"
    And the user should receive a password reset email
    And the user should be able to set a new password

  @regression
  Scenario: View user activity logs
    Given I have an existing user "activity@company.com"
    When I click the "View Activity" button for "activity@company.com"
    Then I should see the user's login history
    And I should see the user's recent actions
    And I should see the user's session information
    And I should see the user's permission changes

  @regression
  Scenario: Set up user access restrictions
    Given I have an existing user "restricted@company.com"
    When I click the "Access Restrictions" button for "restricted@company.com"
    And I set the allowed IP addresses "192.168.1.0/24"
    And I set the allowed time range "9:00 AM - 5:00 PM"
    And I click the "Save Restrictions" button
    Then I should see a success message "Access restrictions updated"
    And the user should only be able to access from specified IPs
    And the user should only be able to access during specified hours

  @regression
  Scenario: Role-based access control test
    Given I am logged in as a "Bot Manager" user
    When I try to access the user management page
    Then I should see an "Access Denied" message
    And I should be redirected to the dashboard
    And I should not see the user management menu item

  @regression
  Scenario: Session timeout handling
    Given I am logged in as a user
    When I remain inactive for 30 minutes
    Then I should be automatically logged out
    And I should see a session timeout message
    And I should be redirected to the login page 