const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "t5vuru",
  viewportHeight: 880,
  viewportWidth: 1280,
  video: true,

  e2e: {
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "./cypress/integration/*.spec.js"
  },
});
