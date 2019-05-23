const pptrFirefox = require('puppeteer-firefox');

(async () => {
  const browser = await pptrFirefox.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.google.com/');
  await page.waitFor(1000);
  await browser.close();
})();
