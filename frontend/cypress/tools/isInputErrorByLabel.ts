export const isInputErrorByLabel = (label: string, isError) => {
  cy.findByLabelText(label).as("input");

  if (isError) {
    cy.get("@input")
      .parent()
      .children()
      .last()
      .contains(/^.{1,}$/);
  } else {
    cy.get("@input").parent().children().last().should("not.have.text");
  }
};
