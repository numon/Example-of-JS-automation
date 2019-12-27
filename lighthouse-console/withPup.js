const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const config = require('lighthouse/lighthouse-core/config/lr-desktop-config.js');
const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const request = require('request');
const util = require('util');
const fs = require('fs');

(async() => {

  const loginURL = 'https://developers.google.com';

  const opts = {
    //chromeFlags: ['--headless'],
    logLevel: 'info',
    output: 'html',
    disableDeviceEmulation: true,
    defaultViewport: {
      width: 1200,
      height: 900
    },
     chromeFlags: ['--disable-mobile-emulation']
  };

// Launch chrome using chrome-launcher
  const chrome = await chromeLauncher.launch(opts);
  opts.port = chrome.port;

// Connect to it using puppeteer.connect().
  const resp = await util.promisify(request)(`http://localhost:${opts.port}/json/version`);
  const {webSocketDebuggerUrl} = JSON.parse(resp.body);
  const browser = await puppeteer.connect({browserWSEndpoint: webSocketDebuggerUrl});

//Puppeteer
  const page = (await browser.pages())[0];
  await page.setViewport({ width: 1200, height: 900});
  await page.goto(loginURL);
  await page.waitForNavigation();

  await lighthouse(page.url(), opts, config).then(res => {

    const reportResult = res.report;

    //workaround to save the report
    fs.writeFile("something.html", reportResult, function (err) {
      if (err) {
        return console.log(err);
      }

    });
  });

  await browser.disconnect();
  await chrome.kill();

})();
