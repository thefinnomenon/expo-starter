/// <reference types="cypress" />

describe('App', () => {
  it('loads', () => {
    cy.visit('/')
    cy.contains('process.env.NODE_ENV')
      .should('be.visible')
  });
});