describe('API | Brands', () => {
  it('TC_API_03 | Get all brands', () => {
    cy.apiRequest('GET', '/api/brandsList').then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.responseCode).to.eq(200);
      expect(body.brands).to.be.an('array').and.not.be.empty;
      expect(body.brands[0]).to.include.all.keys('id', 'brand');
    });
  });

  it('TC_API_04 | PUT to brands list is not allowed', () => {
    cy.apiRequest('PUT', '/api/brandsList').then(({ body }) => {
      expect(body.responseCode).to.eq(405);
      expect(body.message).to.eq('This request method is not supported.');
    });
  });
});
