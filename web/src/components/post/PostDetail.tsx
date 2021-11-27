import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Post, RegularPostDetailFragment } from "../../generated/graphql";
import { CommentCard } from "./CommentCard";
import CommentEditor from "./post-editor/CommentEditor";
import { LoadingPostDetailCard, PostDetailCard } from "./PostDetailCard";

interface PostDetailProps {
  post:
    | (RegularPostDetailFragment & {
        children: Array<{ __typename?: "Post" } & Pick<Post, "id">>;
      })
    | null;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heart: {
      maxWidth: "740px",
      width: "calc(100% - 32px)",
      margin: "32px",
    },
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
    <Box display="flex" justifyContent="center">
      <Box className={classes.heart}>
        <PostDetailCard post={post} />
        <Box className={classes.comments}>
          <Box className={classes.commentForm}>
            <CommentEditor replyTo={post} />
          </Box>

          {post.children.map((child) => (
            <CommentCard key={child.id} postId={child.id} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default PostDetail;
