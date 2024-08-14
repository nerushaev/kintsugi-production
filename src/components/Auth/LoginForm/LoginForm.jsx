import { Input } from "../../Input/Input";
import { FormProvider, useForm } from "react-hook-form";
import { GrMail } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/auth/auth-operations";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../helpers/loginValidation";
import {CustomForm, InputsWrapper, ButtonWrapper, Button, FormWrapper} from "../../Form/Form.styled";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { theme } from "../../../styles/theme";
import { RiLockPasswordLine } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";

const LoginLinkButtonWrapper = styled.div`
width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-around;
`;

const LinkWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 6px;
color: ${theme.colors.gray};
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-size: ${theme.fontSizes.small};
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const FormLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
`;

export default function LoginForm() {
  const methods = useForm({ resolver: yupResolver(loginSchema) });
  const dispatch = useDispatch();

  const onSubmit = methods.handleSubmit((data) => {
    dispatch(login(data));
  });

  const email_input = {
    name: 'email',
    label: 'Пошта',
    type: 'text',
    id: 'emailLogin',
    placeholder: 'Введіть вашу пошту',
  }
  
  const password_input = {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    id: 'passwordLogin',
    placeholder: 'Введіть пароль...',
  }

  return (
    <FormWrapper>
    <FormProvider {...methods}>
      <CustomForm onSubmit={(e) => e.preventDefault()} noValidate>
        <InputsWrapper>
          <Input {...email_input} />
          <Input {...password_input} />
        </InputsWrapper>
        <ButtonWrapper>
        <LoginLinkButtonWrapper>
          <FormLinkWrapper>
        <LinkWrapper>
        <StyledLink to="/register">Зареєструватися
        <VscAccount/>
        </StyledLink>
        </LinkWrapper>
          <LinkWrapper>
        <StyledLink to="/restore">Забули пароль?
        <RiLockPasswordLine/>
        </StyledLink>
        </LinkWrapper>
        </FormLinkWrapper>
          <Button onClick={onSubmit}>
            <GrMail />
            Увійти
          </Button>
          </LoginLinkButtonWrapper>
        </ButtonWrapper>
      </CustomForm>
    </FormProvider>
    </FormWrapper>
  );
}
