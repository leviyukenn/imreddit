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

const communityNameValidation = Yup.string()
  .min(3, "Community name must be between 3 and 20 characters")
  .max(20, "Community name must be between 3 and 20 characters")
  .matches(
    /^\w+$/,
    "Letters, numbers, underscores only. Please try again without symbols."
  )
  .required("Required");

const communityDescriptionValidation = Yup.string()
  .max(300, "Community description must be less than 300 characters")
  .required("Required");

const communityTopicsValidation = Yup.array()
  .min(1, "Select at least one topic.")
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

export const createCommunityValidationSchema = Yup.object({
  name: communityNameValidation,
  description: communityDescriptionValidation,
  topicIds: communityTopicsValidation,
});

export const editCommunityDescriptionValidationSchema = Yup.object({
  description: communityDescriptionValidation,
});
