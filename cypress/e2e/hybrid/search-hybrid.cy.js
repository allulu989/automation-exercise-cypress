import productsPage from '../../pages/ProductsPage';

describe('Hybrid | API vs UI data', () => {
  it('TC_HYB_02 | Search results match between API and UI', () => {
    const keyword = 'tshirt';

    cy.apiRequest('POST', '/api/searchProduct', { search_product: keyword }).then(({ body }) => {
      const apiCount = body.products.length;
      cy.log(`API returned ${apiCount} products`);

      productsPage.visit();
      productsPage.search(keyword);
      productsPage.elements.productCards().should('have.length', apiCount);
    });
  });
});
