import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import React, { useCallback } from "react";
import {
  PostStatus,
  useChnagePostStatus,
} from "../../../graphql/hooks/useChangePostStatus";
import ToolBarButton from "./ToolBarButton";

interface ApprovePostButtonProps {
  postId: string;
  postStatus: PostStatus;
  withIcon?: boolean;
}

const ApprovePostButton = ({
  postId,
  postStatus,
  withIcon = true,
}: ApprovePostButtonProps) => {
  const { changePostStatus, loading } = useChnagePostStatus();
  const disabled = postStatus === PostStatus.APPROVED;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event?.stopPropagation();

      if (disabled) return;
      changePostStatus(postId, PostStatus.APPROVED);
    },
    [postId, changePostStatus]
  );

  return (
    <ToolBarButton
      onClick={handleClick}
      startIcon={withIcon ? <CheckCircleOutlineIcon /> : undefined}
      disabled={loading}
      style={disabled ? { color: "#46d160" } : undefined}
    >
      Approve
    </ToolBarButton>
  );
};
export default ApprovePostButton;
