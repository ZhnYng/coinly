describe('Login tests', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
  })
  
  it('redirects non-logged in users to the login page.', () => {
    cy.visit('/transactions')
    cy.url().should('match', /login/)
  })

  it('logs in the user with correct credentials.', () => {
    cy.visit('/login')
    cy.fixture('user').then(user => {
      cy.getDataTestid('email-login').type(user.email)
      cy.getDataTestid('password-login').type(user.password)
    })
    cy.getDataTestid('login-btn').click()
    cy.url().should('match', /transactions/)
  })
  
  it('logs in the user with a non-registered email.', () => {
    cy.visit('/login')
    cy.getDataTestid('email-login').type('non-registered@gmail.com')
    cy.getDataTestid('password-login').type('non-registered')
    cy.getDataTestid('login-btn').click()
    cy.getDataTestid('login-error').should('contain.text', 'Invalid credentials.')
  })

  it('logs in the user with the wrong password.', () => {
    cy.visit('/login')
    cy.fixture('user').then(user => {
      cy.getDataTestid('email-login').type(user.email)
    })
    cy.getDataTestid('password-login').type('wrong password')
    cy.getDataTestid('login-btn').click()
    cy.getDataTestid('login-error').should('contain.text', 'Invalid credentials.')
  })

  it('logs in the user with an invalid email format.', () => {
    cy.visit('/login')
    cy.getDataTestid('email-login').type('test@gmail')
    cy.fixture('user').then(user => {
      cy.getDataTestid('password-login').type(user.password)
    })
    cy.getDataTestid('login-btn').click()
    cy.getDataTestid('email-error').should('contain.text', 'Please enter a valid email.')
  })
})