import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../../../redux/orders/order-operations";
import { selectAllOrders } from "../../../../../redux/orders/order-selectors";
import styled from "styled-components";
import { CheckoutStepTitle } from "../../../../Busket/CheckoutPage/CheckoutSteps/Steps.styled";
import { theme } from "../../../../../styles/theme";
import OrderHistoryItem from "./OrderHistoryItem";
import { Title, TitleWrapper } from "../../../../Text/Text.styled";
import { Button, ButtonWrapper } from "../../../../Buttons/Buttons";
import { BsList } from "react-icons/bs";

export const Block = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  @media (min-width: 479px) {
    padding: 40px 50px;
  }
  @media (min-width: 767px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
`;

const Item = styled.div`
  border: 1px solid ${theme.colors.gray};
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
    @media (min-width: 767px) {
    margin-bottom: 0px;

  }
`;

const ItemHeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ItemImageWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  border-radius: 6px;
  border: 1px solid ${theme.colors.gray};
`;

const PreTitle = styled.p`
  font-size: ${theme.fontSizes.extraSmall};
  color: gray;
  margin-bottom: 2px;
`;

const SubTitle = styled.p`
  font-family: "Montserrat Alternates";
  font-size: ${theme.fontSizes.extraSmall};
`;

export default function OrderHistory({ ordersId }) {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const [activeOrder, setActiveOrder] = useState("");
  useEffect(() => {
    dispatch(getOrders(ordersId));
  }, [ordersId, dispatch]);

  const handleClick = (orderId) => {
    if (activeOrder.includes(orderId)) {
      setActiveOrder("");
    } else {
      setActiveOrder(orderId);
    }
  };

  return (
    <>
      <TitleWrapper>
        <Title>Історія замовлень</Title>
      </TitleWrapper>
      <Block>
        {orders.map((item) => {
          const { photo } = item;
          console.log(orders);
          return (
            <>
              <Item>
                <ItemHeadWrapper>
                  <div>
                    <PreTitle>Дата замовлення</PreTitle>
                    <SubTitle>{item.date}</SubTitle>
                  </div>
                  <div>
                    <PreTitle>Загальна сума</PreTitle>
                    <SubTitle>{item.totalPrice},00грн</SubTitle>
                  </div>
                </ItemHeadWrapper>
                <ItemImageWrapper>
                  {item.products.map((item) => {
                    return (
                      <>
                        <ImageWrapper><img src={`https://kintsugi.joinposter.com${item.photo}`}/></ImageWrapper >
                      </>
                    );
                  })}
                </ItemImageWrapper>
                <ButtonWrapper $noMargin>
                  <Button><BsList />Деталі</Button>
                </ButtonWrapper>
              </Item>
              {activeOrder?.includes(item.orderId) && (
                <OrderHistoryItem details={item} />
              )}
            </>
          );
        })}
      </Block>
    </>
  );
}
