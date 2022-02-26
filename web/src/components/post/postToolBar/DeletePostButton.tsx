import { IconButton, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useCallback } from "react";
import { useDeleteMyPost } from "../../../graphql/hooks/useDeleteMyPost";
import { useAlertDialog } from "../../../redux/hooks/useAlertDialog";
import ToolBarButton from "./ToolBarButton";

interface RemovePostButtonProps {
  postId: string;
  userName: string;
  textButton?: boolean;
  iconButton?: boolean;
}

const DeletePostButton = ({
  postId,
  userName,
  textButton = false,
  iconButton = false,
}: RemovePostButtonProps) => {
  const { deleteMyPost, loading } = useDeleteMyPost(userName);
  const { open } = useAlertDialog({
    title: "Delete post?",
    text: "Are you sure you want to delete your post? You can't undo this.",
    onConfirm: () => deleteMyPost(postId),
    confirmButtonName: "Delete Post",
  });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event?.stopPropagation();
      open();
    },
    [open]
  );

  return iconButton ? (
    <Tooltip title="Delete">
      <IconButton onClick={handleClick} disabled={loading}>
        <DeleteIcon style={{ color: "#9b9b9b" }} />
      </IconButton>
    </Tooltip>
  ) : (
    <ToolBarButton
      onClick={handleClick}
      startIcon={!textButton ? <DeleteIcon /> : undefined}
      disabled={loading}
    >
      Delete
    </ToolBarButton>
  );
};
export default DeletePostButton;
