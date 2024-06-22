import { Input } from "../../../Input/Input";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../../redux/auth/auth-operations";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordChangeSchema } from "../../../../helpers/passwordChangeSchema";
import {
  selectResponse,
  selectError,
} from "../../../../redux/auth/auth-selectors";
import {
  CustomForm,
  InputsWrapper,
  ButtonWrapper,
  Button,
  ErrorMessage,
} from "../../../Form/Form.styled";
import { FaExchangeAlt } from "react-icons/fa";
import { useEffect } from "react";

export default function PasswordChangeForm() {
  const methods = useForm({ resolver: yupResolver(passwordChangeSchema) });
  const {
    reset,
    formState: { isSubmitSuccessful },
  } = methods;
  const error = useSelector(selectError);
  const response = useSelector(selectResponse);
  const dispatch = useDispatch();

  const onSubmit = methods.handleSubmit(async (data, e) => {
    dispatch(changePassword(data));
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const oldPassword_input = {
    name: "oldPass",
    label: "Старий пароль",
    type: "password",
    id: "oldPass",
    placeholder: "Введіть старий пароль...",
  };

  const newPassword_input = {
    name: "newPass",
    label: "Новий пароль",
    type: "password",
    id: "newPass",
    placeholder: "Введіть новий пароль...",
  };

  const newConfirmPassword_input = {
    name: "newConfirmPass",
    label: "Підтвердіть пароль",
    type: "password",
    id: "password",
    placeholder: "Підтвердіть новий пароль...",
  };

  return (
    <FormProvider {...methods}>
      <CustomForm onSubmit={(e) => e.preventDefault()} noValidate>
        <InputsWrapper>
          <Input {...oldPassword_input} />
          <Input {...newPassword_input} />
          <Input {...newConfirmPassword_input} />
        </InputsWrapper>
        <ButtonWrapper>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          {response && <ErrorMessage>Пароль успішно змінено!</ErrorMessage>}
          <Button onClick={onSubmit}>
            <FaExchangeAlt />
            Змінити пароль
          </Button>
        </ButtonWrapper>
      </CustomForm>
    </FormProvider>
  );
}
