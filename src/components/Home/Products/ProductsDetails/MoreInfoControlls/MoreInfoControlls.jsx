import React from "react";
import styled from "styled-components";
import { theme } from "../../../../../styles/theme";
import { Link } from "react-router-dom";

export const Title = styled.h2`
  font-size: ${theme.fontSizes.medium};
  font-weight: 500;
  margin-bottom: 10px;
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.large};
    }
  @media (min-width: 1199px) {
      font-size: ${theme.fontSizes.extraLarge};
      }
`;

export const SubTitle = styled.p`
  font-weight: 400;
  font-size: ${theme.fontSizes.medium};
  margin-bottom: 30px;
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.large};
    }
  @media (min-width: 1199px) {
      font-size: ${theme.fontSizes.extraLarge};
      }
`;

const ControllsButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
  gap: 10px;
  @media (min-width: 767px) {
    justify-content: center;
  }
`;

export const Image = styled.img`
  margin-bottom: 20px;
  width: 320px;
  @media (min-width: 767px) {
    margin-right: 30px;
    ${props => props.$payment ?  
      `margin: 0 auto;` : ""}
  }
`;

const MoreInfoControllsWrapper = styled.div`
  margin-bottom: 50px;
`;

export const DeliveryWrapper = styled.div`
  @media (min-width: 767px) {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
  }
`;

export const FeedbackWrapper = styled.div`
display: flex;
flex-direction: column;
  @media (min-width: 767px) {
    display: flex;
    flex-direction: row;
    gap: 30px;
  }
`;

export const FeedbackItemWrapper = styled.div`
  flex: 0 0 50%;
`;

const StyledLink = styled(Link)`
display: flex;
gap: 6px;
padding: 15px;
border-radius: 6px;
font-weight: 500;
background-color: ${props => props.$active ? `${theme.colors.formButtonAccent}` : `${theme.colors.formButton}`};
&:hover {
background-color: ${theme.colors.formButtonAccent};
}
`;

export default function MoreInfoControlls() {
  return (
    <MoreInfoControllsWrapper>
      <ControllsButtonWrapper>
        <StyledLink to={'delivery'}>Доставка</StyledLink>
        <StyledLink to={'payment'}>Оплата</StyledLink>
        <StyledLink to={'feedback'}>Відгуки</StyledLink>
      </ControllsButtonWrapper>
    </MoreInfoControllsWrapper>
  );
}
