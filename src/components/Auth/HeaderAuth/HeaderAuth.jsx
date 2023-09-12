import { Notify } from "notiflix";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema } from "../../../helpers/loginValidation";
import { notifyOptions } from "../../../helpers/notifyConfig";
import { login } from "../../../redux/auth/auth-operations";
import { selectError } from "../../../redux/auth/auth-selectors";
import AuthDynamicLink from "../AuthDynamicLink";
import {Form, InputsWrapper, InputWrapper, Input, Label, Button} from "../AuthForm.styled";

export default function HeaderAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginSchema
      .validate({ email, password })
      .then((res) => {
        dispatch(login({ email, password }));
      })
      .catch((e) => {
        Notify.failure(e.message, notifyOptions);
      });
  };

  // if (isLoggedIn) {
  //   return <Navigate to="/user" />;
  // }

  return (
    <>
      <Form login onSubmit={handleSubmit}>
        <InputsWrapper>
          <InputWrapper>
            <Label>Пошта</Label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              value={email}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Пароль</Label>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              value={password}
            />
          </InputWrapper>
        </InputsWrapper>
          <Button type="submit" onSubmit={handleSubmit}>
            Вхід
          </Button>
      </Form>
      {error && (
        <AuthDynamicLink redirectTo={"/restore"} message={"Забули пароль?"} />
      )}
    </>
  );
}
