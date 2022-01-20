import { relOptionsT } from "./relationOptions.type";

export type AddPersonInputs = {
  fullName: string;
  hometown: string;
  dateOfBirth: string;
  dateOfDeath: string;
  job?: string;
  hobbies: { name: string }[];
  relation?: relOptionsT;
  images?: FileList;
  gender: "male" | "female";
};
