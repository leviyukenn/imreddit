import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import {
  RegularPostDetailFragment,
  usePostDetailQuery,
} from "../../generated/graphql";
import { CommentCard } from "./CommentCard";
import CommentEditor from "./post-editor/CommentEditor";
import { LoadingPostDetailCard, PostDetailCard } from "./PostDetailCard";

interface PostDetailProps {
  postId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      backgroundColor: theme.palette.background.default,
    },
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

const PostDetail = ({ postId }: PostDetailProps) => {
  const {
    data: postDetailResponse,
    loading: postDetailLoading,
    error,
  } = usePostDetailQuery({
    skip: !postId,
    variables: { postId: postId! },
  });

  const classes = useStyles();

  if (!postDetailResponse?.postDetail) {
    return <LoadingPostDetailCard />;
  }

  return (
    <Box display="flex" justifyContent="center" className={classes.container}>
      <Box className={classes.heart}>
        <PostDetailCard post={postDetailResponse.postDetail} />
        <Box className={classes.comments}>
          <Box className={classes.commentForm}>
            <CommentEditor replyTo={postDetailResponse.postDetail} />
          </Box>

          {postDetailResponse.postDetail.children.map((child) => (
            <CommentCard
              key={child?.id}
              post={child as RegularPostDetailFragment}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default PostDetail;
