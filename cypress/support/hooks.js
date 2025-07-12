/**
 * Hooks - Setup and Teardown functionality
 * This file contains Before and After hooks for test setup and cleanup
 */

const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
require('dotenv').config();

// Global variables
let driver;

/**
 * BeforeAll hook - Runs once before all tests
 * Sets up the WebDriver instance and global configuration
 */
BeforeAll(async function() {
    console.log('🚀 Starting test automation suite...');
    
    // Set up WebDriver based on environment
    const browser = process.env.BROWSER || 'chrome';
    const headless = process.env.HEADLESS === 'true';
    
    try {
        if (browser === 'chrome') {
            const options = new chrome.Options();
            if (headless) {
                options.addArguments('--headless');
            }
            options.addArguments('--no-sandbox');
            options.addArguments('--disable-dev-shm-usage');
            options.addArguments('--disable-gpu');
            options.addArguments('--window-size=1920,1080');
            
            driver = await new Builder()
                .forBrowser('chrome')
                .setChromeOptions(options)
                .build();
        } else if (browser === 'firefox') {
            const options = new firefox.Options();
            if (headless) {
                options.addArguments('--headless');
            }
            
            driver = await new Builder()
                .forBrowser('firefox')
                .setFirefoxOptions(options)
                .build();
        } else {
            throw new Error(`Unsupported browser: ${browser}`);
        }
        
        // Set implicit wait
        await driver.manage().setTimeouts({ implicit: 10000 });
        
        // Maximize window
        await driver.manage().window().maximize();
        
        console.log(`✅ WebDriver initialized with ${browser} browser`);
        
    } catch (error) {
        console.error('❌ Failed to initialize WebDriver:', error);
        throw error;
    }
});

/**
 * Before hook - Runs before each scenario
 * Sets up the driver instance for each test
 */
Before(async function() {
    try {
        // Attach driver to the world context
        this.driver = driver;
        
        // Clear browser data
        await driver.manage().deleteAllCookies();
        await driver.executeScript('window.localStorage.clear();');
        await driver.executeScript('window.sessionStorage.clear();');
        
        console.log('🔄 Test scenario setup completed');
        
    } catch (error) {
        console.error('❌ Failed to setup test scenario:', error);
        throw error;
    }
});

/**
 * After hook - Runs after each scenario
 * Cleans up after each test and captures screenshots on failure
 */
After(async function(scenario) {
    try {
        // Capture screenshot on failure
        if (scenario.result.status === 'FAILED') {
            const screenshot = await driver.takeScreenshot();
            const scenarioName = scenario.pickle.name.replace(/\s+/g, '_');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            
            // Save screenshot to reports directory
            const fs = require('fs');
            const path = require('path');
            const reportsDir = path.join(process.cwd(), 'reports', 'screenshots');
            
            if (!fs.existsSync(reportsDir)) {
                fs.mkdirSync(reportsDir, { recursive: true });
            }
            
            const screenshotPath = path.join(reportsDir, `${scenarioName}_${timestamp}.png`);
            fs.writeFileSync(screenshotPath, screenshot, 'base64');
            
            console.log(`📸 Screenshot saved: ${screenshotPath}`);
        }
        
        // Log test result
        const status = scenario.result.status;
        const duration = scenario.result.duration ? Math.round(scenario.result.duration / 1000) : 0;
        
        if (status === 'PASSED') {
            console.log(`✅ Scenario "${scenario.pickle.name}" passed (${duration}s)`);
        } else if (status === 'FAILED') {
            console.log(`❌ Scenario "${scenario.pickle.name}" failed (${duration}s)`);
        } else {
            console.log(`⚠️  Scenario "${scenario.pickle.name}" ${status.toLowerCase()} (${duration}s)`);
        }
        
    } catch (error) {
        console.error('❌ Failed to cleanup test scenario:', error);
    }
});

/**
 * AfterAll hook - Runs once after all tests
 * Cleans up WebDriver and generates reports
 */
AfterAll(async function() {
    try {
        console.log('🧹 Cleaning up test automation suite...');
        
        // Close WebDriver
        if (driver) {
            await driver.quit();
            console.log('✅ WebDriver closed successfully');
        }
        
        // Generate test report
        await generateTestReport();
        
        console.log('🎉 Test automation suite completed!');
        
    } catch (error) {
        console.error('❌ Failed to cleanup test automation suite:', error);
    }
});

/**
 * Generate test report
 */
async function generateTestReport() {
    try {
        const fs = require('fs');
        const path = require('path');
        const reportsDir = path.join(process.cwd(), 'reports');
        
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
        }
        
        const reportPath = path.join(reportsDir, 'test-summary.json');
        const summary = {
            timestamp: new Date().toISOString(),
            environment: {
                browser: process.env.BROWSER || 'chrome',
                headless: process.env.HEADLESS === 'true',
                baseUrl: process.env.BASE_URL || 'https://admin.aichatbot.com'
            },
            framework: {
                name: 'Cucumber.js with Selenium WebDriver',
                version: '8.15.0'
            }
        };
        
        fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2));
        console.log(`📊 Test summary saved: ${reportPath}`);
        
    } catch (error) {
        console.error('❌ Failed to generate test report:', error);
    }
}

/**
 * Custom hook for handling unhandled promise rejections
 */
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

/**
 * Custom hook for handling uncaught exceptions
 */
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

module.exports = {
    driver
}; 