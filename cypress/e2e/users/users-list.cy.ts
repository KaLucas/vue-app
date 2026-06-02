beforeEach(() => {
  cy.intercept('GET', '**/collections/users/records*', {
    fixture: 'users-list.json',
  }).as('get-users-list')

  cy.login()
  cy.wait('@get-users-list')
})

it('Should list users', () => {
  cy.get('[data-testid="users-list-component"]').should('exist')
  cy.get('[data-testid=users-list-result]').should('have.length.greaterThan', 0)
  cy.get('tbody > tr > td').eq(0).should('contain.text', 'Novo')
})

it('Should change to page 2 and list users', () => {
  cy.intercept('GET', '**/collections/users/records*', (req) => {
    req.reply({ fixture: 'users-list-page-2.json' })
  }).as('get-page-2')

  cy.contains('Próximo').should('not.be.disabled').click()
  cy.wait('@get-page-2')
  cy.contains('Dawn').should('be.visible')
})
