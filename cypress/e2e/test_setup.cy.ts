/// <reference path="../types.d.ts" />

describe('The Home Page', () => {
    it('can use createRandomAccount', () => {
        cy.createRandomAccount().then(console.log)
    })

    it('can use login command', () => {
        cy.createRandomAccount().then(user => cy.login(user))
    })
})