import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { decrementAmount, incrementAmount } from '../../../../redux/products/products-slice';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const CountWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CountText = styled.p`
  font-size: 16px;
  margin: 0 20px;
  padding: 5px;
  font-weight: 600;
`;

export default function CountButton({ amount, product_id }) {
  const dispatch = useDispatch();
  
  const handleIncrement = (product_id) => {
    dispatch(incrementAmount(product_id))
  }
  
  const handleDecrement = (product_id) => {
    dispatch(decrementAmount(product_id))
  }

  return (
    <CountWrapper>
      <FaPlus onClick={() => handleIncrement(product_id)} />
      <CountText>{amount}</CountText>
      <FaMinus onClick={() => handleDecrement(product_id)} />
    </CountWrapper>
  )
}
