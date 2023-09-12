import React from "react";
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

const Footer = () => {
  return (
    <FooterWrapper>
      <IconsSet />
      <Text>Kintsugi</Text>
    </FooterWrapper>
  );
};

export default Footer;
