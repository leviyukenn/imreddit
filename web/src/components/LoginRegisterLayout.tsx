import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { ReactNode } from "react";
import { SERVER_URL } from "../const/const";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContentBox: {
      display: "flex",
      alignItems: "center",
      height: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    sideImage: {
      marginRight: "1.5rem",
      height: "100%",
      backgroundImage: `url(${
        SERVER_URL + "/resources/backgroundImages/createCommunityImg.jpeg"
      })`,
      width: "140px",
      backgroundPosition: "60%",
    },
  })
);
const LoginRegisterLayout = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();
  return (
    <Box className={classes.mainContentBox}>
      <Box className={classes.sideImage} />
      {children}
    </Box>
  );
};
export default LoginRegisterLayout;
