import React, { useEffect, useState } from "react";
import { Image, Text, TextWrapper, Title } from "../Busket/BusketList.styled";
import { Button, ButtonWrapper } from "../../components/Buttons/Buttons";
import styled from "styled-components";
import { novaInstance } from "../../API/api";
import { NOVA_API_KEY } from "../../API/nova";
import { useDispatch } from "react-redux";
import { createWaybill } from "../../redux/orders/order-operations";
import { theme } from "../../styles/theme";

const OrderItems = styled.li`
  width: 350px;
  border: ${theme.colors.gray} 1px solid;
  padding: 20px;
  display: flex;
  margin-right: 15px;
  margin-left: 15px;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    flex-basis: calc((100% - 60px) / 2);
  }
  @media (min-width: 1199px) {
    flex-basis: calc((100% - 90px) / 3);
  }
`;

const CartWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const OrderProductsWrapper = styled.div`
  height: 200px;
  overflow: scroll;
`;

const OrderTextCenter = styled.p`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.noMargin ? "0" : "30px"};
`;

const ProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const OrderHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const TextBlockWrapper = styled.div`
  margin-bottom: 30px;
`;

const OrderTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const OrderSubTitle = styled.p`
  font-weight: 400;
  margin-top: 10px;
  min-height: 40px;
`;

const OrderStatus = styled.p`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  &:after {
    content: "";
    display: block;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin-left: 10px;
    background-color: ${(props) => (props.accepted ? "green" : "red")};
  }
`;

  const CardFooterWrapper = styled.div`
    margin-top: auto;
  `;

export default function OrderItem({ order }) {
  const [novaStatus, setNovaStatus] = useState("");
  const dispatch = useDispatch();
  console.log(order);
  const {
    date,
    city,
    warehouse,
    products,
    totalPrice,
    accepted,
    name,
    phone,
    orderId,
    orderRef
  } = order;

  useEffect(() => {
    const fetchNovaStatus = async () => {
      try {
        const { data } = await novaInstance.post(
          "https://api.novaposhta.ua/v2.0/json/",
          {
            apiKey: NOVA_API_KEY,
            modelName: "TrackingDocument",
            calledMethod: "getStatusDocuments",
            methodProperties: {
              Documents: [
                {
                  DocumentNumber: orderRef,
                  Phone: phone,
                },
              ],
            },
          }
        );
        return setNovaStatus(data.data[0].Status);
      } catch (error) {
        console.log(error);
      }
    };
    if (orderRef) {
      fetchNovaStatus();
    }
  }, [orderRef, phone]);

  const acceptOrder = async(orderId) => {
    console.log(orderId);
    try {
      dispatch(createWaybill({orderId}));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <OrderItems key={date}>
      <CartWrapper>
      <OrderHeaderWrapper>
        <OrderTitle>Замовлення номер:</OrderTitle>
        <OrderTitle>{orderId}</OrderTitle>
      </OrderHeaderWrapper>
      <OrderHeaderWrapper>
        {accepted ? (
          <OrderStatus accepted={accepted}>Прийнято</OrderStatus>
        ) : (
          <OrderStatus >Не прийнято</OrderStatus>
        )}
        <OrderTitle>{date}</OrderTitle>
      </OrderHeaderWrapper>
      {orderRef ? 
        <OrderTextCenter>{orderRef}</OrderTextCenter> :
        <OrderTextCenter>Спочатку прийміть замовлення</OrderTextCenter>
      }
      <TextBlockWrapper>
        <OrderTitle>Статус (Нова Пошта):</OrderTitle>
        <OrderSubTitle>{orderRef ? novaStatus : "Накладна не створена"}</OrderSubTitle>
      </TextBlockWrapper>
      <TextBlockWrapper>
        <OrderTitle>Данні одержувача:</OrderTitle>
        <OrderSubTitle>{name}</OrderSubTitle>
        <OrderSubTitle>{phone}</OrderSubTitle>
        <OrderSubTitle>{city}</OrderSubTitle>
        <OrderSubTitle>{warehouse}</OrderSubTitle>
      </TextBlockWrapper>
      <OrderHeaderWrapper>
        <OrderTitle>Загальна сумма:</OrderTitle>
        <OrderTitle>{totalPrice}грн</OrderTitle>
      </OrderHeaderWrapper>
      <OrderProductsWrapper>
      {products.map(({ _id, image, price, description, amount, name }) => {
        return (
          <ProductWrapper key={_id}>
            <TextWrapper>
              <Image src={image[0]} alt="" />
            </TextWrapper>
            <TextWrapper>
              <Title>{name}</Title>
            </TextWrapper>
            <TextWrapper>
              <Text>{price}грн.</Text>
            </TextWrapper>
            <TextWrapper>
              <Text>{amount}</Text>
            </TextWrapper>
          </ProductWrapper>
        );
      })}
      </OrderProductsWrapper>
      <CardFooterWrapper>
      {accepted ? (
        <OrderTextCenter noMargin>Замовлення прийнято</OrderTextCenter>
      ) : (
        <ButtonWrapper noMargin> 
          <Button onClick={() => acceptOrder(orderId)}>Прийняти та створити накладну</Button>
        </ButtonWrapper>
      )}
      </CardFooterWrapper>
      </CartWrapper>
    </OrderItems>
  );
}
