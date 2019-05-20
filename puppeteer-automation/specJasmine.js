const puppeteer = require('puppeteer');

describe('Testing with puppeteer and jasmine', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
    await page.goto('https://www.google.com/', { waitUntil: 'networkidle2' });
  });

  it('should set correct title', async () => {
    expect(await page.title()).toBe('Google');
  });

  afterEach(async () => {
    await browser.close();
  });

});
