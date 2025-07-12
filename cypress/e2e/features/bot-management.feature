# AI Chatbot Admin Panel - Bot Management Functionality
# This feature file covers all chatbot management scenarios including CRUD operations and intent assignment

Feature: Bot Management
  As an admin user
  I want to manage chatbots in the admin panel
  So that I can create, edit, delete, and configure chatbots with intents

  Background:
    Given I am logged in as an admin user
    And I am on the bot management page

  @smoke @critical
  Scenario: Create a new chatbot with basic information
    Given I want to create a new chatbot
    When I click the "Create New Bot" button
    And I enter the bot name "Customer Support Bot"
    And I enter the bot description "AI-powered customer support chatbot"
    And I select the bot type "Customer Service"
    And I choose the language "English"
    And I click the "Save Bot" button
    Then I should see a success message "Bot created successfully"
    And the new bot should appear in the bot list
    And the bot status should be "Active"

  @regression
  Scenario: Create chatbot with all optional fields
    Given I want to create a new chatbot with all details
    When I click the "Create New Bot" button
    And I enter the bot name "Sales Assistant Bot"
    And I enter the bot description "AI sales assistant for lead qualification"
    And I select the bot type "Sales"
    And I choose the language "English"
    And I upload a bot avatar "bot-avatar.png"
    And I set the welcome message "Hello! I'm your sales assistant. How can I help you today?"
    And I enable the "Auto-response" feature
    And I set the response time to "5 seconds"
    And I click the "Save Bot" button
    Then I should see a success message "Bot created successfully"
    And the new bot should appear in the bot list with all configured settings

  @regression
  Scenario: Create chatbot with invalid data
    Given I want to create a new chatbot
    When I click the "Create New Bot" button
    And I leave the bot name field empty
    And I click the "Save Bot" button
    Then I should see an error message "Bot name is required"
    And the form should not be submitted

  @smoke @critical
  Scenario: Edit existing chatbot
    Given I have an existing chatbot "Customer Support Bot"
    When I click the "Edit" button for "Customer Support Bot"
    And I change the bot name to "Enhanced Customer Support Bot"
    And I update the description to "Advanced AI-powered customer support with multi-language support"
    And I change the bot type to "Premium Customer Service"
    And I click the "Update Bot" button
    Then I should see a success message "Bot updated successfully"
    And the bot details should reflect the changes

  @regression
  Scenario: Edit chatbot with invalid data
    Given I have an existing chatbot "Test Bot"
    When I click the "Edit" button for "Test Bot"
    And I clear the bot name field
    And I click the "Update Bot" button
    Then I should see an error message "Bot name is required"
    And the changes should not be saved

  @smoke @critical
  Scenario: Delete chatbot
    Given I have an existing chatbot "Test Bot for Deletion"
    When I click the "Delete" button for "Test Bot for Deletion"
    And I confirm the deletion in the confirmation dialog
    Then I should see a success message "Bot deleted successfully"
    And the bot should no longer appear in the bot list

  @regression
  Scenario: Cancel chatbot deletion
    Given I have an existing chatbot "Test Bot for Deletion"
    When I click the "Delete" button for "Test Bot for Deletion"
    And I click "Cancel" in the confirmation dialog
    Then the bot should remain in the bot list
    And I should remain on the bot management page

  @smoke @critical
  Scenario: Assign intents to chatbot
    Given I have an existing chatbot "Customer Support Bot"
    And I am on the intent assignment page
    When I select the intent "Greeting"
    And I select the intent "Product Inquiry"
    And I select the intent "Technical Support"
    And I click the "Assign Intents" button
    Then I should see a success message "Intents assigned successfully"
    And the assigned intents should be visible in the bot's intent list

  @regression
  Scenario: Remove intents from chatbot
    Given I have a chatbot with assigned intents
    When I deselect the intent "Greeting"
    And I click the "Update Intents" button
    Then I should see a success message "Intents updated successfully"
    And the "Greeting" intent should be removed from the bot's intent list

  @regression
  Scenario: Search and filter bots
    Given I have multiple chatbots in the system
    When I enter "Customer" in the search field
    And I click the "Search" button
    Then I should see only bots with "Customer" in their name
    And the search results should be displayed correctly

  @regression
  Scenario: Filter bots by type
    Given I have bots of different types
    When I select "Customer Service" from the type filter
    And I click the "Apply Filter" button
    Then I should see only customer service bots
    And the filter should be applied correctly

  @regression
  Scenario: Bulk operations on bots
    Given I have multiple chatbots selected
    When I select multiple bots using checkboxes
    And I click the "Bulk Activate" button
    Then I should see a success message "Selected bots activated successfully"
    And all selected bots should have "Active" status

  @regression
  Scenario: Export bot list
    Given I am on the bot management page
    When I click the "Export" button
    And I select "CSV" format
    Then a CSV file should be downloaded
    And the file should contain all bot information

  @regression
  Scenario: Import bots from file
    Given I have a valid bot import file
    When I click the "Import Bots" button
    And I select the import file "bots-import.csv"
    And I click the "Import" button
    Then I should see a success message "Bots imported successfully"
    And the imported bots should appear in the bot list 