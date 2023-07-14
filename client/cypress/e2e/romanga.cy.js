

describe('Romanga', () => {
  it("login and logout should succeed", () => {
    cy.visit('http://localhost:3000/login')
    cy.get('.email').type('rombuski@gmail.com').should("have.value", "rombuski@gmail.com")
    cy.get('.password').type('rombuski').should("have.value", "rombuski")
    cy.get('#login-btn').click();
    cy.wait(3000)
    cy.contains("ROMANGA")
    cy.get('.user').click();
    cy.get('#logout').click()
  })

  it("login should fail", function() {
    cy.visit('http://localhost:3000/login')
    cy.get('.email').type('user').should("have.value", "user")
    cy.get('.password').type('password').should("have.value", "password")
    cy.get('#login-btn').click();
    cy.wait(3000)
    cy.contains("Incorrect email or password")
  })

  it("registration should succeed", function() {

  })
})