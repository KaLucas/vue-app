describe('Users List', () => {
  beforeEach(() => {
    cy.intercept(
      { method: 'GET', url: '**/collections/users/records*', times: 1 },
      {
        fixture: 'users-list.json',
      },
    ).as('get-users-list')

    cy.visit('/admin/dashboard', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', 'fake-token')
      },
    })

    cy.contains('Lista de Usuários').should('be.visible')
  })

  it('Should list users', () => {
    cy.get('[data-testid=users-list-result]').should('have.length.greaterThan', 0)
    cy.get('tbody > tr > td').eq(0).should('contain.text', 'Novo')
    cy.get('tbody > tr > td').eq(1).should('contain.text', 'Usuário')
    cy.get('tbody > tr > td').eq(2).should('contain.text', 'novo@email.com')
  })

  it('Should change to page 2 and list users', () => {
    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list-page-2.json',
    }).as('get-users-list2')

    cy.contains('Próximo').click()
    cy.wait('@get-users-list2')
    cy.get('tbody > tr > td').eq(0).should('contain.text', 'Dawn')
    cy.get('tbody > tr > td').eq(1).should('contain.text', 'Summers')
    cy.get('tbody > tr > td').eq(2).should('contain.text', 'dawn.summers@sunnydale.com')
  })
})
