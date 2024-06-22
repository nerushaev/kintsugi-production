import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import RegisterForm from "../components/Auth/RegisterForm/RegisterForm";
import Title from "../components/Home/Title/Title";
import Loader from "../components/Loader/Loader";
import { selectIsUserLoading } from "../redux/auth/auth-selectors";

const Wrapper = styled.div`
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  vertical-align: middle;
  padding: 20px;
`;

export default function RegisterPage() {
  const loading = useSelector(selectIsUserLoading);

  return (
    <Wrapper>
      <Title text="Реєстрація"/>
      {loading && <Loader />}
      <RegisterForm />
    </Wrapper>
  );
}