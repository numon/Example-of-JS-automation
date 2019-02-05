import { Config } from 'protractor';

export let config: Config = {
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: 'http://www.angularjs.org',
  capabilities: {
    browserName: 'chrome'
  },
  framework: 'jasmine',
  noGlobals: true,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [ '../specs/**/*.js' ],
};
