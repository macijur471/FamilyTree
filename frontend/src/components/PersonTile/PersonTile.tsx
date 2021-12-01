import Tile from "components/shared/Tile";
import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import {
  PersonTileAddButton,
  PersonTileBirthDate,
  PersonTileImage,
  PersonTileImgWrapper,
  PersonTileSubtreeBttn,
  PersonTileWrapper,
} from "./PersonTile.components";
import { ReactComponent as AddIcon } from "images/addUser.svg";
import { ReactComponent as DotsIcon } from "images/subtree.svg";
import IconButton from "components/shared/IconButton";

interface Props {
  name: string;
  gender: "male" | "female";
  birthDate: string;
  imgUrl?: string;
  id: string;
  node: any;
  style: object;
  onSubClick: Dispatch<SetStateAction<string>>;
}

const PersonTile: FunctionComponent<Props> = ({
  name,
  gender,
  birthDate,
  imgUrl,
  node,
  style,
  onSubClick,
}) => {
  return (
    <PersonTileWrapper style={style}>
      <Tile text={name} bg={gender}>
        <PersonTileBirthDate>{birthDate}</PersonTileBirthDate>
        <PersonTileImgWrapper>
          {imgUrl && <PersonTileImage src={imgUrl} />}
        </PersonTileImgWrapper>
      </Tile>
      <PersonTileAddButton>
        <IconButton icon={<AddIcon />} color="green" />
      </PersonTileAddButton>
      {node.hasSubTree && (
        <PersonTileSubtreeBttn onClick={() => onSubClick(node.id)}>
          <DotsIcon />
        </PersonTileSubtreeBttn>
      )}
    </PersonTileWrapper>
  );
};

export default PersonTile;
