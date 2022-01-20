import React, { FunctionComponent } from "react";
import { TreePanelWrapper, TreeWrapper } from "./TreePanel.components";
import TreePanelButtons from "./TreePanelButtons";
import PersonTile from "components/PersonTile";
import ReactFamilyTree from "react-family-tree";
import FirstPersonTile from "components/FirstPersonTile";
import { useTreeContext } from "context/TreeContext/useTreeContext";
import { findPerson } from "utils/functions/findPerson";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DeleteButton from "./DeleteButton";

const WIDTH = 270;
const HEIGHT = 255;

const TreePanel: FunctionComponent = () => {
  const { peopleNodes, rootId, setRootId, peopleData } = useTreeContext();

  return (
    <TreePanelWrapper>
      <DndProvider backend={HTML5Backend}>
        <DeleteButton />
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
      </DndProvider>
      <TreePanelButtons />
    </TreePanelWrapper>
  );
};

export default TreePanel;
