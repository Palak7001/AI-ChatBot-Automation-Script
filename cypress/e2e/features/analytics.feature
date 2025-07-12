# AI Chatbot Admin Panel - Analytics Functionality
# This feature file covers all analytics and reporting scenarios for the admin panel

Feature: Analytics and Reporting
  As an admin user
  I want to view analytics and generate reports
  So that I can monitor chatbot performance and make data-driven decisions

  Background:
    Given I am logged in as an admin user
    And I am on the analytics dashboard

  @smoke @critical
  Scenario: View dashboard overview
    Given I am on the analytics dashboard
    When the dashboard loads
    Then I should see the total number of active bots
    And I should see the total number of conversations today
    And I should see the average response time
    And I should see the customer satisfaction score
    And I should see the conversation success rate

  @regression
  Scenario: View analytics for specific bot
    Given I have an existing chatbot "Customer Support Bot"
    When I select "Customer Support Bot" from the bot dropdown
    And I click the "View Analytics" button
    Then I should see the bot's conversation statistics
    And I should see the bot's performance metrics
    And I should see the bot's intent usage data
    And I should see the bot's response accuracy

  @smoke @critical
  Scenario: Filter analytics by date range
    Given I am on the analytics page
    When I select the date range "Last 7 days"
    And I click the "Apply Filter" button
    Then I should see analytics data for the selected date range
    And the charts should update with the filtered data
    And the metrics should reflect the selected period

  @regression
  Scenario: Filter analytics by custom date range
    Given I am on the analytics page
    When I select a custom start date "2024-01-01"
    And I select a custom end date "2024-01-31"
    And I click the "Apply Filter" button
    Then I should see analytics data for January 2024
    And the date range should be displayed correctly
    And all metrics should be calculated for the selected period

  @regression
  Scenario: View conversation analytics
    Given I am on the conversation analytics page
    When the page loads
    Then I should see the total conversation count
    And I should see the average conversation duration
    And I should see the peak conversation hours
    And I should see the conversation flow chart
    And I should see the most common user queries

  @smoke @critical
  Scenario: Export analytics report
    Given I am on the analytics page
    When I click the "Export Report" button
    And I select "PDF" format
    And I click the "Download" button
    Then a PDF report should be downloaded
    And the report should contain all analytics data
    And the report should be properly formatted

  @regression
  Scenario: Export analytics data in different formats
    Given I am on the analytics page
    When I click the "Export Data" button
    And I select "CSV" format
    And I click the "Download" button
    Then a CSV file should be downloaded
    And the file should contain all analytics data
    And the data should be properly structured

  @regression
  Scenario: View intent performance analytics
    Given I am on the intent analytics page
    When the page loads
    Then I should see the most used intents
    And I should see the intent success rates
    And I should see the intent response times
    And I should see the intent accuracy scores
    And I should see the intent usage trends

  @regression
  Scenario: View user satisfaction analytics
    Given I am on the satisfaction analytics page
    When the page loads
    Then I should see the overall satisfaction score
    And I should see the satisfaction trends over time
    And I should see the satisfaction by bot type
    And I should see the satisfaction by conversation topic
    And I should see the user feedback comments

  @regression
  Scenario: View real-time analytics
    Given I am on the real-time analytics page
    When the page loads
    Then I should see live conversation count
    And I should see active users count
    And I should see current response times
    And I should see live conversation flow
    And the data should update automatically

  @regression
  Scenario: Compare analytics between bots
    Given I have multiple chatbots
    When I select multiple bots for comparison
    And I click the "Compare" button
    Then I should see a comparison chart
    And I should see performance metrics for each bot
    And I should see the differences highlighted
    And I should see the comparison summary

  @regression
  Scenario: View analytics with different time zones
    Given I am on the analytics page
    When I change the timezone to "UTC"
    And I click the "Apply" button
    Then all time-based data should be displayed in UTC
    And the charts should update with the new timezone
    And the date ranges should be adjusted accordingly

  @regression
  Scenario: Share analytics report
    Given I am on the analytics page
    When I click the "Share Report" button
    And I enter the email address "manager@company.com"
    And I click the "Send" button
    Then I should see a success message "Report shared successfully"
    And the report should be sent to the specified email

  @regression
  Scenario: Set up analytics alerts
    Given I am on the analytics alerts page
    When I create a new alert for "Low satisfaction score"
    And I set the threshold to "3.0"
    And I set the notification email "admin@company.com"
    And I click the "Save Alert" button
    Then I should see a success message "Alert created successfully"
    And the alert should be listed in the alerts section

  @regression
  Scenario: View analytics on mobile device
    Given I am accessing analytics on a mobile device
    When I load the analytics page
    Then the page should be responsive
    And all charts should be mobile-friendly
    And the navigation should be touch-friendly
    And the data should be properly formatted for mobile view 