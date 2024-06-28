import styled from 'styled-components'
import { theme } from '../../styles/theme';

export const FormWrapper = styled.div`
  max-width: 450px;
  @media (min-width: 767px) {
    max-width: 650px;
  }
`;

export const CustomForm = styled.form`
  width: 100%;
  margin-bottom: 30px;
  text-align: center;
`;

export const InputsWrapper = styled.div`
  @media (min-width: 767px) {
    display: grid;
    gap: 20px;
    grid-template-columns: ${props => props.$oneInput ? "1fr" : "repeat(2, minmax(0, 1fr))"};
  }
  margin-bottom: 40px;
`;

export const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  padding: ${props => props.$small ? "10px" : "20px"};
  background-color: ${props => props.$accent ? `${theme.colors.red}` : `${theme.colors.formButton}`};
  border-radius: 6px;
  &:hover {
    background-color: ${props => props.$accent ? `${theme.colors.redAccent}` : `${theme.colors.formButtonAccent}`};
  }
`;

export const ErrorMessage = styled.p`
color: ${theme.colors.redAccent};
`;