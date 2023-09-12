import * as Yup from "yup";

export const deliveryDataValidation = Yup.object({
  city: Yup.string().required().min(2, "Місто має бути більше 1 символу!"),
  cityRef: Yup.string().required("Щось пішло не так..."),
  warehouse: Yup.string()
    .required("Відділення це обов'язкове поле!")
    .min(2, "Відділення має бути більше 1 символу!"),
  recipientWarehouseIndex: Yup.string().required(),
  warehouseRef: Yup.string().required("Щось пішло не так..."),
  warehouseAddress: Yup.string("Щось пішло не так...")
    .required("Щось пішло не так...")
    .min(2, "Адресса відділення має бути більше 5 символів!"),
});
