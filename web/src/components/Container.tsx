import {
  Box,
  BoxProps,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import NavBar from "./NavBar";

interface ContainerProps extends BoxProps {
  backgroundMode?: "light" | "grey";
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    mainContentBox: {
      marginTop: "0",
      minHeight: "calc(100vh - 56px)",
    },
    lightBackground: {
      backgroundColor: theme.palette.background.paper,
    },
    greyBackground: {
      backgroundColor: theme.palette.background.default,
    },
  })
);

const Container = ({ children, backgroundMode = "grey" }: ContainerProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <NavBar />
      <Box
        className={`${classes.mainContentBox} ${
          backgroundMode === "grey"
            ? classes.greyBackground
            : classes.lightBackground
        }`}
      >
        {children}
      </Box>
    </Box>
  );
};
export default Container;