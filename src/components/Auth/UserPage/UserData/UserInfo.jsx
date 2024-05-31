import { Notify } from "notiflix";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userInfoValidation } from "../../../../helpers/userInfoValidation";
import { updateUserInfo } from "../../../../redux/auth/auth-operations";
import { Inputt } from "../../../Busket/CheckoutPage/Input";
import { Button, ButtonWrapper } from "../../../Buttons/Buttons";
import { Form } from "../../../Fields/Fields.styled";

export default function UserInfo({ user }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const dispatch = useDispatch();
  const [userEdit, setUserEdit] = useState(false);

  useEffect(() => {
    if (user && !userEdit) {
      setUserData({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, userEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case name:
        return setUserData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      default:
        break;
    }
  };

  const isHaveChange = (newData, oldData) => {
    let res = {};
    const result = Object.entries(newData);
    result.forEach((item) => {
      const key = item[0];
      const value = item[1];
      if (oldData[key] !== value) {
        return res[key] = value;
      }
    });
    return res;
  };

  const handleSubmit = () => {
    const result = isHaveChange(userData, user);
    if (!Object.keys(result).length) {
      Notify.failure("Данні не було змінено!");
      setUserEdit(false);
      return;
    }
    userInfoValidation.validate(userData).then(() => {
      dispatch(updateUserInfo(result));
    });
    setUserEdit(false);
  };

  return (
    <Form>
      <Inputt
        label="Ваше ім'я"
        name="name"
        value={userData.name}
        onChange={handleChange}
        $disabled={!userEdit}
      />
      <Inputt
        label="Пошта"
        name="email"
        value={userData.email}
        onChange={handleChange}
        $disabled={!userEdit}
      />
      <Inputt
        label="Номер телефону"
        name="phone"
        value={userData.phone}
        onChange={handleChange}
        $disabled={!userEdit}
      />
      {userEdit ? (
        <ButtonWrapper>
          <Button type="button" onClick={handleSubmit}>
            Зберегти
          </Button>
        </ButtonWrapper>
      ) : (
        <ButtonWrapper>
          <Button
            $delete={true}
            type="button"
            $disabled={false}
            onClick={() => setUserEdit(true)}
          >
            Редагувати данні
          </Button>
        </ButtonWrapper>
      )}
    </Form>
  );
}
