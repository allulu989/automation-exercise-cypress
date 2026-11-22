class HomePage {
  elements = {
    slider: () => cy.get('#slider'),
    signupLoginLink: () => cy.get('a[href="/login"]'),
    productsLink: () => cy.get('a[href="/products"]'),
    cartLink: () => cy.get('.shop-menu a[href="/view_cart"]'),
    contactLink: () => cy.get('a[href="/contact_us"]'),
    loggedInAs: () => cy.contains('a', 'Logged in as'),
    logoutLink: () => cy.get('a[href="/logout"]'),
    deleteAccountLink: () => cy.get('a[href="/delete_account"]'),
    // Footer subscription
    subscriptionTitle: () => cy.contains('h2', 'Subscription'),
    subscribeEmail: () => cy.get('#susbscribe_email'),
    subscribeButton: () => cy.get('#subscribe'),
    subscribeSuccess: () => cy.get('#success-subscribe'),
    // Sidebar
    categoryWomen: () => cy.get('#accordian a[href="#Women"]'),
    categoryWomenDress: () => cy.get('#Women a[href="/category_products/1"]'),
  };

  visit() {
    cy.visit('/');
    this.elements.slider().should('be.visible');
  }

  goToSignupLogin() {
    this.elements.signupLoginLink().click();
  }

  goToProducts() {
    this.elements.productsLink().click();
  }

  goToCart() {
    this.elements.cartLink().click();
  }

  goToContact() {
    this.elements.contactLink().click();
  }

  logout() {
    this.elements.logoutLink().click();
  }

  deleteAccount() {
    this.elements.deleteAccountLink().click();
  }

  shouldShowLoggedInAs(name) {
    this.elements.loggedInAs().should('contain.text', name);
  }

  subscribe(email) {
    cy.scrollTo('bottom');
    this.elements.subscriptionTitle().should('be.visible');
    this.elements.subscribeEmail().type(email);
    this.elements.subscribeButton().click();
  }

  shouldShowSubscribeSuccess() {
    this.elements.subscribeSuccess().should('contain.text', 'You have been successfully subscribed!');
  }
}

export default new HomePage();
