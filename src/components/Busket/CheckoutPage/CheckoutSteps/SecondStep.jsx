import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  checkoutPageValidationSecondStep,
} from "../../../../helpers/checkoutPageValidation";
import { useAuth } from "../../../../hooks/useAuth";
import { Button, CustomForm, InputsWrapper } from "../../../Form/Form.styled";
import Checkbox from "../../../Input/Checkbox";
import { Input } from "../../../Input/Input";
import {
  Block,
  BlockContent,
  BlockSubTitle,
  CheckoutStepTitle,
  InputsFlexBlock,
} from "./Steps.styled";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { register } from "../../../../redux/auth/auth-operations";
import { Notify } from "notiflix";

export default function SecondStep({ user, setUserData, setStep2, setStep3 }) {
  const { isLoggedIn } = useAuth();
  const [passwordType, setPasswordType] = useState("passsword");
  const dispatch = useDispatch();
  const methods = useForm({
    mode: "onChange, onSubmit",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      orderComments: user.orderComments || "",
      register: user.register || false,
      password: user.password || "",
      confirmPassword: user.confirmPassword || "",
    },
    resolver: yupResolver(checkoutPageValidationSecondStep),
  });
  const { watch, setValue } = methods;

  const isNeedRegister = watch("register");

  const onSubmit = methods.handleSubmit(async (data) => {
    if (!isLoggedIn && isNeedRegister) {
      const registerData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };
      dispatch(register(registerData)).then((res) => {
        console.log(res);
        if (res.error) {
          Notify.failure(res.payload.message);
        } else {
          window.scrollTo({ 
            top: 0,  
            behavior: 'smooth'
          }); 
          setUserData(data);
          setStep2(false);
          setStep3(true);
        }
        return;
      });
    } else {
      setUserData(data);
      setStep2(false);
      setStep3(true);
      window.scrollTo({ 
        top: 0,  
        behavior: 'smooth'
      }); 
    }
  });

  const generatePassword = () => {
    const id = nanoid();
    setValue("password", id);
    setValue("confirmPassword", id);
    setPasswordType("text");
  };

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
  const comments_input = {
    name: "orderComments",
    label: "Коментар",
    type: "textarea",
    id: "orderComments",
    placeholder: "",
  };
  const register_checkbox = {
    name: "register",
    label: "Зареєструвати вас?",
    type: "checkbox",
    id: "register",
    placeholder: "",
  };
  const password_input = {
    name: "password",
    label: "Пароль",
    type: passwordType,
    id: "password",
    placeholder: "",
  };
  const confirmPassword_input = {
    name: "confirmPassword",
    label: "Повторіть пароль",
    type: passwordType,
    id: "register",
    placeholder: "",
  };

  return (
    <>
      <CheckoutStepTitle>Дані користувача</CheckoutStepTitle>
      <Block style={{ display: "block" }}>
        {/* <BlockTitle>Заповніть свої персональні дані </BlockTitle> */}
        <FormProvider {...methods}>
          <CustomForm
            onSubmit={(e) => e.preventDefault()}
            noValidate
            style={{ marginBottom: "0" }}
          >
            <InputsFlexBlock>
              <BlockContent>
                <InputsWrapper>
                  <Input {...name_input} />
                  <Input {...email_input} />
                  <Input {...phone_input} />
                  <Input {...comments_input} />
                </InputsWrapper>
              </BlockContent>
              <BlockContent>
                <InputsWrapper>
                  {!isLoggedIn && (
                    <>
                      <Checkbox {...register_checkbox} />
                      {isNeedRegister && (
                        <>
                          <BlockSubTitle>
                            Сгенерувати вам надійний пароль?
                          </BlockSubTitle>
                          <Button
                            onClick={generatePassword}
                            style={{
                              marginRight: "auto",
                              marginBottom: "20px",
                            }}
                          >
                            Сгенерувати
                          </Button>
                          <Input {...password_input} />
                          <Input {...confirmPassword_input} />
                        </>
                      )}
                    </>
                  )}
                </InputsWrapper>
              </BlockContent>
            </InputsFlexBlock>
            <Button onClick={onSubmit}>Перейти далі</Button>
          </CustomForm>
        </FormProvider>
      </Block>
    </>
  );
}
