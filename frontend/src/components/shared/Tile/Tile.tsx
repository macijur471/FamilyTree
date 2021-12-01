import React, { FunctionComponent } from "react";
import { ThemeType } from "styles/theme";
import BgBar from "../WrapperWithBgBar/BgBar";
import { TileWrapper, TileTextWrapper, TileText } from "./Tile.components";

interface Props {
  bg: keyof ThemeType["colors"]["personTile"]["bg"];
  text: string;
  onClick?: () => void | Promise<void>;
}

const Tile: FunctionComponent<Props> = ({ bg, text, onClick, children }) => {
  return (
    <TileWrapper bg={bg} onClick={onClick}>
      <TileTextWrapper>
        <TileText>{text}</TileText>
        <BgBar color="light" />
      </TileTextWrapper>
      {children}
    </TileWrapper>
  );
};

export default Tile;
