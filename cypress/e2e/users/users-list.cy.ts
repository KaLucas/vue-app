describe('Users List', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list.json',
    }).as('get-users-list')

    cy.login('/admin/dashboard')
    cy.contains('Lista de Usuários').should('be.visible')
  })

  it('Should list users', () => {
    cy.get('[data-testid=users-list-result]').should('have.length.greaterThan', 0)
  })

  it('Should change to page 2 and list users', () => {
    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list-page-2.json',
    }).as('get-users-list2')

    cy.contains('Próximo').click()
    cy.wait('@get-users-list2')
    cy.contains('Dawn').should('be.visible')
  })
})
