import styled from "styled-components";
import { theme } from "../../styles/theme";

export const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: ${props => props.$noMargin ? "0" : "30px"};
`;


/*
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  padding: 20px;
  background-color: ${props => props.$accent ? `${theme.colors.red}` : `${theme.colors.formButton}`};
  border-radius: 6px;
  &:hover {
    background-color: ${props => props.$accent ? `${theme.colors.redAccent}` : `${theme.colors.formButtonAccent}`};
  }
*/

export const Button = styled.button`
  font-size: ${theme.fontSizes.small};
  font-family: "Montserrat";
  font-weight: 500;
  line-height: 20px;
  padding: 20px;
  border-radius: 6px;
  background-color: ${(props) =>
    props.$delete ? theme.colors.red : theme.colors.formButton};
    display: flex;
    align-items: center;
    justify-content: center;
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
    font-size: ${theme.fontSizes.medium};
    padding: 10px 20px;
  }
  @media (min-width: 1200px) {
    font-size: ${theme.fontSizes.large};
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