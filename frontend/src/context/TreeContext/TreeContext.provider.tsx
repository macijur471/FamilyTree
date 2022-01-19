import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TreeContext } from "./Tree.context";
import { Node } from "relatives-tree/lib/types";
import { peopleDataT } from "utils/types/treeContext.type";
import axios from "axios";
import { TREE_URL } from "utils/tree.routes";
import { useUserContext } from "context/UserContext/useUserContext";
import { isAxiosError } from "utils/typeGuards/isAxiosError.guard";
import { TreeResponseT } from "utils/types/responses/treeResponse.type";

const TreeContextProvider: FunctionComponent = ({ children }) => {
  const [peopleNodes, setPeopleNodes] = useState<Node[]>([]);
  const [peopleData, setPeopleData] = useState<peopleDataT[]>([]);
  const [rootId, setRootId] = useState("");

  const { username } = useUserContext();

  const getTree = useCallback(async () => {
    try {
      const res = await axios.get<TreeResponseT>(`${TREE_URL}/${username}`);
      console.log(res);

      const pData = res.data.infos.map((i) => ({
        fullName: i.names,
        dateOfBirth: i.date_of_birth,
        userId: i.id,
        imgUrl: "",
      }));
      setPeopleData(pData);
      setRootId(res.data.rootId);

      // const relations = res.data.relations.map((item) => {
      //   if (item.gender === "female") return { ...item, gender: 1 };
      //   else return { ...item, gender: 0 };
      // });
      // @ts-ignore
      // setPeopleNodes(relations);

      // @ts-ignore
      setPeopleNodes(res.data.relations);
    } catch (e) {
      if (!(e instanceof Error) || !e) return;

      if (isAxiosError(e) && e.message.includes("404")) {
        console.log("No members yet");
      }
      console.log(e.message);
    }
  }, [username]);

  useEffect(() => {
    //TODO get people data query
    getTree();
  }, [getTree]);

  return (
    <TreeContext.Provider
      value={{ peopleNodes, peopleData, rootId, setRootId, getTree }}
    >
      {children}
    </TreeContext.Provider>
  );
};

export default TreeContextProvider;
