import { memo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useScreenSize from "../../hooks/useScreenSize";
import NavState from "../../context/navState";
import { selectIsLogin } from "../../redux/auth/auth-selectors";
import Logo from "../Home/Logo/Logo";
import { Link } from "react-router-dom";
import HamburgerButton from "../Home/HamburgerButton/HamburgerButton";
import svg from "../../assets/filterIcons.svg";
import { SideMenu } from "../Home/SideMenu/SideMenu";
import HeaderBusket from "./HeaderBusket";
import HeaderLinks from "./HeaderLinks";

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
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px;
  z-index: 500;
  height: 70px;
  padding: 0px 15px;

  @media (min-width: 767px) {
    height: 80px;
    padding: 0 30px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
`;

const NavLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const HeaderStyle = styled.header`
  margin-bottom: 70px;

  @media (min-width: 767px) {
    margin-bottom: 80px;
  }
`;

const Header = memo(() => {
  const isLoggedIn = useSelector(selectIsLogin);
  const screenSize = useScreenSize();

  return (
    <NavState>

      <HeaderStyle id="header">

        <Navbar>

          <Logo />

          <NavLogoWrapper>

            {screenSize.width > 767 && (
              <HeaderLinks />
            )}

            <IconWrapper>

              {isLoggedIn && (

                <Link to="/user">
                  <svg width="42" height="50">
                    <use xlinkHref={`${svg}#icon-profile`} />
                  </svg>
                </Link>

              )}

              <HeaderBusket />

              {screenSize.width < 767 && <HamburgerButton />}

            </IconWrapper>

          </NavLogoWrapper>

        </Navbar>

        <SideMenu />

      </HeaderStyle>
      
    </NavState>
  );
});

export default Header;


