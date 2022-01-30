import React, { FunctionComponent } from "react";
import { 
    InfoViewWrapper,
    InfoLine,
    LeftPrinter,
    RightPrinter,
 } from "./InfoView.components";

interface Props {
    person?: {
      //  hometown: string,
      //  position:string,
      //  hobbies: string,
      //  job: string,
      }
}

const InfoView: FunctionComponent<Props> = ({ person,}) => {
  return (
    <InfoViewWrapper>
        <InfoLine>
          <LeftPrinter>Hometown:</LeftPrinter>
          {/* <RightPrinter>{hometown}</RightPrinter> */}
        </InfoLine>
        <InfoLine>
          <LeftPrinter>Job:</LeftPrinter>
          {/* <RightPrinter>{job}</RightPrinter> */}
        </InfoLine>
        <InfoLine>
          <LeftPrinter>Position:</LeftPrinter>
          {/* <RightPrinter>{position}</RightPrinter> */}
        </InfoLine>
        <LeftPrinter>Hobbies:</LeftPrinter>
        {/* <ListPrinter>{hobbies}</ListPrinter> */}
    </InfoViewWrapper>
  );
};

export default InfoView;