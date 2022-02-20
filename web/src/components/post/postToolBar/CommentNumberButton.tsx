import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import React from "react";
import ToolBarButton from "./ToolBarButton";

interface CommentNumberButtonProps {
  totalComments: number;
}

const CommentNumberButton = ({ totalComments }: CommentNumberButtonProps) => {
  return (
    <ToolBarButton startIcon={<ChatBubbleOutlineIcon />}>
      {totalComments}
    </ToolBarButton>
  );
};
export default CommentNumberButton;
