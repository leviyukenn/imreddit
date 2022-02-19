import NotInterestedIcon from "@material-ui/icons/NotInterested";
import React, { useCallback } from "react";
import {
  PostStatus,
  useChnagePostStatus,
} from "../../../graphql/hooks/useChangePostStatus";
import ToolBarButton from "./ToolBarButton";

interface RemovePostButtonProps {
  postId: string;
  postStatus: PostStatus;
  withIcon?: boolean;
}

const RemovePostButton = ({
  postId,
  postStatus,
  withIcon = true,
}: RemovePostButtonProps) => {
  const { changePostStatus, loading } = useChnagePostStatus();
  const disabled = postStatus === PostStatus.REMOVED;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event?.stopPropagation();
      changePostStatus(postId, PostStatus.REMOVED);
    },
    [postId, changePostStatus]
  );

  return (
    <ToolBarButton
      onClick={handleClick}
      startIcon={withIcon ? <NotInterestedIcon /> : undefined}
      disabled={loading || disabled}
      style={disabled ? { color: "#ff585b" } : undefined}
    >
      Remove
    </ToolBarButton>
  );
};
export default RemovePostButton;
