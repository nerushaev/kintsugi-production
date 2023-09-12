import styled from "styled-components";

export const FilterPanelWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const FilterBtn = styled.button`
  display: flex;
  align-items: center;
  position: relative;
  color: ${props => props.active ? "red" : "black"};
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
  padding-left: 30px;
  padding-right: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 12px;
  margin-left: -10px;
  &::before {
    content: '';
    width: 12px;
    height: 12px;
    position: absolute;
    border: 2px solid red;
    left: 10px;
    top: 9px;
    display: block;
    background-image: ${props => props.active ? "url(https://res.cloudinary.com/dzjmswzgp/image/upload/v1678218288/done-50_r5gofc.png)" : "none"};
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
