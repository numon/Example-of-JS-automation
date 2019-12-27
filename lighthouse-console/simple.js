const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');


function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {
      // fs.writeFile("something.html", results.report, function(err) {
      //   if(err) {
      //     return console.log(err);
      //   }
      //
      // });
      return chrome.kill().then(() => results.lhr)
    });
  });
}

const opts = {
  chromeFlags: [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
  ],
  output: 'html',
};

// Usage:
launchChromeAndRunLighthouse('https://developers.google.com', opts).then(results => {
  console.log(results.categories['performance'].score)
});
