import React, { useState } from "react";
import LoginRegisterLayout from "../LoginRegisterLayout";
import TextDivider from "../utility/TextDivider";
import GoogleButton from "./GoogleLoginButton";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <LoginRegisterLayout titleText={"Sign Up"}>
      <GoogleButton {...{ isSubmitting, setIsSubmitting }} />
      <TextDivider text={"OR"} />
      <RegisterForm {...{ isSubmitting, setIsSubmitting }} />
    </LoginRegisterLayout>
  );
};
export default Register;
