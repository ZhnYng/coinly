export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-testid attribute.
       * @example cy.data-testid('greeting')
       */
      getDataTestid(value: string): Chainable<JQuery<HTMLElement>>;
      bypassLogin(): Chainable<any>;
    }
  }
}

Cypress.Commands.add("getDataTestid", (value) => {
  return cy.get(`[data-testid=${value}]`);
});

Cypress.Commands.add("bypassLogin", (email, password) => {
  cy.session(
    [email, password],
    () => {
      cy.visit("/login");
      cy.fixture("user").then((user) => {
        cy.getDataTestid("email-login").type(user.email);
        cy.getDataTestid("password-login").type(user.password);
      });
      cy.getDataTestid("login-btn").click();
      cy.url().should("match", /transactions/);
    },
    {
      cacheAcrossSpecs: true,
    }
  );
});
