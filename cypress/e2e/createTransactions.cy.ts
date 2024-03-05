import { formatDateToLocal, formatCurrency } from "../../app/lib/utils"

describe('Create a transaction', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')

    cy.visit('/login')
    cy.fixture('user').then(user => {
      cy.getDataTestid('email-login').type(user.email)
      cy.getDataTestid('password-login').type(user.password)
    })
    cy.getDataTestid('login-btn').click()
    cy.url().should('match', /transactions/)
  })

  it('successfully creates a new transaction', () => {
    cy.visit('/transactions/create')
    cy.fixture('foodTransaction').then(transaction => {
      // Create transaction
      cy.getDataTestid('select-category').select(transaction.category)
      cy.getDataTestid('amount-input').type(transaction.amount)
      cy.getDataTestid('description-input').type(transaction.description)
      cy.getDataTestid('date-input')
      .type(transaction.date)
      cy.getDataTestid('create-transaction-btn').click()
      
      // Read transaction
      cy.getDataTestid('transaction-category-mobile').should('contain.text', transaction.category)
      cy.getDataTestid('transaction-amount-mobile').should('contain.text', formatCurrency(transaction.amount*100)) // amount is stored in cents in the database
      cy.getDataTestid('transaction-description-mobile').should('contain.text', transaction.description)
      cy.getDataTestid('transaction-date-mobile').should('contain.text', formatDateToLocal(transaction.date.split('T')[0]))
    })
  })
})