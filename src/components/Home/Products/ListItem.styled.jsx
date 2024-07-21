import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const CardInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

export const Item = styled.li`
  flex:0 0 50%;
  max-width: 50%;
  @media (min-width: 479px) {
    flex:0 0 33.33%;
  max-width: 33.33%;
  }
  @media (min-width: 767px) {
    flex:0 0 25%;
    max-width: 25%;
  }
  position: relative;
  text-align: left;
  width: 100%;
  margin-bottom: 15px;
  
  transform: scale(1);
  transition: scale 300ms cubic-bezier(0.4, 0, 0.2, 1),
  background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  padding: 8px;

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

export const StyledLink = styled.div`
  position: relative;
  display: block;
  padding-top: 100%;
  margin-bottom: 15px;
`;

export const ImageWrapper = styled.span`
  background-size: contain;
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
`;

export const Image = styled.img`
  object-fit: contain;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const Title = styled.p`
  font-weight: 500;
  font-size: ${theme.fontSizes.small};
  margin-bottom: 10px;
  overflow: scroll;
  height: 60px;
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.medium};
    height: 80px;

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