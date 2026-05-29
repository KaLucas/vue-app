describe('Users List', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/collections/users/records*', (req) => {
      const page = req.query.page

      req.reply({
        fixture: page === '2' ? 'users-list-page-2.json' : 'users-list.json',
      })
    }).as('get-users-list')

    cy.visit('/admin/dashboard', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', 'fake-token')
      },
    })
  })

  it('Should list users', () => {
    cy.get('[data-testid=users-list-result]').should('have.length.greaterThan', 0)
  })

  it('Should change to page 2 and list users', () => {
    cy.contains('Próximo').should('not.be.disabled').click()
    cy.wait('@get-users-list')
    cy.contains('Dawn').should('be.visible')
  })
})
