import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const InputsFlexBlock = styled.div`
  @media(min-width: 767px) {
    display: flex;
  }
`;

export const CheckoutStepTitle = styled.h3`
  font-size: ${theme.fontSizes.large};
  font-weight: 500;
  margin-left: 25px;
  margin-bottom: 20px;
  @media(min-width: 479px) {
    margin-left: 30px;
  }
  @media(min-width: 767px) {
    margin-left: 50px;
  }
`;

export const Block = styled.div`
position: relative;
background-color: white;
padding: 10px;
border-radius: 6px;
margin-bottom: 20px;

@media(min-width:  479px) {
  padding: 20px;
}

@media(min-width: 767px) {
  display: flex;
}
`;

export const BlockContent = styled.div`
  @media (min-width: 767px) {
    position: relative;
    padding: 10px 20px;
    width: 50%;
    &:not(:last-child):after {
      content: "";
      position: absolute;
      width: 1px;
      height: 100%;
      background: ${theme.colors.gray};
      right: 0;
      top: 0;
    }
  }

`;


export const BlockTitle = styled.h1`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 30px;
`;

export const BlockSubTitle = styled.h2`
  font-size: ${theme.fontSizes.extraLarge};
  font-weight: 500;
  margin-bottom: 10px;
  text-align: left;
`;

export const BlockText = styled.h2`
  font-size: ${theme.fontSizes.medium};
  font-weight: 400;
  margin-bottom: 20px;
  text-align: left;
`;

export const DecorationLine = styled.div`
position: relative;
  margin-top: 22px;
  margin-bottom: 22px;
  display: flex;
  justify-content: center;
  &:before {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    left: 0;
    top: 50%;
    background: ${theme.colors.formButton};
}
`;

export const DecorationText = styled.span`
  background: white;
  z-index: 100;
  padding: 5px;
  border: 2px solid ${theme.colors.formButton};
  border-radius: 6px;
`;