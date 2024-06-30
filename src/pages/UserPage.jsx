import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/auth-operations";
import { selectUser } from "../redux/auth/auth-selectors";
import React, { useState } from "react";
import Title from "../components/Home/Title/Title";
import UserInfo from "../components/Auth/UserPage/UserData/UserInfo";
import PasswordChangeForm from "../components/Auth/UserPage/UserData/PasswordChangeForm";
import DeliveryData from "../components/Auth/UserPage/UserData/DeliveryData";
import styled from 'styled-components';
import { FaRegAddressBook } from "react-icons/fa6";
import { MdOutlinePassword } from "react-icons/md";
import { MdOutlineSignpost } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { clearErrorAndResponse } from "../redux/auth/auth-slice";
import { Button } from "../components/Buttons/Buttons";
import { LuShoppingBasket } from "react-icons/lu";

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  justify-content: center;
  flex-wrap: wrap;
`;

export default function UserPage() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(true);
  const [changePass, setChangePass] = useState(false);
  const [deliveryData, setDeliveryData] = useState(false);
  const [orderHistory, setOrderHistory] = useState(false);

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
        case "orderHistory":
        dispatch(clearErrorAndResponse());
        setUserData(false);
        setChangePass(false);
        setDeliveryData(false);
        setOrderHistory(false);
        break;
      default:
        break;
    }
  };

  return (
    <>
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
          <Button $active={orderHistory} id="orderHistory" onClick={handleClickBtn}>
          <LuShoppingBasket />
          Історія замовлень</Button>
      </ButtonWrapper>
      <>
      {userData && <UserInfo user={user} />}
      {changePass && <PasswordChangeForm user={user} />}
      {deliveryData && <DeliveryData user={user} />}
      </>
      <ButtonWrapper>
        <Button onClick={handleClick}>
        <MdLogout />
          Вийти</Button>
      </ButtonWrapper>
    </>
  );
}
