import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import LoginRegisterLayout from "../LoginRegisterLayout";
import ForgotPasswordForm from "./ForgotPasswordForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: 280,
    },
    title: {
      marginBottom: "3rem",
    },
  })
);

const ForgotPassword = () => {
  const classes = useStyles();
  return (
    <LoginRegisterLayout>
      <Box className={classes.container}>
        <Typography variant="h6" className={classes.title}>
          Reset your password
        </Typography>
        <ForgotPasswordForm />
      </Box>
    </LoginRegisterLayout>
  );
};
export default ForgotPassword;
