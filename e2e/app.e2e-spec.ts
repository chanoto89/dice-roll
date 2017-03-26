import { DiceRollPage } from './app.po';

describe('dice-roll App', () => {
  let page: DiceRollPage;

  beforeEach(() => {
    page = new DiceRollPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
