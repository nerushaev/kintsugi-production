import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const CardInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: auto;
`;

export const Item = styled.li`
  box-sizing: border-box;
  margin-left: 5px;
	margin-right: 5px;
  flex-basis: calc((100% - 20px) / 2);
  background-color: white;
  margin-bottom: 10px;
  padding: 10px;
  
  border-radius: 6px;
  transform: scale(1);
  transition: scale 300ms cubic-bezier(0.4, 0, 0.2, 1),
  background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);

  @media (min-width: 479px) {
  flex-basis: calc((100% - 30px) / 3);

  }
    @media (min-width: 767px) {
  flex-basis: calc((100% - 40px) / 4);

  }
`;

export const ItemBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
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
  display: flex;
  font-family: "Montserrat Alternates";
  font-weight: 600;
  font-size: ${theme.fontSizes.medium};
  margin-bottom: 10px;
  overflow: hidden;
  height: 70px;
  // align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Price = styled.p`
  font-family: "Montserrat Alternates";
  font-weight: 600;
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes.big};
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