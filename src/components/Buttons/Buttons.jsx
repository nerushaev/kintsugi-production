import styled from "styled-components";
import { theme } from "../../styles/theme";

export const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: ${props => props.$noMargin ? "0" : "30px"};
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  color: black;
  gap: 6px;
  padding: 15px;
  border-radius: 6px;
  font-weight: 500;
  background-color: ${props => props.$active ? `${theme.colors.formButtonAccent}` : `${theme.colors.formButton}`};
  &:hover {
  background-color: ${theme.colors.formButtonAccent};
  }
`;

export const AddButton = styled.button`
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 100%;
  border-radius: 6px;
  min-height: 55px;
  font-weight: 500;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.disabled ? "#D6B2D9" : `${theme.colors.formButton}`};
  color: #000;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.small};
  }
`;

export const ProductItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ProductItemButton = styled.button`
bottom: 0;
display: flex;
justify-content: center;
align-items: center;
gap: 6px;
height: 36px;
padding: 10px;
border-radius: 6px;
font-size: ${theme.fontSizes.small};
background-color: ${(props) =>
  props.disabled ? `${theme.colors.ligthGray}` : `${theme.colors.formButton}`};
color: #000;
transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
@media (min-width: 767px) {
  font-size: ${theme.fontSizes.small};
}
`;