/**
 * DashboardPage - Page Object Model for Dashboard functionality
 * This class encapsulates all dashboard page elements and actions
 * Following the Page Object Model design pattern for maintainability
 */

const { By, until } = require('selenium-webdriver');

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
        
        // Page URL
        this.url = process.env.BASE_URL + '/dashboard' || 'https://admin.aichatbot.com/dashboard';
        
        // Element selectors - centralized for easy maintenance
        this.selectors = {
            // Navigation elements
            mainNavigation: By.className('main-navigation'),
            dashboardLink: By.linkText('Dashboard'),
            botManagementLink: By.linkText('Bot Management'),
            analyticsLink: By.linkText('Analytics'),
            userManagementLink: By.linkText('User Management'),
            settingsLink: By.linkText('Settings'),
            logoutButton: By.id('logout-btn'),
            
            // Dashboard content
            welcomeMessage: By.className('welcome-message'),
            pageTitle: By.tagName('h1'),
            
            // Dashboard widgets
            totalBotsWidget: By.id('total-bots-widget'),
            activeBotsWidget: By.id('active-bots-widget'),
            totalConversationsWidget: By.id('total-conversations-widget'),
            averageResponseTimeWidget: By.id('avg-response-time-widget'),
            satisfactionScoreWidget: By.id('satisfaction-score-widget'),
            
            // Quick actions
            createBotButton: By.id('create-bot-btn'),
            viewAnalyticsButton: By.id('view-analytics-btn'),
            manageUsersButton: By.id('manage-users-btn'),
            
            // Recent activity
            recentActivitySection: By.className('recent-activity'),
            activityItems: By.className('activity-item'),
            
            // Notifications
            notificationBell: By.className('notification-bell'),
            notificationDropdown: By.className('notification-dropdown'),
            notificationItems: By.className('notification-item'),
            
            // User profile
            userProfileDropdown: By.className('user-profile-dropdown'),
            userProfileMenu: By.className('user-profile-menu'),
            profileSettingsLink: By.linkText('Profile Settings'),
            
            // Search functionality
            searchBox: By.id('search-box'),
            searchButton: By.id('search-btn'),
            searchResults: By.className('search-results')
        };
    }

    /**
     * Navigate to the dashboard page
     * @returns {Promise<void>}
     */
    async navigateTo() {
        try {
            await this.driver.get(this.url);
            await this.waitForPageToLoad();
            console.log('Successfully navigated to dashboard page');
        } catch (error) {
            console.error('Failed to navigate to dashboard page:', error);
            throw error;
        }
    }

    /**
     * Wait for the dashboard page to fully load
     * @returns {Promise<void>}
     */
    async waitForPageToLoad() {
        try {
            await this.driver.wait(until.elementLocated(this.selectors.mainNavigation), 10000);
            await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.selectors.mainNavigation)), 5000);
        } catch (error) {
            console.error('Dashboard page failed to load:', error);
            throw error;
        }
    }

    /**
     * Check if dashboard is loaded successfully
     * @returns {Promise<boolean>}
     */
    async isDashboardLoaded() {
        try {
            const nav = await this.driver.findElement(this.selectors.mainNavigation);
            return await nav.isDisplayed();
        } catch (error) {
            console.error('Error checking if dashboard is loaded:', error);
            return false;
        }
    }

    /**
     * Get the welcome message text
     * @returns {Promise<string>}
     */
    async getWelcomeMessage() {
        try {
            const welcomeElement = await this.driver.findElement(this.selectors.welcomeMessage);
            return await welcomeElement.getText();
        } catch (error) {
            console.error('Failed to get welcome message:', error);
            return '';
        }
    }

    /**
     * Check if main navigation menu is visible
     * @returns {Promise<boolean>}
     */
    async isNavigationMenuVisible() {
        try {
            const navMenu = await this.driver.findElement(this.selectors.mainNavigation);
            return await navMenu.isDisplayed();
        } catch (error) {
            console.error('Failed to check navigation menu visibility:', error);
            return false;
        }
    }

    /**
     * Click on Bot Management link
     * @returns {Promise<void>}
     */
    async clickBotManagementLink() {
        try {
            const botManagementLink = await this.driver.findElement(this.selectors.botManagementLink);
            await botManagementLink.click();
            console.log('Bot Management link clicked');
        } catch (error) {
            console.error('Failed to click Bot Management link:', error);
            throw error;
        }
    }

    /**
     * Click on Analytics link
     * @returns {Promise<void>}
     */
    async clickAnalyticsLink() {
        try {
            const analyticsLink = await this.driver.findElement(this.selectors.analyticsLink);
            await analyticsLink.click();
            console.log('Analytics link clicked');
        } catch (error) {
            console.error('Failed to click Analytics link:', error);
            throw error;
        }
    }

    /**
     * Click on User Management link
     * @returns {Promise<void>}
     */
    async clickUserManagementLink() {
        try {
            const userManagementLink = await this.driver.findElement(this.selectors.userManagementLink);
            await userManagementLink.click();
            console.log('User Management link clicked');
        } catch (error) {
            console.error('Failed to click User Management link:', error);
            throw error;
        }
    }

    /**
     * Click on Settings link
     * @returns {Promise<void>}
     */
    async clickSettingsLink() {
        try {
            const settingsLink = await this.driver.findElement(this.selectors.settingsLink);
            await settingsLink.click();
            console.log('Settings link clicked');
        } catch (error) {
            console.error('Failed to click Settings link:', error);
            throw error;
        }
    }

    /**
     * Click logout button
     * @returns {Promise<void>}
     */
    async clickLogoutButton() {
        try {
            const logoutButton = await this.driver.findElement(this.selectors.logoutButton);
            await logoutButton.click();
            console.log('Logout button clicked');
        } catch (error) {
            console.error('Failed to click logout button:', error);
            throw error;
        }
    }

    /**
     * Get total number of bots from widget
     * @returns {Promise<string>}
     */
    async getTotalBotsCount() {
        try {
            const totalBotsWidget = await this.driver.findElement(this.selectors.totalBotsWidget);
            const countElement = await totalBotsWidget.findElement(By.className('count'));
            return await countElement.getText();
        } catch (error) {
            console.error('Failed to get total bots count:', error);
            return '0';
        }
    }

    /**
     * Get active bots count from widget
     * @returns {Promise<string>}
     */
    async getActiveBotsCount() {
        try {
            const activeBotsWidget = await this.driver.findElement(this.selectors.activeBotsWidget);
            const countElement = await activeBotsWidget.findElement(By.className('count'));
            return await countElement.getText();
        } catch (error) {
            console.error('Failed to get active bots count:', error);
            return '0';
        }
    }

    /**
     * Get total conversations count from widget
     * @returns {Promise<string>}
     */
    async getTotalConversationsCount() {
        try {
            const totalConversationsWidget = await this.driver.findElement(this.selectors.totalConversationsWidget);
            const countElement = await totalConversationsWidget.findElement(By.className('count'));
            return await countElement.getText();
        } catch (error) {
            console.error('Failed to get total conversations count:', error);
            return '0';
        }
    }

    /**
     * Get average response time from widget
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
     * Get satisfaction score from widget
     * @returns {Promise<string>}
     */
    async getSatisfactionScore() {
        try {
            const satisfactionScoreWidget = await this.driver.findElement(this.selectors.satisfactionScoreWidget);
            const scoreElement = await satisfactionScoreWidget.findElement(By.className('score'));
            return await scoreElement.getText();
        } catch (error) {
            console.error('Failed to get satisfaction score:', error);
            return '0';
        }
    }

    /**
     * Click Create Bot button
     * @returns {Promise<void>}
     */
    async clickCreateBotButton() {
        try {
            const createBotButton = await this.driver.findElement(this.selectors.createBotButton);
            await createBotButton.click();
            console.log('Create Bot button clicked');
        } catch (error) {
            console.error('Failed to click Create Bot button:', error);
            throw error;
        }
    }

    /**
     * Click View Analytics button
     * @returns {Promise<void>}
     */
    async clickViewAnalyticsButton() {
        try {
            const viewAnalyticsButton = await this.driver.findElement(this.selectors.viewAnalyticsButton);
            await viewAnalyticsButton.click();
            console.log('View Analytics button clicked');
        } catch (error) {
            console.error('Failed to click View Analytics button:', error);
            throw error;
        }
    }

    /**
     * Click Manage Users button
     * @returns {Promise<void>}
     */
    async clickManageUsersButton() {
        try {
            const manageUsersButton = await this.driver.findElement(this.selectors.manageUsersButton);
            await manageUsersButton.click();
            console.log('Manage Users button clicked');
        } catch (error) {
            console.error('Failed to click Manage Users button:', error);
            throw error;
        }
    }

    /**
     * Get recent activity items
     * @returns {Promise<Array>}
     */
    async getRecentActivityItems() {
        try {
            const activityItems = await this.driver.findElements(this.selectors.activityItems);
            const activities = [];
            
            for (const item of activityItems) {
                const text = await item.getText();
                activities.push(text);
            }
            
            return activities;
        } catch (error) {
            console.error('Failed to get recent activity items:', error);
            return [];
        }
    }

    /**
     * Click notification bell
     * @returns {Promise<void>}
     */
    async clickNotificationBell() {
        try {
            const notificationBell = await this.driver.findElement(this.selectors.notificationBell);
            await notificationBell.click();
            console.log('Notification bell clicked');
        } catch (error) {
            console.error('Failed to click notification bell:', error);
            throw error;
        }
    }

    /**
     * Get notification items
     * @returns {Promise<Array>}
     */
    async getNotificationItems() {
        try {
            const notificationItems = await this.driver.findElements(this.selectors.notificationItems);
            const notifications = [];
            
            for (const item of notificationItems) {
                const text = await item.getText();
                notifications.push(text);
            }
            
            return notifications;
        } catch (error) {
            console.error('Failed to get notification items:', error);
            return [];
        }
    }

    /**
     * Click user profile dropdown
     * @returns {Promise<void>}
     */
    async clickUserProfileDropdown() {
        try {
            const userProfileDropdown = await this.driver.findElement(this.selectors.userProfileDropdown);
            await userProfileDropdown.click();
            console.log('User profile dropdown clicked');
        } catch (error) {
            console.error('Failed to click user profile dropdown:', error);
            throw error;
        }
    }

    /**
     * Click Profile Settings link
     * @returns {Promise<void>}
     */
    async clickProfileSettingsLink() {
        try {
            const profileSettingsLink = await this.driver.findElement(this.selectors.profileSettingsLink);
            await profileSettingsLink.click();
            console.log('Profile Settings link clicked');
        } catch (error) {
            console.error('Failed to click Profile Settings link:', error);
            throw error;
        }
    }

    /**
     * Search for content using search box
     * @param {string} searchTerm - The search term
     * @returns {Promise<void>}
     */
    async searchContent(searchTerm) {
        try {
            const searchBox = await this.driver.findElement(this.selectors.searchBox);
            await searchBox.clear();
            await searchBox.sendKeys(searchTerm);
            
            const searchButton = await this.driver.findElement(this.selectors.searchButton);
            await searchButton.click();
            
            console.log(`Searched for: ${searchTerm}`);
        } catch (error) {
            console.error('Failed to search content:', error);
            throw error;
        }
    }

    /**
     * Get search results
     * @returns {Promise<Array>}
     */
    async getSearchResults() {
        try {
            const searchResults = await this.driver.findElements(this.selectors.searchResults);
            const results = [];
            
            for (const result of searchResults) {
                const text = await result.getText();
                results.push(text);
            }
            
            return results;
        } catch (error) {
            console.error('Failed to get search results:', error);
            return [];
        }
    }

    /**
     * Check if user has access to specific menu item
     * @param {string} menuItem - The menu item to check
     * @returns {Promise<boolean>}
     */
    async hasAccessToMenuItem(menuItem) {
        try {
            const menuSelector = this.getMenuSelector(menuItem);
            const menuElement = await this.driver.findElement(menuSelector);
            return await menuElement.isDisplayed();
        } catch (error) {
            console.error(`Failed to check access to menu item ${menuItem}:`, error);
            return false;
        }
    }

    /**
     * Get menu selector based on menu item name
     * @param {string} menuItem - The menu item name
     * @returns {By} The selector for the menu item
     */
    getMenuSelector(menuItem) {
        const menuSelectors = {
            'Dashboard': this.selectors.dashboardLink,
            'Bot Management': this.selectors.botManagementLink,
            'Analytics': this.selectors.analyticsLink,
            'User Management': this.selectors.userManagementLink,
            'Settings': this.selectors.settingsLink
        };
        
        return menuSelectors[menuItem] || By.linkText(menuItem);
    }

    /**
     * Wait for dashboard widgets to load
     * @returns {Promise<void>}
     */
    async waitForWidgetsToLoad() {
        try {
            await this.driver.wait(until.elementLocated(this.selectors.totalBotsWidget), 10000);
            await this.driver.wait(until.elementLocated(this.selectors.activeBotsWidget), 10000);
            await this.driver.wait(until.elementLocated(this.selectors.totalConversationsWidget), 10000);
            console.log('Dashboard widgets loaded successfully');
        } catch (error) {
            console.error('Failed to wait for widgets to load:', error);
            throw error;
        }
    }
}

module.exports = DashboardPage; 