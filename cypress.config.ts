import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000'
  },
  retries: {
    experimentalStrategy: 'detect-flake-and-pass-on-threshold',
    experimentalOptions: {
      maxRetries: 2,
      passesRequired: 2,
    },

    // you must also explicitly set openMode and runMode to
    // either true or false when using experimental retries
    openMode: true,
    runMode: true,
  },
});
