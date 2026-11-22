import homePage from '../../pages/HomePage';
import signupLoginPage from '../../pages/SignupLoginPage';
import accountInfoPage from '../../pages/AccountInfoPage';
import { buildUser } from '../../support/utils/dataFactory';

describe('Registration', () => {
  let baseUser;

  before(() => {
    cy.fixture('users').then((data) => {
      baseUser = data.newUser;
    });
  });

  beforeEach(() => {
    homePage.visit();
    homePage.goToSignupLogin();
  });

  it('TC_REG_01 + TC_REG_04 | Register a new user, then delete the account', () => {
    const user = buildUser(baseUser);

    signupLoginPage.startSignup(user.name, user.email);
    accountInfoPage.fillAccountInfo(user);
    accountInfoPage.submit();
    accountInfoPage.shouldShowAccountCreated();
    accountInfoPage.clickContinue();
    homePage.shouldShowLoggedInAs(user.name);

    // TC_REG_04: delete the account so we leave no test data behind
    homePage.deleteAccount();
    accountInfoPage.shouldShowAccountDeleted();
    accountInfoPage.clickContinue();
  });

  it('TC_REG_02 | Register with an already registered email', () => {
    const user = buildUser(baseUser);
    cy.createUserViaApi(user);

    signupLoginPage.startSignup(user.name, user.email);
    signupLoginPage.shouldShowEmailExistsError();
    cy.url().should('include', '/signup');

    cy.deleteUserViaApi(user.email, user.password);
  });

  it('TC_REG_03 | Submit signup with empty name and email', () => {
    signupLoginPage.startSignup('', '');
    signupLoginPage.shouldBeInvalid(signupLoginPage.elements.signupName);
    cy.url().should('include', '/login');
  });
});
