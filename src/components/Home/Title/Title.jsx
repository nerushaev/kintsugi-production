import React from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";

const TitleText = styled.h2`
  text-align: center;
  font-size: ${theme.fontSizes.title};
  font-weight: 500;
  width: 100%;
  margin-bottom: 30px;
`;

export default function Title({ text }) {
  return <TitleText>{text}</TitleText>;
}
