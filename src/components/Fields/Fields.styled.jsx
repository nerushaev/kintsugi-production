import styled from "styled-components";
import { theme } from "../../styles/theme";

export const OrderWrapper = styled.div`
  margin: 0 auto;
  max-width: 450px;
  @media (min-width: 1199px) {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 100%;
  }
`;

export const Form = styled.form`
  display: inline-block;
  width: 100%;
  max-width: 450px;
  @media (min-width: 768px) {
    margin-right: ${(props) => (props.checkout ? "30px" : "0")};
  }
  @media (min-width: 1199px) {
    max-width: 100%
    margin-right: ${(props) => (props.checkout ? "50px" : "0")};
  }
`;

export const ProductsList = styled.ul`
  margin-bottom: 30px;
`;

export const ProductsItem = styled.li`
  display: flex;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  @media (min-width: 768px) {
    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }
`;

export const ProductsItemTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
`;

export const ProductsItemImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 20px;
  @media (min-width: 768px) {
    width: 150px;
    height: 150px;
  }
  @media (min-width: 1200px) {
    width: 200px;
    height: 200px;
  }
`;

export const FieldWrapper = styled.div`
  margin-bottom: 30px;
  display: ${(props) => (props.select ? "flex" : "")};
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
  @media (min-width: 1200px) {
    margin-bottom: 50px;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: ${theme.fontSizes.medium};
  font-family: "Montserrat";
  font-weight: 500;
  line-height: 30px;
  max-width: 80%;
  margin-bottom: ${(props) => (props.noMargin ? "0" : "10px")};
  margin: ${(props) => (props.position === "center" ? "0 auto" : "0")};

  @media (min-width: 768px) {
    font-size: ${theme.fontSizes.large};
    margin-bottom: ${(props) => (props.noMargin ? "0" : "15px")};
  }
  @media (min-width: 1200px) {
    font-size: ${theme.fontSizes.extraLarge};
    margin-bottom: ${(props) => (props.noMargin ? "0" : "20px")};
  }
`;

export const ProductName = styled.h2`
  display: inline-block;
  font-size: 16px;
  font-family: "Montserrat";
  font-weight: 500;
  line-height: 20px;
  margin-bottom: ${(props) => (props.noMargin ? "0" : "10px")};

  @media (min-width: 768px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
  @media (min-width: 1200px) {
    font-size: 28px;
    margin-bottom: 20px;
  }
`;

export const Text = styled.p`
  font-size: ${theme.fontSizes.medium};
  font-family: "Montserrat";
  font-weight: ${(props) => (props.$accent ? "500" : "400")};
  line-height: 20px;
  max-width: 240px;
  display: inline-block;
  &:not(:last-child) {
    margin-bottom: 15px;
  }
  @media (min-width: 768px) {
    font-size: ${theme.fontSizes.large};
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
  @media (min-width: 1200px) {
    font-size: ${theme.fontSizes.large};
    margin-bottom: 20px;
    line-height: 26px;
  }
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  border-radius: none;
  border: 1px solid black;
  padding-left: 10px;
  background-color: ${(props) =>
    props.disable ? "rgb(238, 130, 238, 0.2)" : ""};

  font-size: 16px;
  font-family: "Montserrat";
  font-weight: 500;
  line-height: 20px;

  @media (min-width: 768px) {
    height: 50px;
    font-size: 18px;
  }

  @media (min-width: 1200px) {
    font-size: ${theme.fontSizes.medium};
  }
`;

export const Select = styled.input`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  height: 20px;
  width: 20px;
  @media (min-width: 480px) {
    height: 25px;
    width: 25px;
  }
`;

export const Checkbox = styled.div`
  content: "";
  width: 20px;
  height: 20px;
  border: ${(props) => (props.active ? "1px solid red" : "1px solid black")};
  @media (min-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;
