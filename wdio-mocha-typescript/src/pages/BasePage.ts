export default class BasePage {
  private ui: {};

  constructor() {
    this.ui = {};
  }

  public async openPage(path?: string|undefined): Promise<void> {
    await browser.url(path ? browser.options.baseUrl + path : browser.options.baseUrl);
  }

  /**
   * get page title
   * @return {string} text
   */
  public getPageTitle(): string {
    return browser.getTitle();
  }

  /**
   * wait for element in page
   * @param elm {string | WebdriverIO.Client<WebdriverIO.RawResult<WebdriverIO.Element>>} element for waiting
   */
  public async waitForElement(elm): Promise<void> {
    if (typeof elm === 'string') {
      await $(elm).waitForExist();
      await $(elm).waitForDisplayed();
    } else {
      await elm.waitForExist();
      await elm.waitForDisplayed();
    }
  }

}
