import { IconButton, Tooltip } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import React, { useCallback } from "react";
import ToolBarButton from "./ToolBarButton";

interface ApprovePostButtonProps {
  onApprove: () => void;
  disabled: boolean;
  textButton?: boolean;
  iconButton?: boolean;
}

const ApprovePostButton = ({
  onApprove,
  disabled,
  textButton = false,
  iconButton = false,
}: ApprovePostButtonProps) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event?.stopPropagation();
      if (disabled) return;
      onApprove();
    },
    [onApprove, disabled]
  );

  return iconButton ? (
    <Tooltip title="Approve">
      <IconButton
        onClick={handleClick}
        style={disabled ? { color: "#46d160" } : { color: "#9b9b9b" }}
      >
        <CheckCircleOutlineIcon />
      </IconButton>
    </Tooltip>
  ) : (
    <ToolBarButton
      onClick={handleClick}
      startIcon={!textButton ? <CheckCircleOutlineIcon /> : undefined}
      style={disabled ? { color: "#46d160" } : undefined}
    >
      Approve
    </ToolBarButton>
  );
};
export default ApprovePostButton;
