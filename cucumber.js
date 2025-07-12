/**
 * Cucumber Configuration
 * This file contains the configuration for Cucumber.js test runner
 */

module.exports = {
    default: {
        // Paths
        paths: [
            'features/**/*.feature'
        ],
        
        // Step definitions
        require: [
            'step-definitions/**/*.js',
            'support/**/*.js'
        ],
        
        // Format options
        format: [
            'html:reports/cucumber-report.html',
            'json:reports/cucumber-report.json',
            'summary'
        ],
        
        // Parallel execution
        parallel: process.env.PARALLEL === 'true' ? 4 : 1,
        
        // Tags
        tags: process.env.TAGS || '',
        
        // Publish results
        publish: process.env.PUBLISH === 'true',
        
        // Retry failed scenarios
        retry: process.env.RETRY_COUNT || 2,
        
        // World parameters
        worldParameters: {
            baseUrl: process.env.BASE_URL || 'https://admin.aichatbot.com',
            browser: process.env.BROWSER || 'chrome',
            headless: process.env.HEADLESS === 'true'
        }
    },
    
    // Smoke test configuration
    smoke: {
        paths: [
            'features/**/*.feature'
        ],
        require: [
            'step-definitions/**/*.js',
            'support/**/*.js'
        ],
        format: [
            'html:reports/smoke-report.html',
            'json:reports/smoke-report.json',
            'summary'
        ],
        tags: '@smoke',
        parallel: 2,
        retry: 1
    },
    
    // Regression test configuration
    regression: {
        paths: [
            'features/**/*.feature'
        ],
        require: [
            'step-definitions/**/*.js',
            'support/**/*.js'
        ],
        format: [
            'html:reports/regression-report.html',
            'json:reports/regression-report.json',
            'summary'
        ],
        tags: '@regression',
        parallel: 4,
        retry: 2
    },
    
    // Critical test configuration
    critical: {
        paths: [
            'features/**/*.feature'
        ],
        require: [
            'step-definitions/**/*.js',
            'support/**/*.js'
        ],
        format: [
            'html:reports/critical-report.html',
            'json:reports/critical-report.json',
            'summary'
        ],
        tags: '@critical',
        parallel: 2,
        retry: 3
    },
    
    // Login test configuration
    login: {
        paths: [
            'features/login.feature'
        ],
        require: [
            'step-definitions/**/*.js',
            'support/**/*.js'
        ],
        format: [
            'html:reports/login-report.html',
            'json:reports/login-report.json',
            'summary'
        ],
        tags: '',
        parallel: 1,
        retry: 1
    },
    
    // Bot management test configuration
    botManagement: {
        paths: [
            'features/bot-management.feature'
        ],
        require: [
            'step-definitions/**/*.js',
            'support/**/*.js'
        ],
        format: [
            'html:reports/bot-management-report.html',
            'json:reports/bot-management-report.json',
            'summary'
        ],
        tags: '',
        parallel: 2,
        retry: 2
    },
    
    // Analytics test configuration
    analytics: {
        paths: [
            'features/analytics.feature'
        ],
        require: [
            'step-definitions/**/*.js',
            'support/**/*.js'
        ],
        format: [
            'html:reports/analytics-report.html',
            'json:reports/analytics-report.json',
            'summary'
        ],
        tags: '',
        parallel: 2,
        retry: 2
    },
    
    // User access test configuration
    userAccess: {
        paths: [
            'features/user-access.feature'
        ],
        require: [
            'step-definitions/**/*.js',
            'support/**/*.js'
        ],
        format: [
            'html:reports/user-access-report.html',
            'json:reports/user-access-report.json',
            'summary'
        ],
        tags: '',
        parallel: 2,
        retry: 2
    },
    
    // Development configuration
    dev: {
        paths: [
            'features/**/*.feature'
        ],
        require: [
            'step-definitions/**/*.js',
            'support/**/*.js'
        ],
        format: [
            'progress',
            'html:reports/dev-report.html'
        ],
        tags: 'not @wip',
        parallel: 1,
        retry: 0
    },
    
    // CI/CD configuration
    ci: {
        paths: [
            'features/**/*.feature'
        ],
        require: [
            'step-definitions/**/*.js',
            'support/**/*.js'
        ],
        format: [
            'junit:reports/junit-report.xml',
            'json:reports/ci-report.json',
            'summary'
        ],
        tags: 'not @manual',
        parallel: 4,
        retry: 1,
        publish: true
    }
}; 