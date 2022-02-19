import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import CakeIcon from "@material-ui/icons/Cake";
import React from "react";
import { RegularUserFragment } from "../../../generated/graphql";

interface UserProfileProps {
  user: RegularUserFragment;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #bdbfc0",
      borderRadius: 4,
    },
    banner: {
      height: 94,
      backgroundColor: "#33a8ff",
    },
    content: {
      padding: "0 1rem 1rem",
    },
    userName: {
      textAlign: "center",
      fontWeight: 500,
      color: "#222222",
    },
    subUserName: {
      textAlign: "center",
      fontSize: "0.75rem",
      fontWeight: 500,
      lineHeight: "1rem",
      color: "#7c7c7c",
    },
    avatarContainer: {
      position: "relative",
      textAlign: "center",
      height: 70,
    },
    avatar: {
      position: "absolute",
      top: -70,
      left: "75px",
      height: "160px",
    },
    createdDateContainer: {
      display: "flex",
      alignItems: "center",
    },
    createdDate: {
      marginLeft: "0.5em",
    },
    cakeIcon: {
      fontSize: "0.875rem",
      color: "#2B9EED",
      marginRight: 4,
    },
    userAbout: {
      margin: "20px 0",
    },
  })
);

const UserProfile = ({ user }: UserProfileProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.banner}></Box>
      <Box className={classes.avatarContainer}>
        <img src={user.avatar} className={classes.avatar} />
      </Box>
      <Box className={classes.content}>
        <Typography variant="h5" className={classes.userName}>
          {user.username}
        </Typography>
        <Typography variant="subtitle1" className={classes.subUserName}>
          {"u/" + user.username}
        </Typography>
        <Box className={classes.userAbout}>
          <Box>
            <Typography variant="body2" component="p">
              {user.about}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" margin="8px 0">
          <Box flex={1}>
            <Typography variant="subtitle2">Points</Typography>
            <Box display="flex" className={classes.createdDateContainer}>
              <CakeIcon className={classes.cakeIcon} />
              <Typography variant="caption" className={classes.subUserName}>
                {user.points}
              </Typography>
            </Box>
          </Box>
          <Box flex={1}>
            <Typography variant="subtitle2">Cake Day</Typography>
            <Box display="flex" className={classes.createdDateContainer}>
              <CakeIcon className={classes.cakeIcon} />
              <Typography variant="caption" className={classes.subUserName}>
                {new Date(+user.createdAt).toDateString()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default UserProfile;
