// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />
const faker= require('faker')

describe('Hooks', () => {
    beforeEach(() => {
      // runs before each test in the block
      cy.visit('./src/index.html')
    })
})

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function () {
        // runs before each test in the block
        cy.visit('./src/index.html')
        cy
            .contains('Feedback ').children('[type="radio"]').as('feedback')

    })
      
    it('verifica o título da aplicação', function () {
        cy.title().should('equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName').type('Jorge')
        cy.get('#lastName').type('Diz')
        cy.get('#email').type('jdiz@example.com')
        cy.get('#open-text-area').type(' ', { delay: 0 })
        cy.get('.button').click()
        cy.get('.success').contains('sucesso').should('be.visible')
    })
    
    it('não preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('.button').click()
        cy.get('.error').contains('obrigatórios').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Jorge')
        cy.get('#lastName').type('Diz')
        cy.get('#email').type('xiboquinha')
        cy.get('#open-text-area').type(' ')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })


    it('campo telefone fica vazio quando inserimos valor não numérico', function () {
        cy.get('#firstName').type('Jorge')
        cy.get('#lastName').type('Diz')
        cy.get('#email').type('jdiz@example.com')
        //cy.get('#phone').type('123')
        cy.get('#open-text-area').type(' ')
        cy.get('#phone').type('abc').should(($input) => {       
            const val = $input.val()
            expect(val).to.equal('')
            /*if(val.match(/[0-9]+/))
                cy.get('.success').should('be.visible')
            else
                cy.get('.error').should('be.visible')
            */
        })
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })


    it('campo telefone obrigatorio quando inserimos valor não numérico mostra erro', function () {
        cy.get('#firstName').type('Jorge')
        cy.get('#lastName').type('Diz')
        cy.get('#email').type('jdiz@example.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(' ')
        cy.get('#phone').type('abc')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('limpa campos', function () {
        cy.get('#firstName').type('Jorge').should('have.value','Jorge').clear().should('have.value','')
        cy.get('#lastName').type('Diz').should('have.value','Diz').clear().should('have.value','')
        cy.get('#email').type('jdiz@example.com').should('have.value','jdiz@example.com').clear().should('have.value','')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(' ')
        cy.get('#phone').type('123').should('have.value', '123').clear().should('have.value','')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('fill Mandatory Fields And Submit login', () => {
        let fields = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            comments: faker.lorem.sentence(),
        }

        cy.log('custom command will be called')
        cy.fillMandatoryFieldsAndSubmitlogin(fields);
    })

    it('preenche os campos (identificados por contains) obrigatórios e envia o formulário', function () {
        let fields = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            comments: faker.lorem.sentence(),
        }

        //cy.contains('Nome').parents('.field').children('input[type="text"]').type(fields.firstName)
        cy.contains('Nome').type(fields.firstName)
        
        //cy.get('.field').contains('Nome').children('input[type="text"]').type(fields.firstName)
        //cy.contains('Sobrenome').parents('.field').children('input[type="text"]').type(fields.lastName)
        cy.contains('Sobrenome').type(fields.lastName)
        
        //cy.contains('E-mail').parents('.field').children('input[type="email"]').type(fields.email)
        //cy.contains('E-mail').closest('.field').type(fields.email)
        cy.contains('E-mail').type(fields.email)

        //cy.contains('Como podemos te ajudar?').parents('.field').children('textarea').type(fields.comments)
        //cy.contains('Como podemos te ajudar?').closest('.field').type(fields.comments)
        //cy.contains('.field','Como podemos te ajudar?').type(fields.comments)
        cy.contains('Como podemos te ajudar?').nextAll('textarea').type(fields.comments)

        cy.contains('Enviar').click()
        cy.contains('span', 'Mensagem enviada com sucesso.').should('be.visible')
        cy.contains('span', 'Valide os campos obrigatórios').should('not.be.visible')
    })


    it ('seleciona o produto Youtube por seu texto', () => {
        cy.get('#product').select('YouTube')
        cy.get('#product option:selected').should('contain', 'YouTube')
        cy.get('#product option:selected').should('have.text', 'YouTube')
        cy.get('#product option:selected').should('have.value', 'youtube')

        //cy.get('#product').select('YouTube').get("option").should('have.text', 'YouTube')    
        cy.get('#product').select('Mentoria').get('option:selected').should('have.text', 'Mentoria')    
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.contains('Feedback ').children('[type="radio"]').check()
        .should('be.checked')
    })
    
    it ('marca cada tipo de atendimento', () => {
        //cy.contains('Feedback ').closest('label').children('[type="radio"]').as('feedback')
        
        cy.get('#support-type>label>input[type="radio"]').each((element) => {
            cy.get(element).parents('label').invoke('text').then((text) => {
                cy.log(text)

                cy.get(element).check().should('be.checked')
            })
        }) 
    })

    it ('marca cada tipo de atendimento (com wrap())', () => {
        //cy.contains('Feedback ').closest('label').children('[type="radio"]').as('feedback')
        
        cy.get('#support-type>label>input[type="radio"]').each((element) => {
            cy.wrap(element).check().should('be.checked').parents('label').invoke('text').then(
                (text) => {
                    cy.log(text)
                })
        }) 
    })

    it ('marca ambos checkboxes, depois desmarca o último', () => {
        let checkboxes = cy.get('#check>input[type="checkbox"]')
        
        checkboxes.each((checkbox) => {
            cy.wrap(checkbox).check() 
        })
        checkboxes.each((checkbox) => {
            cy.wrap(checkbox).should('be.checked')
        })
        checkboxes.last().uncheck().should('not.be.checked')
    })


    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
            .selectFile('./cypress/fixtures/example.json')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json', { encoding: null}).as('example')
        
        cy.get('#file-upload')
            .selectFile('@example')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
                      })
    })

    it('mostra a politica de privacidade em link externo', () => {
        cy.get('#privacy').children('a[href]')
            .each(($el, index) => {
                cy.wrap($el).each(val => {
                    cy.log('por extenso')
                    cy.log(JSON.stringify(val))
                })
                cy.log($el.attr('href'))
                cy.log($el.attr('target'))
                cy.wrap($el)
                    .should('have.attr', 'target', '_blank')
                cy.wrap($el)
                    .should('have.attr', 'href')
                    .should('match', /^\S+$/)
                    .should('be.a', 'string')
                //cy.wrap($el.attr('href')).should('not.be.null')
                //expect($el.attr('target')).to.equal('_blank')
            })
        
        //.should('not.be.null')
        //cy.get('@target').each((object) => {
        //    cy.log(object.val)
        //})
   
    })

    it ('mostra a politica de privacidade em link externo (removendo "target")', () => {
        cy.get('#privacy > a[href]').invoke('removeAttr', 'target').click()
        cy.url().should('match', /^.*\/privacy.html$/)
    })


    it.only('testa a página da política de privacidade de forma independente', () => {
        //cy.url().should('match', /^.*index\.html$/)
        
        cy.get('#privacy > a[href]').then($a => {

            const href = $a.prop('href')
            cy.log(href)
            cy.request(href)
            cy.contains('h1', 'CAC TAT').should('be.visible')
        })
    })
})
