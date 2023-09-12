import React, { useContext } from "react";
import styled from "styled-components";
import { MenuContext } from "../../../context/navState";

const MenuButton = styled.button`
  display: block;
  transform-origin: 16px 11px;
  padding: 5px;
  float: left;
  outline: 0;
  border: 0;
  background: none;
  margin-right: 10px;

  span {
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  :focus {
    // border: medium none rgb(255, 182, 193);
    // box-shadow: rgb(255, 105, 180) 0 0 2px 2px;
    outline: 0;
  }

  :hover {
    span:nth-of-type(1) {
      width: 33px;
    }

    span:nth-of-type(2) {
      width: 40px;
    }

    span:nth-of-type(3) {
      width: 30px;
    }
  }

  &.active {
    span:nth-of-type(1) {
      transform: rotate(45deg) translate(9px, 9px);
      width: 40px;
    }

    span:nth-of-type(2) {
      opacity: 0;
      pointer-events: none;
    }

    span:nth-of-type(3) {
      transform: rotate(-45deg) translate(4px, -4px);
      width: 40px;
    }
  }
`;

const Bar = styled.span`
  display: block;
  width: 40px;
  height: 2px;
  margin-bottom: 7px;
  background-color: #000;
`;

const HamburgerButton = () => {
  const { isMenuOpen, toggleMenuMode } = useContext(MenuContext);

  const clickHandler = () => {
    toggleMenuMode();
  };

  return (
    <MenuButton
      className={isMenuOpen ? "active" : ""}
      aria-label="Открыть главное меню"
      onClick={clickHandler}
    >
      <Bar />
      <Bar />
      <Bar />
    </MenuButton>
  );
};

export default HamburgerButton;
