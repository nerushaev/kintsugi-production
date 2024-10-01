import { memo } from "react";
import { FlexContainer } from "../../../../Container/Container.styled";
import { Text } from "../../../../Text/Text.styled";
import styled from "styled-components";
import { theme } from "../../../../../styles/theme";

const ImageContainer = styled.div`
  width: 70px;
  height: 70px;
  margin-right: 10px;
`;

const ItemGridContainer = styled.div`
  position: relative; 
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  text-align: center;
  align-items: center;
  margin-bottom: 20px;
      &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: ${theme.colors.gray};
    bottom: -10px;
    left: 0;
  }
          &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: ${theme.colors.gray};
    top: -10px;
    left: 0;
  }
`;

const StyledFlexContainer = styled(FlexContainer)`
  overflow: hidden;
  gap: 20px;
  white-space: nowrap;
`;

const OrderHistoryItemContainer = styled.div`
  margin-bottom: 40px;
  position: relative;
`;

const HistoryBodyContainer = styled.div`
    &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: ${theme.colors.gray};
    bottom: -20px;
    left: 0;
  }
`;

export const OrderHistoryItem = memo(({ details }) => {
  const {
    orderId,
    products,
    name,
    email,
    phone,
    addressDelivery,
    postboxDelivery,
    warehouseDelivery,
    address,
    postbox,
    payments,
    city,
    warehouse
  } = details;

  let totalPrice = 0;

  details.products.map((item) => {
    return totalPrice += (item.price * item.amount) / 100;
  });

  return (
    <OrderHistoryItemContainer>
      <StyledFlexContainer>
        <Text>Замовлення №</Text>
        <Text>{orderId}</Text>
      </StyledFlexContainer>
      <StyledFlexContainer>
        <Text>Статус</Text>
        <Text>Прийнято</Text>
      </StyledFlexContainer>
      <HistoryBodyContainer>
        {products.map((item) => {
          const { product_name, photo, amount, price } = item;
          return (
              <ItemGridContainer key={product_name}>
                <ImageContainer>
                  <img src={`https://kintsugi.joinposter.com${photo}`} alt="" />
                </ImageContainer>
                <Text>{product_name}</Text>
                <Text>x{amount}</Text>
                <Text>{(price * amount) / 100}грн</Text>
              </ItemGridContainer>
          );
        })}
        <StyledFlexContainer>
          <Text>Загальна сума:</Text>
          <Text>{totalPrice}грн</Text>
        </StyledFlexContainer>
        <Text style={{ marginBottom: "15px" }}>Дані покупця</Text>
        <StyledFlexContainer>
          <Text>Ім’я:</Text>
          <Text>{name}</Text>
        </StyledFlexContainer>
        <StyledFlexContainer>
          <Text>Номер:</Text>
          <Text>{phone}</Text>
        </StyledFlexContainer>
        <StyledFlexContainer>
          <Text>Пошта:</Text>
          <Text>{email}</Text>
        </StyledFlexContainer>
        <StyledFlexContainer>
              <Text>Місто:</Text>
              <Text>{city}</Text>
            </StyledFlexContainer>
        {addressDelivery && (
          <>
            <StyledFlexContainer>
              <Text>Адреса:</Text>
              <Text>{address.address}</Text>
            </StyledFlexContainer>
            <StyledFlexContainer>
              <Text>Будинок:</Text>
              <Text>{address.house}</Text>
            </StyledFlexContainer>
            <StyledFlexContainer>
              <Text>Квартира:</Text>
              <Text>{address.appartment}</Text>
            </StyledFlexContainer>
          </>
        )}
        {postboxDelivery &&
        <StyledFlexContainer>
        <Text>Поштомат:</Text>
        <Text>{postbox}</Text>
      </StyledFlexContainer>
        }
        {warehouseDelivery &&
        <StyledFlexContainer>
        <Text>Відділення:</Text>
        <Text>{warehouse}</Text>
      </StyledFlexContainer>
        }
        <StyledFlexContainer>
          <Text>Оплата:</Text>
          <Text>{payments === "cash" ? "Накладений платіж" : "Онлайн оплата"}</Text>
        </StyledFlexContainer>
      </HistoryBodyContainer>
    </OrderHistoryItemContainer>
  );
});

export default OrderHistoryItem;
