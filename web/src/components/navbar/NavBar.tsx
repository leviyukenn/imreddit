import { Box } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import NextLink from "next/link";
import React from "react";
import { useMeQuery } from "../../generated/graphql";
import CommunitySelection from "./CommunitySelection";
import UserStatusBar from "./UserStatusBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      position: "sticky",
      top: 0,
      height: "56px",
      borderBottom: "1px solid #edeff1",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      borderRadius: "9999px",
    },
    toolBar: {
      minHeight: "56px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "stretch",
    },
    leftContainer: {
      display: "flex",
      alignItems: "center",
    },
    rightContainer: {
      display: "flex",
      alignItems: "center",
    },
  })
);

export default function NavBar() {
  const classes = useStyles();
  const { data: meResponse } = useMeQuery();

  return (
    <AppBar position="static" elevation={0} className={classes.root}>
      <Toolbar className={classes.toolBar}>
        <Box className={classes.leftContainer}>
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
            <Typography variant="h6" color="textPrimary">
              Imreddit
            </Typography>
          </NextLink>
          {meResponse?.me ? (
            <Box marginLeft="1em">
              <CommunitySelection userId={meResponse.me.id} />
            </Box>
          ) : null}
        </Box>
        <Box className={classes.rightContainer}>
          <UserStatusBar />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
