import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";

interface UserProfileProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#edeff1",
      border: "1px solid #bdbfc0",
      borderRadius: 4,
      height: 100,
    },
  })
);

const UserProfile = ({}: UserProfileProps) => {
  const classes = useStyles();
  return <Box className={classes.root}></Box>;
};
export default UserProfile;
