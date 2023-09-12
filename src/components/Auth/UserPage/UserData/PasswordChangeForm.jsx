import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../../redux/auth/auth-operations";
import { Inputt } from "../../../Busket/CheckoutPage/Input";
import { Button, ButtonWrapper } from "../../../Buttons/Buttons";
import { Form } from "../../../Fields/Fields.styled";
import { changePasswordValidation } from "../../../../helpers/changePasswordValidation";
import { Notify } from "notiflix";

export default function PasswordChangeForm() {
  const [passState, setPassState] = useState({
    oldPass: "",
    newPass: "",
    confirmNewPass: "",
  });
  const { oldPass, newPass, confirmNewPass } = passState;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case name:
        setPassState((prev) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    changePasswordValidation
      .validate(passState)
      .then((res) => {
        dispatch(changePassword(passState));
        setPassState({
          oldPass: "",
          newPass: "",
          confirmNewPass: "",
        });
      })
      .catch((e) => {
        Notify.failure(e.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Inputt
        name="oldPass"
        type="password"
        value={oldPass}
        label="Cтарий пароль"
        onChange={handleChange}
      />
      <Inputt
        name="newPass"
        type="password"
        value={newPass}
        label="Новий пароль"
        onChange={handleChange}
      />
      <Inputt
        name="confirmNewPass"
        type="password"
        value={confirmNewPass}
        label="Повторіть новий пароль"
        onChange={handleChange}
      />
      <ButtonWrapper>
        <Button type="submit" onSubmit={handleSubmit}>
          Змінити
        </Button>
      </ButtonWrapper>
    </Form>
  );
}
