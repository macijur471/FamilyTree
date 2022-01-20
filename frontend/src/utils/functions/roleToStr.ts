import { relOptionsT } from "utils/types/relationOptions.type";

export const roleToStr = (rel: relOptionsT) => {
  if (rel.toLocaleLowerCase().includes("parent")) return "parent";
  if (rel.toLocaleLowerCase().includes("child")) return "child";
  if (rel.toLocaleLowerCase().includes("spouse")) return "spouse";
  if (rel.toLocaleLowerCase().includes("divorced")) return "spouse";
  return "sibling";
};
