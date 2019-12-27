const puppeteer = require('puppeteer');
const getTimeFromPerformanceMetrics = (metrics, name) =>
  metrics.metrics.find(x => x.name === name).value;

const extractDataFromPerformanceMetrics = (metrics, ...dataNames) => {
  const navigationStart = getTimeFromPerformanceMetrics(
    metrics,
    'NavigationStart'
  );

  const extractedData = {};
  dataNames.forEach(name => {
    extractedData[name] =
      getTimeFromPerformanceMetrics(metrics, name) - navigationStart;
  });

  return extractedData;
};

(async () => {
  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({
  //   headless: true,
  //   executablePath: '/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary',
  // });
  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  await client.send('Performance.enable');
  await page.goto('https://developers.google.com/');

  // const performanceMetrics = await client.send('Performance.getMetrics');
  //
  // console.log(performanceMetrics);
  // const NavigationStart = getTimeFromPerformanceMetrics(performanceMetrics, 'NavigationStart');
  // const FirstMeaningfulPaint = getTimeFromPerformanceMetrics(performanceMetrics, 'FirstMeaningfulPaint');

  let firstMeaningfulPaint = 0;
  let performanceMetrics;
  while (firstMeaningfulPaint === 0) {
    await page.waitFor(400);
    performanceMetrics = await client.send('Performance.getMetrics');
    firstMeaningfulPaint = getTimeFromPerformanceMetrics(
      performanceMetrics,
      'FirstMeaningfulPaint'
    );
  };
  const performanceTiming = JSON.parse(
    await page.evaluate(() => JSON.stringify(window.performance.timing))
  );
  console.log(performanceMetrics);
  console.log('FirstMeaningfulPaint=',extractDataFromPerformanceMetrics(
    performanceMetrics,
    'FirstMeaningfulPaint'
  ));
  console.log('DomContentLoaded=',extractDataFromPerformanceMetrics(
    performanceMetrics,
    'DomContentLoaded'
  ));


  const loadWithDOM = performanceTiming.domComplete - performanceTiming.navigationStart;
  const all = performanceTiming.loadEventEnd - performanceTiming.navigationStart;

  console.log('User can se content ~', loadWithDOM / 1000, 'sec');
  console.log('all --', all / 1000, 'sec');
  console.log(performanceTiming);

  await browser.close();
})();
