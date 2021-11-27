import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { ReactNode } from "react";
import { SERVER_URL } from "../const/const";
import NavBar from "./navbar/NavBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContentBox: {
      display: "flex",
      height: "100%",
      minHeight: "calc(100vh - 56px)",
      backgroundColor: theme.palette.background.paper,
    },
    sideImage: {
      marginRight: "1.5rem",
      backgroundImage: `url(${
        SERVER_URL + "/resources/backgroundImages/createCommunityImg.jpeg"
      })`,
      width: "140px",
      backgroundPosition: "60%",
    },
  })
);
const LoginRegisterPageLayout = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();
  return (
    <Box>
      <NavBar />
      <Box className={classes.mainContentBox}>
        <Box className={classes.sideImage} />
        {children}
      </Box>
    </Box>
  );
};
export default LoginRegisterPageLayout;
