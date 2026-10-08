import * as yup from "yup";

export const registerSchema = yup
  .object({
    username: yup
      .string()
      .required("Please enter your name.")
      .min(5, "Username should be at-least 5 characters."),

    email: yup
      .string()
      .required("Please enter your email.")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Not valid email address."),

    password: yup
      .string()
      .required("Please enter password.")
      .min(8, "Password should be at-least 8 characters."),
  })
  .required();

export const loginSchema = yup
  .object({
    identifier: yup
      .string()
      .required("Please enter your email.")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Not valid email address."),

    password: yup
      .string()
      .required("Please enter password.")
      .min(8, "Password should be at-least 8 characters."),
  })
  .required();
