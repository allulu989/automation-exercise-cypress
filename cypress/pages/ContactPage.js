class ContactPage {
  elements = {
    title: () => cy.contains('h2', 'Get In Touch'),
    name: () => cy.get('[data-qa="name"]'),
    email: () => cy.get('[data-qa="email"]'),
    subject: () => cy.get('[data-qa="subject"]'),
    message: () => cy.get('[data-qa="message"]'),
    upload: () => cy.get('input[name="upload_file"]'),
    submit: () => cy.get('[data-qa="submit-button"]'),
    success: () => cy.get('.contact-form .status.alert-success'),
  };

  fillForm({ name, email, subject, message }, filePath) {
    this.elements.title().should('be.visible');
    this.elements.name().type(name);
    this.elements.email().type(email);
    this.elements.subject().type(subject);
    this.elements.message().type(message);
    this.elements.upload().selectFile(filePath);
  }

  submit() {
    // The site shows a confirm() dialog: we accept it
    cy.on('window:confirm', () => true);
    this.elements.submit().click();
  }

  shouldShowSuccess() {
    this.elements.success()
      .should('be.visible')
      .and('contain.text', 'Success! Your details have been submitted successfully.');
  }
}

export default new ContactPage();
