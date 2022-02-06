import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useCallback } from "react";
import { useDeleteMyPost } from "../../../graphql/hooks/useDeleteMyPost";
import { useAlertDialog } from "../../../redux/hooks/useAlertDialog";

interface RemovePostButtonProps {
  postId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: "flex",
      alignItems: "center",
      lineHeight: 16,
      padding: 8,
      fontSize: "0.75rem",
      fontWeight: 700,
      cursor: "pointer",
      color: "#9b9b9b",
      borderRadius: 4,
      textTransform: "none",
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
);

const RemovePostButton = ({ postId }: RemovePostButtonProps) => {
  const classes = useStyles();
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
    <Button className={classes.button} onClick={handleClick} disabled={loading}>
      <DeleteIcon />
      <Typography variant="caption">Delete</Typography>
    </Button>
  );
};
export default RemovePostButton;
