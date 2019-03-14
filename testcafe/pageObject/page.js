import { Selector } from 'testcafe';

export default class Page {
  constructor () {
    this.developerName = Selector('#developer-name');
    this.submitButton = Selector('#submit-button');
    this.articleHeader = Selector('#article-header');

  }
  async enterDeveloper (t) {
    await t
      .typeText(this.developerName, 'John Smith')
      .click(this.submitButton);
    return t;

  }
}
