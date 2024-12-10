import React, { useContext } from "react";
import styled from "styled-components";
import { MenuContext } from "../../../context/navState";

const MenuButton = styled.button`
  display: block;
  width: 30px; /* Размер кнопки */
  height: 30px;
  transform-origin: 15px 15px; /* Центр кнопки */
  padding: 0;
  outline: 0;
  border: 0;
  background: none;
  margin-right: 10px;

  span {
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  :focus {
    outline: 0;
  }

  :hover {
    span:nth-of-type(1) {
      width: 20px;
    }

    span:nth-of-type(2) {
      width: 24px;
    }

    span:nth-of-type(3) {
      width: 18px;
    }
  }

  &.active {
    padding-bottom: 5px;
    span:nth-of-type(1) {
      transform: rotate(45deg) translate(7px, 7px); /* Анимация для уменьшенных размеров */
      width: 26px;
    }

    span:nth-of-type(2) {
      opacity: 0;
      pointer-events: none;
    }

    span:nth-of-type(3) {
      transform: rotate(-45deg) translate(3px, -3px);
      width: 26px;
    }
  }
`;

const Bar = styled.span`
  display: block;
  width: 30px; /* Ширина полоски */
  height: 3px; /* Толщина полоски */
  margin-bottom: 4px; /* Отступ между полосками */
  background-color: #000;

  &:last-child {
    margin-bottom: 0; /* Убираем отступ у последней полоски */
  }
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



