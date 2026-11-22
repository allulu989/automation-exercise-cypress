import productsPage from '../../pages/ProductsPage';

describe('Search', () => {
  beforeEach(() => {
    productsPage.visit();
  });

  it('TC_SRC_01 | Search for an existing product', () => {
    productsPage.search('top');
    productsPage.shouldShowTitle('Searched Products');
    productsPage.shouldHaveProducts();
  });

  it('TC_SRC_02 | Search for a product that does not exist', () => {
    productsPage.search('xyz12345');
    productsPage.shouldShowTitle('Searched Products');
    productsPage.elements.productCards().should('not.exist');
  });
});
