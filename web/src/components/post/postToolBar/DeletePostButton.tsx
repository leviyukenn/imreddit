import DeleteIcon from "@material-ui/icons/Delete";
import React, { useCallback } from "react";
import { useDeleteMyPost } from "../../../graphql/hooks/useDeleteMyPost";
import { useAlertDialog } from "../../../redux/hooks/useAlertDialog";
import ToolBarButton from "./ToolBarButton";

interface RemovePostButtonProps {
  postId: string;
  withIcon?: boolean;
}

const DeletePostButton = ({
  postId,
  withIcon = true,
}: RemovePostButtonProps) => {
  const { deleteMyPost, loading } = useDeleteMyPost();
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

  return (
    <ToolBarButton
      onClick={handleClick}
      startIcon={withIcon ? <DeleteIcon /> : undefined}
      disabled={loading}
    >
      Delete
    </ToolBarButton>
  );
};
export default DeletePostButton;
