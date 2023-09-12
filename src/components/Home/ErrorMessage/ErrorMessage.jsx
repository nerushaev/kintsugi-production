import React from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";

const ErrorWrapper = styled.div`
  max-width: 480px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const ErrorText = styled.p`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.gray};
  font-weight: 500;
`;

export default function ErrorMessage({ message }) {
  return (
    <ErrorWrapper>
      <ErrorText>{message}</ErrorText>
    </ErrorWrapper>
  );
}
