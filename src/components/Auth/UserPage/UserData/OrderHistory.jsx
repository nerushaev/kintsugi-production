import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";
import { getOrders } from "../../../../redux/orders/order-operations";
import { selectAllOrders, selectIsOrderLoading } from "../../../../redux/orders/order-selectors";
import { SmallLoader } from "../../../SmallLoader/SmallLoader";
import styled from 'styled-components';
import { Container } from "../../../Container/Container.styled";

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -10px;
  gap: 20px;
  margin-bottom: 20px;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 6px;
  margin: 0 auto;
  heigth: 100%;
`;

const ItemBodyWrapper = styled.div`
display: flex;
justify-content: space-around;
`;

const ItemImageWrapper = styled.div`
  max-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ItemProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.p`
height: 40px;
`;

export default function OrderHistory({ ordersId, userPhone }) {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsOrderLoading);
  const orders = useSelector(selectAllOrders);

  useEffect(() => {
    dispatch(getOrders(ordersId));
  }, [ordersId, dispatch])

return (
  <Container>
  {loading && <SmallLoader />}
  <List>
  {orders.map(item => {
    const {_id, products, totalPrice, date, orderId} = item
    return(
      <Item key={_id}>
        <ItemBodyWrapper>
          <p>{orderId}</p>
          <p>{date}</p>
        </ItemBodyWrapper>
        <ItemProductsWrapper>
          {products.map(item => {
            const {photo, product_name} = item;
            return(
              <ItemImageWrapper key={product_name}>
                <img src={photo ? `https://kintsugi.joinposter.com${photo}` : "https://res.cloudinary.com/dzjmswzgp/image/upload/c_crop,ar_1:1/v1719250641/image_not_found_wruanw.jpg"} alt="" />
                <Title>{product_name}</Title>
              </ItemImageWrapper>
            )
          })}
        </ItemProductsWrapper>
        <ItemBodyWrapper>
          <p>Загальна сума:</p>
          <p>{totalPrice}грн</p>
        </ItemBodyWrapper>
      </Item>
    )
  })}
  </List>
  </Container>
)
}
