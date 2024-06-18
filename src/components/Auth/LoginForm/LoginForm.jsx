import { Input } from "../../Input/Input";
import { FormProvider, useForm } from "react-hook-form";
import { GrMail } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/auth/auth-operations";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../helpers/loginValidation";
import { selectError } from "../../../redux/auth/auth-selectors";
import {CustomForm, InputsWrapper, ButtonWrapper, Button, ErrorMessage} from "../../Form/Form.styled";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { theme } from "../../../styles/theme";

const LoginLinkButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-left: auto;
`;

const StyledLink = styled(Link)`
  color: ${theme.colors.cardButtonAccent};
  text-decoration: underline black;
`;


export default function LoginForm() {
  const methods = useForm({ resolver: yupResolver(loginSchema) });
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const onSubmit = methods.handleSubmit((data) => {
    dispatch(login(data));
  });

  const email_input = {
    name: 'email',
    label: 'Пошта',
    type: 'text',
    id: 'email',
    placeholder: 'Введіть вашу пошту',
  }
  
  const password_input = {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    id: 'password',
    placeholder: 'Введіть пароль...',
  }

  return (
    <FormProvider {...methods}>
      <CustomForm onSubmit={(e) => e.preventDefault()} noValidate>
        <InputsWrapper>
          <Input {...email_input} />
          <Input {...password_input} />
        </InputsWrapper>
        <ButtonWrapper>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
        <LoginLinkButtonWrapper>
        <StyledLink to="/restore">Забули пароль?</StyledLink>
          <Button onClick={onSubmit}>
            <GrMail />
            Увійти
          </Button>
          </LoginLinkButtonWrapper>
        </ButtonWrapper>
      </CustomForm>
    </FormProvider>
  );
}
