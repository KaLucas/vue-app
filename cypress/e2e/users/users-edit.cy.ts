describe('Users Edit', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list.json',
    }).as('get-users-list')

    cy.visit('/admin/dashboard', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', 'fake-token')
      },
    })

    cy.wait('@get-users-list', { timeout: 15000 })
  })

  it('Should select user, open dialog, edit successfully and fetch updated list', () => {
    cy.intercept('PUT', '**/collections/users/records/*', {
      fixture: 'users-edit.json',
    }).as('get-users-edit')

    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list-user-updated.json',
    }).as('get-users-list-updated')

    cy.get('[data-testid=users-list-result]')
      .find('tbody')
      .within(() => {
        cy.get('tr').eq(0).find('[data-testid=edit-user]').click()
      })

    cy.get('h2').should('contain.text', 'Editar usuário')
    cy.get('form').within(() => {
      cy.get('[data-testid=input-first-name]').type('{backspace}a')
      cy.get('button').contains('Salvar').click()
    })

    cy.wait('@get-users-edit', { timeout: 15000 })
    cy.get('.modal-wrapper').should('not.exist')
    cy.get('[data-testid=snackbar]').should('contain.text', 'Usuário salvo com sucesso.')
    cy.wait('@get-users-list-updated', { timeout: 15000 })
    cy.get('tbody > tr > td').eq(0).should('contain.text', 'Nova')
  })

  it('Should select user, open dialog, edit and get error', () => {
    cy.intercept('PUT', '**/collections/users/records/*', {
      statusCode: 500,
    }).as('get-users-edit')

    cy.get('[data-testid=users-list-result]')
      .find('tbody')
      .within(() => {
        cy.get('tr').eq(0).find('[data-testid=edit-user]').click()
      })

    cy.get('form').within(() => {
      cy.get('[data-testid=input-first-name]').type('{backspace}a')
      cy.get('button').contains('Salvar').click()
    })

    cy.wait('@get-users-edit', { timeout: 15000 })
    cy.get('[data-testid=snackbar]').should('contain.text', 'Erro ao salvar usuário.')
  })
})
