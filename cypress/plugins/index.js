/// <reference types = "cypress"/>
/// <reference types = "Cypress-iframe"/>

const cucumber = require('cypress-cucumber-preprocessor').default
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');  
const exec = require('child_process').execSync;  
const { isFileExist, findFiles } = require('cy-verify-downloads');
const { removeDirectory } = require('cypress-delete-downloads-folder');

const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve(
    './cypress/config-files',
    `${file}.json`
  );

  return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())

  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      //launchOptions.args.push("--incognito");
      launchOptions.args.push('--disable-dev-shm-usage')
    }

    if (browser.name == 'chrome') {
      launchOptions.args.push('--disable-gpu')
    }

    /*if (browser.name === 'electron') {                
      launchOptions.preferences.incognito = true
    }*/
 
    return launchOptions
  })

  on('before:run', async (details) => {  
    await beforeRunHook(details);  
    await exec("node ./cypress/support/clear.js")
  });

  on('after:run', async (results) => {  
    if (results) {
      await fs.mkdirSync("cypress/run", { recursive: true });
      await fs.writeFile("cypress/run/results.json", JSON.stringify(results));
    }

    await exec("node ./cypress/support/reporter.js")
    await exec("npx jrm ./cypress/reports/junitreport.xml ./cypress/reports/junit/*.xml");
    await afterRunHook();
  });  

  on('task', { isFileExist, findFiles, removeDirectory})

  on('task', {
    log(message) {
      console.log(message)

      return null
    },
    table(message) {
      console.table(message)

      return null
    }
  })

  const file = config.env.fileConfig || 'hmg';
  return getConfigurationByFile(file);
}