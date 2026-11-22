import homePage from '../../pages/HomePage';
import productsPage from '../../pages/ProductsPage';
import productDetailsPage from '../../pages/ProductDetailsPage';

describe('Products', () => {
  it('TC_PRD_01 | View the All Products page', () => {
    homePage.visit();
    homePage.goToProducts();
    productsPage.shouldShowTitle('All Products');
    productsPage.shouldHaveProducts();
  });

  it('TC_PRD_02 | View product details', () => {
    productsPage.visit();
    productsPage.openFirstProduct();
    productDetailsPage.shouldShowProductInfo();
  });

  it('TC_PRD_03 | Filter products by category (Women > Dress)', () => {
    homePage.visit();
    homePage.elements.categoryWomen().click();
    homePage.elements.categoryWomenDress().should('be.visible').click();
    productsPage.shouldShowTitle('Women - Dress Products');
    productsPage.shouldHaveProducts();
  });

  it('TC_PRD_04 | Filter products by brand', () => {
    productsPage.visit();
    productsPage.openBrand('Polo');
    productsPage.shouldShowTitle('Brand - Polo Products');
    productsPage.shouldHaveProducts();
  });

  it('TC_REV_01 | Write a review on a product', () => {
    cy.fixture('review').then((review) => {
      productsPage.visit();
      productsPage.openFirstProduct();
      productDetailsPage.writeReview(review);
      productDetailsPage.shouldShowReviewSuccess();
    });
  });
});
