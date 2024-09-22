// Most tests for update transactions and create transaction are the same
import { formatDateToLocal, formatCurrency } from "../../app/lib/utils";

describe("Create a transaction", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");

    cy.fixture("user").then((user) => {
      cy.session(user, () => {
        cy.visit("/login");
        cy.getDataTestid("email-login").type(user.email);
        cy.getDataTestid("password-login").type(user.password);
        cy.getDataTestid("login-btn").click();
        cy.url().should("match", /transactions/);
      });
    });
  });

  before(() => {
    cy.viewport("iphone-x");

    cy.fixture("user").then((user) => {
      cy.session(user, () => {
        cy.visit("/login");
        cy.getDataTestid("email-login").type(user.email);
        cy.getDataTestid("password-login").type(user.password);
        cy.getDataTestid("login-btn").click();
        cy.url().should("match", /transactions/);
      });
    });
    
    // Create a transaction for update testing
    cy.fixture("transactions").then((transactions) => {
      const transaction = transactions[0];
      cy.visit("/transactions/create");
      // Create transaction
      cy.getDataTestid("select-category").filter(':visible').select(transaction.category);
      cy.getDataTestid("amount-input").filter(':visible').type(transaction.amount);
      cy.getDataTestid("description-input").filter(':visible').type(transaction.description);
      cy.getDataTestid("date-input").filter(':visible').type(transaction.date);
      cy.getDataTestid("create-transaction-btn").filter(':visible').click();

      // Read transaction
      cy.getDataTestid("transaction-category-mobile").filter(':visible').should(
        "contain.text",
        transaction.category
      );
      cy.getDataTestid("transaction-amount-mobile").filter(':visible').should(
        "contain.text",
        formatCurrency(transaction.amount * 100)
      ); // amount is stored in cents in the database
      cy.getDataTestid("transaction-description-mobile").filter(':visible').should(
        "contain.text",
        transaction.description
      );
      cy.getDataTestid("transaction-date-mobile").filter(':visible').should(
        "contain.text",
        formatDateToLocal(transaction.date.split("T")[0])
      );
    });
  });

  after(() => {
    cy.fixture("transactions").then((transactions) => {
      const transaction = transactions[0];

      cy.visit(`/transactions?month=${new Date(transaction.date).getMonth()+1}&&year=${new Date(transaction.date).getFullYear()}`)
  
      // Delete transaction created for testing update
      cy.getDataTestid("delete-transaction-btn").filter(':visible').first().click();
    })
  })

  it("successfully edits a transaction amount", () => {
    cy.fixture("transactions").then((transactions) => {
      const transaction = transactions[0];

      cy.visit(`/transactions?month=${new Date(transaction.date).getMonth()+1}&&year=${new Date(transaction.date).getFullYear()}`)

      // Read transaction
      cy.getDataTestid('transaction-category-mobile').filter(':visible').should('contain.text', transaction.category)
      cy.getDataTestid('transaction-amount-mobile').filter(':visible').should('contain.text', formatCurrency(transaction.amount*100)) // amount is stored in cents in the database
      cy.getDataTestid('transaction-description-mobile').filter(':visible').should('contain.text', transaction.description)
      cy.getDataTestid('transaction-date-mobile').filter(':visible').should('contain.text', formatDateToLocal(transaction.date.split('T')[0]))
      
      cy.wait(200)
      cy.getDataTestid("update-transaction-btn").filter(':visible').first().should('be.visible').click();
      cy.url().should("match", /transactions\/\d+\/edit/);

      // Edit transaction
      cy.getDataTestid("amount-input").filter(':visible').clear().type("-999.99");
      cy.getDataTestid("confirm-update-btn").filter(':visible').click();

      cy.url().should("not.match", /edit/);
      cy.url().should("match", /transactions/);

      cy.getDataTestid('transaction-amount-mobile').filter(':visible').should('contain.text', formatCurrency(-999.99*100)) // amount is stored in cents in the database
    })
  });

  it("tries to edit a transaction with no amount", () => {
    cy.fixture("transactions").then((transactions) => {
      const transaction = transactions[0];

      cy.visit(`/transactions?month=${new Date(transaction.date).getMonth()+1}&&year=${new Date(transaction.date).getFullYear()}`)
      cy.wait(200)
      cy.getDataTestid("update-transaction-btn").filter(':visible').first().should('be.visible').click();
      cy.url().should("match", /transactions\/\d+\/edit/);

      // Update transaction
      cy.getDataTestid('amount-input').filter(':visible').clear();
      cy.getDataTestid("confirm-update-btn").filter(':visible').click();

      // Ensure error gets displayed
      cy.getDataTestid("amount-error").filter(':visible').should(
        "contain.text",
        "Amount must not be equal to 0"
      );
    });
  });

  it("tries to edit a transaction with no description", () => {
    cy.fixture("transactions").then((transactions) => {
      const transaction = transactions[0];

      cy.visit(`/transactions?month=${new Date(transaction.date).getMonth()+1}&&year=${new Date(transaction.date).getFullYear()}`)
      
      cy.wait(200)
      cy.getDataTestid("update-transaction-btn").filter(':visible').first().should('be.visible').click();
      cy.url().should("match", /transactions\/\d+\/edit/);

      // Update transaction
      cy.getDataTestid('description-input').filter(':visible').clear();
      cy.getDataTestid("confirm-update-btn").filter(':visible').click();

      // Ensure error gets displayed
      cy.getDataTestid("description-error").filter(':visible').should(
        "contain.text",
        "Please enter a description."
      );
    })
  });

  it("tries to edit a transaction with a long description", () => {
    cy.fixture("transactions").then((transactions) => {
      const transaction = transactions[0];

      cy.visit(`/transactions?month=${new Date(transaction.date).getMonth()+1}&&year=${new Date(transaction.date).getFullYear()}`)

      cy.wait(200)
      cy.getDataTestid("update-transaction-btn").filter(':visible').first().should('be.visible').click();
      cy.url().should("match", /transactions\/\d+\/edit/);

      // Update transaction with a long description
      cy.getDataTestid("description-input").filter(':visible').clear().type(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      ); // Example of a long description
      cy.getDataTestid("confirm-update-btn").filter(':visible').click();

      // Ensure error gets displayed
      cy.getDataTestid("description-error").filter(':visible').should(
        "contain.text",
        "String must contain at most 25 character(s)"
      );
    });
  });

  it("tries to create a transaction with an invalid amount", () => {
    cy.fixture("transactions").then((transactions) => {
      const transaction = transactions[0];

      cy.visit(`/transactions?month=${new Date(transaction.date).getMonth()+1}&&year=${new Date(transaction.date).getFullYear()}`)

      cy.wait(200)
      cy.getDataTestid("update-transaction-btn").filter(':visible').first().should('be.visible').click();
      cy.url().should("match", /transactions\/\d+\/edit/);

      // Create transaction with a long description
      cy.getDataTestid("amount-input").filter(':visible').clear().type(`${transaction.amount}23`);
      cy.getDataTestid("confirm-update-btn").filter(':visible').click();

      // Ensure input doesnt go through
      cy.url().should("match", /transactions\/\d+\/edit/);
    });
  });
});
