import { $, browser, ElementFinder } from 'protractor';
import { promise } from 'selenium-webdriver';

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

  public async openLastTab(): Promise<void> {
    const handles = await browser.getAllWindowHandles();
    await browser.switchTo().window(handles[handles.length - 1]);
  }

}
