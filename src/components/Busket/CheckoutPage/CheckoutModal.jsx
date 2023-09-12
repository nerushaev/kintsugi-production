import React, { useState } from "react";
import styled from "styled-components";
import { Select, Text } from "../../Fields/Fields.styled";
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
  const { setOrderData, orderData, setWillBeRegister } = props;
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "yes":
        setYes(true);
        setNo(false);
        setWillBeRegister(true);
        break;
      case "no":
        setNo(true);
        setYes(false);
        setWillBeRegister(false);
        break;
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
        <Text accent={true}>Зареєструвати вас на сайті?</Text>
        <CheckboxesWrapper>
          <CheckboxWrapper>
            <Label htmlFor="yes">Так</Label>
            <Select
              name="yes"
              onChange={handleChange}
              id="yes"
              type="checkbox"
              checked={yes}
            />
          </CheckboxWrapper>
          <CheckboxWrapper>
            <Label htmlFor="no">Ні</Label>
            <Select
              name="no"
              onChange={handleChange}
              id="no"
              type="checkbox"
              checked={no}
            />
          </CheckboxWrapper>
        </CheckboxesWrapper>
        {yes && (
          <>
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
          </>
        )}
      </InputWrapper>
    </div>
  );
}
