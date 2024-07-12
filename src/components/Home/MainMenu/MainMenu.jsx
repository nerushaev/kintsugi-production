import React, { useRef, useContext } from "react";
import styled from "styled-components";
import useOnClickOutside from "../../../hooks/onClickOutside";
import { MenuContext } from "../../../context/navState";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import { SideMenu } from "../SideMenu/SideMenu";
import Logo from "../Logo/Logo";
import { useAuth } from "../../../hooks/useAuth";
import svg from "../../../assets/filterIcons.svg";
import { Link } from "react-router-dom";
import useScreenSize from "../../../hooks/useScreenSize";

const Navbar = styled.div`
  display: flex;
  position: fixed;
  top: -1px;
  left: 0;
  right: 0;
  box-sizing: border-box;
  outline: currentcolor none medium;
  max-width: 100%;
  margin: 0px;
  align-items: center;
  background: #fff none repeat scroll 0% 0%;
  color: #000;
  min-width: 0px;
  min-height: 0px;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px;
  z-index: 500;
`;

const IconWrapper = styled.div`
  margin-right: 10px;
`;

const NavLogoWrapper = styled.div`
  display: flex;
`;

const Header = styled.header`
  height: 100px;
`;

const LinksWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  margin-right: 40px;
`;

const MainMenu = () => {
  const node = useRef();
  const { isLoggedIn } = useAuth();
  const { isMenuOpen, toggleMenuMode } = useContext(MenuContext);
  const screenSize = useScreenSize();

  useOnClickOutside(node, () => {
    if (isMenuOpen) {
      toggleMenuMode();
    }
  });

  return (
    <Header id="header" ref={node}>
      <Navbar>
      <Logo className={"nav-logo"} />
        <NavLogoWrapper>
        
          {screenSize.width > 767 &&
          <LinksWrapper>
            <Link to="/">Каталог</Link>
            <Link to="/info">Оплата та доставка</Link>
            <Link to="/about">Про нас</Link>
            </LinksWrapper>
          }
            {isLoggedIn && (
            <IconWrapper>
            <Link to="/user">
              <svg width="42" height="50">
                <use xlinkHref={`${svg}#icon-profile`} />
              </svg>
            </Link>
            </IconWrapper>
          )}
          <IconWrapper>
          <Link to="/checkout">
              <svg width="42" height="50">
                <use xlinkHref={`${svg}#icon-shopping-cart`} />
              </svg>
            </Link>
            </IconWrapper>
          {screenSize.width < 767 &&
          <HamburgerButton />}
          
        </NavLogoWrapper>
      </Navbar>
      <SideMenu />
    </Header>
  );
};

export default MainMenu;
