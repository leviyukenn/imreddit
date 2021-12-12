import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
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
    container: {
      width: 280,
    },
    title: {
      marginBottom: "3rem",
    },
  })
);
const LoginRegisterLayout = ({
  children,
  titleText,
}: {
  children: ReactNode;
  titleText?: string;
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.mainContentBox}>
      <Box className={classes.sideImage} />
      <Box className={classes.container}>
        {titleText ? (
          <Typography variant="h6" className={classes.title}>
            {titleText}
          </Typography>
        ) : null}
        {children}
      </Box>
    </Box>
  );
};
export default LoginRegisterLayout;
