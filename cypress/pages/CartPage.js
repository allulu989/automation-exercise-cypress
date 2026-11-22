class CartPage {
  elements = {
    rows: () => cy.get('#cart_info_table tbody tr[id^="product-"]'),
    proceedToCheckout: () => cy.contains('a.check_out', 'Proceed To Checkout'),
    checkoutModal: () => cy.get('#checkoutModal'),
    registerLoginInModal: () => cy.get('#checkoutModal a[href="/login"]'),
    emptyCart: () => cy.get('#empty_cart'),
  };

  visit() {
    cy.visit('/view_cart');
  }

  shouldHaveItems(count) {
    this.elements.rows().should('have.length', count);
  }

  // Checks that price x quantity = total for every row
  shouldHaveCorrectTotals() {
    this.elements.rows().each(($row) => {
      const toNumber = (text) => Number(text.replace(/[^0-9]/g, ''));
      const price = toNumber($row.find('.cart_price p').text());
      const qty = toNumber($row.find('.cart_quantity button').text());
      const total = toNumber($row.find('.cart_total_price').text());
      expect(total, 'row total').to.eq(price * qty);
    });
  }

  shouldHaveQuantity(rowIndex, qty) {
    this.elements.rows().eq(rowIndex).find('.cart_quantity button').should('have.text', String(qty));
  }

  removeFirstItem() {
    this.elements.rows().first().find('.cart_quantity_delete').click();
  }

  proceedToCheckout() {
    this.elements.proceedToCheckout().click();
  }
}

export default new CartPage();
