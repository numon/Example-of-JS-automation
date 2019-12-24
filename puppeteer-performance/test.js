const puppeteer = require('puppeteer');
const getTimeFromPerformanceMetrics = (metrics, name) =>
  metrics.metrics.find(x => x.name === name).value;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  await client.send('Performance.enable');
  await page.goto('https://www.w3.org/TR/navigation-timing/');
  const performanceTiming = JSON.parse(
    await page.evaluate(() => JSON.stringify(window.performance.timing))
  );
  const performanceMetrics = await client.send('Performance.getMetrics');

  console.log(performanceMetrics);
  const NavigationStart = getTimeFromPerformanceMetrics(performanceMetrics, 'NavigationStart');
  const FirstMeaningfulPaint = getTimeFromPerformanceMetrics(performanceMetrics, 'FirstMeaningfulPaint');
  const DomContentLoaded = getTimeFromPerformanceMetrics(performanceMetrics, 'DomContentLoaded');
  const Timestamp = getTimeFromPerformanceMetrics(performanceMetrics, 'Timestamp');
  console.log((FirstMeaningfulPaint - NavigationStart));
  console.log((DomContentLoaded - NavigationStart));
  console.log((Timestamp - NavigationStart));
  const all = performanceTiming.loadEventEnd - performanceTiming.navigationStart;
  console.log(all/1000);

  await browser.close();
})();
