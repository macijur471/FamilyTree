// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "@testing-library/cypress/add-commands";
Cypress.Commands.add("fakeLogin", () => {
  cy.visit("/");
  cy.intercept(
    { method: "POST", url: "http://localhost/api/v1/auth/user/login" },
    {
      body: {
        message: "succsefully logged in",
        status: true,
      },
    }
  ).as("logIn");
  cy.findByPlaceholderText(/username/i).type("testtest");
  cy.findByPlaceholderText(/password/i).type("testtest");
  cy.findByRole("form").within(() => {
    cy.findByRole("button").click();
  });
});
