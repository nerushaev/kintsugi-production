import React from "react";
import LoginForm from "../components/Auth/LoginForm/LoginForm";
import { Container } from "../components/Container/Container.styled";
import Title from "../components/Home/Title/Title";
import Loader from "../components/Loader/Loader";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { isRefreshing } = useAuth();

  return (
    <Container>
      <Title text="Авторизація" />
      {isRefreshing && <Loader />}
      <LoginForm />
      </Container>
  );
}
