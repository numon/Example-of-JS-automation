import { browser, ElementFinder, ExpectedConditions as EC } from 'protractor';
import { promise } from 'selenium-webdriver';

export default class BasePage {

  constructor(protected ui:{} = {}, private readonly timeout: number = 15000) {
  }

  public openPage(path?: string|undefined): promise.Promise<any> {
    return browser.get(path ? browser.baseUrl + path : browser.baseUrl);
  }

  public waitForElement(elm : ElementFinder, timeout: number = this.timeout) {
    return browser.wait(EC.visibilityOf(elm), timeout);
  }

  public waitForRemoved(elm : ElementFinder, timeout: number = this.timeout) {
    return browser.wait(EC.stalenessOf(elm), timeout);
  }

}
