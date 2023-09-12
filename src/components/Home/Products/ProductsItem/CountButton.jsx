import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import svg from '../../../../assets/filterIcons.svg';
import { decrementAmount, incrementAmount } from '../../../../redux/products/products-slice';

const CountWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const CountIcon = styled.svg`
  fill: black;
    &:first-child {
  }
`;

const CountText = styled.p`
  font-size: 16px;
  padding: 0 5px;
`;

export default function CountButton({ quantity, _id }) {
  const dispatch = useDispatch();
  
  const handleIncrement = (_id) => {
    dispatch(incrementAmount(_id))
  }
  
  const handleDecrement = (_id) => {
    dispatch(decrementAmount(_id))
  }

  return (
    <CountWrapper>
      <CountIcon onClick={() => handleIncrement(_id)} width="24" height="24">
        <use xlinkHref={`${svg}#icon-plus`} />
      </CountIcon>
      <CountText>{quantity}</CountText>
      <CountIcon onClick={() => handleDecrement(_id)} width="24" height="24">
        <use xlinkHref={`${svg}#icon-minus`} />
      </CountIcon>
    </CountWrapper>
  )
}
