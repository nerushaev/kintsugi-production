import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { registerValidation } from "../../helpers/registerPageValidation";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/auth-operations";
import { Notify } from "notiflix";
import { notifyOptions } from "../../helpers/notifyConfig";
import { selectError } from "../../redux/auth/auth-selectors";
import { theme } from "../../styles/theme";
import { Link } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {Form, InputsWrapper, InputWrapper, Input, Label, Button} from "./AuthForm.styled";

// const RegisterWrapper = styled.div`
//   display: flex;
//   justify-content: center;
// `;

const HaveAccountLink = styled(Link)`
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.blue};
  position: absolute;
  bottom: -25px;
`;

export default function RegisterForm() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    phone: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const { executeRecaptcha } = useGoogleReCaptcha();

  const error = useSelector(selectError);
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case name:
        setUserData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
        break;
      default:
        break;
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };



  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const submitRegisterForm = (gReCaptchaToken) => {
      registerValidation
        .validate(userData)
        .then((res) => {
          const registerData = {
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            password: userData.password,
            gReCaptchaToken: gReCaptchaToken
          };
          dispatch(register(registerData));
        })
        .catch((error) => {
          Notify.failure(error.message, notifyOptions);
        });
    }

    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    executeRecaptcha("registerForm").then((gReCaptchaToken) => {
      console.log(gReCaptchaToken, "response Google reCaptcha server");
      submitRegisterForm(gReCaptchaToken);
    });


  }, [executeRecaptcha, dispatch, userData]);



  return (
    // <RegisterWrapper>
      <Form onSubmit={handleSubmit}>
        <InputsWrapper>
        <InputWrapper>
        <Label>Пошта:</Label>
        <Input
          position="center"
          name="email"
          type="email"
          placeholder="youremail@gmail.com"
          onChange={handleChange}
          value={userData.email}
        />
        </InputWrapper>
        <InputWrapper>
        <Label>Номер телефону:</Label>
        <Input
          position="center"
          name="phone"
          type="phone"
          placeholder="+380963332333"
          onChange={handleChange}
          value={userData.phone}
        />
        </InputWrapper>
        <InputWrapper>
        <Label>Прізвище Ім'я По-батькові:</Label>
        <Input
          position="center"
          name="name"
          type="text"
          placeholder="Чепіль Анастасія Олександрівна"
          onChange={handleChange}
          value={userData.name}
        />
        </InputWrapper>
        <InputWrapper>
        <Label>Пароль:</Label>
        <Input
          position="center"
          name="password"
          type="password"
          label="Пароль:"
          placeholder=""
          onChange={handleChange}
          value={userData.password}
        />
        </InputWrapper>
        <InputWrapper>
        <Label>Підтвердіть пароль:</Label>
        <Input
          position="center"
          name="confirmPassword"
          type="password"
          label="Підтвердіть пароль:"
          placeholder=""
          onChange={handleChange}
          value={userData.confirmPassword}
        />
        </InputWrapper>
        </InputsWrapper>
          <Button type="submit">Зареєструватися</Button>
          {error && (
            <HaveAccountLink to="/restorePassword">Є аккаунт?</HaveAccountLink>
          )}
      </Form>
    // </RegisterWrapper>
  );
}
