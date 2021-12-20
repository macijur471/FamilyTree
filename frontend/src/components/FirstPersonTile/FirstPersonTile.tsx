import React, { FunctionComponent, useState } from "react";
import IconButton from "components/shared/IconButton";
import Tile from "components/shared/Tile";
import { ReactComponent as AddIcon } from "images/addUser.svg";
import { FirstPersonTileAddButtonWrapper } from "./FirstPersonTile.components";
import AddPersonModal from "components/TreePanel/AddPersonModal";

const FirstPersonTile: FunctionComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Tile bg="add" text="Add first family member">
        <FirstPersonTileAddButtonWrapper>
          <IconButton
            onClick={() => setIsModalVisible(true)}
            icon={<AddIcon />}
            color="green"
          />
        </FirstPersonTileAddButtonWrapper>
      </Tile>

      {isModalVisible && (
        <AddPersonModal close={() => setIsModalVisible(false)} />
      )}
    </>
  );
};

export default FirstPersonTile;
