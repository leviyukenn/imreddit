import React from "react";
import LoginRegisterPageLayout from "../components/LoginRegisterPageLayout";
import Register from "../components/user/RegisterForm";

const register = () => {
  return (
    <LoginRegisterPageLayout>
      <Register />
    </LoginRegisterPageLayout>
  );
};
export default register;
