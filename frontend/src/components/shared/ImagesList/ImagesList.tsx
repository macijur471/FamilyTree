import React, { FunctionComponent, useMemo } from "react";
import { ImagesListImg, ImagesListWrapper } from "./ImagesList.components";

interface Props {
  images?: FileList;
}

const ImagesList: FunctionComponent<Props> = ({ images }) => {
  const imgs = useMemo(() => {
    if (!images) return [];

    const arr = [];
    for (let i = 0; i < images.length; i++) {
      const item = images.item(i);
      if (!item) continue;

      arr.push(<ImagesListImg src={URL.createObjectURL(item)} key={i} />);
    }
    return arr;
  }, [images]);

  return <ImagesListWrapper>{images && imgs}</ImagesListWrapper>;
};

export default ImagesList;
