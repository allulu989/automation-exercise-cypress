describe('API | Search Product', () => {
  it('TC_API_05 | Search for a product', () => {
    cy.apiRequest('POST', '/api/searchProduct', { search_product: 'tshirt' }).then(({ body }) => {
      expect(body.responseCode).to.eq(200);
      expect(body.products).to.be.an('array').and.not.be.empty;
    });
  });

  it('TC_API_06 | Search without the search_product param', () => {
    cy.apiRequest('POST', '/api/searchProduct').then(({ body }) => {
      expect(body.responseCode).to.eq(400);
      expect(body.message).to.eq('Bad request, search_product parameter is missing in POST request.');
    });
  });
});
