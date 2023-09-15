/// <reference types="Cypress" />

describe('tasks management', () => {
    it('should open and close the new task modal', () => {
        cy.visit('http://localhost:5173/');
        // select the "add task" button
        cy.contains('Add Task').click();
        cy.get('.backdrop').click({force: true});
        // modal should have closed
        cy.get('.backdrop').should('not.exsist');
        cy.get('.modal').should('not.exist');   
    });

    it('should close the new task modal when the Cancel button is clicked', () => {
        cy.visit('http://localhost:5173/');
        // select the "add task" button
        cy.contains('Add Task').click();
        cy.contains('Cancel').click();
        // modal should have closed
        cy.get('.backdrop').should('not.exsist');
        cy.get('.modal').should('not.exist'); 
    })
})