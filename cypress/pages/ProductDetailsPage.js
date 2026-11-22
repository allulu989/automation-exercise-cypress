class ProductDetailsPage {
  elements = {
    info: () => cy.get('.product-information'),
    name: () => cy.get('.product-information h2'),
    quantity: () => cy.get('#quantity'),
    addToCartButton: () => cy.get('.product-information button.cart'),
    viewCartInModal: () => cy.get('#cartModal a[href="/view_cart"]'),
    // Review form
    reviewTitle: () => cy.contains('a', 'Write Your Review'),
    reviewName: () => cy.get('#name'),
    reviewEmail: () => cy.get('#email'),
    reviewText: () => cy.get('#review'),
    reviewSubmit: () => cy.get('#button-review'),
  };

  shouldShowProductInfo() {
    cy.url().should('include', '/product_details/');
    this.elements.name().should('be.visible').and('not.be.empty');
    const labels = ['Category:', 'Rs.', 'Availability:', 'Condition:', 'Brand:'];
    labels.forEach((label) => this.elements.info().should('contain.text', label));
  }

  setQuantity(qty) {
    this.elements.quantity().clear().type(String(qty));
  }

  addToCartAndViewCart() {
    this.elements.addToCartButton().click();
    this.elements.viewCartInModal().should('be.visible').click();
  }

  writeReview({ name, email, review }) {
    this.elements.reviewTitle().should('be.visible');
    this.elements.reviewName().type(name);
    this.elements.reviewEmail().type(email);
    this.elements.reviewText().type(review);
    this.elements.reviewSubmit().click();
  }

  shouldShowReviewSuccess() {
    cy.contains('Thank you for your review.').should('be.visible');
  }
}

export default new ProductDetailsPage();
