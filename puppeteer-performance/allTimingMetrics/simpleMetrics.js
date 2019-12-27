const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.w3.org/TR/navigation-timing/');

  const performanceTiming = JSON.parse(
    await page.evaluate(() => JSON.stringify(window.performance.timing))
  );

  console.log(performanceTiming);

  const redirect = performanceTiming.redirectEnd - performanceTiming.redirectStart;
  const DNS = performanceTiming.domainLookupEnd - performanceTiming.domainLookupStart;
  const connect = performanceTiming.connectEnd - performanceTiming.connectStart;
  const request = performanceTiming.responseStart - performanceTiming.requestStart;
  const domLoading = performanceTiming.domComplete - performanceTiming.domLoading;
  const domresponse = performanceTiming.responseEnd - performanceTiming.responseStart;
  const loadWithDOM = performanceTiming.domComplete - performanceTiming.navigationStart;
  const loadEvent = performanceTiming.loadEventEnd - performanceTiming.loadEventStart;
  const all = performanceTiming.loadEventEnd - performanceTiming.navigationStart;


  console.log('Redirect --', redirect / 1000, 'sec');
  console.log('DNS --', DNS / 1000, 'sec');
  console.log('Connect --', connect / 1000, 'sec');
  console.log('Request --', request / 1000, 'sec');
  console.log('Response --', domresponse / 1000, 'sec');
  console.log('Dom Loading --', domLoading / 1000, 'sec');
  console.log('Load Event --', loadEvent / 1000, 'sec');
  console.log('----------------------------------------');
  console.log('User can se content ~', loadWithDOM / 1000, 'sec');
  console.log('all --', all / 1000, 'sec');

  await browser.close();
})();
