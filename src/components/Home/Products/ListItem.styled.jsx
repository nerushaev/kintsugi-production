import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const CardInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

export const Item = styled.li`
  position: relative;
  font-family: "Montserrat";
  text-align: left;
  margin-bottom: 15px;
  
  transform: scale(1);
  transition: scale 300ms cubic-bezier(0.4, 0, 0.2, 1),
  background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  padding: 5px;

  @media (min-width: 479px) {
  margin-left: 5px;
  margin-right: 5px;
  flex-basis: calc((100% - 20px) / 2);
  }

  @media (min-width: 768px) {
    flex-basis: calc((100% - 30px) / 3);
  }
  @media (min-width: 1200px) {
    flex-basis: calc((100% - 40px) / 4);
  }
  &:hover,
  &:focus {
    transform: scale(1.01);
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.12), 0px 4px 4px rgba(0, 0, 0, 0.06),
      1px 4px 6px rgba(0, 0, 0, 0.16);
  }
`;

export const ItemBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  justify-content: space-between
`;

export const Image = styled.img`
  margin-bottom: 15px;
`;

export const Title = styled.p`
  font-weight: 600;
  font-size: ${theme.fontSizes.medium};
  margin-bottom: 10px;
  overflow: hidden;
  min-height: 40px;
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.large};
    min-height: 50px;
  }
`;

export const Price = styled.p`
  font-weight: 600;
  color: ${theme.colors.rose};
  font-size: ${theme.fontSizes.medium};
  margin-bottom: 10px;
  overflow: hidden;
`;

export const Sizes = styled.p`
font-weight: 600;
color: ${theme.colors.black};
font-size: ${theme.fontSizes.small};
margin-bottom: 10px;
overflow: hidden;
`;  

export const Description = styled.p`
  font-weight: 400;
  font-size: ${theme.fontSizes.small};
  margin-bottom: 20px;
  overflow: scroll;
`;