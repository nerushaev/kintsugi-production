import React from "react";
import LoginForm from "../components/Auth/LoginForm/LoginForm";
import { Container } from "../components/Container/Container.styled";
import {Title, TitleWrapper} from "../components/Text/Text.styled";
import Loader from "../components/Loader/Loader";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { isRefreshing } = useAuth();

  return (
    <Container>
      <TitleWrapper>
      <Title>Авторизація</Title>
      </TitleWrapper>
      {isRefreshing && <Loader />}
      <LoginForm />
      </Container>
  );
}
