/// <reference types="@shelex/cypress-allure-plugin" />
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");
const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");

/**
 * @type {Cypress.PluginConfig}
 */

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  allureWriter(on, config);
  on("task", { downloadFile });

  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    lighthouse: lighthouse(), // calling the function is important
    pa11y: pa11y(), // calling the function is important
  });

  on("task", {
    log(message) {
      console.log(message);

      return null;
    },
    table(message) {
      console.table(message);

      return null;
    },
  });

  return config;
};
