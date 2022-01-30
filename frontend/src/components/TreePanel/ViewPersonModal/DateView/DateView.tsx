import React, { FunctionComponent } from "react";
import {
    DataViewHeaderText,
    HeaderUnderline,
    DateViewWrapper,
    DateText,
  } from "./DateView.components";

interface Props {
    title: string,
    date?: string,
    gender?: "male"|"female"|"default",
}

const DateView: FunctionComponent<Props> = ({ title, date, gender="default" }) => (
  <DateViewWrapper bg={gender}>
    <DataViewHeaderText>{title}</DataViewHeaderText>
    <HeaderUnderline themeColor="light" />
    <DateText>{date}</DateText>
  </DateViewWrapper>
);

export default DateView;