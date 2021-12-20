import React, { FunctionComponent } from "react";
import IconButton from "components/shared/IconButton";
import { TreePanelWrapper, TreeWrapper } from "./TreePanel.components";
import TreePanelButtons from "./TreePanelButtons";
import { ReactComponent as DeleteUserIcon } from "images/deleteUser.svg";
import PersonTile from "components/PersonTile";
import ReactFamilyTree from "react-family-tree";
import FirstPersonTile from "components/FirstPersonTile";
import { useTreeContext } from "context/TreeContext/useTreeContext";
import { findPerson } from "utils/functions/findPerson";

const WIDTH = 270;
const HEIGHT = 255;

const TreePanel: FunctionComponent = () => {
  const { peopleNodes, rootId, setRootId, peopleData } = useTreeContext();

  return (
    <TreePanelWrapper>
      <IconButton color="red" icon={<DeleteUserIcon />} />
      <TreeWrapper>
        {peopleNodes.length !== 0 && (
          <ReactFamilyTree
            nodes={peopleNodes}
            rootId={rootId}
            width={WIDTH}
            height={HEIGHT}
            renderNode={(node) => {
              const person = findPerson(peopleData, node.id);
              return (
                <PersonTile
                  name={person.fullName}
                  birthDate={person.dateOfBirth}
                  imgUrl={person.imgUrl}
                  key={node.id}
                  id={node.id}
                  gender={node.gender}
                  node={node}
                  onSubClick={setRootId}
                  style={{
                    width: WIDTH,
                    height: HEIGHT,
                    transform: `translate(${node.left * (WIDTH / 2)}px, ${
                      node.top * (HEIGHT / 2)
                    }px)`,
                  }}
                />
              );
            }}
          />
        )}
        {!peopleNodes.length && <FirstPersonTile />}
      </TreeWrapper>
      <TreePanelButtons />
    </TreePanelWrapper>
  );
};

export default TreePanel;
