import React from "react";
import BusketList from "../components/Busket/BusketList";
import { ButtonWrapper } from "../components/Buttons/Buttons";
import Title from "../components/Home/Title/Title";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  font-size: 16px;
  font-family: "Montserrat";
  font-weight: 500;
  line-height: 20px;
  padding: 10px 30px;
  background-color: rgba(162, 210, 255, 1);
  &:not(:last-child) {
    margin-right: 15px;
  }
  @media (min-width: 768px) {
    font-size: 20px;
    padding: 15px 40px;
  }
  @media (min-width: 1200px) {
    font-size: 28px;
    padding: 20px 50px;
  }
`;

export default function BusketPage() {
  return (
    <>
      <Title text="Додані товари" />
      <BusketList />
      <ButtonWrapper>
        <StyledNavLink to="/checkout">Оформити замовлення</StyledNavLink>
      </ButtonWrapper>
    </>
  );
}
