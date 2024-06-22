import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/auth-operations";
import { selectUser } from "../redux/auth/auth-selectors";
import React, { useState } from "react";
import Title from "../components/Home/Title/Title";
import UserInfo from "../components/Auth/UserPage/UserData/UserInfo";
import PasswordChangeForm from "../components/Auth/UserPage/UserData/PasswordChangeForm";
import DeliveryData from "../components/Auth/UserPage/UserData/DeliveryData";
import styled from 'styled-components';
import { theme } from "../styles/theme";
import { FaRegAddressBook } from "react-icons/fa6";
import { MdOutlinePassword } from "react-icons/md";
import { MdOutlineSignpost } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { clearErrorAndResponse } from "../redux/auth/auth-slice";

const FormWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  margin-bottom: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button`
  display: flex;
  gap: 6px;
  padding: 15px;
  border-radius: 6px;
  font-weight: 500;
  background-color: ${props => props.$active ? `${theme.colors.formButtonAccent}` : `${theme.colors.formButton}`};
  &:hover {
  background-color: ${theme.colors.formButtonAccent};
  }
`;

export default function UserPage() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(true);
  const [changePass, setChangePass] = useState(false);
  const [deliveryData, setDeliveryData] = useState(false);

  const user = useSelector(selectUser);

  const handleClick = () => {
    dispatch(logout());
  };

  const handleClickBtn = (e) => {
    const { id } = e.currentTarget;

    switch (id) {
      case "userData":
        dispatch(clearErrorAndResponse());
        setUserData(true);
        setChangePass(false);
        setDeliveryData(false);
        break;
      case "changePass":
        dispatch(clearErrorAndResponse());
        setUserData(false);
        setChangePass(true);
        setDeliveryData(false);
        break;
      case "deliveryData":
        dispatch(clearErrorAndResponse());
        setUserData(false);
        setChangePass(false);
        setDeliveryData(true);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Title text="Особистий кабінет" />
      <ButtonWrapper>
        <Button $active={userData} id="userData" onClick={handleClickBtn}>
        <FaRegAddressBook />
          Особисті данні</Button>
        <Button $active={changePass} id="changePass" onClick={handleClickBtn}>
          <MdOutlinePassword />
          Зміна паролю</Button>
        <Button $active={deliveryData} id="deliveryData" onClick={handleClickBtn}>
          <MdOutlineSignpost />
          Зміна адреси відділення</Button>
      </ButtonWrapper>
      <FormWrapper>
      {userData && <UserInfo user={user} />}
      {changePass && <PasswordChangeForm user={user} />}
      {deliveryData && <DeliveryData user={user} />}
      </FormWrapper>
      <ButtonWrapper>
        <Button onClick={handleClick}>
        <MdLogout />
          Вийти</Button>
      </ButtonWrapper>
    </div>
  );
}
