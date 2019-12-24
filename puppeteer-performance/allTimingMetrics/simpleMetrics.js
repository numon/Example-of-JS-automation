const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({
  //   headless: true,
  //   executablePath: '/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary',
  // });
  const page = await browser.newPage();
  await page.goto('https://www.w3.org/TR/navigation-timing/');

  const performanceTiming = JSON.parse(
    await page.evaluate(() => JSON.stringify(window.performance.timing))
  );
  const performanceNavigation = JSON.parse(
    await page.evaluate(() => JSON.stringify(window.performance.navigation))
  );
  console.log(performanceTiming);
  console.log(performanceNavigation);

// Чтобы вычислить время ожидания, вычтите текущее время из timing.navigationStart.
  const _pTime = Date.now() - performanceTiming.navigationStart;
//Чтобы вычислить время всех перенаправлений для перехода на страницу, вычтите timing.redirectEnd из timing.redirectStart.
  const _redirTime = performanceTiming.redirectEnd - performanceTiming.redirectStart;

  const _cacheTime = performanceTiming.domainLookupStart - performanceTiming.fetchStart;
  //Чтобы вычислить время выполнения DNS-запроса, вычтите timing.domainLookupEnd из timing.domainLookupStart; чтобы вычислить
  const _dnsTime = performanceTiming.domainLookupEnd - performanceTiming.domainLookupStart;
  const _tcpTime = performanceTiming.connectEnd - performanceTiming.connectStart ;
  const _roundtripTime = performanceTiming.responseEnd - performanceTiming.connectStart;
  const _renderTime = Date.now() - performanceTiming.domLoading;

  const _domLoading = performanceTiming.domComplete - performanceTiming.domLoading;
  const _domresponse = performanceTiming.responseEnd - performanceTiming.responseStart;
  const all = performanceTiming.loadEventEnd - performanceTiming.navigationStart;

  console.log(_pTime / 1000, 'sec')
  console.log(_redirTime / 1000, 'sec')
  console.log(_dnsTime / 1000, 'sec')
  console.log(_tcpTime / 1000, 'sec')
  console.log(_roundtripTime / 1000, 'sec')
  console.log(_renderTime / 1000, 'sec')
  console.log('Dom Loading--', _domLoading / 1000, 'sec');
  console.log('Response--', _domresponse / 1000, 'sec');
  console.log('all--', all / 1000, 'sec');

  await browser.close();
})();
