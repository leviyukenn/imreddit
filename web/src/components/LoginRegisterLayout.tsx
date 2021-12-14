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
      width: "100%",
      height: "100%",
      alignItems: "stretch",
      backgroundColor: theme.palette.background.paper,
    },
    sideImage: {
      marginRight: "1.5rem",
      backgroundImage: `url(${
        SERVER_URL + "/resources/backgroundImages/createCommunityImg.jpeg"
      })`,
      width: "140px",
    },
    container: {
      display: "flex",
      alignItems: "center",
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
          <Box width="100%">
            {titleText ? (
              <Typography variant="h6" className={classes.title}>
                {titleText}
              </Typography>
            ) : null}
            {children}
          </Box>
        </Box>
      </Box>
  );
};
export default LoginRegisterLayout;
