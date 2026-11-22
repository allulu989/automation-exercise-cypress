class SignupLoginPage {
  elements = {
    // Login form
    loginEmail: () => cy.get('[data-qa="login-email"]'),
    loginPassword: () => cy.get('[data-qa="login-password"]'),
    loginButton: () => cy.get('[data-qa="login-button"]'),
    // Signup form
    signupHeader: () => cy.contains('h2', 'New User Signup!'),
    signupName: () => cy.get('[data-qa="signup-name"]'),
    signupEmail: () => cy.get('[data-qa="signup-email"]'),
    signupButton: () => cy.get('[data-qa="signup-button"]'),
  };

  startSignup(name, email) {
    this.elements.signupHeader().should('be.visible');
    if (name) this.elements.signupName().type(name);
    if (email) this.elements.signupEmail().type(email);
    this.elements.signupButton().click();
  }

  login(email, password) {
    if (email) this.elements.loginEmail().type(email);
    if (password) this.elements.loginPassword().type(password, { log: false });
    this.elements.loginButton().click();
  }

  shouldShowLoginError() {
    cy.contains('Your email or password is incorrect!').should('be.visible');
  }

  shouldShowEmailExistsError() {
    cy.contains('Email Address already exist!').should('be.visible');
  }

  // HTML5 "required" validation: the browser blocks the submit
  shouldBeInvalid(fieldGetter) {
    fieldGetter().then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
      expect($input[0].validationMessage).to.not.be.empty;
    });
  }
}

export default new SignupLoginPage();
