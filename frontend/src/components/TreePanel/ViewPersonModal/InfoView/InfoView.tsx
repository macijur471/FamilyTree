import React, { FunctionComponent } from "react";
import { 
    InfoViewWrapper,
    InfoLine,
    LeftPrinter,
    RightPrinter,
    HobbiesListWrapper,
    HobbiesListItemize,
 } from "./InfoView.components";

interface Props {
    person?: {
       hometown: string,
       hobbies: string | {name:string}[],
       job?: string,
      }
    gender?: "male"|"female"|"default",
}

const InfoView: FunctionComponent<Props> = ({ person, gender="default"}) => {
  return (
    <InfoViewWrapper bg={gender}>
        <InfoLine>
          <LeftPrinter>Hometown:</LeftPrinter>
          <RightPrinter>{person?.hometown}</RightPrinter>
        </InfoLine>
        <InfoLine>
          <LeftPrinter>Job:</LeftPrinter>
          { person?.job !== undefined ? <RightPrinter>{person?.job}</RightPrinter> : <RightPrinter>-</RightPrinter>}
        </InfoLine>
        <HobbiesListWrapper>
          <LeftPrinter>Hobbies:</LeftPrinter>
          <HobbiesListItemize>{person?.hobbies}</HobbiesListItemize>
        </HobbiesListWrapper>
    </InfoViewWrapper>
  );
};

export default InfoView;