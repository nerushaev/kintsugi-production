import * as Yup from "yup";

export const loginSchema = Yup.object({
  password: Yup.string()
    .required("Пароль це обов'язкове поле!")
    .min(7, "Пароль занадто маленький!")
    .max(32, "Пароль занадто довгий!"),
  email: Yup.string()
    .required("Введіть вашу пошту!")
    .matches(
      /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$/u,
      'Введіть вашу пошту у форматі "youemail@gmail.com"'
    )
    .max(32, "Пошта занадто довга!"),
});
