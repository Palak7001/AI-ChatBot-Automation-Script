const { defineConfig } = require("cypress");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      addCucumberPreprocessorPlugin(on, config);
      return config;
    },
    retries: {
      runMode: 1,
      openMode: 1,
    },
    specPattern: ['cypress/e2e/features/**/*.feature'],
    baseUrl: "https://your-app-url.com/",
    defaultCommandTimeout: 20000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    env: {
      codeHistory: '/code-histories',
      SECURITY_TOKEN: "your-security-token",
      downloadsFolder: "cypress/downloads",
      hideXhr: true,
      tags: "not @skip",
      selectors: {
        // Centralized selectors
      }
    }
  }
}); 