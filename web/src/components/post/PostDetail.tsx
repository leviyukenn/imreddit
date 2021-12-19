import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { PostDetailQuery } from "../../generated/graphql";
import { CommentCard } from "./CommentCard";
import CommentEditor from "./post-editor/CommentEditor";
import { PostDetailCard, LoadingPostDetailCard } from "./PostDetailCard";

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
  })
);

const PostDetail = ({ post }: PostDetailProps) => {
  const classes = useStyles();
  if (!post) {
    return <LoadingPostDetailCard />;
  }

  return (
    <>
      <PostDetailCard post={post} />
      <Box className={classes.comments}>
        <Box className={classes.commentForm}>
          <CommentEditor replyTo={post} />
        </Box>

        {post.children.map((child) => (
          <CommentCard key={child.id} postId={child.id} />
        ))}
      </Box>
    </>
  );
};
export default PostDetail;
