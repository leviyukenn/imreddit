import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import {
  RegularPostDetailFragment,
  usePostDetailQuery,
} from "../../generated/graphql";
import { CommentCard } from "./CommentCard";
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
      backgroundColor: theme.palette.background.paper,
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
  console.log(postDetailResponse.postDetail);
  return (
    <Box display="flex" justifyContent="center" className={classes.container}>
      <Box className={classes.heart}>
        <PostDetailCard post={postDetailResponse.postDetail} />
        {postDetailResponse.postDetail.children.map((child) => (
          <CommentCard
            key={child?.id}
            post={child as RegularPostDetailFragment}
          />
        ))}
      </Box>
    </Box>
  );
};
export default PostDetail;
