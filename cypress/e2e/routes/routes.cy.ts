describe('Routes', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  context('Private Routes', () => {
    it('Should redirect to home if not logged in', () => {
      cy.visit('/admin/dashboard')
      cy.url().should('include', '/admin')
      cy.get('form').should('be.visible')
    })

    it('Should allow access if logged in', () => {
      cy.intercept('GET', '**/collections/users/records*', {
        fixture: 'users-list.json',
      }).as('get-users-list')

      cy.visit('/admin/dashboard', {
        onBeforeLoad(win) {
          win.localStorage.setItem('token', 'fake-token')
        },
      })

      cy.wait('@get-users-list', { timeout: 15000 })
      cy.get('h2').contains('Lista de Usuários').should('be.visible')
    })
  })

  context('Public Routes', () => {
    it('Should navigate to dashboard from login page', () => {
      cy.visit('/admin')
      cy.get('[data-testid=redirect-button-list]').click()
      cy.url().should('include', '/')
      cy.get('h2').contains('Usuários cadastrados').should('be.visible')
      cy.get('.card-wrapper').should('exist')
    })

    it('Should navigate to admin from public page', () => {
      cy.visit('/')
      cy.get('[data-testid=redirect-button-admin]').click()
      cy.url().should('include', '/admin')
      cy.get('form').should('be.visible')
    })
  })
})
