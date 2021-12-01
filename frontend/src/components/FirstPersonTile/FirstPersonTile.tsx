import React, { FunctionComponent } from "react";
import IconButton from "components/shared/IconButton";
import Tile from "components/shared/Tile";
import { ReactComponent as AddIcon } from "images/addUser.svg";
import { FirstPersonTileAddButtonWrapper } from "./FirstPersonTile.components";

interface Props {
  onClick?: () => void | Promise<void>;
}
const FirstPersonTile: FunctionComponent<Props> = ({ onClick }) => {
  return (
    <Tile bg="add" text="Add first family member">
      <FirstPersonTileAddButtonWrapper>
        <IconButton onClick={onClick} icon={<AddIcon />} color="green" />
      </FirstPersonTileAddButtonWrapper>
    </Tile>
  );
};

export default FirstPersonTile;
