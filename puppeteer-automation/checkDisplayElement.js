const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');

  const body = await page.$('bodys');
  expect(await body.$eval('h1', node => node.hidden)).toEqual(true);
 // console.log(body.hidden)
  console.log(await body.boundingBox());
  await browser.close();
})();
