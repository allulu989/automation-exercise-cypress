import homePage from '../../pages/HomePage';
import signupLoginPage from '../../pages/SignupLoginPage';
import { buildUser } from '../../support/utils/dataFactory';

describe('Hybrid | API setup + UI check', () => {
  it('TC_HYB_01 | Create user via API, login via UI, delete via API', () => {
    cy.fixture('users').then((data) => {
      const user = buildUser(data.newUser);

      // 1. Setup through the API (fast)
      cy.createUserViaApi(user);

      // 2. Verify the behavior through the UI
      homePage.visit();
      homePage.goToSignupLogin();
      signupLoginPage.login(user.email, user.password);
      homePage.shouldShowLoggedInAs(user.name);

      // 3. Cleanup through the API
      cy.apiRequest('DELETE', '/api/deleteAccount', { email: user.email, password: user.password })
        .its('body.responseCode')
        .should('eq', 200);
    });
  });
});
