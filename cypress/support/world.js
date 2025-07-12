/**
 * World - Custom World Object
 * This file extends the default Cucumber world with custom properties and methods
 */

const { setWorldConstructor } = require('@cucumber/cucumber');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

/**
 * Custom World class that extends the default world
 * Provides additional properties and methods for test automation
 */
class CustomWorld {
    constructor() {
        // Initialize custom properties
        this.driver = null;
        this.testData = {};
        this.screenshots = [];
        this.currentScenario = null;
        this.startTime = null;
        
        // Initialize test data
        this.initializeTestData();
    }

    /**
     * Initialize test data from JSON files
     */
    initializeTestData() {
        try {
            const testDataPath = path.join(process.cwd(), 'test-data', 'testData.json');
            if (fs.existsSync(testDataPath)) {
                this.testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
                console.log('✅ Test data loaded successfully');
            } else {
                console.log('⚠️  Test data file not found, using default data');
                this.testData = this.getDefaultTestData();
            }
        } catch (error) {
            console.error('❌ Failed to load test data:', error);
            this.testData = this.getDefaultTestData();
        }
    }

    /**
     * Get default test data
     * @returns {Object} Default test data
     */
    getDefaultTestData() {
        return {
            users: {
                admin: {
                    username: 'admin@company.com',
                    password: 'SecurePass123!',
                    role: 'Administrator'
                },
                botManager: {
                    username: 'botmanager@company.com',
                    password: 'BotManager123!',
                    role: 'Bot Manager'
                },
                analyst: {
                    username: 'analyst@company.com',
                    password: 'Analyst123!',
                    role: 'Analytics Viewer'
                }
            },
            bots: {
                customerSupport: {
                    name: 'Customer Support Bot',
                    description: 'AI-powered customer support chatbot',
                    type: 'Customer Service',
                    language: 'English'
                },
                salesAssistant: {
                    name: 'Sales Assistant Bot',
                    description: 'AI sales assistant for lead qualification',
                    type: 'Sales',
                    language: 'English'
                }
            },
            intents: [
                'Greeting',
                'Product Inquiry',
                'Technical Support',
                'Order Status',
                'Payment Issues',
                'Returns and Refunds'
            ]
        };
    }

    /**
     * Get test data by key
     * @param {string} key - The key to retrieve
     * @returns {*} The test data value
     */
    getTestData(key) {
        const keys = key.split('.');
        let value = this.testData;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return null;
            }
        }
        
        return value;
    }

    /**
     * Set test data
     * @param {string} key - The key to set
     * @param {*} value - The value to set
     */
    setTestData(key, value) {
        const keys = key.split('.');
        let current = this.testData;
        
        for (let i = 0; i < keys.length - 1; i++) {
            if (!(keys[i] in current)) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = value;
    }

    /**
     * Wait for element to be visible
     * @param {By} selector - The element selector
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise<WebElement>} The element
     */
    async waitForElement(selector, timeout = 10000) {
        const { until } = require('selenium-webdriver');
        await this.driver.wait(until.elementLocated(selector), timeout);
        const element = await this.driver.findElement(selector);
        await this.driver.wait(until.elementIsVisible(element), timeout);
        return element;
    }

    /**
     * Wait for element to be clickable
     * @param {By} selector - The element selector
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise<WebElement>} The element
     */
    async waitForElementToBeClickable(selector, timeout = 10000) {
        const { until } = require('selenium-webdriver');
        await this.driver.wait(until.elementLocated(selector), timeout);
        const element = await this.driver.findElement(selector);
        await this.driver.wait(until.elementIsEnabled(element), timeout);
        return element;
    }

    /**
     * Take screenshot
     * @param {string} name - Screenshot name
     * @returns {Promise<string>} Screenshot path
     */
    async takeScreenshot(name = 'screenshot') {
        try {
            const screenshot = await this.driver.takeScreenshot();
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotName = `${name}_${timestamp}.png`;
            const screenshotsDir = path.join(process.cwd(), 'reports', 'screenshots');
            
            if (!fs.existsSync(screenshotsDir)) {
                fs.mkdirSync(screenshotsDir, { recursive: true });
            }
            
            const screenshotPath = path.join(screenshotsDir, screenshotName);
            fs.writeFileSync(screenshotPath, screenshot, 'base64');
            
            this.screenshots.push(screenshotPath);
            console.log(`📸 Screenshot saved: ${screenshotPath}`);
            
            return screenshotPath;
        } catch (error) {
            console.error('❌ Failed to take screenshot:', error);
            return null;
        }
    }

    /**
     * Scroll to element
     * @param {WebElement} element - The element to scroll to
     */
    async scrollToElement(element) {
        await this.driver.executeScript('arguments[0].scrollIntoView(true);', element);
        await this.driver.sleep(500); // Small delay for smooth scrolling
    }

    /**
     * Wait for page to load
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForPageLoad(timeout = 10000) {
        await this.driver.wait(async () => {
            const readyState = await this.driver.executeScript('return document.readyState;');
            return readyState === 'complete';
        }, timeout);
    }

    /**
     * Wait for URL to change
     * @param {string} expectedUrl - Expected URL
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForUrlChange(expectedUrl, timeout = 10000) {
        const { until } = require('selenium-webdriver');
        await this.driver.wait(until.urlContains(expectedUrl), timeout);
    }

    /**
     * Get current URL
     * @returns {Promise<string>} Current URL
     */
    async getCurrentUrl() {
        return await this.driver.getCurrentUrl();
    }

    /**
     * Get page title
     * @returns {Promise<string>} Page title
     */
    async getPageTitle() {
        return await this.driver.getTitle();
    }

    /**
     * Check if element exists
     * @param {By} selector - The element selector
     * @returns {Promise<boolean>} True if element exists
     */
    async elementExists(selector) {
        try {
            await this.driver.findElement(selector);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if element is visible
     * @param {By} selector - The element selector
     * @returns {Promise<boolean>} True if element is visible
     */
    async elementIsVisible(selector) {
        try {
            const element = await this.driver.findElement(selector);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Get element text
     * @param {By} selector - The element selector
     * @returns {Promise<string>} Element text
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

    /**
     * Get element attribute
     * @param {By} selector - The element selector
     * @param {string} attribute - The attribute name
     * @returns {Promise<string>} Attribute value
     */
    async getElementAttribute(selector, attribute) {
        try {
            const element = await this.driver.findElement(selector);
            return await element.getAttribute(attribute);
        } catch (error) {
            console.error('Failed to get element attribute:', error);
            return '';
        }
    }

    /**
     * Click element
     * @param {By} selector - The element selector
     */
    async clickElement(selector) {
        const element = await this.waitForElementToBeClickable(selector);
        await this.scrollToElement(element);
        await element.click();
    }

    /**
     * Type text into element
     * @param {By} selector - The element selector
     * @param {string} text - Text to type
     */
    async typeText(selector, text) {
        const element = await this.waitForElement(selector);
        await element.clear();
        await element.sendKeys(text);
    }

    /**
     * Select option from dropdown
     * @param {By} selector - The dropdown selector
     * @param {string} optionText - The option text to select
     */
    async selectOption(selector, optionText) {
        const dropdown = await this.waitForElement(selector);
        await dropdown.click();
        
        const option = await this.driver.findElement(
            require('selenium-webdriver').By.xpath(`//option[text()='${optionText}']`)
        );
        await option.click();
    }

    /**
     * Check checkbox
     * @param {By} selector - The checkbox selector
     */
    async checkCheckbox(selector) {
        const checkbox = await this.waitForElement(selector);
        if (!(await checkbox.isSelected())) {
            await checkbox.click();
        }
    }

    /**
     * Uncheck checkbox
     * @param {By} selector - The checkbox selector
     */
    async uncheckCheckbox(selector) {
        const checkbox = await this.waitForElement(selector);
        if (await checkbox.isSelected()) {
            await checkbox.click();
        }
    }

    /**
     * Assert element is visible
     * @param {By} selector - The element selector
     * @param {string} message - Assertion message
     */
    async assertElementVisible(selector, message = 'Element should be visible') {
        const isVisible = await this.elementIsVisible(selector);
        expect(isVisible, message).to.be.true;
    }

    /**
     * Assert element text contains
     * @param {By} selector - The element selector
     * @param {string} expectedText - Expected text
     * @param {string} message - Assertion message
     */
    async assertElementTextContains(selector, expectedText, message = 'Element text should contain expected text') {
        const actualText = await this.getElementText(selector);
        expect(actualText, message).to.include(expectedText);
    }

    /**
     * Assert URL contains
     * @param {string} expectedUrl - Expected URL
     * @param {string} message - Assertion message
     */
    async assertUrlContains(expectedUrl, message = 'URL should contain expected text') {
        const currentUrl = await this.getCurrentUrl();
        expect(currentUrl, message).to.include(expectedUrl);
    }

    /**
     * Log test step
     * @param {string} step - Step description
     */
    logStep(step) {
        console.log(`📝 Step: ${step}`);
    }

    /**
     * Log test action
     * @param {string} action - Action description
     */
    logAction(action) {
        console.log(`🔧 Action: ${action}`);
    }

    /**
     * Log test verification
     * @param {string} verification - Verification description
     */
    logVerification(verification) {
        console.log(`✅ Verification: ${verification}`);
    }

    /**
     * Start scenario timer
     */
    startScenarioTimer() {
        this.startTime = Date.now();
    }

    /**
     * Get scenario duration
     * @returns {number} Duration in milliseconds
     */
    getScenarioDuration() {
        if (!this.startTime) {
            return 0;
        }
        return Date.now() - this.startTime;
    }

    /**
     * Clean up test data
     */
    cleanupTestData() {
        this.testData = {};
        this.screenshots = [];
        this.currentScenario = null;
        this.startTime = null;
    }
}

// Set the custom world constructor
setWorldConstructor(CustomWorld);

module.exports = CustomWorld; 