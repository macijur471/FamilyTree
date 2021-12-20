import React, { FunctionComponent, useEffect, useState } from "react";
import { TreeContext } from "./Tree.context";
import { Node } from "relatives-tree/lib/types";
import { peopleDataT } from "utils/types/treeContext.type";

const TreeContextProvider: FunctionComponent = ({ children }) => {
  const [peopleNodes, setPeopleNodes] = useState<Node[]>([]);
  const [peopleData, setPeopleData] = useState<peopleDataT[]>([]);
  const [rootId, setRootId] = useState("");

  useEffect(() => {
    //TODO get people data query
  }, []);

  return (
    <TreeContext.Provider
      value={{ peopleNodes, peopleData, rootId, setRootId }}
    >
      {children}
    </TreeContext.Provider>
  );
};

export default TreeContextProvider;
