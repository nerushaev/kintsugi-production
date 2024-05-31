import { useDispatch, useSelector } from "react-redux";
import UserData from "../components/Auth/UserPage/UserData/UserData";
import { logout } from "../redux/auth/auth-operations";
import { selectUser } from "../redux/auth/auth-selectors";
import React from "react";
import Title from "../components/Home/Title/Title";
import { Button, ButtonWrapper } from "../components/Buttons/Buttons";

export default function UserPage() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Title text="Особистий кабінет"/>
      <UserData user={user} />
      <ButtonWrapper>
        <Button onClick={handleClick}>Вийти</Button>
      </ButtonWrapper>
    </div>
  );
}
