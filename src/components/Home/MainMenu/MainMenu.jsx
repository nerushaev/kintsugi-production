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
import { useSelector } from "react-redux";
import { selectBusketAmount } from "../../../redux/products/products-selectors";
import { useNavigate } from "react-router";

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
  gap: 5px;
`;

const NavLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const Header = styled.header`
  margin-bottom: 70px;

  @media (min-width: 767px) {
    margin-bottom: 80px;
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  @media (min-width: 767px) {
    font-size: 16px;
    gap: 20px;
  }
  @media (min-width: 1199px) {
    font-size: 20px;
    gap: 25px;
  }
`;

const BusketWrapper = styled.div`
  position: relative;
`;

const TotalPrice = styled.p`
  position: absolute;
  width: 22px;
  height: 22px;
  right: 0;
  top: 0;
  z-index: 1000;
  background-color: lightgray;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainMenu = () => {
  const node = useRef();
  const { isLoggedIn } = useAuth();
  const { isMenuOpen, toggleMenuMode } = useContext(MenuContext);
  const screenSize = useScreenSize();
  const totalAmount = useSelector(selectBusketAmount);
  const navigate = useNavigate();

  useOnClickOutside(node, () => {
    if (isMenuOpen) {
      toggleMenuMode();
    }
  });

  const handleClick = () => {
    if(totalAmount !== 0) {
      window.scrollTo({top: 0})
      navigate('/checkout')
    } else {
      return;
    }
  }

  return (
    <Header id="header" ref={node}>
      <Navbar>
        <Logo className={"nav-logo"} />
        <NavLogoWrapper>
          {screenSize.width > 767 && (
            <LinksWrapper>
              <Link to="/">Каталог</Link>
              <Link to="/info">Оплата та доставка</Link>
              <Link>Про нас</Link>
              {!isLoggedIn && (
                <>
                  <Link to="/register">Реєстрація</Link>
                  <Link to="/login">Вхід</Link>
                </>
              )}
            </LinksWrapper>
          )}
          <IconWrapper>
            {isLoggedIn && (
              <Link to="/user">
                <svg width="42" height="50">
                  <use xlinkHref={`${svg}#icon-profile`} />
                </svg>
              </Link>
            )}
            <div onClick={handleClick}>
              <BusketWrapper>
                {totalAmount > 0 &&
                <TotalPrice>{totalAmount}</TotalPrice>
                }
                <svg width="42" height="50">
                  <use xlinkHref={`${svg}#icon-shopping-cart`} />
                </svg>
                {/* {totalPrice !== 0 &&
                <TotalPrice>{totalPrice}</TotalPrice>
                } */}
              </BusketWrapper>
            </div>
            {screenSize.width < 767 && <HamburgerButton />}
          </IconWrapper>
        </NavLogoWrapper>
      </Navbar>
      <SideMenu />
    </Header>
  );
};

export default MainMenu;
