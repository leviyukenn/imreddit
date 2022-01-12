import {
  Box,
  BoxProps,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { SERVER_URL } from "../const/const";
import { useCommunityImages } from "../redux/hooks/useCommunityImages";
import NavBar from "./navbar/NavBar";

interface ContainerProps extends BoxProps {
  drawer?: JSX.Element;
  banner?: JSX.Element;
  backgroundMode?: "light" | "grey";
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      flex: 1,
      height: "100%",
      backgroundAttachment: "fixed",
    },
    mainContentBox: {
      padding: "1.25rem 0",
      [theme.breakpoints.up("sm")]: {
        padding: "1.25rem 1.5rem",
      },
      height: "100%",
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

const Container = ({
  children,
  drawer,
  banner,
  backgroundMode = "grey",
}: ContainerProps) => {
  const classes = useStyles();
  const { background } = useCommunityImages();

  return (
    <Box display="flex">
      {drawer}
      <Box
        className={`${classes.root} ${
          backgroundMode === "grey"
            ? classes.greyBackground
            : classes.lightBackground
        }`}
        style={
          background
            ? {
                background: `url(${
                  SERVER_URL + background
                }) center center / cover no-repeat fixed`,
              }
            : undefined
        }
      >
        <NavBar />
        {banner}
        <Box className={classes.mainContentBox}>{children}</Box>
      </Box>
    </Box>
  );
};
export default Container;
