const domainData = require('../fixtures/domain-data.json')
import '@testing-library/cypress/add-commands';

describe('Open Home Page', () => {
  it('Should open home page', () => {
    cy.visit('http://localhost:3000');
    if (domainData.isOlder.show) {
      cy.findByText('¿Eres mayor de edad?').should('exist')
    }
  })
})
