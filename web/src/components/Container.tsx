import {
  Box,
  BoxProps,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import NavBar from "./NavBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      backgroundColor: theme.palette.background.default,
    },
    mainContentBox: {
      padding: "20px 24px",
      height: "100vh",
    },
  })
);

const Container = ({ children }: BoxProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <NavBar />
      <Grid container justify="center" className={classes.mainContentBox}>
        {children}
      </Grid>
    </Box>
  );
};
export default Container;
