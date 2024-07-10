import React from "react";
import RestorePassForm from "../components/Auth/RestorePassForm/RestorePassForm";
import { Container } from "../components/Container/Container.styled";
import Title from "../components/Home/Title/Title";

export default function RestorePasswordPage() {
  return (
    <Container>
      <Title text="Новий пароль буде надіслано вам на пошту!" />
      <RestorePassForm />
    </Container>
  );
}
