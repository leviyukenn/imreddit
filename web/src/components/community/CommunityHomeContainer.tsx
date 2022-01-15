import {
  Box,
  BoxProps,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { useMemo } from "react";
import { SERVER_URL } from "../../const/const";
import { useCommunityAppearance } from "../../redux/hooks/useCommunityAppearance";
import NavBar from "../navbar/NavBar";

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

const CommunityHomeContainer = ({
  children,
  drawer,
  banner,
  backgroundMode = "grey",
}: ContainerProps) => {
  const classes = useStyles();
  const { background, backgroundColor } = useCommunityAppearance();
  const backgroundStyle = useMemo(() => {
    if (background)
      return {
        background: `url(${
          SERVER_URL + background
        }) center center / cover no-repeat fixed ${backgroundColor}`,
      };

    if (backgroundColor)
      return {
        background: backgroundColor,
      };
  }, [background, backgroundColor]);

  return (
    <Box display="flex">
      {drawer}
      <Box className={classes.root}>
        <NavBar />
        {banner}
        <Box
          className={`${classes.mainContentBox} ${
            backgroundMode === "grey"
              ? classes.greyBackground
              : classes.lightBackground
          }`}
          style={backgroundStyle}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
export default CommunityHomeContainer;
