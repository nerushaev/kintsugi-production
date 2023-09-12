import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Form = styled.form`
  background-color: rgb(255, 200, 221, 0.3);
  padding: 20px;
  margin: 0 auto;
  @media (min-width: 479px) {
      width: ${props => props.login ? "320px" : "400px"};
  }
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  @media (min-width: 479px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  &:last-child {
    margin-bottom: 20px;
  }
`;

export const Input = styled.input`
  border: 1px solid black;
  padding: 10px 10px;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  font-size: ${theme.fontSizes.small};
  margin-right: 5px;
  font-weight: 600;
  @media (min-width: 479px) {
    margin-bottom: 0;
  }
`;

export const Button = styled.button`
  display: block;
  padding: 10px 15px;
  background-color: ${theme.colors.formButton};
  margin: 0 auto;
`;
