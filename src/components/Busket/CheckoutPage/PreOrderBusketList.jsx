import React from 'react';
import styled from 'styled-components';
import { Label } from '../../Admin/Fields';
import { ProductsItem, ProductsItemImage, ProductsItemTextWrapper, ProductsList, Text } from '../../Fields/Fields.styled';
import { Navigate } from 'react-router';

const BusketWrapper = styled.div`
  @media (min-width: 1199px) {
    margin-right: 50px;
  }
`;

export default function PreOrderBusketList({busket}) {
  if (busket.length < 1) {
    return <Navigate to="/" />;
  }

  let elements;
  if (busket) {
    elements = busket.map(({ image, name, price, amount }) => {
      return (
        <ProductsItem key={image}>
          <ProductsItemImage src={image[0]} alt="" />
          <ProductsItemTextWrapper>
            <Text>{name}</Text>
            <Text>{price}</Text>
            <Text>{amount}</Text>
          </ProductsItemTextWrapper>
        </ProductsItem>
      );
    });
  }

  return (
    <BusketWrapper>
          <ProductsList>
            <Label>Ваше замовлення:</Label>
            {elements}
          </ProductsList>
        </BusketWrapper>
  )
}


