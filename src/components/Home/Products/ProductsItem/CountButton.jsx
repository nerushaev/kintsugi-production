import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  decrementAmount,
  incrementAmount,
} from "../../../../redux/products/products-slice";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { theme } from "../../../../styles/theme";

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const CountWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  // gap: 20px;
`;

const CountText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  min-width: 40px;
  font-size: 16px;
  font-weight: 600;
  background-color: ${theme.colors.formButton};
  border-radius: 6px;
  margin-left: 20px;
`;

const LeftButton = styled.button`
  height: 40px;
  background-color: ${theme.colors.formButton};
  width: 100%;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`;

const RightButton = styled.button`
  height: 40px;
  background-color: ${theme.colors.formButtonAccent};
  width: 100%;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
`;

export default function CountButton({ amount, product_id }) {
  const dispatch = useDispatch();
  const handleIncrement = (product_id) => {
    dispatch(incrementAmount(product_id));
  };
  const handleDecrement = (product_id) => {
    dispatch(decrementAmount(product_id));
  };

  return (
    <CountWrapper>
      <ButtonWrapper>
        <LeftButton onClick={() => handleIncrement(product_id)}>
          <FaPlus />
        </LeftButton>
        <RightButton onClick={() => handleDecrement(product_id)}>
          <FaMinus />
        </RightButton>
      </ButtonWrapper>
      <CountText>{amount}</CountText>
    </CountWrapper>
  );
}
