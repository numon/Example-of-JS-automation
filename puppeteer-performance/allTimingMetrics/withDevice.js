const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhonex = devices['iPhone X'];

const WEB  = 'https://www.w3.org/TR/navigation-timing/';

const NETWORK_PRESETS = {
  'GPRS': {
    offline: false,
    downloadThroughput: 50 * 1024 / 8,
    uploadThroughput: 20 * 1024 / 8,
    latency: 500
  },
  'Regular2G': {
    offline: false,
    downloadThroughput: 250 * 1024 / 8,
    uploadThroughput: 50 * 1024 / 8,
    latency: 300
  },
  'Good2G': {
    offline: false,
    downloadThroughput: 450 * 1024 / 8,
    uploadThroughput: 150 * 1024 / 8,
    latency: 150
  },
  'Regular3G': {
    offline: false,
    downloadThroughput: 750 * 1024 / 8,
    uploadThroughput: 250 * 1024 / 8,
    latency: 100
  },
  'Good3G': {
    offline: false,
    downloadThroughput: 1.5 * 1024 * 1024 / 8,
    uploadThroughput: 750 * 1024 / 8,
    latency: 40
  },
  'Regular4G': {
    offline: false,
    downloadThroughput: 4 * 1024 * 1024 / 8,
    uploadThroughput: 3 * 1024 * 1024 / 8,
    latency: 20
  },
  'DSL': {
    offline: false,
    downloadThroughput: 2 * 1024 * 1024 / 8,
    uploadThroughput: 1 * 1024 * 1024 / 8,
    latency: 5
  },
  'WiFi': {
    offline: false,
    downloadThroughput: 30 * 1024 * 1024 / 8,
    uploadThroughput: 15 * 1024 * 1024 / 8,
    latency: 2
  }
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  await client.send('Network.enable');
  await client.send('Network.emulateNetworkConditions', NETWORK_PRESETS['Regular2G']);

  await page.goto(WEB);

  const performanceTiming = JSON.parse(
    await page.evaluate(() => JSON.stringify(window.performance.timing))
  );

  const loadWithDOM = performanceTiming.domComplete - performanceTiming.navigationStart;
  const all = performanceTiming.loadEventEnd - performanceTiming.navigationStart;

  console.log('User can see content for Regular2G ~', loadWithDOM / 1000, 'sec');
  console.log('All Load for Regular2G --', all / 1000, 'sec');

  await browser.close();
})();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  await client.send('Network.enable');
  await client.send('Network.emulateNetworkConditions', NETWORK_PRESETS['WiFi']);


  await page.goto(WEB);

  const performanceTimingFast = JSON.parse(
    await page.evaluate(() => JSON.stringify(window.performance.timing))
  );


  const loadWithDOMFast = performanceTimingFast.domComplete - performanceTimingFast.navigationStart;
  const allFast = performanceTimingFast.loadEventEnd - performanceTimingFast.navigationStart;

  console.log('User can see content with WiFi ~', loadWithDOMFast / 1000, 'sec');
  console.log('All Load with WiFi --', allFast / 1000, 'sec');
  await browser.close();
})();


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulate(iPhonex);
  const client = await page.target().createCDPSession();
  await client.send('Network.enable');
  await client.send('Network.emulateNetworkConditions', NETWORK_PRESETS['WiFi']);
  await page.goto(WEB);
  const performanceTimingFast = JSON.parse(
    await page.evaluate(() => JSON.stringify(window.performance.timing))
  );

  const loadWithDOMFast = performanceTimingFast.domComplete - performanceTimingFast.navigationStart;
  const allFast = performanceTimingFast.loadEventEnd - performanceTimingFast.navigationStart;

  console.log('[iPhone X] User can see content with WiFi ~', loadWithDOMFast / 1000, 'sec');
  console.log('[iPhone X] All Load with WiFi --', allFast / 1000, 'sec');
  await browser.close();
})();
