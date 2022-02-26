import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";
import React from "react";
import { PostDetailQuery } from "../../generated/graphql";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import LoginRegisterButtonGroup from "../navbar/LoginRegisterButtonGroup";
import { CommentCard } from "./CommentCard";
import CommentEditor from "./createPost/postEditor/CommentEditor";
import { LoadingPostDetailCard, PostDetailCard } from "./PostDetailCard";

interface PostDetailProps {
  post: PostDetailQuery["postDetail"];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    comments: {
      borderRadius: "4px",
      padding: "48px 0",
      backgroundColor: theme.palette.background.paper,
    },
    commentForm: {
      width: "calc(100% - 24px)",
      maxWidth: "650px",
      margin: "0px auto 48px",
    },
    loginRegisterContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 4,
      border: "1px solid #edeff1",
      padding: "12px 8px",
    },
    loginRegisterText: {
      color: "#7c7c7c",
    },
    commnetCards: {
      paddingRight: 8,
    },
    noComments: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 340,
    },
    noCommentsIcon: {
      height: 28,
      width: 28,
      color: "rgb(0 121 211 / 40%)",
    },
    noCommentsYet: {
      fontWeight: 500,
      color: "#7c7c7c",
      opacity: 0.6,
    },
    beTheFirst: {
      fontWeight: 500,
      color: "#7c7c7c",
      opacity: 0.6,
    },
  })
);

const PostDetail = ({ post }: PostDetailProps) => {
  const classes = useStyles();
  const { me } = useIsAuth();
  if (!post) {
    return <LoadingPostDetailCard />;
  }

  return (
    <>
      <PostDetailCard post={post} />
      <Box className={classes.comments}>
        <Box className={classes.commentForm}>
          {me ? (
            <CommentEditor replyTo={post} />
          ) : (
            <Box className={classes.loginRegisterContainer}>
              <Typography
                variant="subtitle1"
                className={classes.loginRegisterText}
              >
                Log in or sign up to leave a comment
              </Typography>
              <Box>
                <LoginRegisterButtonGroup />
              </Box>
            </Box>
          )}
        </Box>

        <Box className={classes.commnetCards}>
          {post.children.map((child) => (
            <CommentCard key={child.id} postId={child.id} />
          ))}
        </Box>
        {post.children.length === 0 ? (
          <Box className={classes.noComments}>
            <ForumIcon className={classes.noCommentsIcon} />
            <Typography
              variant="h6"
              component="p"
              className={classes.noCommentsYet}
              gutterBottom
            >
              No Comments Yet
            </Typography>
            <Typography
              variant="subtitle2"
              component="p"
              className={classes.beTheFirst}
            >
              Be the first to share what you think!
            </Typography>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
export default PostDetail;
