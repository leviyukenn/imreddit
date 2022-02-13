import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import CakeIcon from "@material-ui/icons/Cake";
import EditIcon from "@material-ui/icons/Edit";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { RegularUserFragment } from "../../../generated/graphql";
import { createPostLink } from "../../../utils/links";
import GenerateAvatarModal from "./GenerateAvatarModal";
import UserAboutEditor from "./UserAboutEditor";

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
    generateAvatarButton: {
      background: "linear-gradient(90deg,#ec0623,#ff8717)",
      borderRadius: "9999px",
      fontWeight: 700,
      textTransform: "none",
    },
    createPostButton: {
      borderRadius: "9999px",
      fontWeight: 700,
      textTransform: "none",
    },
    userAbout: {
      margin: "20px 0",
    },
    userAboutContainer: {
      cursor: "pointer",
      transition: "all .1s linear 0s",
      "&:hover": {
        border: "1px solid #0079d3",
        borderRadius: "4px",
        padding: "0.5em",
      },
    },
  })
);

const MyProfile = ({ user }: UserProfileProps) => {
  const classes = useStyles();
  const router = useRouter();
  const [openAvatarGenerator, setOpenAvatarGenerator] = useState(false);
  const goToCreatePost = useCallback(() => {
    router.push(createPostLink);
  }, [router]);
  const [showUserAboutEditor, setShowUserAboutEditor] = useState(false);

  return (
    <>
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
          <Button
            fullWidth
            disableElevation
            variant="contained"
            color="primary"
            className={classes.generateAvatarButton}
            onClick={() => setOpenAvatarGenerator(true)}
          >
            Generate Random Avatar
          </Button>
          <Box className={classes.userAbout}>
            {showUserAboutEditor ? (
              <UserAboutEditor
                {...{
                  about: user.about,
                  closeUserAboutEditor: () => setShowUserAboutEditor(false),
                }}
              />
            ) : (
              <Box
                className={classes.userAboutContainer}
                onClick={() => setShowUserAboutEditor(true)}
              >
                <Typography variant="body2" component="p">
                  {user.about ||
                    "Write down A brief description of yourself shown on your profile."}
                </Typography>
                <EditIcon />
              </Box>
            )}
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
          <Button
            fullWidth
            disableElevation
            variant="contained"
            color="primary"
            className={classes.createPostButton}
            onClick={goToCreatePost}
          >
            New Post
          </Button>
        </Box>
      </Box>
      <GenerateAvatarModal
        open={openAvatarGenerator}
        closeModal={() => setOpenAvatarGenerator(false)}
      />
    </>
  );
};
export default MyProfile;
