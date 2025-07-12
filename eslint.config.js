import mochaPlugin from 'eslint-plugin-mocha';
import pluginChaiFriendly from 'eslint-plugin-chai-friendly';

export default [
  {
    files: ['cypress/**/*.js'],
    plugins: {
      mocha: mochaPlugin,
      'chai-friendly': pluginChaiFriendly,
    },
    rules: {
      "cypress/no-assigning-return-values": "off",
      "cypress/no-unnecessary-waiting": "off",
      "cypress/no-force": "off",
      "cypress/no-async-tests": "off",
      "cypress/no-pause": "off",
      "no-unused-expressions": "off",
      "chai-friendly/no-unused-expressions": "off"
    },
    languageOptions: {
      globals: {
        cy: "readonly",
        Cypress: "readonly",
        expect: "readonly",
        describe: "readonly",
        it: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        before: "readonly",
        after: "readonly"
      }
    }
  }
]; 