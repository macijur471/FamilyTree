import Tile from "components/shared/Tile";
import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
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
import AddPersonModal from "components/TreePanel/AddPersonModal";

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <PersonTileWrapper style={style}>
        <Tile text={name} bg={gender}>
          <PersonTileBirthDate>{birthDate}</PersonTileBirthDate>
          <PersonTileImgWrapper>
            {imgUrl && <PersonTileImage src={imgUrl} />}
          </PersonTileImgWrapper>
        </Tile>
        <PersonTileAddButton>
          <IconButton
            icon={<AddIcon />}
            color="green"
            onClick={() => setIsModalVisible(true)}
          />
        </PersonTileAddButton>
        {node.hasSubTree && (
          <PersonTileSubtreeBttn onClick={() => onSubClick(node.id)}>
            <DotsIcon />
          </PersonTileSubtreeBttn>
        )}
      </PersonTileWrapper>
      {isModalVisible && (
        <AddPersonModal
          close={() => setIsModalVisible(false)}
          sourcePerson={{ fullName: name, dateOfBirth: birthDate }}
        />
      )}
    </>
  );
};

export default PersonTile;
