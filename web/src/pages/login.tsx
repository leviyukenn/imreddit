import { Box } from "@material-ui/core";
import React from "react";
import Login from "../components/user/Login";

const loginPage = () => {
  return (
    <Box height="100vh" minHeight="600px">
      <Login />
    </Box>
  );
};
export default loginPage;
