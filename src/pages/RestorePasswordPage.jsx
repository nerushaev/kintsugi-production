import React from "react";
import RestorePassForm from "../components/Auth/RestorePassForm/RestorePassForm";
import Title from "../components/Home/Title/Title";

export default function RestorePasswordPage() {
  return (
    <>
      <Title text="Новий пароль буде надіслано вам на пошту!" />
      <RestorePassForm />
    </>
  );
}
