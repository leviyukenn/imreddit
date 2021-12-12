import React, { useState } from "react";
import LoginRegisterLayout from "../LoginRegisterLayout";
import TextDivider from "../utility/TextDivider";
import GoogleButton from "./GoogleLoginButton";
import LoginForm from "./LoginForm";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <LoginRegisterLayout titleText={"Login"}>
      <GoogleButton {...{ isSubmitting, setIsSubmitting }} />
      <TextDivider text={"OR"} />
      <LoginForm {...{ isSubmitting, setIsSubmitting }} />
    </LoginRegisterLayout>
  );
};
export default Login;
