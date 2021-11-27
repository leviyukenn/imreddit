import React from "react";
import LoginRegisterPageLayout from "../components/LoginRegisterPageLayout";
import Login from "../components/user/LoginForm";

const login = () => {
  return (
    <LoginRegisterPageLayout>
      <Login />
    </LoginRegisterPageLayout>
  );
};
export default login;
