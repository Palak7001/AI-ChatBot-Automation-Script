/**
 * Configuration - Environment and Framework Settings
 * This file contains configuration settings for the automation framework
 */

require('dotenv').config();

/**
 * Configuration object with all framework settings
 */
const config = {
    // Environment settings
    environment: {
        baseUrl: process.env.BASE_URL || 'https://admin.aichatbot.com',
        browser: process.env.BROWSER || 'chrome',
        headless: process.env.HEADLESS === 'true',
        implicitWait: parseInt(process.env.IMPLICIT_WAIT) || 10000,
        pageLoadTimeout: parseInt(process.env.PAGE_LOAD_TIMEOUT) || 30000,
        scriptTimeout: parseInt(process.env.SCRIPT_TIMEOUT) || 30000
    },

    // Test settings
    test: {
        parallel: process.env.PARALLEL === 'true',
        maxInstances: parseInt(process.env.MAX_INSTANCES) || 4,
        retryCount: parseInt(process.env.RETRY_COUNT) || 2,
        screenshotOnFailure: process.env.SCREENSHOT_ON_FAILURE !== 'false',
        videoRecording: process.env.VIDEO_RECORDING === 'true'
    },

    // Reporting settings
    reporting: {
        generateHtmlReport: process.env.GENERATE_HTML_REPORT !== 'false',
        generateJsonReport: process.env.GENERATE_JSON_REPORT !== 'false',
        generateJUnitReport: process.env.GENERATE_JUNIT_REPORT === 'true',
        reportPath: process.env.REPORT_PATH || './reports',
        screenshotsPath: process.env.SCREENSHOTS_PATH || './reports/screenshots'
    },

    // Browser settings
    browser: {
        chrome: {
            args: [
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--window-size=1920,1080',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor'
            ],
            prefs: {
                'profile.default_content_setting_values.notifications': 2,
                'profile.default_content_settings.popups': 0
            }
        },
        firefox: {
            args: [
                '--width=1920',
                '--height=1080'
            ],
            prefs: {
                'dom.webnotifications.enabled': false
            }
        }
    },

    // Test data settings
    testData: {
        path: process.env.TEST_DATA_PATH || './test-data',
        defaultFile: 'testData.json'
    },

    // Logging settings
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        timestamp: process.env.LOG_TIMESTAMP !== 'false',
        colors: process.env.LOG_COLORS !== 'false'
    },

    // API settings (if needed for API testing)
    api: {
        baseUrl: process.env.API_BASE_URL || 'https://api.aichatbot.com',
        timeout: parseInt(process.env.API_TIMEOUT) || 30000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    },

    // Database settings (if needed for database testing)
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        name: process.env.DB_NAME || 'test_db',
        user: process.env.DB_USER || 'test_user',
        password: process.env.DB_PASSWORD || 'test_password'
    },

    // Email settings (if needed for email testing)
    email: {
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT) || 587,
        user: process.env.EMAIL_USER || '',
        password: process.env.EMAIL_PASSWORD || '',
        secure: process.env.EMAIL_SECURE === 'true'
    }
};

/**
 * Get configuration value by key path
 * @param {string} keyPath - Dot-separated key path
 * @returns {*} Configuration value
 */
function getConfig(keyPath) {
    const keys = keyPath.split('.');
    let value = config;
    
    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            return undefined;
        }
    }
    
    return value;
}

/**
 * Set configuration value by key path
 * @param {string} keyPath - Dot-separated key path
 * @param {*} value - Value to set
 */
function setConfig(keyPath, value) {
    const keys = keyPath.split('.');
    let current = config;
    
    for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in current)) {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
}

/**
 * Validate configuration
 * @returns {Object} Validation result
 */
function validateConfig() {
    const errors = [];
    const warnings = [];

    // Validate required environment variables
    if (!config.environment.baseUrl) {
        errors.push('BASE_URL is required');
    }

    if (!['chrome', 'firefox', 'safari', 'edge'].includes(config.environment.browser)) {
        errors.push('BROWSER must be one of: chrome, firefox, safari, edge');
    }

    // Validate timeouts
    if (config.environment.implicitWait < 1000) {
        warnings.push('IMPLICIT_WAIT should be at least 1000ms');
    }

    if (config.environment.pageLoadTimeout < 5000) {
        warnings.push('PAGE_LOAD_TIMEOUT should be at least 5000ms');
    }

    // Validate test settings
    if (config.test.maxInstances < 1) {
        errors.push('MAX_INSTANCES must be at least 1');
    }

    if (config.test.retryCount < 0) {
        errors.push('RETRY_COUNT must be non-negative');
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Get browser-specific configuration
 * @param {string} browser - Browser name
 * @returns {Object} Browser configuration
 */
function getBrowserConfig(browser) {
    const browserConfig = config.browser[browser];
    if (!browserConfig) {
        throw new Error(`Unsupported browser: ${browser}`);
    }
    return browserConfig;
}

/**
 * Get test data configuration
 * @returns {Object} Test data configuration
 */
function getTestDataConfig() {
    return config.testData;
}

/**
 * Get reporting configuration
 * @returns {Object} Reporting configuration
 */
function getReportingConfig() {
    return config.reporting;
}

/**
 * Get API configuration
 * @returns {Object} API configuration
 */
function getApiConfig() {
    return config.api;
}

/**
 * Get database configuration
 * @returns {Object} Database configuration
 */
function getDatabaseConfig() {
    return config.database;
}

/**
 * Get email configuration
 * @returns {Object} Email configuration
 */
function getEmailConfig() {
    return config.email;
}

/**
 * Print configuration summary
 */
function printConfigSummary() {
    console.log('📋 Configuration Summary:');
    console.log(`   Environment: ${config.environment.baseUrl}`);
    console.log(`   Browser: ${config.environment.browser}${config.environment.headless ? ' (headless)' : ''}`);
    console.log(`   Parallel: ${config.test.parallel ? 'Yes' : 'No'}`);
    console.log(`   Max Instances: ${config.test.maxInstances}`);
    console.log(`   Retry Count: ${config.test.retryCount}`);
    console.log(`   Screenshots: ${config.test.screenshotOnFailure ? 'Enabled' : 'Disabled'}`);
    console.log(`   Reports: ${config.reporting.reportPath}`);
    console.log(`   Log Level: ${config.logging.level}`);
}

/**
 * Load configuration from file
 * @param {string} filePath - Configuration file path
 */
function loadConfigFromFile(filePath) {
    try {
        const fs = require('fs');
        if (fs.existsSync(filePath)) {
            const fileConfig = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            Object.assign(config, fileConfig);
            console.log(`✅ Configuration loaded from: ${filePath}`);
        } else {
            console.log(`⚠️  Configuration file not found: ${filePath}`);
        }
    } catch (error) {
        console.error(`❌ Failed to load configuration from ${filePath}:`, error);
    }
}

// Validate configuration on load
const validation = validateConfig();
if (!validation.isValid) {
    console.error('❌ Configuration validation failed:');
    validation.errors.forEach(error => console.error(`   - ${error}`));
    process.exit(1);
}

if (validation.warnings.length > 0) {
    console.warn('⚠️  Configuration warnings:');
    validation.warnings.forEach(warning => console.warn(`   - ${warning}`));
}

module.exports = {
    config,
    getConfig,
    setConfig,
    validateConfig,
    getBrowserConfig,
    getTestDataConfig,
    getReportingConfig,
    getApiConfig,
    getDatabaseConfig,
    getEmailConfig,
    printConfigSummary,
    loadConfigFromFile
}; 