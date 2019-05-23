
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
      headless: false,
      executablePath: '/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary',
  }
    );
  const page = await browser.newPage();
  await page.goto('https://www.google.com/');
  await page.waitFor(1000);
  await browser.close();
})();
