import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import NextLink from "next/link";
import React from "react";
import CommunitySelection from "./CommunitySelection";
import UserStatusBar from "./UserStatusBar";

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
    menuButton: {
      marginRight: theme.spacing(2),
      borderRadius: "9999px",
    },
    toolBar: {
      minHeight: "56px",
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function NavBar() {
  const classes = useStyles();

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
        <CommunitySelection />
        <UserStatusBar />
      </Toolbar>
    </AppBar>
  );
}
