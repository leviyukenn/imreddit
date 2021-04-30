import * as Yup from "yup";

const usernameValidation = Yup.string()
  .min(3, "Username must be between 3 and 20 characters")
  .max(20, "Username must be between 3 and 20 characters")
  .matches(
    /^\w+$/,
    "Letters, numbers, underscores only. Please try again without symbols."
  )
  .required("Required");

const passwordValidation = Yup.string()
  .min(4, "Password must be at least 4 characters long")
  .matches(
    /^\w+$/,
    "Letters, numbers, underscores only. Please try again without symbols."
  )
  .required("Required");

const emailValidation = Yup.string()
  .email("Must be a valid email")
  .required("Required");

export const registerValidationSchema = Yup.object({
  username: usernameValidation,
  password: passwordValidation,
  email: emailValidation,
});

export const loginValidationSchema = Yup.object({
  username: usernameValidation,
  password: passwordValidation,
});

export const forgotPasswordValidationSchema = Yup.object({
  username: usernameValidation,
  email: emailValidation,
});

export const changePasswordValidationSchema = Yup.object({
  password: passwordValidation,
});
