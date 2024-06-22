import * as Yup from "yup";

export const userInfoSchema = Yup.object({
  name: Yup.string()
    .required(`Обов'язкове поле!`)
    .matches(
      // /^[а-яёіїєА-ЯЁІЇЄA-Za-z]+,?\s[а-яёіїєА-ЯЁІЇЄA-Za-z]+б?\s[а-яёіїєА-ЯЁІЇЄA-Za-z]+$/,
      /^[а-яёіїєА-ЯЁІЇЄA-Za-z]+б?\s[а-яёіїєА-ЯЁІЇЄA-Za-z]+$/,
      `Ім'я та прізвище`
    ),
  phone: Yup.string()
    .required("Обов'язкове поле!")
    .matches(/^\+380\d{3}\d{2}\d{2}\d{2}$/, `У форматі +380`),
  email: Yup.string()
    .required("Введіть вашу пошту!")
    .matches(
      /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$/u,
      'Некоректний формат'
    ),
});
