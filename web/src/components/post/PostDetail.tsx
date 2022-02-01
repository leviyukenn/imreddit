import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { PostDetailQuery } from "../../generated/graphql";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import LoginRegisterButtonGroup from "../navbar/LoginRegisterButtonGroup";
import { CommentCard } from "./CommentCard";
import CommentEditor from "./post-editor/CommentEditor";
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

        {post.children.map((child) => (
          <CommentCard key={child.id} postId={child.id} />
        ))}
      </Box>
    </>
  );
};
export default PostDetail;
