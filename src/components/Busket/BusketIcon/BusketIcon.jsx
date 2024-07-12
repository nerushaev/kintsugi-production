import React from "react";
import { useSelector } from "react-redux";
import { animateScroll as scroll } from 'react-scroll';
import styled from "styled-components";
import svg from "../../../assets/filterIcons.svg";
import { selectBusketAmount } from "../../../redux/products/products-selectors";
import { useNavigate } from "react-router";

const BusketContainer = styled.div`
  width: 70px;
  height: 70px;
  z-index: 50;
  position: fixed;
  background-color: white;
  border-radius: 100%;
  bottom: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BusketAmount = styled.p`
  z-index: 50;
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

export default function Busket() {
  const busketAmount = useSelector(selectBusketAmount);
  const navigate = useNavigate();

  const handleClick = () => {
    if(busketAmount === 0) {
      return;
    } else {
      scroll.scrollToTop({
        duration: 800,
        delay: 0
      });
      navigate('/checkout')
    }
  }


  return (
    <div onClick={handleClick}>
      <BusketContainer>
        <BusketAmount>{busketAmount}</BusketAmount>
        <svg width="40" height="40">
          <use href={`${svg}#icon-shopping-cart`} />
        </svg>
      </BusketContainer>
    </div>
  );
}
