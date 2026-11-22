class AccountInfoPage {
  elements = {
    header: () => cy.contains('b', 'Enter Account Information'),
    titleMr: () => cy.get('#id_gender1'),
    titleMrs: () => cy.get('#id_gender2'),
    password: () => cy.get('[data-qa="password"]'),
    days: () => cy.get('[data-qa="days"]'),
    months: () => cy.get('[data-qa="months"]'),
    years: () => cy.get('[data-qa="years"]'),
    newsletter: () => cy.get('#newsletter'),
    offers: () => cy.get('#optin'),
    firstName: () => cy.get('[data-qa="first_name"]'),
    lastName: () => cy.get('[data-qa="last_name"]'),
    company: () => cy.get('[data-qa="company"]'),
    address1: () => cy.get('[data-qa="address"]'),
    address2: () => cy.get('[data-qa="address2"]'),
    country: () => cy.get('[data-qa="country"]'),
    state: () => cy.get('[data-qa="state"]'),
    city: () => cy.get('[data-qa="city"]'),
    zipcode: () => cy.get('[data-qa="zipcode"]'),
    mobile: () => cy.get('[data-qa="mobile_number"]'),
    createAccountButton: () => cy.get('[data-qa="create-account"]'),
    accountCreated: () => cy.get('[data-qa="account-created"]'),
    accountDeleted: () => cy.get('[data-qa="account-deleted"]'),
    continueButton: () => cy.get('[data-qa="continue-button"]'),
  };

  fillAccountInfo(user) {
    const e = this.elements;
    e.header().should('be.visible');
    (user.title === 'Mr' ? e.titleMr() : e.titleMrs()).check();
    e.password().type(user.password, { log: false });
    e.days().select(user.birth_date);
    e.months().select(user.birth_month);
    e.years().select(user.birth_year);
    e.newsletter().check();
    e.offers().check();
    e.firstName().type(user.firstname);
    e.lastName().type(user.lastname);
    e.company().type(user.company);
    e.address1().type(user.address1);
    e.address2().type(user.address2);
    e.country().select(user.country);
    e.state().type(user.state);
    e.city().type(user.city);
    e.zipcode().type(user.zipcode);
    e.mobile().type(user.mobile_number);
  }

  submit() {
    this.elements.createAccountButton().click();
  }

  shouldShowAccountCreated() {
    this.elements.accountCreated().should('be.visible').and('contain.text', 'Account Created!');
  }

  shouldShowAccountDeleted() {
    this.elements.accountDeleted().should('be.visible').and('contain.text', 'Account Deleted!');
  }

  clickContinue() {
    this.elements.continueButton().click();
  }
}

export default new AccountInfoPage();
