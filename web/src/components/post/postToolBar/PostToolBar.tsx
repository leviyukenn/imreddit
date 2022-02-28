import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useCallback } from "react";
import { FRONTEND_URL } from "../../../const/const";
import { RegularPostDetailFragment } from "../../../generated/graphql";
import {
  PostStatus,
  useChnagePostStatus,
} from "../../../graphql/hooks/useChangePostStatus";
import { useUserCommunityRole } from "../../../graphql/hooks/useUserCommunityRole";
import { useIsAuth } from "../../../utils/hooks/useIsAuth";
import { createPostDetailPageLink } from "../../../utils/links";
import ApprovePostButton from "./ApprovePostButton";
import CommentNumberButton from "./CommentNumberButton";
import CopyLinkButton from "./CopyLinkButton";
import DeletePostButton from "./DeletePostButton";
import RemovePostButton from "./RemovePostButton";

interface PostToolBarProps {
  post: RegularPostDetailFragment;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: "flex",
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const PostToolBar = ({ post }: PostToolBarProps) => {
  const postDetailPageLink = createPostDetailPageLink(
    post.community.name,
    post.id
  );
  const { me } = useIsAuth();
  const { userRole } = useUserCommunityRole(post.community.id);
  const { changePostStatus, loading } = useChnagePostStatus();
  const isCreator = me?.id && me.id === post?.creator?.id;

  const onApprove = useCallback(() => {
    changePostStatus(post.id, PostStatus.APPROVED);
  }, [post, changePostStatus]);
  const onRemove = useCallback(() => {
    changePostStatus(post.id, PostStatus.REMOVED);
  }, [post, changePostStatus]);

  const classes = useStyles();
  return (
    <Box className={classes.toolbar}>
      <CommentNumberButton totalComments={post.totalComments} />
      <CopyLinkButton link={FRONTEND_URL + postDetailPageLink} />
      {userRole?.isModerator ? (
        <>
          <ApprovePostButton
            onApprove={onApprove}
            disabled={loading || post.postStatus === PostStatus.APPROVED}
          />
          <RemovePostButton
            onRemove={onRemove}
            disabled={loading || post.postStatus === PostStatus.REMOVED}
          />
        </>
      ) : null}
      {isCreator ? (
        <DeletePostButton postId={post.id} userName={me!.username} />
      ) : null}
    </Box>
  );
};
export default PostToolBar;
