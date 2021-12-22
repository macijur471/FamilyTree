import React, { FunctionComponent } from "react";
import { ImagesListImg, ImagesListWrapper } from "./ImagesList.components";

interface Props {
  images?: FileList;
}

const ImagesList: FunctionComponent<Props> = ({ images }) => {
  const imgs = [];
  if (images) {
    for (let i = 0; i < images.length; i++) {
      const item = images.item(i);
      if (!item) continue;

      imgs.push(<ImagesListImg src={URL.createObjectURL(item)} key={i} />);
    }
  }

  return <ImagesListWrapper>{images && imgs}</ImagesListWrapper>;
};

export default ImagesList;
