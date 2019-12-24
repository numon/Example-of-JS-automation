
const {
  getTimeFromPerformanceMetrics,
  extractDataFromPerformanceMetrics,
} = require('./helpers');

async function testPage(page) {
  const client = await page.target().createCDPSession();
  await client.send('Performance.enable');

  await page.goto('https://www.w3.org/TR/navigation-timing/');

  const performanceMetrics = await client.send('Performance.getMetrics');

  return extractDataFromPerformanceMetrics(
    performanceMetrics,
    'FirstMeaningfulPaint',
  );
}

module.exports = testPage;
