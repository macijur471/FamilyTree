import React, { FunctionComponent, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import PrivacyPolicyModal from "../PrivacyPolicyModal";
import {
  PrivacyPolicyCheckboxElement,
  PrivacyPolicyCheckboxFakeInput,
  PrivacyPolicyCheckboxInput,
  PrivacyPolicyCheckboxWrapper,
  PrivacyPolicyText,
  PrivacyPolicyTrigger,
  StyledTick,
} from "./PrivacyPolicyCheckbox.components";

interface Props {
  register?: UseFormRegisterReturn;
  isError?: boolean;
}

const PrivacyPolicyCheckbox: FunctionComponent<Props> = ({
  register,
  isError,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <PrivacyPolicyCheckboxWrapper>
      <PrivacyPolicyCheckboxElement>
        <PrivacyPolicyCheckboxFakeInput isError={isError} />
        <PrivacyPolicyCheckboxInput type="checkbox" {...register} />
        <StyledTick />
      </PrivacyPolicyCheckboxElement>
      <PrivacyPolicyText>
        I accept the{" "}
        <PrivacyPolicyTrigger onClick={() => setIsModalVisible(true)}>
          Privacy Policy
        </PrivacyPolicyTrigger>
      </PrivacyPolicyText>
      {isModalVisible && (
        <PrivacyPolicyModal close={() => setIsModalVisible(false)} />
      )}
    </PrivacyPolicyCheckboxWrapper>
  );
};

export default PrivacyPolicyCheckbox;
