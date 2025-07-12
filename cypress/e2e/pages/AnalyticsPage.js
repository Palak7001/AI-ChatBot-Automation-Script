/**
 * AnalyticsPage - Page Object Model for Analytics functionality
 * This class encapsulates all analytics page elements and actions
 * Following the Page Object Model design pattern for maintainability
 */

const { By, until } = require('selenium-webdriver');

class AnalyticsPage {
    constructor(driver) {
        this.driver = driver;
        
        // Page URL
        this.url = process.env.BASE_URL + '/analytics' || 'https://admin.aichatbot.com/analytics';
        
        // Element selectors - centralized for easy maintenance
        this.selectors = {
            // Page elements
            pageTitle: By.tagName('h1'),
            analyticsDashboard: By.className('analytics-dashboard'),
            
            // Dashboard widgets
            totalBotsWidget: By.id('total-bots-widget'),
            totalConversationsWidget: By.id('total-conversations-widget'),
            averageResponseTimeWidget: By.id('avg-response-time-widget'),
            satisfactionScoreWidget: By.id('satisfaction-score-widget'),
            conversationSuccessRateWidget: By.id('conversation-success-rate-widget'),
            
            // Bot selection
            botDropdown: By.id('bot-dropdown'),
            viewAnalyticsButton: By.id('view-analytics-btn'),
            
            // Date range filters
            dateRangeDropdown: By.id('date-range-dropdown'),
            customStartDate: By.id('custom-start-date'),
            customEndDate: By.id('custom-end-date'),
            applyFilterButton: By.id('apply-filter-btn'),
            
            // Analytics sections
            conversationAnalyticsSection: By.className('conversation-analytics'),
            intentAnalyticsSection: By.className('intent-analytics'),
            satisfactionAnalyticsSection: By.className('satisfaction-analytics'),
            realTimeAnalyticsSection: By.className('real-time-analytics'),
            
            // Charts and graphs
            conversationFlowChart: By.className('conversation-flow-chart'),
            intentUsageChart: By.className('intent-usage-chart'),
            satisfactionTrendChart: By.className('satisfaction-trend-chart'),
            responseTimeChart: By.className('response-time-chart'),
            
            // Export functionality
            exportReportButton: By.id('export-report-btn'),
            exportDataButton: By.id('export-data-btn'),
            exportFormatDropdown: By.id('export-format-dropdown'),
            downloadButton: By.id('download-btn'),
            
            // Share functionality
            shareReportButton: By.id('share-report-btn'),
            shareEmailField: By.id('share-email-field'),
            sendButton: By.id('send-btn'),
            
            // Alerts
            alertsSection: By.className('alerts-section'),
            createAlertButton: By.id('create-alert-btn'),
            alertNameField: By.id('alert-name-field'),
            alertThresholdField: By.id('alert-threshold-field'),
            alertEmailField: By.id('alert-email-field'),
            saveAlertButton: By.id('save-alert-btn'),
            
            // Comparison functionality
            compareBotsButton: By.id('compare-bots-btn'),
            botSelectionCheckboxes: By.className('bot-selection-checkbox'),
            compareButton: By.id('compare-btn'),
            comparisonChart: By.className('comparison-chart'),
            
            // Timezone settings
            timezoneDropdown: By.id('timezone-dropdown'),
            timezoneApplyButton: By.id('timezone-apply-btn'),
            
            // Mobile responsiveness
            mobileViewToggle: By.id('mobile-view-toggle'),
            
            // Messages
            successMessage: By.className('success-message'),
            errorMessage: By.className('error-message'),
            
            // Metrics
            conversationCount: By.className('conversation-count'),
            averageDuration: By.className('average-duration'),
            peakHours: By.className('peak-hours'),
            commonQueries: By.className('common-queries'),
            
            // Real-time metrics
            liveConversationCount: By.className('live-conversation-count'),
            activeUsersCount: By.className('active-users-count'),
            currentResponseTime: By.className('current-response-time'),
            liveConversationFlow: By.className('live-conversation-flow')
        };
    }

    /**
     * Navigate to the analytics page
     * @returns {Promise<void>}
     */
    async navigateTo() {
        try {
            await this.driver.get(this.url);
            await this.waitForPageToLoad();
            console.log('Successfully navigated to analytics page');
        } catch (error) {
            console.error('Failed to navigate to analytics page:', error);
            throw error;
        }
    }

    /**
     * Wait for the analytics page to fully load
     * @returns {Promise<void>}
     */
    async waitForPageToLoad() {
        try {
            await this.driver.wait(until.elementLocated(this.selectors.analyticsDashboard), 10000);
            await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.selectors.analyticsDashboard)), 5000);
        } catch (error) {
            console.error('Analytics page failed to load:', error);
            throw error;
        }
    }

    /**
     * Wait for dashboard widgets to load
     * @returns {Promise<void>}
     */
    async waitForWidgetsToLoad() {
        try {
            await this.driver.wait(until.elementLocated(this.selectors.totalBotsWidget), 10000);
            await this.driver.wait(until.elementLocated(this.selectors.totalConversationsWidget), 10000);
            await this.driver.wait(until.elementLocated(this.selectors.averageResponseTimeWidget), 10000);
            console.log('Analytics widgets loaded successfully');
        } catch (error) {
            console.error('Failed to wait for widgets to load:', error);
            throw error;
        }
    }

    /**
     * Get total number of active bots
     * @returns {Promise<string>}
     */
    async getTotalActiveBots() {
        try {
            const totalBotsWidget = await this.driver.findElement(this.selectors.totalBotsWidget);
            const countElement = await totalBotsWidget.findElement(By.className('count'));
            return await countElement.getText();
        } catch (error) {
            console.error('Failed to get total active bots:', error);
            return '0';
        }
    }

    /**
     * Get total number of conversations today
     * @returns {Promise<string>}
     */
    async getTotalConversationsToday() {
        try {
            const totalConversationsWidget = await this.driver.findElement(this.selectors.totalConversationsWidget);
            const countElement = await totalConversationsWidget.findElement(By.className('count'));
            return await countElement.getText();
        } catch (error) {
            console.error('Failed to get total conversations today:', error);
            return '0';
        }
    }

    /**
     * Get average response time
     * @returns {Promise<string>}
     */
    async getAverageResponseTime() {
        try {
            const avgResponseTimeWidget = await this.driver.findElement(this.selectors.averageResponseTimeWidget);
            const timeElement = await avgResponseTimeWidget.findElement(By.className('time'));
            return await timeElement.getText();
        } catch (error) {
            console.error('Failed to get average response time:', error);
            return '0s';
        }
    }

    /**
     * Get customer satisfaction score
     * @returns {Promise<string>}
     */
    async getCustomerSatisfactionScore() {
        try {
            const satisfactionScoreWidget = await this.driver.findElement(this.selectors.satisfactionScoreWidget);
            const scoreElement = await satisfactionScoreWidget.findElement(By.className('score'));
            return await scoreElement.getText();
        } catch (error) {
            console.error('Failed to get customer satisfaction score:', error);
            return '0';
        }
    }

    /**
     * Get conversation success rate
     * @returns {Promise<string>}
     */
    async getConversationSuccessRate() {
        try {
            const successRateWidget = await this.driver.findElement(this.selectors.conversationSuccessRateWidget);
            const rateElement = await successRateWidget.findElement(By.className('rate'));
            return await rateElement.getText();
        } catch (error) {
            console.error('Failed to get conversation success rate:', error);
            return '0%';
        }
    }

    /**
     * Select a specific bot for analytics
     * @param {string} botName - The name of the bot to select
     * @returns {Promise<void>}
     */
    async selectBotForAnalytics(botName) {
        try {
            const botDropdown = await this.driver.findElement(this.selectors.botDropdown);
            await botDropdown.click();
            
            const option = await this.driver.findElement(By.xpath(`//option[text()='${botName}']`));
            await option.click();
            
            const viewAnalyticsButton = await this.driver.findElement(this.selectors.viewAnalyticsButton);
            await viewAnalyticsButton.click();
            console.log(`Selected bot for analytics: ${botName}`);
        } catch (error) {
            console.error('Failed to select bot for analytics:', error);
            throw error;
        }
    }

    /**
     * Select date range for analytics
     * @param {string} dateRange - The date range to select
     * @returns {Promise<void>}
     */
    async selectDateRange(dateRange) {
        try {
            const dateRangeDropdown = await this.driver.findElement(this.selectors.dateRangeDropdown);
            await dateRangeDropdown.click();
            
            const option = await this.driver.findElement(By.xpath(`//option[text()='${dateRange}']`));
            await option.click();
            
            const applyFilterButton = await this.driver.findElement(this.selectors.applyFilterButton);
            await applyFilterButton.click();
            console.log(`Selected date range: ${dateRange}`);
        } catch (error) {
            console.error('Failed to select date range:', error);
            throw error;
        }
    }

    /**
     * Set custom date range
     * @param {string} startDate - The start date (YYYY-MM-DD)
     * @param {string} endDate - The end date (YYYY-MM-DD)
     * @returns {Promise<void>}
     */
    async setCustomDateRange(startDate, endDate) {
        try {
            const customStartDate = await this.driver.findElement(this.selectors.customStartDate);
            await customStartDate.clear();
            await customStartDate.sendKeys(startDate);
            
            const customEndDate = await this.driver.findElement(this.selectors.customEndDate);
            await customEndDate.clear();
            await customEndDate.sendKeys(endDate);
            
            const applyFilterButton = await this.driver.findElement(this.selectors.applyFilterButton);
            await applyFilterButton.click();
            console.log(`Set custom date range: ${startDate} to ${endDate}`);
        } catch (error) {
            console.error('Failed to set custom date range:', error);
            throw error;
        }
    }

    /**
     * Navigate to conversation analytics
     * @returns {Promise<void>}
     */
    async navigateToConversationAnalytics() {
        try {
            const conversationAnalyticsSection = await this.driver.findElement(this.selectors.conversationAnalyticsSection);
            await conversationAnalyticsSection.click();
            console.log('Navigated to conversation analytics');
        } catch (error) {
            console.error('Failed to navigate to conversation analytics:', error);
            throw error;
        }
    }

    /**
     * Get conversation analytics data
     * @returns {Promise<Object>}
     */
    async getConversationAnalyticsData() {
        try {
            const data = {
                totalConversationCount: await this.getElementText(this.selectors.conversationCount),
                averageDuration: await this.getElementText(this.selectors.averageDuration),
                peakHours: await this.getElementText(this.selectors.peakHours),
                commonQueries: await this.getElementText(this.selectors.commonQueries)
            };
            console.log('Retrieved conversation analytics data');
            return data;
        } catch (error) {
            console.error('Failed to get conversation analytics data:', error);
            throw error;
        }
    }

    /**
     * Export analytics report
     * @param {string} format - The export format (PDF, CSV, etc.)
     * @returns {Promise<void>}
     */
    async exportAnalyticsReport(format = 'PDF') {
        try {
            const exportReportButton = await this.driver.findElement(this.selectors.exportReportButton);
            await exportReportButton.click();
            
            const exportFormatDropdown = await this.driver.findElement(this.selectors.exportFormatDropdown);
            await exportFormatDropdown.click();
            
            const formatOption = await this.driver.findElement(By.xpath(`//option[text()='${format}']`));
            await formatOption.click();
            
            const downloadButton = await this.driver.findElement(this.selectors.downloadButton);
            await downloadButton.click();
            console.log(`Exported analytics report in ${format} format`);
        } catch (error) {
            console.error('Failed to export analytics report:', error);
            throw error;
        }
    }

    /**
     * Export analytics data
     * @param {string} format - The export format (CSV, JSON, etc.)
     * @returns {Promise<void>}
     */
    async exportAnalyticsData(format = 'CSV') {
        try {
            const exportDataButton = await this.driver.findElement(this.selectors.exportDataButton);
            await exportDataButton.click();
            
            const exportFormatDropdown = await this.driver.findElement(this.selectors.exportFormatDropdown);
            await exportFormatDropdown.click();
            
            const formatOption = await this.driver.findElement(By.xpath(`//option[text()='${format}']`));
            await formatOption.click();
            
            const downloadButton = await this.driver.findElement(this.selectors.downloadButton);
            await downloadButton.click();
            console.log(`Exported analytics data in ${format} format`);
        } catch (error) {
            console.error('Failed to export analytics data:', error);
            throw error;
        }
    }

    /**
     * Navigate to intent analytics
     * @returns {Promise<void>}
     */
    async navigateToIntentAnalytics() {
        try {
            const intentAnalyticsSection = await this.driver.findElement(this.selectors.intentAnalyticsSection);
            await intentAnalyticsSection.click();
            console.log('Navigated to intent analytics');
        } catch (error) {
            console.error('Failed to navigate to intent analytics:', error);
            throw error;
        }
    }

    /**
     * Navigate to satisfaction analytics
     * @returns {Promise<void>}
     */
    async navigateToSatisfactionAnalytics() {
        try {
            const satisfactionAnalyticsSection = await this.driver.findElement(this.selectors.satisfactionAnalyticsSection);
            await satisfactionAnalyticsSection.click();
            console.log('Navigated to satisfaction analytics');
        } catch (error) {
            console.error('Failed to navigate to satisfaction analytics:', error);
            throw error;
        }
    }

    /**
     * Navigate to real-time analytics
     * @returns {Promise<void>}
     */
    async navigateToRealTimeAnalytics() {
        try {
            const realTimeAnalyticsSection = await this.driver.findElement(this.selectors.realTimeAnalyticsSection);
            await realTimeAnalyticsSection.click();
            console.log('Navigated to real-time analytics');
        } catch (error) {
            console.error('Failed to navigate to real-time analytics:', error);
            throw error;
        }
    }

    /**
     * Get real-time analytics data
     * @returns {Promise<Object>}
     */
    async getRealTimeAnalyticsData() {
        try {
            const data = {
                liveConversationCount: await this.getElementText(this.selectors.liveConversationCount),
                activeUsersCount: await this.getElementText(this.selectors.activeUsersCount),
                currentResponseTime: await this.getElementText(this.selectors.currentResponseTime)
            };
            console.log('Retrieved real-time analytics data');
            return data;
        } catch (error) {
            console.error('Failed to get real-time analytics data:', error);
            throw error;
        }
    }

    /**
     * Select multiple bots for comparison
     * @param {Array<string>} botNames - Array of bot names to compare
     * @returns {Promise<void>}
     */
    async selectBotsForComparison(botNames) {
        try {
            const compareBotsButton = await this.driver.findElement(this.selectors.compareBotsButton);
            await compareBotsButton.click();
            
            for (const botName of botNames) {
                const checkbox = await this.driver.findElement(By.xpath(`//input[@value='${botName}']`));
                await checkbox.click();
            }
            
            const compareButton = await this.driver.findElement(this.selectors.compareButton);
            await compareButton.click();
            console.log(`Selected ${botNames.length} bots for comparison`);
        } catch (error) {
            console.error('Failed to select bots for comparison:', error);
            throw error;
        }
    }

    /**
     * Change timezone
     * @param {string} timezone - The timezone to set
     * @returns {Promise<void>}
     */
    async changeTimezone(timezone) {
        try {
            const timezoneDropdown = await this.driver.findElement(this.selectors.timezoneDropdown);
            await timezoneDropdown.click();
            
            const option = await this.driver.findElement(By.xpath(`//option[text()='${timezone}']`));
            await option.click();
            
            const timezoneApplyButton = await this.driver.findElement(this.selectors.timezoneApplyButton);
            await timezoneApplyButton.click();
            console.log(`Changed timezone to: ${timezone}`);
        } catch (error) {
            console.error('Failed to change timezone:', error);
            throw error;
        }
    }

    /**
     * Share analytics report
     * @param {string} emailAddress - The email address to share with
     * @returns {Promise<void>}
     */
    async shareAnalyticsReport(emailAddress) {
        try {
            const shareReportButton = await this.driver.findElement(this.selectors.shareReportButton);
            await shareReportButton.click();
            
            const shareEmailField = await this.driver.findElement(this.selectors.shareEmailField);
            await shareEmailField.clear();
            await shareEmailField.sendKeys(emailAddress);
            
            const sendButton = await this.driver.findElement(this.selectors.sendButton);
            await sendButton.click();
            console.log(`Shared analytics report with: ${emailAddress}`);
        } catch (error) {
            console.error('Failed to share analytics report:', error);
            throw error;
        }
    }

    /**
     * Create analytics alert
     * @param {Object} alertData - The alert configuration
     * @returns {Promise<void>}
     */
    async createAnalyticsAlert(alertData) {
        try {
            const createAlertButton = await this.driver.findElement(this.selectors.createAlertButton);
            await createAlertButton.click();
            
            const alertNameField = await this.driver.findElement(this.selectors.alertNameField);
            await alertNameField.clear();
            await alertNameField.sendKeys(alertData.name);
            
            const alertThresholdField = await this.driver.findElement(this.selectors.alertThresholdField);
            await alertThresholdField.clear();
            await alertThresholdField.sendKeys(alertData.threshold);
            
            const alertEmailField = await this.driver.findElement(this.selectors.alertEmailField);
            await alertEmailField.clear();
            await alertEmailField.sendKeys(alertData.email);
            
            const saveAlertButton = await this.driver.findElement(this.selectors.saveAlertButton);
            await saveAlertButton.click();
            console.log(`Created analytics alert: ${alertData.name}`);
        } catch (error) {
            console.error('Failed to create analytics alert:', error);
            throw error;
        }
    }

    /**
     * Toggle mobile view
     * @returns {Promise<void>}
     */
    async toggleMobileView() {
        try {
            const mobileViewToggle = await this.driver.findElement(this.selectors.mobileViewToggle);
            await mobileViewToggle.click();
            console.log('Toggled mobile view');
        } catch (error) {
            console.error('Failed to toggle mobile view:', error);
            throw error;
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

module.exports = AnalyticsPage; 