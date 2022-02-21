import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import React from "react";

interface RemoveWarningProps {
  communityName: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      borderRadius: 4,
      border: "1px solid rgb(135, 138, 140)",
      padding: "4px 8px 4px 8px",
    },
    sideBar: {
      position: "absolute",
      backgroundColor: "rgb(135, 138, 140)",
      top: 0,
      left: 0,
      width: 8,
      height: "100%",
    },
    warningIcon: {
      color: "#ea0027",
      margin: "0 8px",
    },
    warning: {
      lineHeight: "1rem",
      fontWeight: 700,
    },
  })
);

const PostRemovedWarning = ({ communityName }: RemoveWarningProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.sideBar}></Box>
      <WarningRoundedIcon className={classes.warningIcon} />
      <Box>
        <Typography
          variant="caption"
          component="p"
          className={classes.warning}
          gutterBottom
        >
          {`Sorry, this post has been removed by the moderators of r/${communityName}.`}
        </Typography>
        <Typography variant="caption" component="p">
          Moderators remove posts from feeds for a variety of reasons, including
          keeping communities safe, civil, and true to their purpose.
        </Typography>
      </Box>
    </Box>
  );
};
export default PostRemovedWarning;
