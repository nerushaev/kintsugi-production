import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { IconsSet } from "./IconsSet";
import { IoLocationOutline } from "react-icons/io5";
const FooterWrapper = styled.footer`
background-color: ${theme.colors.ligthGray};
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
      <a target="_blanc" href="https://maps.app.goo.gl/d1S2w1c8JvC36H8K8" style={{display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px", color: "darkblue"}}><IoLocationOutline /> Одеса, Грецька площа, ТЦ "Афіни", 4-й поверх  </a>
      <Text>©Kintsugi</Text>
    </FooterWrapper>
  );
};

export default Footer;
