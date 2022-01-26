import { relOptionsT } from "./relationOptions.type";

export type AddPersonInputs = {
  fullName: string;
  hometown: string;
  dateOfBirth: string;
  dateOfDeath: string;
  job?: string;
  hobbies: { name: string }[];
  relations?: { relation: relOptionsT; name: string }[];
  images?: FileList;
  gender: "male" | "female";
};
