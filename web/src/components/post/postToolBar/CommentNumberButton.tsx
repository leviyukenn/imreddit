import {
  createStyles,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import NextLink from "next/link";
import React from "react";

interface CommentNumberButtonProps {
  link: string;
  totalComments: number;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    commentButton: {
      display: "flex",
      alignItems: "center",
      lineHeight: 16,
      padding: 8,
      fontSize: "0.75rem",
      fontWeight: 700,
      cursor: "pointer",
      color: "#9b9b9b",
      borderRadius: 4,
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
);

const CommentNumberButton = ({
  link,
  totalComments,
}: CommentNumberButtonProps) => {
  const classes = useStyles();
  return (
    <NextLink href={link} passHref>
      <Link className={classes.commentButton} underline="none">
        <ChatBubbleOutlineIcon />
        <Typography variant="caption">{totalComments}</Typography>
      </Link>
    </NextLink>
  );
};
export default CommentNumberButton;
