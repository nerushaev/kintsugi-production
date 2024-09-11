import styled from "styled-components";
import { theme } from "../../styles/theme";

export const FormWrapper = styled.div`
  max-width: 450px;
  @media (min-width: 767px) {
    max-width: 550px;
  }
  margin-right: auto;
  margin-left: auto;
`;

export const CustomForm = styled.form`
  background-color: white;
  border-radius: 6px;
  max-width: 100%;
  // margin-bottom: 30px;
  text-align: center;
  @media (min-width: 479px) {
    padding: 20px;
  }
`;

export const InputsWrapper = styled.div`

`;

export const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  font-family: "Montserrat";
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  padding: ${(props) => (props.$small ? "10px" : "20px")};
  background-color: ${(props) =>
    props.$accent ? `${theme.colors.red}` : `${theme.colors.formButton}`};
  border-radius: 6px;
  &:hover {
    background-color: ${(props) =>
      props.$accent
        ? `${theme.colors.redAccent}`
        : `${theme.colors.formButtonAccent}`};
  }
`;

export const ErrorMessage = styled.p`
  color: ${theme.colors.redAccent};
`;
