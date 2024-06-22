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

export default function CountButton({ amount, _id }) {
  const dispatch = useDispatch();
  
  const handleIncrement = (_id) => {
    dispatch(incrementAmount(_id))
  }
  
  const handleDecrement = (_id) => {
    dispatch(decrementAmount(_id))
  }

  return (
    <CountWrapper>
      <FaPlus onClick={() => handleIncrement(_id)} />
      <CountText>{amount}</CountText>
      <FaMinus onClick={() => handleDecrement(_id)} />
    </CountWrapper>
  )
}
