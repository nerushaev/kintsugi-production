import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IconsSet } from "./IconsSet";

const FooterWrapper = styled.footer`
  margin-top: auto;
  padding-bottom: 20px;
  padding-top: 20px;
  border-top: 2px solid rgba(255, 200, 221, 1);
`;

const Text = styled.p`
  text-align: center;
  color: black;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  color: gray;
  cursor: pointer;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <IconsSet />
      <Wrapper>
      <StyledLink to="/publicoffer">Публічна оферта</StyledLink>
      <StyledLink to="/politic">Політика конфіденційності</StyledLink>
      </Wrapper>
      <Text>Kintsugi</Text>
    </FooterWrapper>
  );
};

export default Footer;
