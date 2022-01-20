import styled from "styled-components";

export const PrivacyPolicyHeader = styled.h1`
  color: ${({ theme }) => theme.colors.text.light};
  font-family: ${({ theme }) => theme.fonts.families.normal};
`;

export const PrivacyPolicySubheader = styled.h3`
  color: ${({ theme }) => theme.colors.text.light};
  font-family: ${({ theme }) => theme.fonts.families.normal};

  margin: 50px 0 20px;
`;

export const PrivacyPolicyText = styled.p`
  color: ${({ theme }) => theme.colors.text.light};
  font-family: ${({ theme }) => theme.fonts.families.normal};
`;

export const PrivacyPolicyUList = styled.ul`
  color: ${({ theme }) => theme.colors.text.light};
  font-family: ${({ theme }) => theme.fonts.families.normal};
`;
