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
  const [isShowOrders, setIsShowOrders] = useState(false);

  const { orders } = user;

  const handleClick = (e) => {
    const name = e.currentTarget.getAttribute("data-name");

    switch (name) {
      case name:
        setIsShowOrders(!isShowOrders);
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper>
      <UserInfo user={user}/>
      <PasswordChangeForm />
      <Form>
        <DeliveryData user={user} />
      </Form>
      {<DataWrapper $marginBottom={isShowOrders ? true : false}>
        <DataTitle>Історія замовлень</DataTitle>
        <button data-name="delivery" onClick={handleClick}>
          <Logo
            $active={isShowOrders ? true : false}
            url={`${svg}#icon-arrow`}
            width="20"
            height="20"
          />
        </button>
      </DataWrapper>}
      {isShowOrders && <OrderHistory orders={orders} userPhone={user.phone} />}
    </Wrapper>
  );
}
