import ShareIcon from "@material-ui/icons/Share";
import React, { useCallback } from "react";
import { useSnackbarAlert } from "../../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../../redux/types/types";
import { copyTextToClipboard } from "../../../utils/utils";
import ToolBarButton from "./ToolBarButton";

interface CopyLinkButtonProps {
  link: string;
  withIcon?: boolean;
}

const CopyLinkButton = ({ link, withIcon = true }: CopyLinkButtonProps) => {
  const { onOpenSnackbarAlert } = useSnackbarAlert();

  const handleClick = useCallback(
    async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      event.stopPropagation();
      copyTextToClipboard(link)
        .then(() =>
          onOpenSnackbarAlert({
            message: "Copied link.",
            severity: AlertSeverity.SUCCESS,
          })
        )
        .catch(() =>
          onOpenSnackbarAlert({
            message: "Failed to copy link.",
            severity: AlertSeverity.ERROR,
          })
        );
    },
    [link, copyTextToClipboard]
  );
  return (
    <ToolBarButton
      startIcon={withIcon ? <ShareIcon /> : null}
      onClick={handleClick}
    >
      Share
    </ToolBarButton>
  );
};
export default CopyLinkButton;
