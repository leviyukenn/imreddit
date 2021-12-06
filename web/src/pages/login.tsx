import { Box } from "@material-ui/core";
import React from "react";
import LoginRegisterPageLayout from "../components/LoginRegisterPageLayout";
import GoogleButton from "../components/user/GoogleLoginButton";
import Login from "../components/user/LoginForm";

const login = () => {
  return (
    <LoginRegisterPageLayout>
      <Box>
        <GoogleButton />
        <Login />
      </Box>
    </LoginRegisterPageLayout>
  );
};
export default login;
