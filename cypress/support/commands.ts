/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(path?: string): Chainable<void>
      logout(): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', (path = '/') => {
  cy.visit(path, {
    onBeforeLoad(win) {
      win.localStorage.setItem('token', 'fake-token')
    },
  })
})

Cypress.Commands.add('logout', () => {
  cy.clearLocalStorage()
})

export {}
