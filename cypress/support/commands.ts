/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
      logout(): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', () => {
  cy.intercept('GET', '**/collections/users/records*').as('preload')
  cy.visit('/admin/dashboard', {
    onBeforeLoad(win) {
      win.localStorage.setItem('token', 'fake-token')
    },
  })
})

Cypress.Commands.add('logout', () => {
  cy.clearLocalStorage()
})

export {}
