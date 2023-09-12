import React, { useState } from "react";
import styled from "styled-components";
import svg from "../../../../assets/filterIcons.svg";
import { Form } from "../../../Fields/Fields.styled";
import DeliveryData from "./DeliveryData";
import OrderHistory from "./OrderHistory";
import PasswordChangeForm from "./PasswordChangeForm";
import UserInfo from "./UserInfo";

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const DataWrapper = styled.div`
  height: 40px;
  background-color: rgba(162, 210, 255, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  margin-bottom: ${(props) => (props.$marginBottom ? "30px" : "0")};
`;

const DataTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
`;

const Svg = styled.svg`
  transform: ${(props) => (props.$active ? "rotate(90deg)" : "rotate(270deg)")};
`;

const Logo = ({ url, width, height, active }) => {
  return (
    <Svg $active={active} width={width} height={height}>
      <use xlinkHref={url} />
    </Svg>
  );
};

export default function UserData({ user }) {
  const [isShow, setIsShow] = useState({
    orders: false,
    delivery: false,
    information: false,
    password: false,
    callback: false,
  });

  const { orders } = user;

  const handleClick = (e) => {
    const name = e.currentTarget.getAttribute("data-name");

    switch (name) {
      case name:
        setIsShow((prev) => {
          return {
            ...prev,
            [name]: !prev[name],
          };
        });
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper>
      <DataWrapper $marginBottom={isShow.orders ? true : false}>
        <DataTitle>Історія ваших замовлень</DataTitle>
        <button data-name="orders" onClick={handleClick}>
          <Logo
            $active={isShow.orders ? true : false}
            url={`${svg}#icon-arrow`}
            width="20"
            height="20"
          />
        </button>
      </DataWrapper>
      {isShow.orders && <OrderHistory orders={orders} userPhone={user.phone} />}
      <DataWrapper $marginBottom={isShow.delivery ? true : false}>
        <DataTitle>Адреса доставки</DataTitle>
        <button data-name="delivery" onClick={handleClick}>
          <Logo
            $active={isShow.delivery ? true : false}
            url={`${svg}#icon-arrow`}
            width="20"
            height="20"
          />
        </button>
      </DataWrapper>
      {isShow.delivery && (
        <Form>
          <DeliveryData user={user} />
        </Form>
      )}
      <DataWrapper $marginBottom={isShow.information ? true : false}>
        <DataTitle>Особиста інформація</DataTitle>
        <button data-name="information" onClick={handleClick}>
          <Logo
            $active={isShow.information ? true : false}
            url={`${svg}#icon-arrow`}
            width="20"
            height="20"
          />
        </button>
      </DataWrapper>
      {isShow.information && <UserInfo user={user} />}
      <DataWrapper $marginBottom={isShow.password ? true : false}>
        <DataTitle>Змінна паролю</DataTitle>
        <button data-name="password" onClick={handleClick}>
          <Logo
            $active={isShow.password ? true : false}
            url={`${svg}#icon-arrow`}
            width="20"
            height="20"
          />
        </button>
      </DataWrapper>
      {isShow.password && <PasswordChangeForm />}
      <DataWrapper $marginBottom={isShow.callback ? true : false}>
        <DataTitle>Зворотній зв’язок:</DataTitle>
        <button data-name="callback" onClick={handleClick}>
          <Logo
            $active={isShow.callback ? true : false}
            url={`${svg}#icon-arrow`}
            width="20"
            height="20"
          />
        </button>
      </DataWrapper>
    </Wrapper>
  );
}
