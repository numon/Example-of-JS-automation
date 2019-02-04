import { browser, by, element } from 'protractor';
import LoginPage from '../components/pageObjects/LoginPage';

describe('angularjs homepage', () => {

  const loginPage = new LoginPage();

  beforeAll(async () => {
    await loginPage.openPage();
  });

  it('should greet the named user', async () => {
    await loginPage.waitForElement(element(by.model('yourName')));
    await element(by.model('yourName')).sendKeys('Julie');
    const greeting = element(by.binding('yourName'));
    expect(await greeting.getText()).toEqual('Hello Julie!');
  });

});
