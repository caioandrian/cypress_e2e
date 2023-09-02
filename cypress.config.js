const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 40000,
  numTestsKeptInMemory: 500,
  screenshotsFolder: 'cypress/reports/screenshots',
  'cucumberautocomplete.strictGherkinCompletion': true,
  video: true,
  modifyObstructiveCode: false,
  experimentalSourceRewriting: true,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    overwrite: false,
    html: false,
    video: false,
    json: true,
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    cypressMochawesomeReporterReporterOptions: {
      reporterDir: 'cypress/reports',
      charts: true,
      reportPageTitle: 'Report Tests ',
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/reports/junit/test-results-[hash].xml',
      toConsole: true,
    },
  },
  chromeWebSecurity: false,
  retries: 0,
  e2e: {
    env: {
      grepOmitFiltered: true,
      grepFilterSpecs: true
    },
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      return require('./cypress/plugins/index.js')(on, config)
    },
    excludeSpecPattern: '*.js',
    specPattern: '**/*.{feature,features}',
    supportFile: 'cypress/support/e2e.js'  
  }
})
