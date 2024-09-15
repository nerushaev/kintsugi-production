import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Title = styled.h1`
  font-size: ${theme.fontSizes.large};
  font-weight: 500;
  @media (min-width: 479px) {
    font-size: ${theme.fontSizes.extraLarge};
  }
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.big};
  }
  @media (min-width: 1199px) {
    font-size: ${theme.fontSizes.title};
  }
`;

export const TitleWrapper = styled.div`
  text-align: center;
  padding: 0 20px;
  margin-bottom: 20px;
  @media (min-width: 479px) {
    padding: 0 40px;
    margin-bottom: 20px;
  }
  @media (min-width: 767px) {
    padding: 0 60px;
    margin-bottom: 20px;
  }
  @media (min-width: 1199px) {
    padding: 0 80px;
    margin-bottom: 20px;
  }
`;

export const Text = styled.p`
  font-family: "Montserrat";
  font-weight: ${props => props.$accent ? "600" : "500"};
  font-size: ${theme.fontSizes.medium};
`;

export const TextWrapper = styled.div`
  margin-bottom: 6px;
  @media (min-width: 767px) {
    margin-bottom: 10px;
  }
`;

export const Subtitle = styled.h3`
  font-family: "Montserrat Alternates";
  color: black;
  font-weight: 550;
  font-size: ${theme.fontSizes.extraLarge};
`;

export const Price = styled.p`
  font-family: "Montserrat Alternates";
  font-size: ${theme.fontSizes.extraLarge};
  font-weight: 600;
`;

export const BlockTitle = styled.h2`
  font-family: "Montserrat Alternates";
  color: black;
  font-weight: 550;
  font-size: ${theme.fontSizes.extraLarge};
`;

export const BlockTitleWrapper = styled.div`
  margin-bottom: 14px;
  @media (min-width: 767px) {
    margin-bottom: 20px;
  }
`;