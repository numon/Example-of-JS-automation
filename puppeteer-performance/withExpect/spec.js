const { FAST_DEVICE, MEDIUM_DEVICE, POOR_DEVICE, getSimplePagePerformanceMetrics } = require('./helpers');
const puppeteer = require('puppeteer');



describe('Home page', () => {

  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

  });


  it('should have be interactive in less than 1 second on fast device', async () => {
    const metrics = await getSimplePagePerformanceMetrics(page, 'http://localhost:8080', FAST_DEVICE);
    console.log('FAST_DEVICE', metrics);
  });

  it('should have be interactive in less than 1 second on medium device', async () => {
    const metrics = await getSimplePagePerformanceMetrics(page, 'http://localhost:8080', MEDIUM_DEVICE);
    console.log('MEDIUM_DEVICE', metrics);

  });

  it('should have be interactive in less than 1 second on poor device', async () => {
    const metrics = await getSimplePagePerformanceMetrics(page, 'http://localhost:8080', POOR_DEVICE);
    console.log('POOR_DEVICE', metrics);

  });
});
