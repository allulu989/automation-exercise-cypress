import homePage from '../../pages/HomePage';
import contactPage from '../../pages/ContactPage';

describe('Contact Us', () => {
  it('TC_CNT_01 | Submit the Contact Us form with a file', () => {
    cy.fixture('contact').then((contact) => {
      homePage.visit();
      homePage.goToContact();
      contactPage.fillForm(contact, 'cypress/fixtures/sample.txt');
      contactPage.submit();
      contactPage.shouldShowSuccess();
    });
  });
});
