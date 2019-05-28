
const {
  getTimeFromPerformanceMetrics,
  extractDataFromPerformanceMetrics,
} = require('./helpers');

async function testPage(page) {
  const client = await page.target().createCDPSession();
  await client.send('Performance.enable');

  await page.goto('http://localhost:8080');

  const performanceMetrics = await client.send('Performance.getMetrics');

  return extractDataFromPerformanceMetrics(
    performanceMetrics,
    'FirstMeaningfulPaint',
  );
}

module.exports = testPage;
