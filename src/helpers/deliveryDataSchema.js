import * as Yup from "yup";

export const deliveryDataSchema = Yup.object({
  city: Yup.string().required("Обов'язкове поле!").min(2, "Мінімум 2 символи!"),
  // cityRef: Yup.string().required("Щось пішло не так..."),
  warehouse: Yup.string()
    .required("Обов'язкове поле!")
    .min(1, "Мінімум 1 символ!"),
  // recipientWarehouseIndex: Yup.string().required(),
  // warehouseRef: Yup.string().required("Щось пішло не так..."),
  // warehouseAddress: Yup.string("Щось пішло не так...")
  //   .required("Щось пішло не так...")
  //   .min(2, "Адресса відділення має бути більше 5 символів!"),
});
