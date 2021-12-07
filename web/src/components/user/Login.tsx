import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import LoginRegisterLayout from "../LoginRegisterLayout";
import TextDivider from "../utility/TextDivider";
import GoogleButton from "./GoogleLoginButton";
import LoginForm from "./LoginForm";

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

const Login = () => {
  const classes = useStyles();
  return (
    <LoginRegisterLayout>
      <Box className={classes.container}>
        <Typography variant="h6" className={classes.title}>
          Login
        </Typography>
        <GoogleButton />
        <TextDivider text={"OR"} />
        <LoginForm />
      </Box>
    </LoginRegisterLayout>
  );
};
export default Login;
