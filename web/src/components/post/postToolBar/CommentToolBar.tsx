import { Box } from "@material-ui/core";
import React, { useCallback, useMemo } from "react";
import { FRONTEND_URL } from "../../../const/const";
import { RegularPostDetailFragment } from "../../../generated/graphql";
import {
  PostStatus,
  useChnagePostStatus,
} from "../../../graphql/hooks/useChangePostStatus";
import { useUserCommunityRole } from "../../../graphql/hooks/useUserCommunityRole";
import { useIsAuth } from "../../../utils/hooks/useIsAuth";
import { createPostDetailPageLinkWithCommentId } from "../../../utils/links";
import ApprovePostButton from "./ApprovePostButton";
import CopyLinkButton from "./CopyLinkButton";
import DeletePostButton from "./DeletePostButton";
import RemovePostButton from "./RemovePostButton";

interface CommentToolBarProps {
  post: RegularPostDetailFragment;
}

const CommentToolBar = ({ post }: CommentToolBarProps) => {
  const { me } = useIsAuth();
  const { userRole } = useUserCommunityRole(post.community.id);
  const { changePostStatus, loading } = useChnagePostStatus();
  const isCreator = me?.id && me.id === post?.creator?.id;

  const postDetailPageLinkWithCommentId = createPostDetailPageLinkWithCommentId(
    post.community.name,
    post.ancestor?.id!,
    post.id
  );

  const onApprove = useCallback(() => {
    changePostStatus(post.id, PostStatus.APPROVED);
  }, [post, changePostStatus]);
  const onRemove = useCallback(() => {
    changePostStatus(post.id, PostStatus.REMOVED);
  }, [post, changePostStatus]);

  const moderatorButtons = useMemo(() => {
    if (!userRole) return null;
    if (post.postStatus && post.postStatus === PostStatus.REMOVED) {
      return (
        <ApprovePostButton
          onApprove={onApprove}
          disabled={loading}
          iconButton={true}
        />
      );
    }

    if (post.postStatus && post.postStatus === PostStatus.APPROVED) {
      return (
        <RemovePostButton
          onRemove={onRemove}
          disabled={loading}
          iconButton={true}
        />
      );
    }

    return (
      <>
        <ApprovePostButton
          onApprove={onApprove}
          disabled={loading || post.postStatus === PostStatus.APPROVED}
          iconButton={true}
        />
        <RemovePostButton
          onRemove={onRemove}
          disabled={loading || post.postStatus === PostStatus.REMOVED}
          iconButton={true}
        />
      </>
    );
  }, [userRole, onApprove, onRemove, post, loading]);

  return (
    <Box display="flex">
      <CopyLinkButton
        link={FRONTEND_URL + postDetailPageLinkWithCommentId}
        withIcon={false}
      />
      {moderatorButtons}
      {isCreator ? (
        <DeletePostButton postId={post.id} iconButton={true} />
      ) : null}
    </Box>
  );
};
export default CommentToolBar;
