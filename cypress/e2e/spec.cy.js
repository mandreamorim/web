describe('template spec', () => {
  it('passes', () => {
    //  cy.visit('http://localhost:3000/login.html')
    //  cy.get('#email').type('liviamanoban6@gmail.com')
    //   cy.get('#password').type('123456')
    //   cy.get('.btn').click()
    cy.visit('http://localhost:3000/index.html')
    cy.get('.mobile-nav-toggle').click()
    /cy.get('#loginLink > a').click()
    cy.get('a').click()
     cy.visit('http://localhost:3000/cadastro.html')
     cy.get('#name').type('livia')
     cy.get('#email').type('teste@teste.com')
     cy.get('#matricula').type('1234')
     cy.get('#password').type('bemvindo')
     cy.get('#confirm_password').type('bemvindo')
     cy.get('.btn').click()
     cy.visit('http://localhost:3000/index.html')
    // cy.get('button').click()
    
   
   
  })
})