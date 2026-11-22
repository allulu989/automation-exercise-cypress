// Custom commands for setup and cleanup.
// Using the API for setup keeps UI tests fast and independent.

// The API returns JSON as text, so we parse it here once.
const parseBody = (body) => {
  if (typeof body !== 'string') return body;
  try {
    return JSON.parse(body);
  } catch (e) {
    return body;
  }
};

Cypress.Commands.add('apiRequest', (method, url, body, qs) => {
  return cy
    .request({ method, url, form: true, body, qs, failOnStatusCode: false })
    .then((res) => ({ status: res.status, body: parseBody(res.body) }));
});

// Keeps only the fields the createAccount / updateAccount APIs expect
const accountPayload = (user) => {
  const fields = ['name', 'email', 'password', 'title', 'birth_date', 'birth_month',
    'birth_year', 'firstname', 'lastname', 'company', 'address1', 'address2',
    'country', 'state', 'city', 'zipcode', 'mobile_number'];
  return fields.reduce((acc, key) => ({ ...acc, [key]: user[key] }), {});
};

Cypress.Commands.add('createUserViaApi', (user) => {
  cy.apiRequest('POST', '/api/createAccount', accountPayload(user))
    .its('body.responseCode')
    .should('eq', 201);
});

Cypress.Commands.add('updateUserViaApi', (user) => {
  return cy.apiRequest('PUT', '/api/updateAccount', accountPayload(user));
});

Cypress.Commands.add('deleteUserViaApi', (email, password) => {
  cy.apiRequest('DELETE', '/api/deleteAccount', { email, password });
});

Cypress.Commands.add('loginViaUi', (email, password) => {
  cy.visit('/login');
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(password, { log: false });
  cy.get('[data-qa="login-button"]').click();
  cy.contains('a', 'Logged in as').should('be.visible');
});
