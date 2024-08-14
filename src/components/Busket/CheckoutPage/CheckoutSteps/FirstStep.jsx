import React, { useEffect } from "react";
import LoginForm from "../../../Auth/LoginForm/LoginForm";
import { AddButton } from "../../../Buttons/Buttons";
import { Block, BlockContent, BlockSubTitle, BlockText, BlockTitle, DecorationLine, DecorationText } from "./Steps.styled";
import {useAuth} from '../../../../hooks/useAuth';
import {useNavigate} from 'react-router';

export default function FirstStep({setStep1, setStep2}) {

  const {isLoggedIn} = useAuth();
  const navigate = useNavigate();

  const handleGuest = () => {
    setStep1(false);
    setStep2(true);
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
    }); 
  };

  useEffect(() => {
    if(isLoggedIn) {
      setStep1(false);
      setStep2(true);
      window.scrollTo({ 
        top: 0,  
        behavior: 'smooth'
      }); 
    }
  }, [isLoggedIn, setStep1, setStep2])

  return (
    <>
    <Block>
      <BlockContent style={{padding: 0}}>
      <BlockTitle>Авторизація</BlockTitle>
      <LoginForm />
      </BlockContent>
      <BlockContent>
      <BlockSubTitle style={{ marginTop: "40px" }}>
        Перше замовлення
      </BlockSubTitle>
      <BlockText>Завершіть ваше замовлення швидко та без реєстрації.</BlockText>
      <AddButton onClick={handleGuest}>Замовити як гість</AddButton>
      <DecorationLine>
        <DecorationText>або</DecorationText>
      </DecorationLine>
      <BlockSubTitle>Реєстрація</BlockSubTitle>
      <BlockText>
        Не зареєстровані? Створіть аккаунт і відкрийте додаткові можливості.
      </BlockText>
      <AddButton onClick={() => navigate("/register")}>Зареєструватися</AddButton>
      </BlockContent>
      </Block>
    </>
  );
}
