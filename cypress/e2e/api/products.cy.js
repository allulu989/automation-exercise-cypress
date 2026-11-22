describe('API | Products', () => {
  it('TC_API_01 | Get all products', () => {
    cy.apiRequest('GET', '/api/productsList').then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.responseCode).to.eq(200);
      expect(body.products).to.be.an('array').and.not.be.empty;
      expect(body.products[0]).to.include.all.keys('id', 'name', 'price', 'brand', 'category');
    });
  });

  it('TC_API_02 | POST to products list is not allowed', () => {
    cy.apiRequest('POST', '/api/productsList').then(({ body }) => {
      expect(body.responseCode).to.eq(405);
      expect(body.message).to.eq('This request method is not supported.');
    });
  });
});
