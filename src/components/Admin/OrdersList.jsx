import React from "react";
import styled from "styled-components";
import OrderItem from "./OrderItem";

const OrderList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
  justify-content: center;
`;

export default function OrdersList({ orders }) {
  return <OrderList>
    {orders.map(order => {return <OrderItem key={order.orderId} order={order} />})}
    </OrderList>;
}
