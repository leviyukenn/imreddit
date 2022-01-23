import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { useUserModalState } from "../../redux/hooks/useUserModalState";
import LoginRegisterModal from "../user/LoginRegisterModal";
import UserDropDown from "./UserDropDown";

interface UserStatusBarProps {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
      borderRadius: "9999px",
      fontWeight: 700,
      textTransform: "none",
    },
    username: {
      marginRight: theme.spacing(2),
    },
  })
);

const UserStatusBar = ({}: UserStatusBarProps) => {
  const { loading: meLoading, error, data: meResponse } = useMeQuery();

  const { showLoginModal, showRegisterModal } = useUserModalState();

  const classes = useStyles();

  if (!error && !meLoading && meResponse?.me) {
    return <UserDropDown />;
  } else {
    return (
      <>
        <Button
          disableElevation
          variant="outlined"
          color="primary"
          className={classes.menuButton}
          onClick={showLoginModal}
        >
          Log In
        </Button>
        <Button
          disableElevation
          variant="contained"
          color="primary"
          className={classes.menuButton}
          onClick={showRegisterModal}
        >
          Sign Up
        </Button>
        <LoginRegisterModal />
      </>
    );
  }
};
export default UserStatusBar;
