import { Config } from 'protractor';

export let config: Config = {
  framework: 'jasmine',
  capabilities: {
    browserName: 'chrome'
  },
  specs: [ '../specs/**/*.js' ],
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://www.angularjs.org',
  noGlobals: true,
  SELENIUM_PROMISE_MANAGER: false
};
