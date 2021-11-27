import React from "react";
import LoginRegisterPageLayout from "../components/LoginRegisterPageLayout";
import ForgotPassword from "../components/user/ForgotPasswordForm";

const forgotPassword = () => {
  return (
    <LoginRegisterPageLayout>
      <ForgotPassword />
    </LoginRegisterPageLayout>
  );
};
export default forgotPassword;
