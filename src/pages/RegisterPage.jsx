import React from "react";
import { useSelector } from "react-redux";
import RegisterForm from "../components/Auth/RegisterForm/RegisterForm";
import { Container } from "../components/Container/Container.styled";
import {Title, TitleWrapper} from "../components/Text/Text.styled";
import Loader from "../components/Loader/Loader";
import { selectIsUserLoading } from "../redux/auth/auth-selectors";

export default function RegisterPage() {
  const loading = useSelector(selectIsUserLoading);

  return (
    <Container>
      <TitleWrapper>
      <Title>Реєстрація</Title>

      </TitleWrapper>
      {loading && <Loader />}
      <RegisterForm />
    </Container>
  );
}
