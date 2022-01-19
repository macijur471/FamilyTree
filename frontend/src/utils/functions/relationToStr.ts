import { relOptionsT } from "utils/types/relationOptions.type";

export const relationToStr = (rel: relOptionsT) => {
  if (rel.toLocaleLowerCase().includes("adopted")) return "adopted";
  if (rel.toLocaleLowerCase() === "divorced") return "divorced";
  if (rel.toLocaleLowerCase() === "spouse") return "married";
  return "blood";
};
