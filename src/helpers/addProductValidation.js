import * as Yup from 'yup';

export const addProductValidation = Yup.object({
  size: Yup.mixed().required("Розмір це обов'язкове поле!"),
  image: Yup.mixed().required("Зображення обов'язкове!"),
  description: Yup.string().min(20, "Опис має бути мінімум 20 символів!").max(200, "Опис має бути не більше 150 символів!").required("Опис товару це обов'язкове поле!"),
  category: Yup.string().required("Категорія це обов'язкове поле!").typeError("Категорія повинна бути вказана!"),
  price: Yup.number("Ціна повинна бути вказана числом!").required("Ціна це обов'язкове поле!").typeError("Ціна повинна бути вказана числом!"),
  amount: Yup.number().required("Кількість це обов'язкове поле!").typeError("Кількість повинна бути вказана числом!"),
  name: Yup.string().min(2, "Назва має бути більше ніж два символа!").required("Назва це обов'язкове поле!"),
})