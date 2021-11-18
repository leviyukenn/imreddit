import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { useUserModalState } from "../../redux/hooks/useUserModalState";
import LoginRegisterModal from "../user/LoginRegisterModal";

interface UserStatusBarProps {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
      borderRadius: "9999px",
    },
    username: {
      marginRight: theme.spacing(2),
    },
  })
);

const UserStatusBar = ({}: UserStatusBarProps) => {
  const { loading: meLoading, error, data: meResponse } = useMeQuery();

  const [logout, { loading: logoutLoading }] = useLogoutMutation({
    update(cache, { data: logoutResponse }) {
      cache.modify({
        fields: {
          me(loggedInUser) {
            if (logoutResponse?.logout) {
              return null;
            }
            return loggedInUser;
          },
        },
      });
    },
  });
  const { showLoginModal, showRegisterModal } = useUserModalState();

  const classes = useStyles();

  if (!error && !meLoading && meResponse?.me) {
    return (
      <>
        <Typography
          variant="h6"
          className={classes.username}
          color="textPrimary"
        >
          {meResponse.me.username}
        </Typography>
        <Button
          disableElevation
          variant="outlined"
          color="primary"
          className={classes.menuButton}
          onClick={() => logout()}
          disabled={logoutLoading}
        >
          Log Out
        </Button>
      </>
    );
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
