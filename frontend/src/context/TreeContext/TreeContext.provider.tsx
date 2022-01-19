import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TreeContext } from "./Tree.context";
import { Node } from "relatives-tree/lib/types";
import { peopleDataT } from "utils/types/treeContext.type";
import axios, { CancelToken } from "axios";
import { TREE_URL } from "utils/tree.routes";
import { useUserContext } from "context/UserContext/useUserContext";
import { isAxiosError } from "utils/typeGuards/isAxiosError.guard";
import { TreeResponseT } from "utils/types/responses/treeResponse.type";
import { isDeleteError } from "utils/typeGuards/isDeleteError.guard";
import { toast } from "react-toastify";
import { LOAD_TREE_ERROR_TOASTID } from "utils/toast.ids";

const TreeContextProvider: FunctionComponent = ({ children }) => {
  const [peopleNodes, setPeopleNodes] = useState<Node[]>([]);
  const [peopleData, setPeopleData] = useState<peopleDataT[]>([]);
  const [rootId, setRootId] = useState("");

  const { username } = useUserContext();

  const getTree = useCallback(
    async (token?: CancelToken) => {
      try {
        const res = await axios.get<TreeResponseT>(`${TREE_URL}/${username}`, {
          cancelToken: token,
        });

        const pData = res.data.infos.map((i) => ({
          fullName: i.names,
          dateOfBirth: i.date_of_birth,
          userId: i.id,
          imgUrl: "",
        }));
        setPeopleData(pData);
        setRootId(res.data.rootId);

        // @ts-ignore
        setPeopleNodes(res.data.relations);
      } catch (e) {
        if (!(e instanceof Error) || !e) return;

        if (isAxiosError(e) && !isDeleteError(e))
          toast.error(e.message, { toastId: LOAD_TREE_ERROR_TOASTID });
      }
    },
    [username]
  );

  useEffect(() => {
    let source = axios.CancelToken.source();
    getTree(source.token);
    return () => source.cancel();
  }, [getTree]);

  return (
    <TreeContext.Provider
      value={{
        peopleNodes,
        peopleData,
        rootId,
        setRootId,
        getTree,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

export default TreeContextProvider;
