import productsPage from '../../pages/ProductsPage';
import productDetailsPage from '../../pages/ProductDetailsPage';
import cartPage from '../../pages/CartPage';
import { buildUser } from '../../support/utils/dataFactory';

describe('Cart', () => {
  it('TC_CRT_01 | Add two products to the cart', () => {
    productsPage.visit();
    productsPage.addProductToCart(0);
    productsPage.continueShopping();
    productsPage.addProductToCart(1);
    productsPage.viewCartFromModal();

    cartPage.shouldHaveItems(2);
    cartPage.shouldHaveCorrectTotals();
  });

  it('TC_CRT_02 | Add a product with quantity 4', () => {
    productsPage.visit();
    productsPage.openFirstProduct();
    productDetailsPage.setQuantity(4);
    productDetailsPage.addToCartAndViewCart();

    cartPage.shouldHaveItems(1);
    cartPage.shouldHaveQuantity(0, 4);
  });

  it('TC_CRT_03 | Remove a product from the cart', () => {
    productsPage.visit();
    productsPage.addProductToCart(0);
    productsPage.viewCartFromModal();
    cartPage.shouldHaveItems(1);

    cartPage.removeFirstItem();
    cartPage.elements.rows().should('not.exist');
  });

  it('TC_CRT_04 | Cart keeps products after login', () => {
    cy.fixture('users').then((data) => {
      const user = buildUser(data.newUser);
      cy.createUserViaApi(user);

      productsPage.visit();
      productsPage.search('top');
      productsPage.addProductToCart(0);
      productsPage.viewCartFromModal();
      cartPage.shouldHaveItems(1);

      cy.loginViaUi(user.email, user.password);
      cartPage.visit();
      cartPage.shouldHaveItems(1);

      cy.deleteUserViaApi(user.email, user.password);
    });
  });
});
