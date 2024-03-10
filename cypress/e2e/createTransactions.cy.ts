import { formatDateToLocal, formatCurrency } from "../../app/lib/utils"

describe('Create a transaction', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')

    cy.fixture('user').then(user => {
      cy.session(user, () => {
        cy.visit('/login')
        cy.getDataTestid('email-login').type(user.email)
        cy.getDataTestid('password-login').type(user.password)
        cy.getDataTestid('login-btn').click()
        cy.url().should('match', /transactions/)
      })
    })
  })

  it('successfully creates a new transaction and deletes it', () => {
    cy.fixture('transactions').then(transactions => {
      for(const transaction of transactions){
        cy.visit('/transactions/create')
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

        cy.getDataTestid('delete-transaction-btn').first().click()
      }
    })
  })

  it('tries to create a transaction with no category', () => {
    cy.fixture('transactions').then(transactions => {
      for(const transaction of transactions){
        cy.visit('/transactions/create')
        // Create transaction
        // cy.getDataTestid('select-category').select(transaction.category) // No category chosen
        cy.getDataTestid('amount-input').type(transaction.amount)
        cy.getDataTestid('description-input').type(transaction.description)
        cy.getDataTestid('date-input')
        .type(transaction.date)
        cy.getDataTestid('create-transaction-btn').click()
        
        // Ensure error gets displayed
        cy.getDataTestid('category-error').should('contain.text', 'Please select a category.')
      }
    })
  })

  it('tries to create a transaction with no amount', () => {
    cy.fixture('transactions').then(transactions => {
      for(const transaction of transactions){
        cy.visit('/transactions/create')
        // Create transaction
        cy.getDataTestid('select-category').select(transaction.category) // No category chosen
        // cy.getDataTestid('amount-input').type(transaction.amount)
        cy.getDataTestid('description-input').type(transaction.description)
        cy.getDataTestid('date-input')
        .type(transaction.date)
        cy.getDataTestid('create-transaction-btn').click()
        
        // Ensure error gets displayed
        cy.getDataTestid('amount-error').should('contain.text', 'Amount must not be equal to 0')
      }
    })
  })

  it('tries to create a transaction with no description', () => {
    cy.fixture('transactions').then(transactions => {
      for(const transaction of transactions){
        cy.visit('/transactions/create')
        // Create transaction
        cy.getDataTestid('select-category').select(transaction.category) // No category chosen
        cy.getDataTestid('amount-input').type(transaction.amount)
        // cy.getDataTestid('description-input').type(transaction.description)
        cy.getDataTestid('date-input')
        .type(transaction.date)
        cy.getDataTestid('create-transaction-btn').click()
        
        // Ensure error gets displayed
        cy.getDataTestid('description-error').should('contain.text', 'Please enter a description.')
      }
    })
  })

  it('tries to create a transaction with a long description', () => {
    cy.fixture('transactions').then(transactions => {
      for(const transaction of transactions){
        cy.visit('/transactions/create')
        // Create transaction with a long description
        cy.getDataTestid('select-category').select(transaction.category)
        cy.getDataTestid('amount-input').type(transaction.amount)
        cy.getDataTestid('description-input').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.') // Example of a long description
        cy.getDataTestid('date-input').type(transaction.date)
        cy.getDataTestid('create-transaction-btn').click()
        
        // Ensure error gets displayed
        cy.getDataTestid('description-error').should('contain.text', 'String must contain at most 25 character(s)')
      }
    })
  })

  it('tries to create a transaction with an invalid amount', () => {
    cy.fixture('transactions').then(transactions => {
      for(const transaction of transactions){
        cy.visit('/transactions/create')
        // Create transaction with a long description
        cy.getDataTestid('select-category').select(transaction.category)
        cy.getDataTestid('amount-input').type(`${transaction.amount}23`)
        cy.getDataTestid('description-input').type(transaction.description) // Example of a long description
        cy.getDataTestid('date-input').type(transaction.date)
        cy.getDataTestid('create-transaction-btn').click()
        
        // Ensure input doesnt go through
        cy.url().should('match', /transactions\/create/)
      }
    })
  })
})