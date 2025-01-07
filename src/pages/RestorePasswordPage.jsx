import React from "react";
import RestorePassForm from "../components/Auth/RestorePassForm/RestorePassForm";
import { Container } from "../components/Container/Container.styled";
import {Title, TitleWrapper} from "../components/Text/Text.styled";

export default function RestorePasswordPage() {
  return (
    <Container>
      <TitleWrapper>
      <Title>Новий пароль буде надіслано вам на пошту!</Title>
      </TitleWrapper>
      <RestorePassForm />
    </Container>
  );
}
