import React from "react";
import { useSelector } from "react-redux";
import RegisterForm from "../components/Auth/RegisterForm/RegisterForm";
import Title from "../components/Home/Title/Title";
import Loader from "../components/Loader/Loader";
import { selectIsUserLoading } from "../redux/auth/auth-selectors";

export default function RegisterPage() {
  const loading = useSelector(selectIsUserLoading);

  return (
    <>
      <Title text="Реєстрація"/>
      {loading && <Loader />}
      <RegisterForm />
    </>
  );
}
