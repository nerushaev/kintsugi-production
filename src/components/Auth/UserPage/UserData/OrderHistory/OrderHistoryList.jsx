import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../../../redux/orders/order-operations";
import {
  selectAllOrders,
} from "../../../../../redux/orders/order-selectors";
import styled from "styled-components";
import {
  CheckoutStepTitle,
} from "../../../../Busket/CheckoutPage/CheckoutSteps/Steps.styled";
import { theme } from "../../../../../styles/theme";
import OrderHistoryItem from "./OrderHistoryItem";

export const Block = styled.div`
  position: relative;
  background-color: white;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;

  @media (min-width: 479px) {
    padding: 40px 50px;
  }
`;

const Grid = styled.div`
position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
    &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: ${theme.colors.gray};
    bottom: 20px;
    left: 0;
  }
`;

const GridItem = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  align-items: center;

`;

const GridTitle = styled.h3`
  font-family: "Montserrat";
  font-size: ${theme.fontSizes.medium};
  font-weight: 500;
`;

const GridButton = styled.button`
  padding: 5px 10px;
  background-color: ${theme.colors.formButton};
  border-radius: 6px;
`;


export default function OrderHistory({ ordersId }) {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const [activeOrder, setActiveOrder] = useState('')

  useEffect(() => {
    dispatch(getOrders(ordersId));
  }, [ordersId, dispatch]);

  const handleClick = (orderId) => {
    if(activeOrder.includes(orderId)) {
      setActiveOrder("");
    } 
    else {
      setActiveOrder(orderId);
    }
  }

  return (
    <>
      <CheckoutStepTitle>Історія замовлень</CheckoutStepTitle>
      <Block key="grida">
      <Grid >
              <GridItem>
                <GridTitle>Дата</GridTitle>
              </GridItem>
              <GridItem>
                <GridTitle>Сума</GridTitle>
              </GridItem>
              <GridItem>
                <GridTitle></GridTitle>
              </GridItem>
            </Grid>
        {orders.map(item => {
          return(
            <div key={item.orderId}>
             <Grid>
              <GridItem>
                <p>{item.date}</p>
              </GridItem>
              <GridItem>
                <p>{item.totalPrice}грн</p>
              </GridItem>
              <GridItem>
                <GridButton onClick={() => handleClick(item.orderId)}>{activeOrder?.includes(item.orderId) ? "X" : "Details"}</GridButton>
              </GridItem>
            </Grid> 
            {activeOrder?.includes(item.orderId) && <OrderHistoryItem details={item} />}
            </div>
          )
        })}
      </Block>
    </>
  );
}
