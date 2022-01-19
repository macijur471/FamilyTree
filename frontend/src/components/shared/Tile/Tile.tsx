import React from "react";
import { ThemeType } from "styles/theme";
import BgBar from "../WrapperWithBgBar/BgBar";
import { TileWrapper, TileTextWrapper, TileText } from "./Tile.components";

type Props = {
  bg: keyof ThemeType["colors"]["personTile"]["bg"];
  text: string;
  onClick?: () => void | Promise<void>;
} & React.HTMLProps<HTMLDivElement>;

const Tile = React.forwardRef<HTMLDivElement, Props>(
  ({ bg, text, onClick, children }, ref) => {
    return (
      <TileWrapper bg={bg} onClick={onClick} data-testid="tile" ref={ref}>
        <TileTextWrapper>
          <TileText>{text}</TileText>
          <BgBar color="light" />
        </TileTextWrapper>
        {children}
      </TileWrapper>
    );
  }
);

export default Tile;
