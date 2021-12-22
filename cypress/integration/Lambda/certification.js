import LambdaPage from "../../support/pageObjects/lambdaPage.js";
import terminalLog from "../../support/terminalog.js";

describe("Steps 1 to 5", () => {
  before("Visit page", () => {
    cy.visit("/automation-demos");
    cy.url().should("match", /automation-demos/);
  });
  beforeEach("Change viewport to iphone-se2", () => {
    cy.viewport("iphone-se2");
  });

  it("Step 2: It should login to page and confirm toast disappears", () => {
    LambdaPage.login("lambda", "lambda123");
  });

  it("Step 3: Should allow to fill in registered email and click autopopulate", () => {
    LambdaPage.fillInEmail("xfaramir@gmail.com");
  });

  it("Step 4: Should allow to engage with alert pop-up and answer feedback form", () => {
    //Frecuencies are : "Every month", "Once in 3 months", "Once in 6 months", "Once a year"
    LambdaPage.fillInFormFrecuency("Once in 3 months");

    // Decisive factors are: "Customer service", "Discounts", "Delivery time", "Others"
    LambdaPage.selectDecesiveFactors("Discounts");

    // Payment methods are: "Credit card", "Wallets", "Cash on delivery"
    LambdaPage.selectPaymentMethod("Wallets");
    LambdaPage.confirmPurchaseLastYear();
  });

  it("Step 5 : Should allow to adjust the rating scale from 1-10", () => {
    // rating scale 1-10 are: ".progress1, 10", ".progress2 , 20 ", ".progress3 , 30", ".progress4, 40"   ...... etc
    LambdaPage.adjustRatingScale(".progress9", 90);
  });
});

describe("Steps 6 and 14", () => {
  beforeEach(() => {
    cy.viewport("samsung-note9");
    cy.preserveCookie();
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.preserveCookie();
    cy.saveLocalStorage();
  });
  it("Step 6: Go to Selenium Page and Wait for elements load completely.", () => {
    cy.visit("/selenium-automation");
    cy.url().should("match", /selenium-automation/);
  });

  it("Step 7: Should find Image logo and download it", () => {
    cy.downloadFile(
      "https://www.lambdatest.com/resources/images/Jenkins.svg",
      "cypress/fixtures",
      "Jenkins.svg"
    );
  });

  it("Step 8: Should revisit automation playground page and change viewport", () => {
    cy.visit("/automation-demos");
    LambdaPage.login("lambda", "lambda123");
    cy.get("input[id='developer-name']").type("xfaramir@gmail.com");
    cy.get("input[id='populate']").click();

    //Frecuencies are : "Every month", "Once in 3 months", "Once in 6 months", "Once a year"
    LambdaPage.fillInFormFrecuency("Once in 3 months");

    // Decisive factors are: "Customer service", "Discounts", "Delivery time", "Others"
    LambdaPage.selectDecesiveFactors("Discounts");

    // Payment methods are: "Credit card", "Wallets", "Cash on delivery"
    LambdaPage.selectPaymentMethod("Wallets");
    LambdaPage.confirmPurchaseLastYear();

    // rating scale 1-10 are: ".progress1, 10", ".progress2 , 20 ", ".progress3 , 30", ".progress4, 40"   ...... etc
    LambdaPage.adjustRatingScale(".progress9", 90);
    LambdaPage.fillOutFeedbackTextArea("Though test");
  });

  it("Step 9: Upload image to form", () => {
    cy.get("input[type='file']#file")
      .attachFile("jenkins.svg")
      .trigger("input", { force: true });
  });

  it("Step 10: Confirm the image is uploaded succesfully", () => {
    cy.on("window:alert", (text) => {
      expect(text).to.contains("your image upload sucessfully!!");
    });
  });

  it("Step 11: Should conform with form accessibility standards W3", () => {
    cy.injectAxe();
    cy.checkA11y(
      ".automationbar",
      {
        runOnly: {
          type: "tag",
          values: ["wcag2a"],
        },
      },
      terminalLog,
      { skipFailures: true }
    );
  });

  it("Step 12: Should be able to see form submittion confirmation", () => {
    cy.contains("#submit-button", "Submit").click();
    cy.get("h1.tracking-wide").should("contain", "Thank you!");
  });

  it("Step 13: Should Verify performance metrics on submittion page", () => {
    cy.lighthouse({
      performance: 80,
      accessibility: 85,
      "best-practices": 80,
      seo: 85,
      pwa: 42,
    });
  });

  it("Step 14-15: Should be able to see form submittion confirmation - end test", () => {
    cy.contains("p.tracking-wide", "You have successfully submitted the form.");
  });
});
