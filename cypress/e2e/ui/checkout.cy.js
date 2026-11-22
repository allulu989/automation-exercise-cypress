import productsPage from '../../pages/ProductsPage';
import cartPage from '../../pages/CartPage';
import checkoutPage from '../../pages/CheckoutPage';
import { buildUser } from '../../support/utils/dataFactory';

describe('Checkout', () => {
  let user;
  let card;

  before(() => {
    cy.fixture('payment').then((data) => {
      card = data;
    });
  });

  // A fresh user for every test keeps tests independent
  beforeEach(() => {
    cy.fixture('users').then((data) => {
      user = buildUser(data.newUser);
    });
  });

  const loginAndAddProduct = () => {
    cy.createUserViaApi(user);
    cy.loginViaUi(user.email, user.password);
    productsPage.visit();
    productsPage.addProductToCart(0);
    productsPage.viewCartFromModal();
    cartPage.shouldHaveItems(1);
  };

  afterEach(() => {
    cy.deleteUserViaApi(user.email, user.password);
  });

  it('TC_CHK_01 | Place an order as a logged-in user', () => {
    loginAndAddProduct();
    cartPage.proceedToCheckout();
    checkoutPage.placeOrder('Please deliver in the morning.');
    checkoutPage.pay(card);
    checkoutPage.shouldShowOrderPlaced();
  });

  it('TC_CHK_02 | Checkout as a guest asks the user to login', () => {
    productsPage.visit();
    productsPage.addProductToCart(0);
    productsPage.viewCartFromModal();
    cartPage.proceedToCheckout();

    cartPage.elements.checkoutModal().should('be.visible');
    cartPage.elements.registerLoginInModal().should('be.visible').and('contain.text', 'Register / Login');
  });

  it('TC_CHK_03 | Delivery and billing addresses match registration data', () => {
    loginAndAddProduct();
    cartPage.proceedToCheckout();
    checkoutPage.shouldShowAddress(checkoutPage.elements.deliveryAddress, user);
    checkoutPage.shouldShowAddress(checkoutPage.elements.billingAddress, user);
  });

  it('TC_CHK_04 | Download invoice after placing an order', () => {
    loginAndAddProduct();
    cartPage.proceedToCheckout();
    checkoutPage.placeOrder('Invoice test order.');
    checkoutPage.pay(card);
    checkoutPage.shouldShowOrderPlaced();

    checkoutPage.elements.downloadInvoice().click();
    cy.readFile('cypress/downloads/invoice.txt', { timeout: 15000 }).should('not.be.empty');
  });
});
