import * as Yup from "yup";

export const loginSchema = Yup.object({
  password: Yup.string()
    .required("Обов'язкове поле!")
    .min(7, "Мінімум 7 символів")
    .max(32, "Максимум 32 символи"),
  email: Yup.string()
    .required("Обов'язкове поле!")
    .matches(
      /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$/u,
      'Некоректний формат'
    )
    .max(32, "Максимум 32 символи"),
});
