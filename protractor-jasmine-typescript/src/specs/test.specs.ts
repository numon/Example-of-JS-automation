import { browser, by, element } from 'protractor';
import LoginPage from '../components/pageObjects/LoginPage';
import to from '../utils/ErrorPromiseHandler';

describe('angularjs homepage', () => {

  const loginPage = new LoginPage();
  let err;
  let data;

  beforeAll(async () => {
    [err, data] = await to(loginPage.openPage());
    if(err) { throw new Error('Can not open Index page'); }
  });

  it('should greet the named user', async () => {
    await loginPage.waitForElement(element(by.model('yourName')));
    await element(by.model('yourName')).sendKeys('Julie');
    const greeting = element(by.binding('yourName'));
    expect(await greeting.getText()).toEqual('Hello Julie!');
  });

});
