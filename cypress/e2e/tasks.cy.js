/// <reference types="Cypress" />

describe('tasks management', () => {
    it('should open and close the new task modal', () => {
        cy.visit('http://localhost:5173/');
        // select the "add task" button
        cy.contains('Add Task').click();
        cy.get('.backdrop').click({force: true});
        // modal should have closed
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');   
    });

    it('should close the new task modal when the Cancel button is clicked', () => {
        cy.visit('http://localhost:5173/');
        // select the "add task" button
        cy.contains('Add Task').click();
        cy.contains('Cancel').click();
        // modal should have closed
        cy.get('.backdrop').should('not.exist');
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
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
    });

    it('should validate user input', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('.modal').contains('Add Task').click();

        // check for error message
        cy.get('.modal').contains('Please provide values');
    });

    it('should filter tasks', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        // simulate typing
        cy.get('#title').type('New Task');
        cy.get('#summary').type('Some description');

        // pick the 'urgent' category
        cy.get('#category').select('urgent');
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);

        // pick the filter option of 'moderate'
        cy.get('#filter').select('moderate');
        // expect this to be empty
        cy.get('.task').should('have.length',0);
    });

    it('should add multiple tasks', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        // simulate typing
        cy.get('#title').type('Task 1');
        cy.get('#summary').type('First task');
        cy.get('.modal').contains('Add Task').click();
        // add second task
        cy.contains('Add Task').click();
        cy.get('#title').type('Task 2');
        cy.get('#summary').type('Second task');
        cy.get('.modal').contains('Add Task').click();

        // check that baoth tasks are added
        cy.get('.task').should('have.length', 2);
        // check they are in correct order
        cy.get('.task').eq(0).contains('First task');
        cy.get('.task').eq(1).contains('Second task');

    });
})