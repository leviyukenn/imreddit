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
      height: "100%",
      backgroundColor: theme.palette.background.default,
    },
    mainContentBox: {
      padding: "20px 24px",
      height: "100%",
    },
  })
);

const Container = ({ children }: BoxProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <NavBar />
      <Grid
        container
        justify="center"
        className={classes.mainContentBox}
        spacing={4}
      >
        {children}
      </Grid>
    </Box>
  );
};
export default Container;
