import React, { FunctionComponent } from "react";
import ImagesList from "components/shared/ImagesList";
import { InputLabel } from "components/shared/Input/Input.components";
import { UseFormRegisterReturn } from "react-hook-form";
import {
  FakeImagesInputElement,
  ImagesInputElement,
  ImagesInputElementWrapper,
  ImagesInputWrapper,
} from "./ImagesInput.components";

interface Props {
  register?: UseFormRegisterReturn;
  images?: FileList;
}

const ImagesInput: FunctionComponent<Props> = ({ register, images }) => {
  return (
    <ImagesInputWrapper>
      <InputLabel htmlFor="images">Images</InputLabel>
      <ImagesInputElementWrapper>
        <ImagesInputElement
          type="file"
          id="images"
          accept="image/png, image/jpeg"
          multiple
          {...register}
        />
        <FakeImagesInputElement>Select images...</FakeImagesInputElement>
      </ImagesInputElementWrapper>
      <ImagesList images={images} />
    </ImagesInputWrapper>
  );
};

export default ImagesInput;
