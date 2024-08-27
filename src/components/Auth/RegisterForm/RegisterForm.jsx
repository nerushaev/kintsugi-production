import { Input } from "../../Input/Input";
import { FormProvider, useForm } from "react-hook-form";
import { GrMail } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../../helpers/registerPageValidation";
import { register } from "../../../redux/auth/auth-operations";
import { selectError } from "../../../redux/auth/auth-selectors";
import {
  CustomForm,
  InputsWrapper,
  ButtonWrapper,
  Button,
  ErrorMessage,
} from "../../Form/Form.styled";
import { Block } from "../../Busket/CheckoutPage/CheckoutSteps/Steps.styled";

export default function RegisterForm() {
  const methods = useForm({ resolver: yupResolver(registerSchema) });
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const onSubmit = methods.handleSubmit((data) => {
    delete data.confirmPassword;
    dispatch(register(data));
  });

  const email_input = {
    name: "email",
    label: "Пошта",
    type: "text",
    id: "email",
    placeholder: "Введіть вашу пошту",
  };

  const phone_input = {
    name: "phone",
    label: "Мобільний номер",
    type: "phone",
    id: "phone",
    placeholder: "Введіть ваш мобільний номер...",
  };

  const name_input = {
    name: "name",
    label: "Ім'я та прізвище",
    type: "text",
    id: "name",
    placeholder: "Введіть ваше ім'я та прізвище...",
  };

  const password_input = {
    name: "password",
    label: "Пароль",
    type: "password",
    id: "password",
    placeholder: "Введіть пароль...",
  };

  const confirmPassword_input = {
    name: "confirmPassword",
    label: "Повторіть пароль",
    type: "password",
    id: "confirmPassword",
    placeholder: "Введіть ваш пароль ще раз...",
  };

  return (
    <Block>
    <FormProvider {...methods}>
      <CustomForm onSubmit={(e) => e.preventDefault()} noValidate>
        <InputsWrapper>
          <Input {...email_input} />
          <Input {...phone_input} />
          <Input {...name_input} />
          <Input {...password_input} />
          <Input {...confirmPassword_input} />
        </InputsWrapper>
        <ButtonWrapper>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          <Button onClick={onSubmit}>
            <GrMail />
            Зареєструватися
          </Button>
        </ButtonWrapper>
      </CustomForm>
    </FormProvider>
    </Block>
  );
}
