class ProductsPage {
  elements = {
    title: () => cy.get('.features_items h2.title'),
    productCards: () => cy.get('.features_items .product-image-wrapper'),
    viewProductLinks: () => cy.get('.features_items a[href^="/product_details/"]'),
    searchInput: () => cy.get('#search_product'),
    searchButton: () => cy.get('#submit_search'),
    addToCartButtons: () => cy.get('.features_items .productinfo .add-to-cart'),
    continueShopping: () => cy.get('#cartModal .close-modal'),
    viewCartInModal: () => cy.get('#cartModal a[href="/view_cart"]'),
    brandLink: (brand) => cy.get(`.brands_products a[href="/brand_products/${brand}"]`),
  };

  visit() {
    cy.visit('/products');
    this.shouldShowTitle('All Products');
  }

  shouldShowTitle(text) {
    this.elements.title().should('be.visible').and('contain.text', text);
  }

  shouldHaveProducts() {
    this.elements.productCards().should('have.length.greaterThan', 0);
  }

  openFirstProduct() {
    this.elements.viewProductLinks().first().click();
  }

  search(keyword) {
    this.elements.searchInput().clear().type(keyword);
    this.elements.searchButton().click();
  }

  // index starts at 0
  addProductToCart(index) {
    this.elements.addToCartButtons().eq(index).click();
  }

  continueShopping() {
    this.elements.continueShopping().should('be.visible').click();
  }

  viewCartFromModal() {
    this.elements.viewCartInModal().should('be.visible').click();
  }

  openBrand(brand) {
    this.elements.brandLink(brand).click();
  }
}

export default new ProductsPage();
