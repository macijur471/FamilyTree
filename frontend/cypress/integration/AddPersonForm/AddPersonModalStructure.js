import { isInputErrorByLabel } from "../../tools/isInputErrorByLabel";
import { allFormInputErrors } from "../../tools/allFormInputErrors";

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

  describe("hobbies list", () => {
    it("adds hobbies", () => {
      cy.findAllByPlaceholderText(/enter a hobby/i).should("have.length", 1);
      cy.findByPlaceholderText(/enter a hobby/i)
        .parent()
        .parent()
        .parent()
        .as("wrapper");

      cy.get("@wrapper").children().last().as("addButton").click();
      cy.findAllByPlaceholderText(/enter a hobby/i).should("have.length", 2);
      cy.get("@addButton").click();
      cy.findAllByPlaceholderText(/enter a hobby/i).should("have.length", 3);
    });

    it("deletes hobbies", () => {
      cy.findAllByPlaceholderText(/enter a hobby/i)
        .parent()
        .parent()
        .children()
        .last()
        .as("deleteButtons");

      cy.get("@deleteButtons").first().click();
      cy.findAllByPlaceholderText(/enter a hobby/i).should("have.length", 2);
    });

    it("doesn't let you delete the last hobby", () => {
      cy.findAllByPlaceholderText(/enter a hobby/i)
        .parent()
        .parent()
        .children()
        .last()
        .as("deleteButtons");

      cy.get("@deleteButtons").first().click();
      cy.findAllByPlaceholderText(/enter a hobby/i).should("have.length", 1);

      cy.findByPlaceholderText(/enter a hobby/i)
        .parent()
        .parent()
        .children()
        .last()
        .should("have.attr", "disabled");
    });

    it("doesn't let you add more than 6 hobbies", () => {
      cy.findByPlaceholderText(/enter a hobby/i)
        .parent()
        .parent()
        .parent()
        .as("wrapper");
      cy.get("@wrapper").children().last().as("addButton");

      for (let n = 0; n < 5; n++) {
        cy.get("@addButton").click();
      }
      cy.findAllByPlaceholderText(/enter a hobby/i).should("have.length", 6);

      cy.get("@addButton").should("have.attr", "disabled");
    });
  });

  describe("validation", () => {
    before(() => {
      cy.fakeLogin();
      cy.findByText(/Add first family member/i)
        .parent()
        .parent()
        .within(() => {
          cy.findByRole("button").click();
        });
    });

    it("displays proper error messages when empty form is submitted", () => {
      cy.findByRole("button", { name: "Add" }).click();
      allFormInputErrors([true, true, true, false, false, "skip", "skip"]);
    });

    describe("full name input", () => {
      it("displays an error message when entered value is too short", () => {
        cy.findByLabelText(/full name/i).type("tes");
        isInputErrorByLabel("Full name", true);
      });

      it("displays an error message when entered value is one word", () => {
        cy.findByLabelText(/full name/i).type("ttest");
        isInputErrorByLabel("Full name", true);
      });

      it("doesn't display an error message when entered value is of proper length and form", () => {
        cy.findByLabelText(/full name/i).type("{selectall}test test");
        isInputErrorByLabel("Full name", false);
      });

      it("displays an error message when entered value is too long", () => {
        cy.findByLabelText(/full name/i).as("input");
        for (let i = 0; i < 10; i++) {
          cy.get("@input").type("testtest");
        }
        isInputErrorByLabel("Full name", true);
      });
    });

    describe("hometown input", () => {
      it("displays an error message when entered value is too short", () => {
        cy.findByLabelText(/hometown/i).type("te");
        isInputErrorByLabel("Hometown", true);
      });

      it("doesn't display an error message when entered value is of proper length", () => {
        cy.findByLabelText(/hometown/i).type("{selectall}test test");
        isInputErrorByLabel("Hometown", false);
      });

      it("displays an error message when entered value is too long", () => {
        cy.findByLabelText(/hometown/i).as("input");
        for (let i = 0; i < 10; i++) {
          cy.get("@input").type("testtest");
        }
        isInputErrorByLabel("Hometown", true);
      });
    });

    describe("date of birth input", () => {
      it("doesn't display error message when date is entered", () => {
        cy.findByLabelText(/date of birth/i).type("2020-05-01", {
          force: true,
        });
        isInputErrorByLabel("Date of Birth", false);
      });
    });

    describe("job input", () => {
      it("doesn't display error message when no text is entered", () => {
        isInputErrorByLabel("Job", false);
      });

      it("does display error message when too short text is passed", () => {
        cy.findByLabelText(/job/i).type("tes");
        isInputErrorByLabel("Job", true);
      });

      it("doesn't display error message when text of proper length", () => {
        cy.findByLabelText(/job/i).type("ttest");
        isInputErrorByLabel("Job", false);
      });

      it("does display error message when too long text is passed", () => {
        cy.findByLabelText(/job/i).as("input");
        for (let i = 0; i < 10; i++) {
          cy.get("@input").type("testtest");
        }
        isInputErrorByLabel("Job", true);
      });
    });
  });
});
