import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
    screenshotOnRunFailure: false,
    requestTimeout: 30000,
    responseTimeout: 30000,
    pageLoadTimeout: 30000,
  },
})
