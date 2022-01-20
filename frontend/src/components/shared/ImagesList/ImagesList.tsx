import React, { FunctionComponent } from "react";
import { ImagesListImg, ImagesListWrapper } from "./ImagesList.components";

interface Props {
  images?: string[];
}

const ImagesList: FunctionComponent<Props> = ({ images }) => {
  return (
    <ImagesListWrapper>
      {images && images.map((img, i) => <ImagesListImg src={img} key={i} />)}
    </ImagesListWrapper>
  );
};

export default ImagesList;
