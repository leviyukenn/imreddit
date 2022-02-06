import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import React, { useCallback } from "react";
import { useSnackbarAlert } from "../../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../../redux/types/types";
import { copyTextToClipboard } from "../../../utils/utils";

interface CopyLinkButtonProps {
  link: string;
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
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
);

const CopyLinkButton = ({ link }: CopyLinkButtonProps) => {
  const classes = useStyles();
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
    <Box className={classes.button} onClick={handleClick}>
      <ShareIcon />
      <Typography variant="caption">Share</Typography>
    </Box>
  );
};
export default CopyLinkButton;
