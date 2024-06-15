import React from "react";
import { ButtonWrapper } from "../components/Buttons/Buttons";
import Title from "../components/Home/Title/Title";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Busket from "../components/Busket/BusketList";
import { useSelector } from "react-redux";
import { getBusket } from "../redux/products/products-selectors";

const StyledNavLink = styled(NavLink)`
  font-size: 16px;
  font-family: "Montserrat";
  font-weight: 500;
  line-height: 20px;
  padding: 10px 30px;
  margin-left: auto;
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
  const busket = useSelector(getBusket);
  const isBusketHaveItems = busket.length >= 1 ? true : false;

  return (
    <>
      <Title text="Додані товари" />
      <Busket/>
      {isBusketHaveItems && 
      <ButtonWrapper>
      <StyledNavLink to="/checkout">Оформити замовлення</StyledNavLink>
    </ButtonWrapper>
      }
      </>
  );
}
