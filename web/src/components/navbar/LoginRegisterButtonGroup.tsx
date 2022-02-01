import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useUserModalState } from "../../redux/hooks/useUserModalState";

interface LoginButtonProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginRight: theme.spacing(2),
      borderRadius: "9999px",
      fontWeight: 700,
      textTransform: "none",
    },
  })
);

const LoginRegisterButtonGroup = ({}: LoginButtonProps) => {
  const { showLoginModal, showRegisterModal } = useUserModalState();
  const classes = useStyles();
  return (
    <>
      <Button
        disableElevation
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={showLoginModal}
      >
        Log In
      </Button>
      <Button
        disableElevation
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={showRegisterModal}
      >
        Sign Up
      </Button>
    </>
  );
};
export default LoginRegisterButtonGroup;
