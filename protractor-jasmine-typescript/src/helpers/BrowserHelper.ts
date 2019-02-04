import { $, browser, ElementFinder, promise } from 'protractor';

export default class BrowserHelper {
  public scrollIntoView(locator: string|ElementFinder) {
    return browser.executeScript('arguments[0].scrollIntoView(false)',
      typeof locator === 'string'? $(locator).getWebElement() : locator.getWebElement());
  }

  public scrollToTop(): promise.Promise<void> {
    return browser.executeScript('window.scrollTo(0,0);');
  }

  public async setLocalStorageItem(key: string, value: string): Promise<void> {
    await browser.executeScript(`window.localStorage.setItem('${key}', '${value}');`);
    return browser.refresh();
  }
}
