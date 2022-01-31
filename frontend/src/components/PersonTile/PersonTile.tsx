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
import { useDrag } from "react-dnd";
import ViewPersonModal from "components/TreePanel/ViewPersonModal";

interface Props {
  name: string;
  gender: "male" | "female";
  birthDate: string;
  deathDate?: string,
  imgUrl?: string;
  id: string;
  node: any;
  style: object;
  onSubClick: Dispatch<SetStateAction<string>>;
  hometown: string,
  job?: string,
  hobbies: string | {name: string}[];
  images?: string | FileList;
}

const PersonTile: FunctionComponent<Props> = ({
  name,
  gender,
  birthDate,
  deathDate,
  imgUrl,
  node,
  style,
  onSubClick,
  id,
  hometown,
  hobbies,
  job,
  images,
}) => {
  const [, drag] = useDrag(() => ({
    type: "person",
    item: { id, name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPersonModalVisible, setIsPersonModalVisible] = useState(false);

  return (
    <>
      <PersonTileWrapper style={style}>
        <Tile text={name} bg={gender} ref={drag} onClick={() => setIsPersonModalVisible(true)}>
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
          sourcePerson={{ fullName: name, dateOfBirth: birthDate, id: id }}
        />
      )}
      {isPersonModalVisible && (
        <ViewPersonModal
          close={() => setIsPersonModalVisible(false)}
          sourcePerson={{
            fullName: name,
            dateOfBirth: birthDate,
            deathDate: deathDate,
            gender: gender,
            hometown: hometown,
            hobbies: hobbies,
            job: job,
            // images:images,
            }}
        />
      )}
    </>
  );
};

export default PersonTile;
