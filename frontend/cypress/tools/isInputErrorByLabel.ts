export const isInputErrorByLabel = (label: string, isError) => {
  cy.findByLabelText(label).as("input");

  if (isError) {
    cy.get("@input")
      .parent()
      .children()
      .last()
      .invoke("text")
      .should("match", /^.{1,}$/);
  } else {
    cy.get("@input")
      .parent()
      .children()
      .last()
      .invoke("text")
      .should("not.match", /^.{1,}$/);
  }
};
