import 'cypress-mochawesome-reporter/register';
import './commands';

// The site loads third-party ad scripts that sometimes throw errors.
// Those errors are not part of the app under test, so we ignore them.
Cypress.on('uncaught:exception', () => false);

// Block ad networks so popups and slow ads don't break the tests.
beforeEach(() => {
  cy.intercept({ hostname: /googlesyndication|doubleclick|googleadservices|adservice\.google/ }, { statusCode: 204 });
});
