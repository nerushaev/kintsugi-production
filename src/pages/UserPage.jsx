import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/auth-operations";
import { selectUser } from "../redux/auth/auth-selectors";
import React, { useState } from "react";
import {Title, TitleWrapper} from "../components/Text/Text.styled";
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
import { Container } from "../components/Container/Container.styled";
import OrderHistoryList from "../components/Auth/UserPage/UserData/OrderHistory/OrderHistoryList";
import WishList from "../components/Auth/UserPage/UserData/WishList";
import { FaRegHeart } from "react-icons/fa";

const ButtonWrapper = styled.div`
background-color: white;
padding: 20px;
border-radius: 6px;
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
  const [wishList, setWishList] = useState(false);

  const user = useSelector(selectUser);

  const handleClick = () => {
    dispatch(logout());
  };

  const handleClickBtn = (e) => {
    const { id } = e.currentTarget;

    switch (id) {
      case "userData":
        dispatch(clearErrorAndResponse());
        setOrderHistory(false);

        setUserData(true);
        setChangePass(false);
        setDeliveryData(false);
        setWishList(false)
        break;
      case "changePass":
        dispatch(clearErrorAndResponse());
        setOrderHistory(false);

        setUserData(false);
        setChangePass(true);
        setDeliveryData(false);
        setWishList(false);
        break;
      case "deliveryData":
        dispatch(clearErrorAndResponse());
        setUserData(false);
        setChangePass(false);
        setOrderHistory(false);
        setWishList(false);
        setDeliveryData(true);
        
        break;
        case "orderHistory":
        dispatch(clearErrorAndResponse());
        setUserData(false);
        setChangePass(false);
        setDeliveryData(false);
        setWishList(false);
        setOrderHistory(true);
        break;
        case "wishList":
        dispatch(clearErrorAndResponse());
        setUserData(false);
        setChangePass(false);
        setDeliveryData(false);
        setWishList(true);
        setOrderHistory(false);
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      <TitleWrapper>
      <Title text="Особистий кабінет" />
      </TitleWrapper>
      
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
          <Button $active={wishList} id="wishList" onClick={handleClickBtn}>
          <FaRegHeart />
          Список бажань</Button>
      </ButtonWrapper>
      <>
      {userData && <UserInfo user={user} />}
      {changePass && <PasswordChangeForm user={user} />}
      {deliveryData && <DeliveryData user={user} />}
      {orderHistory && <OrderHistoryList ordersId={user.orders} />}
      {wishList && <WishList/>}
      </>
      <ButtonWrapper>
        <Button onClick={handleClick}>
        <MdLogout />
          Вийти</Button>
      </ButtonWrapper>
    </Container>
  );
}
