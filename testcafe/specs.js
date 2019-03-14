import { Selector } from 'testcafe';
import Page from './pageObject/page';

fixture `Getting Started`// declare the fixture
  .page `https://devexpress.github.io/testcafe/example`;  // specify the start page

test('My first test', async t => {
  const page = new Page();
  const result = await page.enterDeveloper(t);
  await result.expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});
