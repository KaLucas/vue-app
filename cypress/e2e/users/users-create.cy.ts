describe('Users Create', () => {
  beforeEach(() => {
    let getCall = 0

    cy.intercept('GET', '**/collections/users/records*', (req) => {
      getCall++

      if (getCall === 1) {
        req.reply({ fixture: 'users-list.json' })
      } else {
        req.reply({ fixture: 'users-list-user-created.json' })
      }
    }).as('get-users')

    cy.visit('/admin/dashboard', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', 'fake-token')
      },
    })

    cy.login()
    cy.wait('@get-users')
  })

  it('Should create new user successfully and fetch updated list', () => {
    cy.intercept('POST', '**/collections/users/records*', {
      body: {
        data: {
          first_name: 'New',
          last_name: 'User',
          email: 'email@email.com',
        },
      },
    }).as('create-user')

    cy.get('[data-testid=create-user]').click()
    cy.get('[data-testid=user-form-title').should('contain.text', 'Cadastrar novo usuário')
    cy.get('form').within(() => {
      cy.get('[data-testid=input-first-name]').type('New')
      cy.get('[data-testid=input-last-name]').type('User')
      cy.get('[data-testid=input-email]').type('email@email.com')
      cy.contains('button', 'Criar').click()
    })

    cy.wait('@create-user')
    cy.get('.modal-wrapper').should('not.exist')
    cy.get('[data-testid=snackbar]').should('contain.text', 'Usuário criado com sucesso.')
    cy.wait('@get-users')
    cy.get('tbody > tr > td').eq(0).should('contain.text', 'New')
  })

  it('Should get error when creating new user', () => {
    cy.intercept('POST', '**/collections/users/records*', {
      statusCode: 500,
    }).as('create-user-error')

    cy.get('button[data-testid=create-user]').click()
    cy.get('h2').should('contain.text', 'Cadastrar novo usuário')
    cy.get('form').within(() => {
      cy.get('[data-testid=input-first-name]').type('New')
      cy.get('[data-testid=input-last-name]').type('User')
      cy.get('[data-testid=input-email]').type('email@email.com')
      cy.get('button').contains('Criar').click()
    })
    cy.wait('@create-user-error')
    cy.get('[data-testid=snackbar]').should('contain.text', 'Erro ao criar novo usuário.')
  })
})
