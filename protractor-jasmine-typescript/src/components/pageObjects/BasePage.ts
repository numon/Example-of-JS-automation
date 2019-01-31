import { browser, ExpectedConditions as EC, ElementFinder, WebElement, promise as wdpromise } from 'protractor';
import { promise, WebElementPromise } from 'selenium-webdriver';

export default class BasePage {
  protected ui: {};
  private readonly timeout: number;

  constructor() {
    this.timeout = 15000;
    this.ui = {};
  }

  openPage(path?: string|undefined): promise.Promise<any> {
    return browser.get(path ? browser.baseUrl + path : browser.baseUrl);
  }

  waitForElement(elm : ElementFinder, timeout: number = this.timeout): promise.Promise<Function> {
    return browser.wait(EC.visibilityOf(elm), timeout);
  }

  waitForRemoved(elm : ElementFinder, timeout: number = this.timeout): promise.Promise<Function> {
    return browser.wait(EC.stalenessOf(elm), timeout);
  }

}
