import homePage from '../../pages/HomePage';
import signupLoginPage from '../../pages/SignupLoginPage';
import { buildUser } from '../../support/utils/dataFactory';

describe('Login & Logout', () => {
  let user;
  let invalidUser;

  // Create one test user through the API before all tests
  before(() => {
    cy.fixture('users').then((data) => {
      user = buildUser(data.newUser);
      invalidUser = data.invalidUser;
      cy.createUserViaApi(user);
    });
  });

  // Clean up: delete the test user after all tests
  after(() => {
    cy.deleteUserViaApi(user.email, user.password);
  });

  beforeEach(() => {
    homePage.visit();
    homePage.goToSignupLogin();
  });

  it('TC_LOG_01 | Login with valid email and password', () => {
    signupLoginPage.login(user.email, user.password);
    homePage.shouldShowLoggedInAs(user.name);
  });

  it('TC_LOG_02 | Login with unregistered email and password', () => {
    signupLoginPage.login(invalidUser.email, invalidUser.password);
    signupLoginPage.shouldShowLoginError();
  });

  it('TC_LOG_03 | Login with valid email and wrong password', () => {
    signupLoginPage.login(user.email, 'Wrong@999');
    signupLoginPage.shouldShowLoginError();
    homePage.elements.loggedInAs().should('not.exist');
  });

  it('TC_LOG_04 | Login with empty fields', () => {
    signupLoginPage.login('', '');
    signupLoginPage.shouldBeInvalid(signupLoginPage.elements.loginEmail);
    cy.url().should('include', '/login');
  });

  it('TC_LOG_05 | Logout a logged-in user', () => {
    signupLoginPage.login(user.email, user.password);
    homePage.shouldShowLoggedInAs(user.name);

    homePage.logout();
    cy.url().should('include', '/login');
    homePage.elements.loggedInAs().should('not.exist');
  });
});
