import { IconButton, Tooltip } from "@material-ui/core";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import React, { useCallback } from "react";
import ToolBarButton from "./ToolBarButton";

interface RemovePostButtonProps {
  onRemove: () => void;
  disabled: boolean;
  textButton?: boolean;
  iconButton?: boolean;
}

const RemovePostButton = ({
  onRemove,
  disabled,
  textButton = false,
  iconButton = false,
}: RemovePostButtonProps) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event?.stopPropagation();
      if (disabled) return;
      onRemove();
    },
    [onRemove, disabled]
  );

  return iconButton ? (
    <Tooltip title="Remove">
      <IconButton
        onClick={handleClick}
        style={disabled ? { color: "#ff585b" } : { color: "#9b9b9b" }}
      >
        <NotInterestedIcon />
      </IconButton>
    </Tooltip>
  ) : (
    <ToolBarButton
      onClick={handleClick}
      startIcon={!textButton ? <NotInterestedIcon /> : undefined}
      style={disabled ? { color: "#ff585b" } : undefined}
    >
      Remove
    </ToolBarButton>
  );
};
export default RemovePostButton;
