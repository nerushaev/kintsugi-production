// import { Notify } from "notiflix";
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { userInfoValidation } from "../../../../helpers/userInfoValidation";
// import { updateUserInfo } from "../../../../redux/auth/auth-operations";
// import { Inputt } from "../../../Busket/CheckoutPage/Input";
// import { Button, ButtonWrapper } from "../../../Buttons/Buttons";
// import { Form } from "../../../Fields/Fields.styled";

// export default function UserInfo({ user }) {
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });
//   const dispatch = useDispatch();
//   const [userEdit, setUserEdit] = useState(false);

//   useEffect(() => {
//     if (user && !userEdit) {
//       setUserData({
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//       });
//     }
//   }, [user, userEdit]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     switch (name) {
//       case name:
//         return setUserData((prev) => {
//           return {
//             ...prev,
//             [name]: value,
//           };
//         });
//       default:
//         break;
//     }
//   };

//   const isHaveChange = (newData, oldData) => {
//     let res = {};
//     const result = Object.entries(newData);
//     result.forEach((item) => {
//       const key = item[0];
//       const value = item[1];
//       if (oldData[key] !== value) {
//         return (res[key] = value);
//       }
//     });
//     return res;
//   };

//   const handleSubmit = () => {
//     const result = isHaveChange(userData, user);
//     if (!Object.keys(result).length) {
//       Notify.failure("Данні не було змінено!");
//       setUserEdit(false);
//       return;
//     }
//     userInfoValidation.validate(userData).then(() => {
//       dispatch(updateUserInfo(result));
//     });
//     setUserEdit(false);
//   };

//   return (
//     <Form>
//       <Inputt
//         label="Ваше ім'я"
//         name="name"
//         value={userData.name}
//         onChange={handleChange}
//         $disable={!userEdit}
//         disabled={!userEdit}
//       />
//       <Inputt
//         label="Пошта"
//         name="email"
//         value={userData.email}
//         onChange={handleChange}
//         $disable={!userEdit}
//         disabled={!userEdit}
//       />
//       <Inputt
//         label="Номер телефону"
//         name="phone"
//         value={userData.phone}
//         onChange={handleChange}
//         $disable={!userEdit}
//         disabled={!userEdit}
//       />
//       {userEdit ? (
//         <ButtonWrapper>
//           <Button type="button" onClick={handleSubmit}>
//             Зберегти
//           </Button>
//         </ButtonWrapper>
//       ) : (
//         <ButtonWrapper>
//           <Button
//             $delete={true}
//             type="button"
//             $disabled={false}
//             onClick={() => setUserEdit(true)}
//           >
//             Редагувати данні
//           </Button>
//         </ButtonWrapper>
//       )}
//     </Form>
//   );
// }

import { Input } from "../../../Input/Input";
import { FormProvider, useForm } from "react-hook-form";
import { GrMail } from "react-icons/gr";
import { FaExchangeAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../../../redux/auth/auth-operations.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { selectError, selectResponse, selectUser } from "../../../../redux/auth/auth-selectors";
import {
  CustomForm,
  InputsWrapper,
  ButtonWrapper,
  Button,
  ErrorMessage,
} from "../../../Form/Form.styled";
import { useState } from "react";
import { userInfoSchema } from "../../../../helpers/userInfoSchema";

export default function UserInfo() {
  const user = useSelector(selectUser);
  const methods = useForm({
    defaultValues: {
      name: user ? user.name : "",
      email: user ? user.email : "",
      phone: user ? user.phone : "",
    },
    resolver: yupResolver(userInfoSchema),
  });
  const [userEdit, setUserEdit] = useState(false);
  const error = useSelector(selectError);
  const response = useSelector(selectResponse);
  const dispatch = useDispatch();

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await dispatch(updateUserInfo(data)).then(r => setUserEdit(false));
    } catch (error) {
      console.log(error);
    }
  });

  const email_input = {
    name: "email",
    label: "Пошта",
    type: "text",
    id: "email",
    placeholder: "Введіть вашу пошту",
    disabled: !userEdit,
  };

  const phone_input = {
    name: "phone",
    label: "Мобільний номер",
    type: "phone",
    id: "phone",
    placeholder: "Введіть ваш мобільний номер...",
    disabled: !userEdit,
  };

  const name_input = {
    name: "name",
    label: "Ім'я та прізвище",
    type: "text",
    id: "name",
    placeholder: "Введіть ваше ім'я та прізвище...",
    disabled: !userEdit,
  };

  return (
    <FormProvider {...methods}>
      <CustomForm onSubmit={(e) => e.preventDefault()} noValidate>
        <InputsWrapper>
          <Input {...name_input} />
          <Input {...email_input} />
          <Input {...phone_input} />
        </InputsWrapper>
        <ButtonWrapper>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          {response && !userEdit && <ErrorMessage>{response}</ErrorMessage>}
          {userEdit ? (
            <Button onClick={onSubmit}>
              <GrMail />
              Зберегти зміни
            </Button>
          ) : (
            <Button $accent onClick={e => setUserEdit(true)}>
              <FaExchangeAlt />
              Змінити данні
            </Button>
          )}
        </ButtonWrapper>
      </CustomForm>
    </FormProvider>
  );
}
