import React from "react";
import LoginForm from "../components/Auth/LoginForm/LoginForm";
import Title from "../components/Home/Title/Title";
import Loader from "../components/Loader/Loader";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { isRefreshing } = useAuth();

  return (
    <>
      <Title text="Авторизація" />
      {isRefreshing && <Loader />}
      <LoginForm />
      </>
  );
}
