import React from "react";
import styled from "styled-components";
import { Inputt } from "./Input";

export const InputWrapper = styled.div`
  background-color: white;
  padding: 15px;
  margin-right: 15px;
  margin-left: 15px;
  text-align: center;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

export const CheckboxesWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Label = styled.label`
  margin-right: 10px;
  font-size: 16px;
  font-family: "Montserrat";
  font-weight: 500;
  line-height: 30px;
  @media (min-width: 480px) {
    font-size: 18px;
  }
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1200px) {
    font-size: 24px;
  }
`;

export const CheckoutWrapper = styled.div`
  max-width: 450px;
  margin: 0 auto;
`;

export default function CheckoutModal(props) {
  const { setOrderData, orderData } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "password":
        setOrderData((prev) => {
          return {
            ...prev,
            password: value,
          };
        });
        break;
      case "confirmPassword":
        setOrderData((prev) => {
          return {
            ...prev,
            confirmPassword: value,
          };
        });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <InputWrapper>
            <Inputt
              onChange={handleChange}
              label="Пароль:"
              name="password"
              type="password"
              value={orderData.password}
            />
            <Inputt
              onChange={handleChange}
              label="Підтвердіть пароль:"
              name="confirmPassword"
              type="password"
              value={orderData.confirmPassword}
            />
      </InputWrapper>
    </div>
  );
}
