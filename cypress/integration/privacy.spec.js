/// <reference types="Cypress" />
const faker= require('faker')

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function () {
        // runs before each test in the block
        cy.visit('./src/privacy.html')
    })
      
    it.only('verifica o título da aplicação', function () {
        //let text = cy.get('#title').as('texto')
        //cy.log(cy.get('@texto').invoke('text').invoke('toString'))

        cy.get('#title').should('have.text','CAC TAT - Política de privacidade')
    })
})