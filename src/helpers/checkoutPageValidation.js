import * as Yup from "yup";

export const checkoutPageValidationReg = Yup.object({
  warehouse: Yup.string().required(`Відділення це обов'язкове поле!`),
  city: Yup.string()
    .required(`Місто це обов'язкове поле!`)
    .min(3, "Введіть більше двух символів для початку пошуку!"),
  phone: Yup.string()
    .required("Номер телефону, це обов'язкове поле!")
    .matches(/^\+380\d{9}$/, `Введіть номер телефону в форматі +380669765467`),
  name: Yup.string()
    .required(`Введіть ваше Прізвище Ім'я по-Батькові!`)
    .matches(
      /^[а-яёіїєА-ЯЁІЇЄA-Za-z]+,?\s[а-яёіїєА-ЯЁІЇЄA-Za-z]+б?\s[а-яёіїєА-ЯЁІЇЄA-Za-z]+$/,
      `П.І.Б - Прізвище Ім'я по-Батькові`
    ),
  email: Yup.string()
    .required("Введіть вашу пошту!")
    .matches(
      /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$/u,
      'Введіть вашу пошту у форматі "youemail@gmail.com"'
    )
    .max(32, "Пошта занадто довга!"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Паролі повинні співпадати!")
    .required("Введіть пароль повторно для підтвердження"),
  password: Yup.string()
    .required("Пароль це обов'язкове поле!")
    .min(7, "Пароль занадто маленький!")
    .max(32, "Пароль занадто довгий!"),
});

export const checkoutPageValidation = Yup.object({
  warehouse: Yup.string().required(`Відділення це обов'язкове поле!`),
  city: Yup.string()
    .required(`Місто це обов'язкове поле!`)
    .min(3, "Введіть більше двух символів для початку пошуку!"),
  phone: Yup.string()
    .required("Номер телефону, це обов'язкове поле!")
    .matches(/^\+380\d{9}$/, `Введіть номер телефону в форматі +380669765467`),
  name: Yup.string()
    .required(`Введіть ваше Прізвище Ім'я по-Батькові!`)
    .matches(
      /^[а-яёіїєА-ЯЁІЇЄA-Za-z]+,?\s[а-яёіїєА-ЯЁІЇЄA-Za-z]+б?\s[а-яёіїєА-ЯЁІЇЄA-Za-z]+$/,
      `П.І.Б - Прізвище Ім'я по-Батькові`
    ),
  email: Yup.string()
    .required("Введіть вашу пошту!")
    .matches(
      /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$/u,
      'Введіть вашу пошту у форматі "youemail@gmail.com"'
    )
    .max(32, "Пошта занадто довга!"),
});

export const passwordsValidation = Yup.object({
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Паролі повинні співпадати!")
    .required("Введіть пароль повторно для підтвердження"),
  password: Yup.string()
    .required("Пароль це обов'язкове поле!")
    .min(7, "Пароль занадто маленький!")
    .max(32, "Пароль занадто довгий!"),
});
