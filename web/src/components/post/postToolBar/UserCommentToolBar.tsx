import { Box } from "@material-ui/core";
import React, { useCallback } from "react";
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

interface UserCommentToolBarProps {
  post: RegularPostDetailFragment;
}

const UserCommentToolBar = ({ post }: UserCommentToolBarProps) => {
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
  return (
    <Box display="flex">
      <CopyLinkButton link={FRONTEND_URL + postDetailPageLinkWithCommentId} />
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
      {isCreator ? <DeletePostButton postId={post.id} /> : null}
    </Box>
  );
};
export default UserCommentToolBar;
