import { buildUser } from '../../support/utils/dataFactory';

// These tests follow the full account lifecycle in order:
// create -> update -> read -> delete
describe('API | Account lifecycle', () => {
  let user;

  before(() => {
    cy.fixture('users').then((data) => {
      user = buildUser(data.newUser);
    });
  });

  it('TC_API_11 | Create a user account', () => {
    cy.apiRequest('POST', '/api/createAccount', user).then(({ body }) => {
      expect(body.responseCode).to.eq(201);
      expect(body.message).to.eq('User created!');
    });
  });

  it('TC_API_12 | Update a user account', () => {
    user = { ...user, city: 'Jeddah', company: 'Updated Company' };
    cy.updateUserViaApi(user).then(({ body }) => {
      expect(body.responseCode).to.eq(200);
      expect(body.message).to.eq('User updated!');
    });
  });

  it('TC_API_13 | Get user details by email', () => {
    cy.apiRequest('GET', '/api/getUserDetailByEmail', undefined, { email: user.email })
      .then(({ body }) => {
        expect(body.responseCode).to.eq(200);
        expect(body.user.email).to.eq(user.email);
        expect(body.user.city).to.eq('Jeddah');
      });
  });

  it('TC_API_14 | Delete a user account', () => {
    cy.apiRequest('DELETE', '/api/deleteAccount', { email: user.email, password: user.password })
      .then(({ body }) => {
        expect(body.responseCode).to.eq(200);
        expect(body.message).to.eq('Account deleted!');
      });
  });
});
