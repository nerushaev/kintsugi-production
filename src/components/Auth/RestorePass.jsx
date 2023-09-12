import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { restorePassword } from "../../redux/auth/auth-operations";
import { Inputt } from "../Busket/CheckoutPage/Input";
import { Button, ButtonWrapper } from "../Buttons/Buttons";
import { Form } from "../Fields/Fields.styled";

export default function RestorePass() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(restorePassword({ email: email }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Inputt
        label="Пошта"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="helen@gmail.com"
      />
      <ButtonWrapper>
        <Button type="submit" onSubmit={handleSubmit}>
          Змінити
        </Button>
      </ButtonWrapper>
    </Form>
  );
}
