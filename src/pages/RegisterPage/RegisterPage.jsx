import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import RegisterForm from "../../components/Auth/RegisterForm";
import Loader from "../../components/Loader/Loader";
import { selectIsLoading } from "../../redux/auth/auth-selectors";

const Wrapper = styled.div`
  height: 100%;
  margin: 0 auto;
  vertical-align: middle;
  padding: 20px;
`;

export default function RegisterPage() {
  const loading = useSelector(selectIsLoading);

  return (
    <Wrapper>
      {loading && <Loader />}
      <RegisterForm />
    </Wrapper>
  );
}
