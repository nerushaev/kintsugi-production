import React from 'react';
import styled from 'styled-components';
import { Label } from '../../Admin/Fields';
import { Text } from '../../Fields/Fields.styled';
import { Navigate } from 'react-router';
import { theme } from '../../../styles/theme';

const BusketWrapper = styled.div`
  @media (min-width: 1199px) {
    margin-right: 50px;
  }
`;

const CheckoutList = styled.ul`

`;

const CheckoutItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-top: 2px solid ${theme.colors.ligthGray};
  border-bottom: 2px solid ${theme.colors.ligthGray};
`;

const CheckoutItemTextWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CheckoutItemImage = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 10px;
`;

export default function PreOrderBusketList({busket}) {
  if (busket.length < 1) {
    return <Navigate to="/" />;
  }

  let elements;
  if (busket) {
    elements = busket.map(({ image, name, price, amount }) => {
      return (
        <CheckoutItem key={image}>
          <CheckoutItemImage src={image[0]} alt="" />
          <CheckoutItemTextWrapper>
            <Text>{name}</Text>
            <Text>{amount}</Text>
            <Text>{price}</Text>
          </CheckoutItemTextWrapper>
        </CheckoutItem>
      );
    });
  }

  return (
    <BusketWrapper>
            <Label>Ваше замовлення:</Label>
          <CheckoutList>
            {elements}
          </CheckoutList>
        </BusketWrapper>
  )
}


