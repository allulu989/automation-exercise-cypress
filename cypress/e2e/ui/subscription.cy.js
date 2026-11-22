import homePage from '../../pages/HomePage';

describe('Subscription', () => {
  it('TC_SUB_01 | Subscribe with an email from the footer', () => {
    homePage.visit();
    homePage.subscribe(`qa.lulu.sub.${Date.now()}@testmail.com`);
    homePage.shouldShowSubscribeSuccess();
  });
});
