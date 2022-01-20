import { createContext, Dispatch, SetStateAction } from "react";
import { Node } from "relatives-tree/lib/types";
import { peopleDataT } from "utils/types/treeContext.type";

type TreeContextT = {
  peopleNodes: Node[];
  peopleData: peopleDataT[];
  rootId: string;
  setRootId: Dispatch<SetStateAction<string>>;
  getTree: () => Promise<void> | void;
};

export const TreeContext = createContext<TreeContextT>({
  peopleNodes: [],
  peopleData: [],
  rootId: "",
  setRootId: () => {},
  getTree: () => {},
});
