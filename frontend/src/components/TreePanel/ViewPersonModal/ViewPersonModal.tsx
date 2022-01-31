import React, { FunctionComponent, useState } from "react";
import Modal from "components/shared/Modal";
// import { ThemeType } from "styles/theme";
import {
    PersonInfoModalHeaderText,
    PersonInfoImage,
    PersonInfoImgWrapper,
    PersonInfoModalHeaderWrapper,
    PersonDatesWrapper,
} from "./ViewPersonModal.components";
import BgBar from "components/shared/WrapperWithBgBar/BgBar";
import InfoView from "./InfoView"
import DateView from "./DateView"
import ImagesList from "components/shared/ImagesList"


interface Props {
    sourcePerson?: {
      fullName: string,
      dateOfBirth: string,
      deathDate?: string,
      gender?: "male"|"female"|"default",
      hometown: string,
      job?: string,
      hobbies: string | { name: string }[],
      //images?: FileList,
    }
    close?:() => void | Promise<void>;
  }
const ViewPersonModal: FunctionComponent<Props> = ({close, sourcePerson}) => {
  // const imgs = [];
  // if (sourcePerson?.images) {
  //   for (let i = 0; i < sourcePerson?.images.length; i++) {
  //     const item = sourcePerson?.images.item(i);
  //     if (!item) continue;

  //     imgs.push(URL.createObjectURL(item));
  //   }
  // }  

  return (
    <Modal close={close} column bgColor={sourcePerson?.gender}>
      <PersonInfoModalHeaderWrapper>
        <PersonInfoModalHeaderText>{sourcePerson?.fullName}</PersonInfoModalHeaderText>
        <BgBar color="light" width={340} />
      </PersonInfoModalHeaderWrapper>
      <PersonDatesWrapper>
        <DateView title="Date of birth" date={sourcePerson?.dateOfBirth} gender={sourcePerson?.gender}/>
        {sourcePerson?.deathDate !== undefined && <DateView title="Date of death" date={sourcePerson?.deathDate} gender={sourcePerson?.gender}/>}
      </PersonDatesWrapper>
      <InfoView person={sourcePerson} gender={sourcePerson?.gender}/>

      {/* <ImagesList images={imgs}/> */}

    </Modal>
  );
};

export default ViewPersonModal;
