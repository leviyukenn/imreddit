import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useUserModalState } from "../redux/hooks/useUserModalState";
import LoginRegisterModal from "./user/LoginRegisterModal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      position: "sticky",
      top: 0,
      zIndex: 10000,
      height: "56px",
      borderBottom: "1px solid #edeff1",
    },
    toolBar: {
      minHeight: "56px",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      borderRadius: "9999px",
    },
    title: {
      flexGrow: 1,
    },
    username: {
      marginRight: theme.spacing(2),
    },
  })
);

export default function NavBar() {
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

  let body = null;

  if (!error && !meLoading && meResponse?.me) {
    body = (
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
    body = (
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

  return (
    <AppBar position="static" elevation={0} className={classes.root}>
      <Toolbar className={classes.toolBar}>
        <NextLink href="/" passHref>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="default"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </NextLink>
        <NextLink href="/">
          <Typography
            variant="h6"
            className={classes.title}
            color="textPrimary"
          >
            Imreddit
          </Typography>
        </NextLink>
        {body}
      </Toolbar>
    </AppBar>
  );
}
