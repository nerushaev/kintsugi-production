import styled from "styled-components";
import { theme } from "../../styles/theme";

export const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.$noMargin ? "0" : "30px"};
`;

export const Button = styled.button`
  font-size: ${theme.fontSizes.small};
  font-family: "Montserrat";
  font-weight: 500;
  line-height: 20px;
  padding: 10px;
  width: 100%;
  background-color: ${(props) =>
    props.$delete ? theme.colors.red : theme.colors.formButton};
    display: flex;
    align-items: center;
    justify-content: center;
  
  margin-bottom: ${props => props.$margin ? "20px" : ""};
  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.$delete ? theme.colors.redAccent : theme.colors.formButtonAccent};
    transition: background-color ${theme.animation.cubicBezier};
  }
  &:not(:last-child) {
    margin-right: 15px;
  }
  @media (min-width: 768px) {
    font-size: ${theme.fontSizes.large};
    padding: 15px 40px;
  }
  @media (min-width: 1200px) {
    font-size: ${theme.fontSizes.large};
    padding: 20px 50px;
  }
`;

export const AddButton = styled.button`
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 60px;
  font-size: ${theme.fontSizes.small};
  padding: 10px 10px;
  background-color: ${(props) =>
    props.disabled ? "#D6B2D9" : `${theme.colors.formButton}`};
  color: #000;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.small};
  }
`;