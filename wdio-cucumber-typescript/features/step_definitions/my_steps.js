const {Given, Then, When} = require('cucumber');

Given(/^login to page$/, async function () {
  await browser.url('https://webdriver.io');
});

Then(/^see something$/, async function () {
  await browser.pause(1000);
});
When(/^click to any button$/, async function () {
  await browser.pause(500);
});


