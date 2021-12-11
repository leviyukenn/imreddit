import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import LoginRegisterLayout from "../LoginRegisterLayout";
import TextDivider from "../utility/TextDivider";
import GoogleButton from "./GoogleLoginButton";
import RegisterForm from "./RegisterForm";

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

const Register = () => {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <LoginRegisterLayout>
      <Box className={classes.container}>
        <Typography variant="h6" className={classes.title}>
          Sign Up
        </Typography>
        <GoogleButton {...{ isSubmitting, setIsSubmitting }} />
        <TextDivider text={"OR"} />
        <RegisterForm {...{ isSubmitting, setIsSubmitting }} />
      </Box>
    </LoginRegisterLayout>
  );
};
export default Register;
