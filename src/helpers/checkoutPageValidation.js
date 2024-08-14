import * as Yup from "yup";

export const checkoutPageValidationSecondStep = Yup.object({
  name: Yup.string()
    .trim()
    .required(`Обов'язкове поле!`)
    .matches(
      /^[а-яёіїєА-ЯЁІЇЄA-Za-z]+б?\s[а-яёіїєА-ЯЁІЇЄA-Za-z]+$/,
      `Прізвище та Ім'я`
    ),
  email: Yup.string()
    .trim()
    .required("Обов'язкове поле!")
    .matches(
      /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$/u,
      'Введіть вашу пошту у форматі "youemail@gmail.com"'
    )
    .max(32, "Пошта занадто довга!"),
  phone: Yup.string()
    .trim()
    .required("Обов'язкове поле!")
    .matches(/^\+380\d{9}$/, `У форматі +380`),
  orderComments: Yup.string().trim(),
  register: Yup.boolean(),
  confirmPassword: Yup.string().when("register", {
    is: true,
    then: (checkoutPageValidationSecondStep) =>
      checkoutPageValidationSecondStep
        .oneOf([Yup.ref("password"), ""], "Паролі повинні співпадати!")
        .required("Повторіть пароль"),
  }),
  password: Yup.string().when("register", {
    is: true,
    then: (checkoutPageValidationSecondStep) =>
      checkoutPageValidationSecondStep
        .required("Пароль це обов'язкове поле!")
        .min(7, "Пароль занадто маленький!")
        .max(32, "Пароль занадто довгий!"),
  }),
});

export const checkoutPageValidationThirdStep = Yup.object({
  delivery: Yup.string().required("Оберіть спосіб доставки!"),
  warehouseDelivery: Yup.boolean(),
  postboxDelivery: Yup.boolean(),
  addressDelivery: Yup.boolean(),
  city: Yup.string().when("delivery", {
    is: "nova",
    then: (checkoutPageValidationSecondStep) =>
      checkoutPageValidationSecondStep
        .required("Обов'язкове поле!"),
  }),
  warehouse: Yup.string().when(["delivery", "warehouseDelivery"], {
    is: (delivery, warehouseDelivery) => delivery === "nova" && warehouseDelivery,
    then: (checkoutPageValidationSecondStep) =>
      checkoutPageValidationSecondStep
        .required("Обов'язкове поле!"),
  }),
  postbox: Yup.string().when(["delivery", "postboxDelivery"], {
    is: (delivery, postboxDelivery) => delivery === "nova" && postboxDelivery,
    then: (checkoutPageValidationSecondStep) =>
      checkoutPageValidationSecondStep
        .required("Обов'язкове поле!"),
  }),
  address: Yup.string().when(["delivery", "addressDelivery"], {
    is: (delivery, addressDelivery) => delivery === "nova" && addressDelivery,
    then: (checkoutPageValidationSecondStep) =>
      checkoutPageValidationSecondStep
        .required("Обов'язкове поле!"),
  }),
  house: Yup.string().when(["delivery", "addressDelivery"], {
    is: (delivery, addressDelivery) => delivery === "nova" && addressDelivery,
    then: (checkoutPageValidationSecondStep) =>
      checkoutPageValidationSecondStep
        .required("Обов'язково!"),
  }),
  appartment: Yup.string().when(["delivery", "addressDelivery"], {
    is: (delivery, addressDelivery) => delivery === "nova" && addressDelivery,
    then: (checkoutPageValidationSecondStep) =>
      checkoutPageValidationSecondStep
        .required("Обов'язково!"),
  }),
  deliveryComments: Yup.string().trim(),
  payments: Yup.string().required("Оберіть спосіб доставки!"),
});

export const checkoutPageValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required(`Обов'язкове поле!`)
    .matches(
      /^[а-яёіїєА-ЯЁІЇЄA-Za-z]+б?\s[а-яёіїєА-ЯЁІЇЄA-Za-z]+$/,
      `Прізвище та Ім'я`
    ),
  email: Yup.string()
    .trim()
    .required("Обов'язкове поле!")
    .matches(
      /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$/u,
      'Введіть вашу пошту у форматі "youemail@gmail.com"'
    )
    .max(32, "Пошта занадто довга!"),
  phone: Yup.string()
    .trim()
    .required("Обов'язкове поле!")
    .matches(/^\+380\d{9}$/, `У форматі +380`),
  delivery: Yup.string().required("Оберіть спосіб доставки!"),
  city: Yup.string().when("delivery", {
    is: "nova",
    then: (checkoutPageValidation) =>
      checkoutPageValidation.required("Обов'язкове поле!"),
  }),
  warehouse: Yup.string().when("delivery", {
    is: "nova",
    then: (checkoutPageValidation) =>
      checkoutPageValidation.required("Обов'язкове поле!"),
  }),
  payments: Yup.string().required("Оберіть метод оплати!"),
});

// export const checkoutPageValidation = Yup.object().shape({
//   delivery: Yup.string().required(`Оберіть спосіб доставки!`),
//   payments: Yup.string().required(`Оберіть метод оплати!`),
//   phone: Yup.string()
//     .required("Обов'язкове поле!")
//     .matches(/^\+380\d{9}$/, `У форматі +380`),
//   name: Yup.string()
//     .required(`Обов'язкове поле!`)
//     .matches(
//       /^[а-яёіїєА-ЯЁІЇЄA-Za-z]+б?\s[а-яёіїєА-ЯЁІЇЄA-Za-z]+$/,
//       `Прізвище та Ім'я`
//     ),
//   email: Yup.string()
//     .required("Обов'язкове поле!")
//     .matches(
//       /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$/u,
//       'У форматі "youemail@gmail.com"'
//     )
//     .max(32, "Пошта занадто довга!"),

//     city: Yup.string().when('delivery', {
//       is: 'nova',
//       then: Yup.string().required(`Обов'язкове поле!`)
//     }),
//     warehouse: Yup.string().when('delivery', {
//       is: 'nova',
//       then: Yup.string().required(`Обов'язкове поле!`)
//     }),
// });

export const checkoutPageValidationAfina = Yup.object({
  delivery: Yup.string().required(`Оберіть спосіб доставки!`),
  payments: Yup.string().required(`Оберіть метод оплати!`),
  phone: Yup.string()
    .required("Обов'язкове поле!")
    .matches(/^\+380\d{9}$/, `У форматі +380`),
  name: Yup.string()
    .required(`Обов'язкове поле!`)
    .matches(
      /^[а-яёіїєА-ЯЁІЇЄA-Za-z]+б?\s[а-яёіїєА-ЯЁІЇЄA-Za-z]+$/,
      `Прізвище та Ім'я`
    ),
  email: Yup.string()
    .required("Обов'язкове поле!")
    .matches(
      /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$/u,
      'У форматі "youemail@gmail.com"'
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
