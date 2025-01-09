// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// -- This is a parent command --
Cypress.Commands.add('fillMandatoryFieldsAndSubmitlogin', (fields) => { 
    cy.get('#firstName').type(fields.firstName)
    cy.get('#lastName').type(fields.lastName)
    cy.get('#email').type(fields.email)
    cy.get('#open-text-area').type(fields.comments)
    cy.get('.button').click()
    cy.get('.success').should('be.visible')
})