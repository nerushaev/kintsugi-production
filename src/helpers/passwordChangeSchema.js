import * as Yup from "yup";

export const passwordChangeSchema = Yup.object({
  newConfirmPass: Yup.string()
    .oneOf([Yup.ref("newPass"), ""], "Паролі повинні співпадати!")
    .required("Обов'язкове поле!"),
  newPass: Yup.string()
    .required("Обов'язкове поле!")
    .min(7, "Мінімум 7 символів")
    .max(32, "Максимум 32 символи"),
  oldPass: Yup.string()
    .required("Обов'язкове поле!")
    .min(7, "Мінімум 7 символів")
    .max(32, "Максимум 32 символи"),
});
