import IndexPage from '../pages/IndexPage';

describe('webdriver.io page', () => {
  const indexPage = new IndexPage();
  before(async () => {
    await indexPage.openPage();
  });
  it('should have the right title', async () => {
    await browser.url('https://webdriver.io');
  });
});
