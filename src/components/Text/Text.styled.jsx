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
    margin-bottom: 30px;
  }
  @media (min-width: 767px) {
    padding: 0 60px;
    margin-bottom: 40px;
  }
  @media (min-width: 1199px) {
    padding: 0 80px;
    margin-bottom: 50px;
  }
`;
