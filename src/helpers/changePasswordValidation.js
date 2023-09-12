import * as Yup from "yup";

export const changePasswordValidation = Yup.object({
  confirmNewPass: Yup.string()
    .oneOf([Yup.ref("newPass"), ""], "Паролі повинні співпадати!")
    .required("Введіть пароль повторно для підтвердження"),
  newPass: Yup.string()
    .required("Введіть ваш новий пароль!")
    .min(7, "Пароль занадто маленький!")
    .max(32, "Пароль занадто довгий!"),
  oldPass: Yup.string()
    .required("Введіть ваш старий пароль!")
    .min(7, "Пароль занадто маленький!")
    .max(32, "Пароль занадто довгий!"),
});
