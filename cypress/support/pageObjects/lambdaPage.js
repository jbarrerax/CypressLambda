class LambdaPage {
  constructor() {
    this.email = "";
  }
  login(username, password) {
    cy.get("#username").type(username, { force: true });
    cy.get("#password").type(password);
    cy.get("button.applynow").contains("Login").click();
    cy.get(".automation__toast")
      .contains("Thank You Successully Login!!")
      .should("be.visible");
    cy.get(".automation__toast").should("not.exist");
    cy.preserveCookie();
  }

  fillInEmail(email) {
    this.email = email;
    cy.get("input[id='developer-name']").type(email);
    cy.get("input[id='populate']").click();
  }
  fillInFormFrecuency(purchaseFrecuency) {
    cy.on("window:alert", (text) => {
      expect(text).to.contains(this.email);
    });

    cy.contains(
      ".radio-button h1",
      "How frequently do you make a purchase on an eCommerce website?"
    ).should("be.visible");

    cy.contains(`label[for='${purchaseFrecuency}']`, `${purchaseFrecuency}`)
      .should("be.visible")
      .find(`[type='radio']`)
      .check()
      .should("be.checked");
  }

  selectDecesiveFactors(factor) {
    cy.contains(
      ".checkbox h1",
      "Which are the decisive factors before making an eCommerce purchase?"
    ).should("be.visible");

    cy.contains(`${factor}`)
      .find(`[type='checkbox']`)
      .should("be.visible")
      .not("[disabled]")
      .check()
      .should("be.checked");
  }

  selectPaymentMethod(method) {
    cy.get("#preferred-payment")
      .should("have.value", "Credit or Debit card")
      .select(method);
  }

  confirmPurchaseLastYear() {
    cy.get("#tried-section label[for='tried-ecom']")
      .contains("I have made an eCommerce purchase in the last 1 year")
      .find("input[type='checkbox']#tried-ecom")
      .type("Cypress.io{backspace}")
      .should("be.checked");
  }

  adjustRatingScale(rating, value) {
    cy.document().then((doc) => {
      let sliderMoveToValue = doc
        .querySelector(`.flex  > ${rating}`)
        .getBoundingClientRect().x;

      cy.get("div[role='slider'][aria-valuenow='50']")
        .focus()
        .trigger("mousedown", { which: 1, button: 0 }, { force: true })
        .trigger("mousemove", {
          clientX: sliderMoveToValue,
          clientY: 0,
        })
        .trigger("mouseup", { force: true })
        .should("have.attr", "aria-valuenow", value);
    });
  }

  fillOutFeedbackTextArea(text) {
    cy.get("textarea[id='comments']").type(text, { force: true });
  }
}

export default new LambdaPage();
