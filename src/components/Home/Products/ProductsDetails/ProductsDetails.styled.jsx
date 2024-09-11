import styled from "styled-components";
import { theme } from "../../../../styles/theme";
import { NavLink } from "react-router-dom";

export const GoBackLink = styled(NavLink)`
  margin-left: 10px;
  font-size: ${theme.fontSizes.small};
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.medium};
  }
  @media (min-width: 1199px) {
    font-size: ${theme.fontSizes.large};
  }
`;
export const GoBackWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 15px;
`;

export const ProductWrapper = styled.div`
  // margin-bottom: 20px;
  @media (min-width: 767px) {
    display: flex;
    gap: 10px;
  }
`;

export const ImageContainer = styled.div``;

export const ScoreWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const LinkToFeedback = styled.p`
  font-weight: 400;
  cursor: pointer;
`;

export const Block = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  @media (min-width: 767px) {
    padding: 20px;
    width: 50%;
  }
`;

export const BlockSlider = styled.div`
  margin-bottom: 20px;
  height: 100%;
  @media (min-width: 767px) {
    width: 50%;
  }
`;

export const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const BlockTitle = styled.h3`

`;

export const BlockPrice = styled.p`
  font-size: ${theme.fontSizes.big};
  font-weight: 400;
  letter-spacing: 1.5px;
  margin-bottom: 14px;
  @media (min-width: 479px) {
    margin-bottom: 20px;
  }
`;

export const BlockText = styled.p`
  font-size: ${theme.fontSizes.small};
  font-weight: ${(props) => (props.$accent ? 600 : 500)};
  margin-bottom: 14px;
  @media (min-width: 479px) {
    margin-bottom: 16px;
  }
`;

export const BlockTextFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
`;
