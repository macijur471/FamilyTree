describe("Tree view", () => {
  before(() => {
    cy.fakeLogin();
  });

  it("displays header with username", () => {
    cy.findByRole("banner").contains(/tree of/i);
  });

  it("has delete tile button with svg", () => {
    cy.findByRole("main")
      .children()
      .within(() => {
        cy.get(" > button").as("button");
      });
    cy.get("@button").should("contain.html", "svg");
  });

  it("has footer with three export/log out buttons", () => {
    cy.get('[data-cy="export-buttons"]').children().should("have.length", 3);
  });

  describe("when there are no members of tree", () => {
    it("displays add first user tile", () => {
      cy.findByText(/Add first family member/i).should("exist");
    });

    it("displays add person modal after add button click", () => {
      cy.get('[data-cy="modal"]').should("not.exist");

      cy.findByText(/Add first family member/i)
        .parent()
        .parent()
        .within(() => {
          cy.findByRole("button").click();
        });

      cy.get('[data-cy="modal"]').should("exist");
      cy.get('[data-cy="modal"]').within(() => {
        cy.findByText(/add relative/i).should("exist");
      });
    });
  });
});
