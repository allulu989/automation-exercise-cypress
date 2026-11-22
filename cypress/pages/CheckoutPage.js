class CheckoutPage {
  elements = {
    deliveryAddress: () => cy.get('#address_delivery'),
    billingAddress: () => cy.get('#address_invoice'),
    orderReview: () => cy.contains('h2', 'Review Your Order'),
    comment: () => cy.get('textarea[name="message"]'),
    placeOrder: () => cy.get('a[href="/payment"]'),
    // Payment
    nameOnCard: () => cy.get('[data-qa="name-on-card"]'),
    cardNumber: () => cy.get('[data-qa="card-number"]'),
    cvc: () => cy.get('[data-qa="cvc"]'),
    expiryMonth: () => cy.get('[data-qa="expiry-month"]'),
    expiryYear: () => cy.get('[data-qa="expiry-year"]'),
    payButton: () => cy.get('[data-qa="pay-button"]'),
    orderPlaced: () => cy.get('[data-qa="order-placed"]'),
    downloadInvoice: () => cy.contains('a', 'Download Invoice'),
  };

  shouldShowAddress(addressGetter, user) {
    const expected = [user.firstname, user.lastname, user.company, user.address1,
      user.address2, user.city, user.state, user.zipcode, user.country, user.mobile_number];
    expected.forEach((value) => addressGetter().should('contain.text', value));
  }

  placeOrder(comment) {
    this.elements.orderReview().should('be.visible');
    this.elements.comment().type(comment);
    this.elements.placeOrder().click();
  }

  pay(card) {
    this.elements.nameOnCard().type(card.nameOnCard);
    this.elements.cardNumber().type(card.cardNumber);
    this.elements.cvc().type(card.cvc);
    this.elements.expiryMonth().type(card.expiryMonth);
    this.elements.expiryYear().type(card.expiryYear);
    this.elements.payButton().click();
  }

  shouldShowOrderPlaced() {
    this.elements.orderPlaced().should('be.visible');
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
  }
}

export default new CheckoutPage();
