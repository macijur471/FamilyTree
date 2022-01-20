import { isInputErrorByLabel } from "./isInputErrorByLabel";

export const allFormInputErrors = (
  isError: boolean | (boolean | "skip")[],
  queryStr: string = "form"
) => {
  cy.get(queryStr).as("form");
  cy.get("@form").within(() => {
    cy.get("input").each((input, i) => {
      if (Array.isArray(isError) && isError[i] !== "skip")
        cy.wrap(input)
          .invoke("attr", "id")
          .then((id) => {
            isInputErrorByLabel(
              id,
              Array.isArray(isError) ? isError[i] : isError
            );
          });
    });
  });
};
