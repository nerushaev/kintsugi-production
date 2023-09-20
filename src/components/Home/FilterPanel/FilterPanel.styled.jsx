import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const FilterWrapper = styled.div`
  margin-bottom: 30px;
  @media (min-width: 480px) {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  }
`;

export const FilterButton = styled.button`
  background-color: rgba(162, 210, 255, 1);
  border-radius: 5px;
  padding: 10px 15px;
  @media (min-width: 320px) and (max-width: 387px) {
    &:nth-child(3n+1),
    &:nth-child(2){
      margin-right: 15px;
      }
    &:nth-child(-n+3){
      margin-bottom: 15px;
      }
  }
  @media (min-width: 388px) and (max-width: 479px) {
    &:nth-child(-n+4){
      margin-bottom: 15px;
      margin-right: 15px;
    }
  }
`;

export const FilterPanelWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const FilterBtn = styled.button`
  display: flex;
  align-items: center;
  position: relative;
  color: ${props => props.$active ? "red" : "black"};
  height: 30px;
  padding: 0;
  font-size: 16px;
  &:first-child {
    margin-right: 15px;
  }
`;

export const PriceFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-height: 200px;
  overflow: scroll;
`;

export const PriceBtn = styled.button`
  text-align: start;
  position: relative;
  padding-left: 50px;
  padding-right: 0;
  padding-top: 15px;
  padding-bottom: 10px;
  font-size: ${theme.fontSizes.small};
  margin-left: -10px;
  &::before {
    content: '';
    width: 30px;
    height: 30px;
    position: absolute;
    border: 2px solid red;
    left: 10px;
    top: 9px;
    display: block;
    background-image: ${props => props.$active ? "url(https://res.cloudinary.com/dzjmswzgp/image/upload/v1678218288/done-50_r5gofc.png)" : "none"};
    background-size: cover;
  }
`;

export const FilterIcon = styled.svg`
  margin-left: 5px;
  fill: currentColor;
`;

export const Section = styled.section`
  margin-bottom: 30px;
`;
