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
  public async getPageTitle(): Promise<string> {
    return browser.getTitle();
  }

  /**
   * wait for element in page
   * @param elm Promise<void>
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

  /**
   * wait for animation
   * @param {number} ms
   * @return Promise<undefined> browser pause
   */
  public async waitForAnimation(ms): Promise<undefined> {
    return browser.pause(ms || 1500);
  }

  /**
   * check if element has class
   * @param {string} elm
   * @param {string} className
   * @return Promise<boolean>
   */
  public async hasClass(elm, className): Promise<boolean> {
    const classNameArr = await elm.getAttribute('class').split(' ');
    return classNameArr.some(cssClass => cssClass === className);
  }

}
