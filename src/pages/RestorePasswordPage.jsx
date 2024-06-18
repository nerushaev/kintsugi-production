import React from "react";
import RestorePassForm from "../components/Auth/RestorePassForm/RestorePassForm";
import styled from 'styled-components';
import Title from "../components/Home/Title/Title";

const Wrapper = styled.div`
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
  vertical-align: middle;
  padding: 20px;
`;

export default function RestorePasswordPage() {
  return (
    <Wrapper>
      <Title text="Новий пароль буде надіслано вам на пошту!" />
      <RestorePassForm />
    </Wrapper>
  );
}
