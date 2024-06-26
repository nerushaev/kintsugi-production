import * as Yup from "yup";

export const feedbackSchema = Yup.object({
  comment: Yup.string()
  .required("Обов'язкове поле!")
  .min(10, "Мінімум 10 символів")
  .max(100, "Максимум 100 символів")
});
