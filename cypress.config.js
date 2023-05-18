const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ph31hi',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
