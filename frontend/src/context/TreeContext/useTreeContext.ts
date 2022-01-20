import { useContext } from "react";
import { TreeContext } from "./Tree.context";

export const useTreeContext = () => {
  const treeData = useContext(TreeContext);
  return { ...treeData };
};
