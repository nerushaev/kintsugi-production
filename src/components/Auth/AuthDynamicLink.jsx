import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
`;

const StyledLink = styled(Link)`
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.rose};
`;

export default function AuthDynamicLink({ message, redirectTo }) {
  return (
    <Wrapper>
      <StyledLink to={redirectTo}>{message}</StyledLink>
    </Wrapper>
  );
}
