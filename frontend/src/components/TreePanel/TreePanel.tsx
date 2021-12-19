import React, { FunctionComponent, useState } from "react";
import IconButton from "components/shared/IconButton";
import { TreePanelWrapper, TreeWrapper } from "./TreePanel.components";
import TreePanelButtons from "./TreePanelButtons";
import { ReactComponent as DeleteUserIcon } from "images/deleteUser.svg";
import PersonTile from "components/PersonTile";
import ReactFamilyTree from "react-family-tree";

const people = [
  {
    id: "user1",
    gender: "male",
    parents: [
      {
        id: "user5",
        type: "blood",
      },
      {
        id: "user6",
        type: "blood",
      },
    ],
    siblings: [
      {
        id: "user4",
        type: "blood",
      },
    ],
    spouses: [],
    children: [
      {
        id: "user3",
        type: "blood",
      },
      {
        id: "user10",
        type: "blood",
      },
    ],
  },
  {
    id: "user2",
    gender: "male",
    parents: [],
    siblings: [],
    spouses: [
      {
        id: "user5",
        type: "married",
      },
    ],
    children: [],
  },
  {
    id: "user3",
    gender: "male",
    parents: [
      {
        id: "user1",
        type: "blood",
      },
    ],
    siblings: [],
    spouses: [],
    children: [],
  },
  {
    id: "user4",
    gender: "female",
    parents: [
      {
        id: "user5",
        type: "blood",
      },
      {
        id: "user6",
        type: "blood",
      },
    ],
    siblings: [
      {
        id: "user1",
        type: "blood",
      },
    ],
    spouses: [
      {
        id: "user7",
        type: "blood",
      },
    ],
    children: [],
  },
  {
    id: "user5",
    gender: "female",
    parents: [],
    siblings: [],
    spouses: [
      {
        id: "user6",
        type: "divorced",
      },
      {
        id: "user2",
        type: "married",
      },
    ],
    children: [
      {
        id: "user1",
        type: "blood",
      },
      {
        id: "user4",
        type: "blood",
      },
    ],
  },
  {
    id: "user6",
    gender: "female",
    parents: [],
    siblings: [],
    spouses: [
      {
        id: "user5",
        type: "divorced",
      },
    ],
    children: [
      {
        id: "user1",
        type: "blood",
      },
      {
        id: "user4",
        type: "blood",
      },
    ],
  },
  {
    id: "user7",
    gender: "male",
    parents: [
      {
        id: "user8",
        type: "blood",
      },
      {
        id: "user9",
        type: "blood",
      },
    ],
    siblings: [],
    spouses: [
      {
        id: "user4",
        type: "married",
      },
    ],
    children: [],
  },
  {
    id: "user8",
    gender: "female",
    parents: [],
    siblings: [],
    spouses: [
      {
        id: "user9",
        type: "married",
      },
    ],
    children: [
      {
        id: "user7",
        type: "blood",
      },
    ],
  },
  {
    id: "user9",
    gender: "male",
    parents: [],
    siblings: [],
    spouses: [
      {
        id: "user8",
        type: "married",
      },
    ],
    children: [
      {
        id: "user7",
        type: "blood",
      },
    ],
  },
  {
    id: "user10",
    gender: "male",
    parents: [{ id: "user1", type: "blood" }],
    siblings: [],
    spouses: [],
    children: [],
  },
];
const WIDTH = 270;
const HEIGHT = 255;

const TreePanel: FunctionComponent = () => {
  const [rootId, setRootId] = useState(people[3].id);
  return (
    <TreePanelWrapper>
      <IconButton color="red" icon={<DeleteUserIcon />} />
      <TreeWrapper>
        <ReactFamilyTree
          // @ts-ignore
          nodes={people}
          rootId={rootId}
          width={WIDTH}
          height={HEIGHT}
          renderNode={(node) => (
            <PersonTile
              name={node.id}
              birthDate="18.12.1998"
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
          )}
        />
      </TreeWrapper>
      <TreePanelButtons />
    </TreePanelWrapper>
  );
};

export default TreePanel;
