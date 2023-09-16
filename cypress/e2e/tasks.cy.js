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
    });

    it('should create a new task', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        // simulate typing
        cy.get('#title').type('New Task');
        cy.get('#summary').type('Some description');

        // check it was created
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);
        cy.get('.task h2').contains('New Task');
        cy.get('.task p').contains('Some description');

        // check the modal is closed after adding a new task
        cy.get('.backdrop').should('not.exsist');
        cy.get('.modal').should('not.exist');
    })
})