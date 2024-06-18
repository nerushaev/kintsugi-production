import React from "react";
import styled from "styled-components";
import LoginForm from "../components/Auth/LoginForm/LoginForm";
import Title from "../components/Home/Title/Title";
import Loader from "../components/Loader/Loader";
import { useAuth } from "../hooks/useAuth";

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export default function LoginPage() {
  const { isRefreshing } = useAuth();

  return (
    <Wrapper>
      <Title text="Авторизація" />
      {isRefreshing && <Loader />}
      <LoginForm />
    </Wrapper>
  );
}
