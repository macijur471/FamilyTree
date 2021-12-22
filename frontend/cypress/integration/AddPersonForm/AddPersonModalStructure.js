describe("Add Person Modal", () => {
  before(() => {
    cy.fakeLogin();
    cy.findByText(/Add first family member/i)
      .parent()
      .parent()
      .within(() => {
        cy.findByRole("button").click();
      });
  });

  it("has full name, hometown, birth and death date, job, hobbies and images input", () => {
    cy.findByLabelText(/full name/i).should("exist");
    cy.findByLabelText(/hometown/i).should("exist");
    cy.findByLabelText(/date of birth/i).should("exist");
    cy.findByLabelText(/date of death/i).should("exist");
    cy.findByLabelText(/job/i).should("exist");
    cy.findByText(/hobbies/i).should("exist");
    cy.findByLabelText(/images/i).should("exist");
  });
});
