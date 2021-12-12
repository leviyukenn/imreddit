import React from "react";
import LoginRegisterLayout from "../LoginRegisterLayout";
import ChangePasswordForm from "./ChangePasswordForm";

const ChangePassword = () => {
  return (
    <LoginRegisterLayout titleText={"Reset your password"}>
      <ChangePasswordForm />
    </LoginRegisterLayout>
  );
};
export default ChangePassword;
