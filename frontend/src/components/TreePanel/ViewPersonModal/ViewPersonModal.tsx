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
      // dateOfDeath: string,
      id: string,
      gender?: "male"|"female"|"default",
      // hometown: string,
      // position:string,
      // hobbies: string,
      // job: string,
      imgUrl?: string,
    }
    close?:() => void | Promise<void>;
  }
const ViewPersonModal: FunctionComponent<Props> = ({close, sourcePerson}) => {
  

  return (
    <Modal close={close} column bgColor={sourcePerson?.gender}>
      <PersonInfoModalHeaderWrapper>
        <PersonInfoModalHeaderText>{sourcePerson?.fullName}</PersonInfoModalHeaderText>
        <BgBar color="light" width={340} />
      </PersonInfoModalHeaderWrapper>
      <PersonDatesWrapper>
        <DateView title="Date of birth" date={sourcePerson?.dateOfBirth} gender={sourcePerson?.gender}/>
        {/* <DateView title="Date of death" date={sourcePerson?.dateOfDeath} gender={sourcePerson?.gender}/> */}
      </PersonDatesWrapper>
      <InfoView /* person={sourcePerson} *//>

      {/* <ImagesList images={sourcePerson?.imgUrl}/> */}

    </Modal>
  );
};

export default ViewPersonModal;
