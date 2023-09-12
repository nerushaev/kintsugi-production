import { useDispatch, useSelector } from "react-redux";
import StyledDropzone from "../components/Auth/UserPage/StyledDropzone";
import UserData from "../components/Auth/UserPage/UserData/UserData";
import { logout } from "../redux/auth/auth-operations";
import { selectUser } from "../redux/auth/auth-selectors";
import { Button, ButtonWrapper } from "../components/Buttons/Buttons";
import ErrorMessage from "../components/Home/ErrorMessage/ErrorMessage";
import React from "react";

export default function UserPage() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <div>
      <StyledDropzone message="Натисни або перетягни зображення, щоб встановити аватарку!" userData={user} />
      {!user.verify && (
        <ErrorMessage
          message={`Потрібна верифікація! На вашу пошту ${user.email} було надіслано листа!`}
        />
      )}
      <UserData user={user} />
      <ButtonWrapper>
        <Button onClick={handleClick}>Вийти</Button>
      </ButtonWrapper>
    </div>
  );
}
