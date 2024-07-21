import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { MenuContext } from "../../../context/navState";
import arrow from "../../../assets/arrow.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLogin } from "../../../redux/auth/auth-selectors";
import { logout } from "../../../redux/auth/auth-operations";
import { useAuth } from "../../../hooks/useAuth";

const Menu = styled.nav`
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  z-index: 293;
  display: block;
  width: 100%;
  max-width: 100%;
  margin-top: 0px;
  padding-top: 100px;
  padding-right: 0px;
  align-items: stretch;
  background-color: #fff;
  transform: translateX(-100%);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  ${(props) =>
    props.open &&
    css`
      transform: translateX(0);
    `}
`;

export const MenuLink = styled(NavLink)`
  position: relative;
  display: block;
  text-align: left;
  max-width: 100%;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 16%;
  background-image: url(${arrow});
  background-position: 88% 50%;
  background-size: 36px;
  background-repeat: no-repeat;
  transition: background-position 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
  text-decoration: none;
  color: #000;
  font-size: 30px;
  line-height: 120%;
  font-weight: 500;

  :hover {
    background-position: 90% 50%;
  }
`;

export const SideMenu = ({ children }) => {
  const dispatch = useDispatch();
  const { isMenuOpen, toggleMenuMode } = useContext(MenuContext);
  const { role } = useAuth();
  const isLoggedIn = useSelector(selectIsLogin);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Menu onClick={() => toggleMenuMode()} open={isMenuOpen}>
      {children}
      <MenuLink to="/" end href="/">
        Головна
      </MenuLink>
      <MenuLink to="/checkout">Корзина</MenuLink>
      <MenuLink to="/info" href="/info">
        Інформація
      </MenuLink>
      {isLoggedIn ? (
        <MenuLink onClick={handleLogout}>Вийти</MenuLink>
      ) : (
        <>
          <MenuLink to="/register" href="/register">
            Реєстрація
          </MenuLink>
          <MenuLink to="/login" href="/login">
            Увійти
          </MenuLink>
        </>
      )}
      {role === "admin" ? (
        <MenuLink to="/admin" href="/admin">
          Адмінка
        </MenuLink>
      ) : (
        ""
      )}
      
    </Menu>
  );
};

SideMenu.propTypes = {
  children: PropTypes.node,
};

// SideMenu.defaultProps = {
//   children: (
//     <>
//       <MenuLink to="/" end href="/">
//         Головна
//       </MenuLink>
//       <MenuLink to="/busket">Корзина</MenuLink>
//       <MenuLink to="/info" href="/info">
//         Інформація
//       </MenuLink>
//     </>
//   ),
// };
