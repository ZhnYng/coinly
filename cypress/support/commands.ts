export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-testid attribute.
       * @example cy.data-testid('greeting')
       */
      getDataTestid(value: string): Chainable<JQuery<HTMLElement>>
    }
  }
}

Cypress.Commands.add('getDataTestid', (value) => {
  return cy.get(`[data-testid=${value}]`)
})