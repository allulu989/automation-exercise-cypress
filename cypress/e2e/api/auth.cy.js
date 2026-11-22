import { buildUser } from '../../support/utils/dataFactory';

describe('API | Verify Login', () => {
  let user;
  let invalidUser;

  before(() => {
    cy.fixture('users').then((data) => {
      user = buildUser(data.newUser);
      invalidUser = data.invalidUser;
      cy.createUserViaApi(user);
    });
  });

  after(() => {
    cy.deleteUserViaApi(user.email, user.password);
  });

  it('TC_API_07 | Verify login with valid credentials', () => {
    cy.apiRequest('POST', '/api/verifyLogin', { email: user.email, password: user.password })
      .then(({ body }) => {
        expect(body.responseCode).to.eq(200);
        expect(body.message).to.eq('User exists!');
      });
  });

  it('TC_API_08 | Verify login without email', () => {
    cy.apiRequest('POST', '/api/verifyLogin', { password: user.password }).then(({ body }) => {
      expect(body.responseCode).to.eq(400);
      expect(body.message).to.eq('Bad request, email or password parameter is missing in POST request.');
    });
  });

  it('TC_API_09 | DELETE on verifyLogin is not allowed', () => {
    cy.apiRequest('DELETE', '/api/verifyLogin').then(({ body }) => {
      expect(body.responseCode).to.eq(405);
      expect(body.message).to.eq('This request method is not supported.');
    });
  });

  it('TC_API_10 | Verify login with invalid credentials', () => {
    cy.apiRequest('POST', '/api/verifyLogin', invalidUser).then(({ body }) => {
      expect(body.responseCode).to.eq(404);
      expect(body.message).to.eq('User not found!');
    });
  });
});
